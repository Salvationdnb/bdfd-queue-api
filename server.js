const express = require("express");
const app = express();
app.use(express.json());

let queue = []; // Global queue

// Add a track
app.get("/add", (req, res) => {
  const { artist, title } = req.query;
  if (!artist || !title) return res.send("❌ Missing artist or title.");
  queue.push(`${artist} - ${title}`);
  res.send(`✅ Added: ${artist} - ${title}`);
});

// View queue
app.get("/view", (req, res) => {
  if (queue.length === 0) return res.send("❌ Queue is empty.");
  let list = queue
    .slice(0, 10)
    .map((track, i) => `${i + 1} - ${track}`)
    .join("\n");
  res.send(`**Queue (Page 1)**\n\n${list}`);
});

// Skip to next track
app.get("/next", (req, res) => {
  if (queue.length === 0) return res.send("❌ Queue is empty.");
  const current = queue.shift();
  res.send(`▶️ Now playing: **${current}**`);
});

app.listen(3000, () => {
  console.log("Queue API running on port 3000");
});
