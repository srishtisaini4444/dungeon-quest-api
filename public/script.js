async function loadPlayer(){

    const response = await fetch("/player");

    const player = await response.json();

    document.getElementById("hp").textContent = player.hp;
    document.getElementById("level").textContent = player.level;
    document.getElementById("gold").textContent = player.gold;
    document.getElementById("weapon").textContent = player.weapon;

    document.getElementById("healthBar").style.width =
player.hp + "%";

document.getElementById("xpBar").style.width =
player.xp + "%";

document.getElementById("goldBar").style.width =
Math.min(player.gold,100) + "%";

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
    

   document.getElementById("battleLog").innerHTML = `
<h3>⚔️ Battle Result</h3>

<p><strong>Enemy:</strong> ${result.enemy}</p>

<p><strong>❤️ Damage Taken:</strong> ${result.damageTaken}</p>

<p><strong>⭐ XP Gained:</strong> +${result.xpGained}</p>

<p><strong>💰 Gold Earned:</strong> +${result.goldGained}</p>

<p><strong>🎒 Loot:</strong> ${result.loot}</p>
`;
}

async function shop(){

    const response = await fetch("/shop");

    const items = await response.json();

    let text="<b>Shop</b><br><br>";

    items.forEach(item=>{

        text+=`${item.name} - ${item.price} Gold<br>`;

    });

    document.getElementById("battleLog").innerHTML=text;

}

async function saveGame(){

    const response = await fetch("/save",{
        method:"POST"
    });

    const result = await response.json();

    document.getElementById("battleLog").innerHTML =
    result.message;

}

async function resetGame(){

    const response = await fetch("/reset",{
        method:"POST"
    });

    const result = await response.json();

    loadPlayer();

    document.getElementById("battleLog").innerHTML =
    result.message;

}

async function inventory(){

    const response = await fetch("/inventory");

    const items = await response.json();

    document.getElementById("battleLog").innerHTML =
    "<b>Inventory</b><br><br>" +
    items.join("<br>");

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

document
.getElementById("shopBtn")
.addEventListener("click", shop);

document
.getElementById("saveBtn")
.addEventListener("click", saveGame);

document
.getElementById("resetBtn")
.addEventListener("click", resetGame);

document
.getElementById("inventoryBtn")
.addEventListener("click", inventory);

document
.getElementById("refreshBtn")
.addEventListener("click", loadPlayer);