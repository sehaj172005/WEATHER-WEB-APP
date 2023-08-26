//  RESPONSIVE NAVBAR

const mainMenu = document.querySelector('.mainMenu')
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');
const menu_items = document.querySelectorAll('nav .mainMenu li a');


openMenu.addEventListener('click', show);
closeMenu.addEventListener('click', close);

// close menu when you click on a menu item 
menu_items.forEach(item => {
    item.addEventListener('click', function () {
        close();
    })
})

function show() {
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}
function close() {
    mainMenu.style.top = '-100%';
}



// WEATHER PAGE 


// Select the day and date elements
const todayDayElement = document.getElementById("today_day");
const todayDateElement = document.getElementById("today_date");

// Function to update the day and date
function updateDayAndDate() {
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    todayDayElement.innerText = day;
    todayDateElement.innerText = `${date} ${month}`;
}

// Call the function to update day and date when the page loads
window.addEventListener("load", updateDayAndDate);

// Rest of your existing code for the weather app





const searchbtn = document.getElementById("searchbtn");
const InputcityName = document.getElementById("cityname");
const cityName = document.getElementById("city_name");
const weatherInfo = document.getElementById("temp_status");

const conditionIconMap = {
    "Clear": "fas fa-sun",  // Font Awesome sun icon
    "Rain": "fas fa-cloud-showers-alt",  // Font Awesome cloud with rain icon
    "Cloudy": "fas fa-cloud",  // Font Awesome cloud icon
    // Add more mappings for other conditions
};

const defaultConditionIcon = "fas fa-cloud"; // Font Awesome question mark icon

const getInfo = async(event) => {
    event.preventDefault();
    let InputcityVal = InputcityName.value;
    if (InputcityVal === "") {
        cityName.innerText = 'Please write the city name before you Search';
        weatherInfo.innerHTML = ""; // Clear weather info
    } else {
        let url = `http://api.weatherapi.com/v1/current.json?key=c72bee3c58c64b21b2390638232408&q=${InputcityVal}&aqi=no`;
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("City not found or API error");
            }

            const data = await response.json();
            const temperature = data.current.temp_c;
            const condition = data.current.condition.text;
            const country = data.location.country;

            cityName.innerText = `Weather in ${InputcityVal}, ${country}`;
            weatherInfo.innerText = `Temperature: ${temperature}°C, Condition: ${condition}`;

            // Display condition icon using Font Awesome
            const conditionIconClass = conditionIconMap[condition] || defaultConditionIcon;
            const iconElement = document.createElement("i");
            iconElement.className = conditionIconClass;
            weatherInfo.appendChild(iconElement);
        } catch (error) {
            cityName.innerText = "Error fetching weather data";
            weatherInfo.innerHTML = ""; // Clear weather info
        }
    }
};

searchbtn.addEventListener('click', getInfo);
