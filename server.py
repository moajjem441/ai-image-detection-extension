import io
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import numpy as np
import tensorflow as tf

app = FastAPI(title="AI Image Detector Backend")

# CORS এনাবল করা যাতে এক্সটেনশন থেকে কল ব্লক না হয়
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# আপনার ট্রেনিং করা মডেল লোড করা
MODEL_PATH = "best_ai_detector.keras"
model = tf.keras.models.load_model(MODEL_PATH)
IMG_SIZE = 224

class ImageRequest(BaseModel):
    url: str

def preprocess_image_from_url(url: str):
    headers = {"User-Agent": "Mozilla/5.0"}
    res = requests.get(url, headers=headers, timeout=10)
    if res.status_code != 200:
        raise ValueError("Failed to download image from the provided URL.")
    
    img = Image.open(io.BytesIO(res.content)).convert("RGB")
    img = img.resize((IMG_SIZE, IMG_SIZE))
    img_array = np.array(img, dtype=np.float32)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.post("/predict-url")
def predict_image(payload: ImageRequest):
    try:
        processed_img = preprocess_image_from_url(payload.url)
        prediction = float(model.predict(processed_img)[0][0])
        
        # লেবেল ম্যাপিং: ট্রেনিং কোড অনুযায়ী Fake = 0, Real = 1
        if prediction >= 0.5:
            label = "Real"
            confidence = prediction
        else:
            label = "AI-Generated (Fake)"
            confidence = 1.0 - prediction

        return {
            "label": label,
            "confidence": round(confidence, 4),
            "raw_score": round(prediction, 4)
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=False)