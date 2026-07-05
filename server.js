const express = require("express");
const player = require("./data/player.json");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("⚔️ Welcome to Dungeon Quest API!");
});

app.get("/player", (req, res) => {
    res.json(player);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});