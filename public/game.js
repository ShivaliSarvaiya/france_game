// COOKIE HELPERS
function setCookie(name, value) {
  document.cookie = name + "=" + value + "; path=/";
}
function getCookie(name) {
  return document.cookie.split("; ").find(r => r.startsWith(name + "="))?.split("=")[1];
}

// PLAYER COOKIE
let player = getCookie("playerName");
if (!player) {
  player = prompt("Enter your name:");
  setCookie("playerName", player);
}
document.getElementById("welcome").textContent = "Welcome, " + player;

// URL PARAMETER
const params = new URLSearchParams(window.location.search);
const difficulty = params.get("difficulty") || "normal";
document.getElementById("difficulty").textContent = difficulty;

// CREATE BUILDING (POST)
function createBuilding(type) {
  fetch("/api/buildings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, level: 1 })
  })
  .then(res => res.json())
  .then(showBuilding);
}

// SHOW ON MAP + ANIMATION
function showBuilding(b) {
  const div = document.createElement("div");
  div.className = "building";
  div.textContent = b.type;
  div.onclick = () => upgradeBuilding(b.id, div);
  document.getElementById("map").appendChild(div);
}

// UPDATE (PUT)
function upgradeBuilding(id, el) {
  fetch("/api/buildings/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ level: 2 })
  })
  .then(res => res.json())
  .then(data => {
    el.classList.add("upgrade");
    setTimeout(() => el.classList.remove("upgrade"), 500);
  });
}
