document.addEventListener("DOMContentLoaded", () => {

  let playerName = localStorage.getItem("playerName") || prompt("Enter your name:");
  let theme = localStorage.getItem("theme") || "France";
  localStorage.setItem("playerName", playerName);
  localStorage.setItem("theme", theme);

  document.getElementById("playerName").textContent = playerName;
  document.getElementById("themeName").textContent = theme;

  let money = Number(localStorage.getItem("money")) || 50;
  let towerBuilt = localStorage.getItem("towerBuilt") === "true";

  let buildings = {
    house: { built: localStorage.getItem("houseBuilt") === "true", reward: 10, cost: 20, icon: "🏠", x: 120, y: 260 },
    cafe: { built: localStorage.getItem("cafeBuilt") === "true", reward: 20, cost: 40, icon: "🍵", x: 300, y: 230 },
    bridge: { built: localStorage.getItem("bridgeBuilt") === "true", reward: 30, cost: 80, icon: "🌉", x: 500, y: 260 }
  };

  const moneySpan = document.getElementById("money");
  const map = document.getElementById("map");
  const towerBtn = document.getElementById("buildTowerBtn");

  function updateUI() {
    moneySpan.textContent = money;
    checkUnlocks();
  }

  function saveGame() {
    localStorage.setItem("money", money);
    localStorage.setItem("towerBuilt", towerBuilt);
    for (let key in buildings) {
      localStorage.setItem(key + "Built", buildings[key].built);
    }
  }

  function renderTown() {
    map.innerHTML = "";

    for (let key in buildings) {
      let b = buildings[key];
      if (b.built) {
        const el = document.createElement("div");
        el.className = "building";
        el.style.left = b.x + "px";
        el.style.top = b.y + "px";
        el.textContent = b.icon;
        el.title = `${key} (+$${b.reward})`;
        map.appendChild(el);
      }
    }

    if (towerBuilt) {
      const tower = document.createElement("div");
      tower.className = "building";
      tower.style.left = "650px";
      tower.style.top = "120px";
      tower.textContent = "🗼";
      map.appendChild(tower);
    }
  }

  function buildBuilding(name) {
    let b = buildings[name];
    if (!b.built && money >= b.cost) {
      money -= b.cost;
      b.built = true;
      updateUI();
      renderTown();
      saveGame();
    }
  }

  function checkUnlocks() {
    if (buildings.house.built && buildings.cafe.built && buildings.bridge.built && !towerBuilt) {
      towerBtn.style.display = "inline-block";
    }
  }

  document.getElementById("earnMoneyBtn").addEventListener("click", () => {
    let total = 0;
    for (let key in buildings) {
      if (buildings[key].built) total += buildings[key].reward;
    }
    if (total === 0) return alert("Build something first!");
    money += total;
    updateUI();
    saveGame();
  });

  document.getElementById("buildHouseBtn").onclick = () => buildBuilding("house");
  document.getElementById("buildCafeBtn").onclick = () => buildBuilding("cafe");
  document.getElementById("buildBridgeBtn").onclick = () => buildBuilding("bridge");

  towerBtn.addEventListener("click", () => {
    if (money >= 500 && !towerBuilt) {
      money -= 500;
      towerBuilt = true;
      alert("🎉 You built the Eiffel Tower! Your French town is complete!");
      renderTown();
      updateUI();
      saveGame();
    }
  });

  updateUI();
  renderTown();
});
