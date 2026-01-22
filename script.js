
let playerName = "Player";
let money = 0;


let house = {
  level: 1,
  reward: 10,
  upgradeCost: 50
};


if (localStorage.getItem("money")) {
  money = Number(localStorage.getItem("money"));
  house.level = Number(localStorage.getItem("houseLevel"));
  house.reward = Number(localStorage.getItem("houseReward"));
  house.upgradeCost = Number(localStorage.getItem("houseCost"));
}

function updateUI() {
  document.getElementById("money").textContent = money;
  document.getElementById("houseLevel").textContent = house.level;
  document.getElementById("houseReward").textContent = house.reward;
  document.getElementById("upgradeHouseBtn").textContent =
    `Upgrade House ($${house.upgradeCost})`;
}


function saveGame() {
  localStorage.setItem("money", money);
  localStorage.setItem("houseLevel", house.level);
  localStorage.setItem("houseReward", house.reward);
  localStorage.setItem("houseCost", house.upgradeCost);
}


document.getElementById("earnMoneyBtn").addEventListener("click", () => {
  money += house.reward;
  updateUI();
  saveGame();
});


document.getElementById("upgradeHouseBtn").addEventListener("click", () => {
  if (money >= house.upgradeCost) {
    money -= house.upgradeCost;
    house.level += 1;
    house.reward += 5;
    house.upgradeCost += 25;

    updateUI();
    saveGame();
  } else {
    alert("Not enough money!");
  }
});


updateUI();
