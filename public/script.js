async function loadPlayer(){

    const response = await fetch("/player");

    const player = await response.json();

    document.getElementById("hp").textContent = player.hp;
    document.getElementById("level").textContent = player.level;
    document.getElementById("gold").textContent = player.gold;
    document.getElementById("weapon").textContent = player.weapon;

}

loadPlayer();