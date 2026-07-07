async function loadPlayer(){

    const response = await fetch("/player");

    const player = await response.json();

    document.getElementById("hp").textContent = player.hp;
    document.getElementById("level").textContent = player.level;
    document.getElementById("gold").textContent = player.gold;
    document.getElementById("weapon").textContent = player.weapon;

}

loadPlayer();

async function fight(){

    const response = await fetch("/fight",{
        method:"POST"
    });

    const result = await response.json();

    document.getElementById("hp").textContent = result.player.hp;
    document.getElementById("level").textContent = result.player.level;
    document.getElementById("gold").textContent = result.player.gold;
    document.getElementById("weapon").textContent = result.player.weapon;

    document.getElementById("battleLog").innerHTML =
    `
    ⚔️ You fought a ${result.enemy}!<br>
    ❤️ Damage: ${result.damageTaken}<br>
    ⭐ XP: +${result.xpGained}<br>
    💰 Gold: +${result.goldGained}<br>
    🎒 Loot: ${result.loot}
    `;
}

async function heal(){

    const response = await fetch("/heal",{
        method:"POST"
    });

    const result = await response.json();

    loadPlayer();

    document.getElementById("battleLog").innerHTML =
    result.message;

}

document
.getElementById("fightBtn")
.addEventListener("click", fight);

document
.getElementById("healBtn")
.addEventListener("click", heal);