// ব্রাউজার খুললে বা এক্সটেনশন ইনস্টল হলে রাইট-ক্লিক মেনু তৈরি হবে[cite: 4]
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "checkAIImage",
    title: "Check with AI Detector",
    contexts: ["image"]
  });
});

// ইউজার ছবিতে রাইট-ক্লিক করে অপশন নির্বাচন করলে[cite: 4]
chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === "checkAIImage") {
    const imageUrl = info.srcUrl;

    try {
      // লোকাল পাইথন API-তে ছবির URL পাঠানো[cite: 4]
      const response = await fetch("http://localhost:8000/predict-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: imageUrl })
      });

      if (!response.ok) {
        throw new Error("Backend responded with an error");
      }

      const data = await response.json();
      const confidence = (data.confidence * 100).toFixed(2);

      // সফল প্রেডিকশন নোটিফিকেশন
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: `AI Detector: ${data.label}`,
        message: `Confidence: ${confidence}%`,
        priority: 2
      });

    } catch (err) {
      // ব্যাকএন্ড কানেকশন বা অন্য কোনো এরর হলে নোটিফিকেশন[cite: 4]
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "AI Detector Error",
        message: "Make sure the Python backend API is running!",
        priority: 2
      });
    }
  }
});