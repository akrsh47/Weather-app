const inp1_doc = document.getElementById("inp1");
const srch_btn_doc = document.getElementById("srch_btn");

const error_doc = document.getElementById("error");
const main_doc = document.getElementById("main");

const img1_doc = document.getElementById("img1");
const vsb_d_doc = document.getElementById("vsb_d");

const year_doc = document.getElementById("year");
const date = new Date();
let city;

year_doc.innerText = date.getFullYear();

if (localStorage.length != 0) {
  city = JSON.parse(localStorage.getItem("city_name"));
  document.querySelector(".sec2").style.display = "none";
} else {
  main_doc.style.display = "none";
}

error_doc.style.display = "none";

srch_btn_doc.addEventListener("click", function () {
  if (inp1_doc.value == "") {
    alert("enter a value");
  } else {
    main_doc.style.display = "block";
    document.querySelector(".sec2").style.display = "none";
    city = inp1_doc.value;
    localStorage.setItem("city_name", JSON.stringify(city));
    getWeather(city);

    inp1_doc.value = "";
  }
});

// ADD YOUR API KEY HERE
const apiKey = "APIKEYHERE";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

async function getWeather(cty) {
  const response = await fetch(apiUrl + `${cty}` + `&appid=${apiKey}`);

  if (response.status == 404) {
    error_doc.style.display = "block";
    main_doc.style.display = "none";
    localStorage.clear();
  } else {
    error_doc.style.display = "none";
  }

  let data = await response.json();

  document.getElementById("temp").innerHTML = `${Math.round(
    data.main.temp
  )}&degC`;
  document.getElementById("dp").innerHTML = `${data.weather[0].main}`;

  document.getElementById("wind_sp").innerText = Math.round(
    `${data.wind.speed}`
  );
  document.getElementById("wind_sp").innerText += " Km/h";
  document.getElementById("hum").innerText = `${data.main.humidity} %`;
  document.getElementById("cld").innerText = `${data.clouds.all} %`;
  document.getElementById("visb").innerText = Math.round(
    `${data.visibility}` / 1000
  );
  document.getElementById("visb").innerText += " Km";

  document.getElementById("country").innerText = `Country:${data.sys.country}`;
  document.getElementById("cty_name").innerText = `${data.name}`;

  ChangeIcon(data);
  ChangeVisibilityDescrip(Math.round(data.visibility / 1000));
}

function ChangeIcon(x) {
  let degree = `0deg`;
  img1_doc.style.rotate = `${degree}`;

  if (x.weather[0].main == "Clear") {
    img1_doc.innerHTML = `<i class="fa-sharp fa-solid fa-sun"></i>`;

    degree = `360deg`;

    img1_doc.style.rotate = `${degree}`;
    img1_doc.style.transitionDuration = "2s";
  }
  if (x.weather[0].main == "Clouds") {
    img1_doc.innerHTML = `<i class="fa-sharp fa-solid fa-cloud"></i>`;
  }
  if (x.weather[0].main == "Rain") {
    img1_doc.innerHTML = `<i class="fa-sharp fa-solid fa-cloud-rain"></i>`;
    degree = `15deg`;
    img1_doc.style.rotate = `${degree}`;
    img1_doc.style.transitionDuration = "1s";
  }
  if (x.weather[0].main == "Haze") {
    degree = `0deg`;
    img1_doc.style.rotate = `${degree}`;
    img1_doc.innerHTML = `<i class="fa-sharp fa-solid fa-smog"></i>`;
  }
  if (x.weather[0].main == "Drizzle") {
    img1_doc.innerHTML = `<i class="fa-sharp fa-solid fa-cloud-rain"></i>`;
  }

  if (x.weather[0].main == "Mist") {
    img1_doc.innerHTML = `<i class="fa-sharp fa-solid fa-wind"></i>`;
    degree = `0deg`;
    img1_doc.style.rotate = `${degree}`;
  }
}

function ChangeVisibilityDescrip(x) {
  if (x >= 10) {
    vsb_d_doc.innerHTML = `(Excellent Visibility)`;
  } else if (x < 10 && x > 5) {
    vsb_d_doc.innerHTML = `(Good Visibility)`;
  } else if (x > 2 && x <= 5) {
    vsb_d_doc.innerHTML = `(Moderate Visibility)`;
  } else if (x <= 2 && x >= 1) {
    vsb_d_doc.innerHTML = `(Low Visibility)`;
  } else if (x < 1) {
    vsb_d_doc.innerHTML = `(Very Low Visibility)`;
  }
}

getWeather(city);
