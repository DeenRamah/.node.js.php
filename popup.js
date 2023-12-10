document.getElementById("summarizeButton").addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var youtubeUrl = tabs[0].url;
      summarizeYouTubeVideo(youtubeUrl);
    });
  });
  
  function summarizeYouTubeVideo(url) {
    // Make a request to your backend API
    fetch("YOUR_BACKEND_API_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the summarized content
        console.log("Summarized Content:", data.summary);
        // You can display the summarized content or do further processing here
      })
      .catch(error => console.error("Error:", error));
  }
  