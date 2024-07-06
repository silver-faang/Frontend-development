const input=document.getElementById('user-input');
const btn=document.getElementById('search-btn');
input.addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        btn.click();
    }
});
const getWeather=() =>{
    const userInputElement=document.getElementById('user-input');
    console.log(userInputElement.value)
    //console.log('hello')
    const errorMessageElement = document.getElementById('error-message');
    const weatherIconElement = document.getElementById('weather-icon');
    const city = userInputElement.value;
    const errorMessage = 'Something went wrong! Please try again!  ';

    const apikey='e816acbb0ba5c3701ff9826be8c8a9ef';
    
    //input validate
    if(!city) {
        errorMessageElement.textContent = errorMessage;
    }
    errorMessageElement.textContent = '';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
    .then((response) => {
        if(response.ok) {
            return response.json();
        } else {
            throw Error();
        }
    })
    .then((data) => {
        const iconCode = data.weather[0].icon;

        return fetch(`https://openweathermap.org/img/wn/${iconCode}@4x.png`);
    })
    .then((response) => {
        if(response.ok) {
            return response.url;
        } else {
            throw Error();
        }
    })
    .then((iconUrl) => {
        weatherIconElement.setAttribute('src', iconUrl)
        weatherIconElement.setAttribute('alt', 'Weather icon')
    })
    .catch((e) => {
        errorMessageElement.textContent = errorMessage;
        console.error(e);
    })
}