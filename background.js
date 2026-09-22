// ব্রাউজার খুললে রাইট-ক্লিক মেনু তৈরি হবে
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "checkAIImage",
    title: "Check with AI Detector",
    contexts: ["image"]
  });
});

// ইউজার ছবিতে রাইট-ক্লিক করে ক্লিক করলে
chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === "checkAIImage") {
    const imageUrl = info.srcUrl;

    try {
      // লোকাল পাইথন API-তে ছবির URL পাঠানো
      const response = await fetch("http://localhost:8000/predict-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: imageUrl })
      });

      const data = await response.json();
      alert(`Prediction: ${data.label}\nConfidence: ${(data.confidence * 100).toFixed(2)}%`);
    } catch (err) {
      alert("Error: Make sure the Python backend API is running!");
    }
  }
});