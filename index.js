const inp1_doc = document.getElementById("inp1");
const srch_btn_doc = document.getElementById("srch_btn");

let city = "kolkata";


// change this is css later *****
document.getElementById("error").style.display="none";



srch_btn_doc.addEventListener("click",function(){

    if(inp1_doc.value==""){
alert("enter a value")
    }
    else{
        city = inp1_doc.value
        getWeather(city)
        inp1_doc.value="";

    }
})


const apiKey = "c1c47c38a946d9665464ffda0ffe5149";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

async function getWeather(cty){
    const response = await fetch(apiUrl+`${cty}`+`&appid=${apiKey}`);

    if(response.status==404){
        document.getElementById("error").style.display="block";
    }
    else{
        document.getElementById("error").style.display="none";
    }

    let data = await response.json();
    console.log(data);

    document.getElementById("temp").innerHTML=`${data.main.temp}&degC;`
    document.getElementById("dp").innerText=`${data.weather[0].main}`
    document.getElementById("wind_sp").innerText=`${data.wind.speed}`
    document.getElementById("hum").innerText=`${data.main.humidity}`
    document.getElementById("cld").innerText=`${data.clouds.all}`
    document.getElementById("visb").innerText=`${data.visibility}`

    document.getElementById("country").innerText=`Country:${data.sys.country}`
    document.getElementById("cty_name").innerText=`${data.name}`

    }

getWeather(city)