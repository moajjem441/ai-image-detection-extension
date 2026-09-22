chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "checkAIImage",
    title: "Check with AI Detector",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === "checkAIImage") {
    const imageUrl = info.srcUrl;

    try {
      const response = await fetch("http://localhost:8000/predict-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: imageUrl })
      });

      const rawText = await response.text();
      const data = JSON.parse(rawText);
      const confidence = (data.confidence * 100).toFixed(2);

      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: `AI Detector: ${data.label}`,
        message: `Confidence: ${confidence}%`,
        priority: 2
      });

    } catch (err) {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "AI Detector Error",
        message: "Failed to connect to backend server.",
        priority: 2
      });
    }
  }
});