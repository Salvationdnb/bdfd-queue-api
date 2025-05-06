app.post("/update", (req, res) => {
  console.log("POST /update received:", req.body); // ADD THIS LINE
  const newQueue = req.body;
  if (!newQueue) return res.send("❌ No queue provided.");
  queue = newQueue;
  res.send("✅ Queue updated.");
});
