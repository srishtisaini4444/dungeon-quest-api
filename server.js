const express = require("express");
const player = require("./data/player.json");
const enemies = require("./data/enemies.json");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("⚔️ Welcome to Dungeon Quest API!");
});

app.get("/player", (req, res) => {
    res.json(player);
});

app.get("/enemies", (req, res) => {
    res.json(enemies);
});

app.get("/inventory", (req, res) => {
    res.json(player.inventory);
});

app.post("/fight", (req, res) => {
    const randomIndex = Math.floor(Math.random() * enemies.length);
    const enemy = enemies[randomIndex];

    player.hp -= enemy.damage;
    player.xp += enemy.xp;
    player.gold += enemy.gold;

    if (player.xp >= 100) {
    player.level++;
    player.hp = 100;
    player.xp -= 100;
    }

    player.inventory.push(enemy.loot);

    const battleResult = {
        enemy: enemy.name,
        damageTaken: enemy.damage,
        xpGained: enemy.xp,
        goldGained: enemy.gold,
        loot: enemy.loot
    };

    res.json(battleResult);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});