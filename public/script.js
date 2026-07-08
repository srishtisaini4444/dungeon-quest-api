async function loadPlayer(){

    const response = await fetch("/player");

    const player = await response.json();

    document.getElementById("hp").textContent =
    `${player.hp} / 100`;
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

function showToast(message){

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

async function fight(){

    const response = await fetch("/fight",{
        method:"POST"
    });

    const result = await response.json();

    document.getElementById("hp").textContent =
    `${result.player.hp} / 100`;
    document.getElementById("level").textContent = result.player.level;
    document.getElementById("gold").textContent = result.player.gold;
    document.getElementById("weapon").textContent = result.player.weapon;

    document.getElementById("healthBar").style.width =
result.player.hp + "%";

document.getElementById("xpBar").style.width =
result.player.xp + "%";

document.getElementById("goldBar").style.width =
Math.min(result.player.gold, 100) + "%";
    
   document.getElementById("battleLog").innerHTML = `

<div class="battle-card">

<h2>⚔ Battle Result</h2>

<p>👹 <strong>Enemy</strong> <span>${result.enemy}</span></p>

<p>❤️ <strong>Damage Taken</strong> <span>${result.damageTaken}</span></p>

<p>⭐ <strong>XP Gained</strong> <span>+${result.xpGained}</span></p>

<p>💰 <strong>Gold Earned</strong> <span>+${result.goldGained}</span></p>

<p>🎒 <strong>Loot</strong> <span>${result.loot}</span></p>

<hr>

<h3 style="color:#3cff90;">🏆 Victory!</h3>

</div>
`;

showToast("⚔️ Victory! +" + result.xpGained + " XP");

}

async function shop(){

    const response = await fetch("/shop");

    const items = await response.json();

    let text="<b>Shop</b><br><br>";

    items.forEach(item=>{

        text+=`${item.name} - ${item.price} Gold<br>`;

    });

    document.getElementById("battleLog").innerHTML=text;

    showToast("🛒 Shop Opened");

}

async function saveGame(){

    const response = await fetch("/save",{
        method:"POST"
    });

    const result = await response.json();

    document.getElementById("battleLog").innerHTML =
    result.message;

    showToast("💾 Game Saved");

}

async function resetGame(){

    const response = await fetch("/reset",{
        method:"POST"
    });

    const result = await response.json();

    loadPlayer();

    document.getElementById("battleLog").innerHTML =
    result.message;

    showToast("🔄 Game Reset");

}

async function inventory(){

    const response = await fetch("/inventory");

    const items = await response.json();

    document.getElementById("battleLog").innerHTML =
    "<b>Inventory</b><br><br>" +
    items.join("<br>");

    showToast("🎒 Inventory Opened");

}

async function heal(){

    const response = await fetch("/heal",{
        method:"POST"
    });

    const result = await response.json();

    loadPlayer();

    document.getElementById("battleLog").innerHTML =
    result.message;

    showToast("❤️ Healed Successfully");

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

