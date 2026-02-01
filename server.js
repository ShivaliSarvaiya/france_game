const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let buildings = [];
let nextId = 1;

// GET all
app.get("/api/things", (req, res) => {
  res.json(buildings);
});

// GET one
app.get("/api/things/:id", (req, res) => {
  const item = buildings.find(b => b.id == req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// POST create
app.post("/api/things", (req, res) => {
  const { type, x, y } = req.body;
  if (!type || x == null || y == null) {
    return res.status(400).json({ error: "Missing data" });
  }

  const newBuilding = { id: nextId++, type, x, y, level: 1 };
  buildings.push(newBuilding);
  res.status(201).json(newBuilding);
});

// PUT update
app.put("/api/things/:id", (req, res) => {
  const item = buildings.find(b => b.id == req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });

  if (req.body.level) item.level = req.body.level;
  res.json(item);
});

// DELETE
app.delete("/api/things/:id", (req, res) => {
  const index = buildings.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  buildings.splice(index, 1);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
