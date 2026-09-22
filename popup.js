document.addEventListener("DOMContentLoaded", () => {
  const urlInput = document.getElementById("imageUrl");
  const checkBtn = document.getElementById("checkBtn");
  const resultBox = document.getElementById("resultBox");
  const previewImg = document.getElementById("previewImg");

  checkBtn.addEventListener("click", async () => {
    const url = urlInput.value.trim();

    if (!url) {
      alert("Please enter an image URL!");
      return;
    }

    // প্রিভিউ ইমেজ দেখানো
    previewImg.src = url;
    previewImg.style.display = "block";

    // লোডিং স্টেট
    checkBtn.disabled = true;
    checkBtn.innerText = "Analyzing...";
    resultBox.style.display = "block";
    resultBox.innerHTML = "<p style='color: #666;'>Checking with AI Model...</p>";

    try {
      const response = await fetch("http://localhost:8000/predict-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url })
      });

      if (!response.ok) {
        throw new Error("Unable to fetch or process image.");
      }

      const data = await response.json();
      const isReal = data.label === "Real";
      const confidence = (data.confidence * 100).toFixed(2);

      // রেজাল্ট দেখানো (Real হলে সবুজ, Fake হলে লাল)
      resultBox.innerHTML = `
        <div style="padding: 10px; border-radius: 6px; background-color: ${isReal ? '#e6f4ea' : '#fce8e6'}; color: ${isReal ? '#137333' : '#c5221f'}; font-weight: bold;">
          <div>${data.label}</div>
          <div style="font-size: 12px; font-weight: normal; margin-top: 4px;">Confidence: ${confidence}%</div>
        </div>
      `;
    } catch (err) {
      resultBox.innerHTML = `
        <div style="padding: 8px; border-radius: 6px; background-color: #fce8e6; color: #c5221f; font-size: 12px;">
          Failed! Make sure the backend server is running.
        </div>
      `;
    } finally {
      checkBtn.disabled = false;
      checkBtn.innerText = "Check Image";
    }
  });
});