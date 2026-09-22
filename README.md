# 🔍 AI Image Detector - Chrome Extension & FastAPI Backend

An end-to-end Machine Learning-powered Google Chrome Extension that detects whether an image found on the web is **Real** or **AI-Generated (Fake)** in real-time.

The project uses a custom-trained **EfficientNetV2B0** deep learning model served via a **FastAPI** backend and seamlessly integrates with Google Chrome using Manifest V3 and Native Notifications.

---

## 🚀 Features

- **Context Menu Integration**: Right-click on any image across the web to test it instantly.
- **Instant Desktop Notifications**: Delivers classification labels (`Real` or `AI-Generated`) along with a confidence percentage directly through system notifications.
- **High-Performance Inference**: Powered by TensorFlow, Keras, and a lightweight FastAPI server.
- **Modern Extension Architecture**: Built fully on Chrome Manifest V3 service workers.

---

## 🛠️ Tech Stack

- **Deep Learning Framework**: TensorFlow, Keras (EfficientNetV2B0)
- **Backend API**: FastAPI, Uvicorn, Pillow, Requests
- **Browser Extension**: JavaScript (Chrome Extension API - Manifest V3)
- **Environment**: Python 3.10+

---

## 📂 Project Structure

```text
ai-image-detection/
├── best_ai_detector.keras       # Trained Keras Model Weights
├── server.py                    # FastAPI Backend Server
├── manifest.json                # Chrome Extension Manifest V3 configuration
├── background.js                # Chrome Service Worker for context menu & API calls
├── icon.png                     # Extension & Notification Icon
└── README.md                    # Project Documentation
⚙️ Installation & Setup
1. Clone the Repository
git clone https://github.com/your-username/ai-image-detection.git
cd ai-image-detection
2. Set Up the Python Environment

Create a virtual environment (optional but recommended) and install dependencies:

pip install fastapi uvicorn tensorflow pillow requests pydantic
3. Place the Model

Make sure your trained model file:

best_ai_detector.keras

is located in the root directory alongside server.py.

4. Start the Backend API

Run the FastAPI development server:

python server.py

The server will start at:

http://127.0.0.1:8000
🧩 Load the Chrome Extension

Open Google Chrome and navigate to:

chrome://extensions/
Toggle Developer mode on from the top-right corner.
Click the Load unpacked button.

Select the project directory:

ai-image-detection
The AI Image Detector extension is now installed and active.
🎯 How to Use
Browse any website containing images.
Right-click on any image.
Select "Check with AI Detector" from the context menu.
The extension sends the image to the local FastAPI backend.
The backend processes the image using the trained EfficientNetV2B0 model.
A native desktop notification appears showing:
Prediction: Real or AI-Generated
Confidence percentage
📊 Model Details
Base Architecture: EfficientNetV2B0 (Pre-trained on ImageNet)
Training Strategy: Two-stage training
Stage 1: Warm-up training
Stage 2: Top-layer fine-tuning
Input Dimensions: 224 × 224 × 3
Output: Binary classification
0 = Fake / AI-Generated
1 = Real
🔄 System Workflow
User Right-Clicks an Image
          ↓
"Check with AI Detector"
          ↓
Chrome Extension
          ↓
FastAPI Backend
          ↓
Image Download & Preprocessing
          ↓
EfficientNetV2B0 Model
          ↓
Prediction + Confidence
          ↓
FastAPI Response
          ↓
Chrome Native Notification
          ↓
Real / AI-Generated
⚠️ Important Note

The prediction result depends on the quality, diversity, and training data of the model. A confidence percentage represents the model's classification confidence, not a guaranteed determination of whether an image is actually real or AI-generated.

📌 Future Improvements
Support for drag-and-drop image detection.
Upload image from local storage.
Support for more AI image generators.
Improved model accuracy with a larger and more diverse dataset.
Batch image analysis.
Confidence visualization.
Web-based dashboard for prediction history.
GPU acceleration support.
REST API authentication and rate limiting.