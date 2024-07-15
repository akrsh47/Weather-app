const inp1_doc = document.getElementById("inp1");
const srch_btn_doc = document.getElementById("srch_btn");

const error_doc = document.getElementById("error");
const main_doc = document.getElementById("main")

const img1_doc = document.getElementById("img1");
const vsb_d_doc = document.getElementById("vsb_d")

const year_doc = document.getElementById("year");
const date = new Date();
let city;

year_doc.innerText=date.getFullYear()

if (localStorage.length != 0) {
  city = JSON.parse(localStorage.getItem("city_name"));
  document.querySelector(".sec2").style.display="none"
} else {
 main_doc.style.display = "none";

}

// *****change this is css later *****
error_doc.style.display = "none";

srch_btn_doc.addEventListener("click", function () {
  if (inp1_doc.value == "") {
    alert("enter a value");
  } else {

    main_doc.style.display="block"
    document.querySelector(".sec2").style.display="none"
    city = inp1_doc.value;
    localStorage.setItem("city_name", JSON.stringify(city));
    getWeather(city);
    
    inp1_doc.value = "";
    
  }
});

const apiKey = "c1c47c38a946d9665464ffda0ffe5149";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

async function getWeather(cty) {
  const response = await fetch(apiUrl + `${cty}` + `&appid=${apiKey}`);

  if (response.status == 404) {
    error_doc.style.display = "block";
    main_doc.style.display="none"
    localStorage.clear()
    //location.reload()

  } else {
    error_doc.style.display = "none";
    
    
  
  }

  let data = await response.json();
  //console.log(data);

  document.getElementById("temp").innerHTML = `${Math.round(data.main.temp)}&degC`;
  document.getElementById("dp").innerHTML = `${data.weather[0].main}`;
  //console.log(data.weather[0].main)
  document.getElementById("wind_sp").innerText = `${data.wind.speed} Km/h`;
  document.getElementById("hum").innerText = `${data.main.humidity} %`;
  document.getElementById("cld").innerText = `${data.clouds.all} %`;
  document.getElementById("visb").innerText = Math.round(`${data.visibility}`/1000);
  document.getElementById("visb").innerText+=" Km";

  document.getElementById("country").innerText = `Country:${data.sys.country}`;
  document.getElementById("cty_name").innerText = `${data.name}`;

  ChangeIcon(data);
  ChangeVisibilityDescrip(Math.round(data.visibility/1000))
  //console.log(Math.round(data.visibility/1000))
  
}

function ChangeIcon(x){
  //img1_doc.classList.remove("rotate")
  let degree = `0deg`;
  img1_doc.style.rotate=`${degree}`;

  
if(x.weather[0].main=="Clear"){
  img1_doc.innerHTML=`<i class="fa-sharp fa-solid fa-sun"></i>`;
  //img1_doc.classList.add("rotate")
  degree=`360deg`;
  

  img1_doc.style.rotate=`${degree}`;
  img1_doc.style.transitionDuration="2s";


}
if(x.weather[0].main=="Clouds"){
  img1_doc.innerHTML=`<i class="fa-sharp fa-solid fa-cloud"></i>`;
  
}
if(x.weather[0].main=="Rain"){
  img1_doc.innerHTML=`<i class="fa-sharp fa-solid fa-cloud-rain"></i>`
  degree=`15deg`;
  img1_doc.style.rotate=`${degree}`;
  img1_doc.style.transitionDuration="1s";

}
if(x.weather[0].main=="Haze"){
  img1_doc.innerHTML=`<i class="fa-sharp fa-solid fa-smog"></i>`
}
if(x.weather[0].main=="Drizzle"){
  img1_doc.innerHTML=`<i class="fa-sharp fa-solid fa-cloud-rain"></i>`


}

}

function ChangeVisibilityDescrip(x){
  if(x>=10){
    vsb_d_doc.innerHTML=`Excellent Visibility`
  }
  else if(x<10 && x>5){
    vsb_d_doc.innerHTML=`Good Visibility`

  }
  else if(x>2 && x<=5){
    vsb_d_doc.innerHTML=`Moderate Visibility`

  }
  else if(x<=2 && x>=1){
    vsb_d_doc.innerHTML=`Low Visibility`

  }
  else if(x<1){
    vsb_d_doc.innerHTML=`Very Low Visibility`

  }
}



getWeather(city)
