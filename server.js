let queue = "";

app.get("/update", (req, res) => {
  const newQueue = req.query.queue;
  if (!newQueue) return res.send("❌ No queue provided.");
  queue = newQueue;
  res.send("✅ Queue updated.");
});

app.get("/view", (req, res) => {
  if (!queue || queue.length === 0) return res.send("❌ Queue is empty.");
  const lines = queue.split("|").map((track, i) => `${i + 1} - ${track}`);
  res.send(`**Queue (Page 1)**\n${lines.slice(0, 10).join("\n")}`);
});

app.get("/page/:num", (req, res) => {
  if (!queue || queue.length === 0) return res.send("❌ Queue is empty.");
  const page = parseInt(req.params.num);
  const lines = queue.split("|");
  const totalPages = Math.ceil(lines.length / 10);
  if (page < 1 || page > totalPages) return res.send("❌ Invalid page.");

  const start = (page - 1) * 10;
  const end = start + 10;
  const paged = lines.slice(start, end).map((t, i) => `${start + i + 1} - ${t}`);

  res.send(`**Queue (Page ${page})**\n${paged.join("\n")}`);
});
