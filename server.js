const express = require("express");
const player = require("./data/player.json");
const enemies = require("./data/enemies.json");
const shop = require("./data/shop.json");
const fs = require("fs");

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

app.get("/shop", (req, res) => {
    res.json(shop);
});

app.post("/buy/:item", (req, res) => {

    const item = shop.find(
        product => product.name.toLowerCase() === req.params.item.toLowerCase()
    );

    if (!item) {
        return res.json({
            message: "Item not found!"
        });
    }

    if (player.gold < item.price) {
        return res.json({
            message: "Not enough gold!"
        });
    }

    player.gold -= item.price;
    player.inventory.push(item.name);

    res.json({
        message: `${item.name} purchased successfully!`,
        gold: player.gold,
        inventory: player.inventory
    });

});

app.post("/equip/:weapon", (req, res) => {

    const weapon = req.params.weapon;

    if (!player.inventory.includes(weapon)) {
        return res.json({
            message: "Weapon not found in inventory!"
        });
    }

    player.weapon = weapon;

    res.json({
        message: `${weapon} equipped successfully!`,
        weapon: player.weapon
    });

});

app.post("/save", (req, res) => {

    fs.writeFileSync(
        "./data/player.json",
        JSON.stringify(player, null, 2)
    );

    res.json({
        message: "Game saved successfully!"
    });

});

app.get("/load", (req, res) => {

    const savedPlayer = JSON.parse(
        fs.readFileSync("./data/player.json", "utf8")
    );

    res.json(savedPlayer);

});

app.post("/reset", (req, res) => {

    player.name = "Hero";
    player.hp = 100;
    player.level = 1;
    player.xp = 0;
    player.gold = 50;
    player.weapon = "Wooden Sword";
    player.inventory = ["Potion"];

    res.json({
        message: "Game reset successfully!",
        player
    });

});

app.post("/heal", (req, res) => {
    if (player.inventory.includes("Potion")) {
        player.hp += 20;

        if (player.hp > 100) {
            player.hp = 100;
        }

        const potionIndex = player.inventory.indexOf("Potion");
        player.inventory.splice(potionIndex, 1);

        res.json({
            message: "Potion used!",
            hp: player.hp
        });
    } else {
        res.json({
            message: "No potions left!"
        });
    }
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
    loot: enemy.loot,

    player: {
        hp: player.hp,
        xp: player.xp,
        gold: player.gold,
        level: player.level,
        weapon: player.weapon
    }
};

    res.json(battleResult);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});