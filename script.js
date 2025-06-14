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
  flag.onload = () => {
  setTimeout(() => {
    result.classList.remove("hidden");
    void result.offsetWidth;
    result.classList.add("visible");
  }, 100); // 애니메이션 시작까지 약간의 지연 시간
};

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

