document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const retryBtn = document.getElementById("retryBtn");
  const startScreen = document.getElementById("startScreen");
  const result = document.getElementById("result");
  const flag = document.getElementById("flag");
  const countryName = document.getElementById("countryName");
  const description = document.getElementById("description");
  const chance = document.getElementById("chance");

  let countries = [];

  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      countries = data;
    });

  function pickCountry() {
    const total = countries.reduce((sum, c) => sum + c.probability, 0);
    let rand = Math.random() * total;
    for (let c of countries) {
      if (rand < c.probability) return c;
      rand -= c.probability;
    }
  }

  function showCountry() {
    const picked = pickCountry();
    flag.src = `flags/${picked.code}.jpg`;
    flag.alt = picked.name;
    countryName.textContent = picked.name;
    description.innerHTML = picked.description.replace(/\n/g, "<br>");
    chance.textContent = `이곳에 태어날 확률은 ${picked.probability.toFixed(1)}%`;
    result.classList.remove("hidden");
  }

  startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    setTimeout(showCountry, 1000);
  });

  retryBtn.addEventListener("click", showCountry);
});

