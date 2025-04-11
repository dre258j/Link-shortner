<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Custom URL Shortener</title>
</head>
<body>
  <h1>Paste a long URL</h1>
  <form id="shortenForm">
    <input type="text" id="urlInput" placeholder="Enter your long URL" required />
    <input type="text" id="customInput" placeholder="Custom alias (optional)" />
    <button type="submit">Shorten</button>
  </form>
  <div id="result"></div>

  <script>
    document.getElementById("shortenForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      const url = document.getElementById("urlInput").value;
      const custom = document.getElementById("customInput").value;

      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, custom })
      });

      const data = await res.json();
      if (data.shortened_url) {
        document.getElementById("result").innerHTML = `Shortened: <a href="${data.shortened_url}" target="_blank">${data.shortened_url}</a>`;
      } else {
        document.getElementById("result").innerHTML = `Error: ${data.error}`;
      }
    });
  </script>
</body>
</html>
