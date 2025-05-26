let currentLang;
let currentTheme;
let body = document.querySelector("body");
if (localStorage.getItem('themeNow') == 'light'){
    body.classList.add("body_light_theme");
    currentTheme = 'light';
}else if(localStorage.getItem('themeNow') == 'dark'){
    body.classList.remove("body_light_theme");
    currentTheme = 'dark';
} else {
    currentTheme = 'dark';
};
if (localStorage.getItem('lang') == 'en'){
    currentLang = 'en';
}else if(localStorage.getItem('lang') == 'ru'){
    currentLang = 'ru';
} else {
    currentLang = 'ru';
};
// Time
function updateTime() {
    if (document.querySelector('#realTime') !== null) {
        const now = new Date();
        document.querySelector('#realTime').textContent = now.toLocaleTimeString();
        setInterval(updateTime, 1000);
    }
}
updateTime();

// Day

function getCurrentDate() {
    if (document.querySelector('#currentDate') !== null) {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const formattedDate = `${day}.${month}`; 
        document.querySelector("#currentDate").textContent = formattedDate;
    }
}

getCurrentDate();

// Year

function getCurrentYear() {
    if (document.querySelector('#currentYear') !== null) {
        const date = new Date();
        const year = date.getFullYear();
        const formattedYear = `${year} год`; 
        document.querySelector("#currentYear").textContent = formattedYear; 
    }
}

getCurrentYear()

// Weather

const apiKey = '6df209cc564d76a53007ee4b3bfa85ee';
const city = 'Ryazan';

async function getWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${currentLang}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        };

        const data = await response.json();

        if (data.weather && data.weather.length > 0) {
            const weatherDescription = data.weather[0].description;
            document.querySelector("#weatherStatus").textContent = weatherDescription.slice(0, 1).toUpperCase() + weatherDescription.slice(1);
        } else {
            document.querySelector("#weatherStatus").textContent = "Неизвестно";
        }
    } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error);
        document.querySelector("#weatherStatus").textContent = "Ошибка";
    }
}

function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}
if (document.querySelector('#currentYear') !== null) {
    getWeather();
}

// Temperature

async function getTemperature() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const temperature = data.main.temp.toFixed(1);
        document.querySelector("#weatherTemperature").textContent = `${temperature} °C`;
    } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error);
        document.querySelector("#weatherTemperature").textContent = "Ошибка при получении данных о погоде.";
    }
}
if (document.querySelector("#weatherTemperature") !== null) {
    getTemperature();
}




//6df209cc564d76a53007ee4b3bfa85ee

// Dark/Light Theme
function allAboutChangeTheme() {
    let btnTheme = document.querySelector("#changeTheme");

    btnTheme.addEventListener("click", changeTheme);

    function changeTheme() {
        body.classList.toggle("body_light_theme");
        if (body.classList.contains("body_light_theme")) {
            localStorage.setItem('themeNow', 'light');
        }else{
            localStorage.setItem('themeNow', 'dark');
        }
    }

     const translations_theme = {
            dark: {
                ThemeText: 'Темная тема',
                ThemeTextEng: 'Dark theme'
            },
            light: {
                ThemeText: 'Светлая тема',
                ThemeTextEng: 'Light theme'
            }
        };
        const themeElement = document.querySelector('#changeTheme');
        function changeThemeText() {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            if (themeElement) {
                const text = themeElement.textContent.trim();
                if (text === "Dark theme" || text === 'Light theme') {
                    document.querySelector('#changeTheme').innerText = translations_theme[currentTheme].ThemeTextEng;
                } else if (text === "Темная тема" || text === 'Светлая тема') {
                    document.querySelector('#changeTheme').innerText = translations_theme[currentTheme].ThemeText;
                }
            }
            setLanguage();
        }
        document.querySelector('#changeTheme').addEventListener('click', changeThemeText);

    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    changeThemeText();
    
};
if (document.querySelector('#changeTheme') != null) {
    allAboutChangeTheme()
};
// UTC
function getUserUTC() {
    const now = new Date();
    const offsetMinutes = now.getTimezoneOffset();
    const offsetHours = -offsetMinutes / 60;
    const offsetString = (offsetHours >= 0 ? "+" : "") + offsetHours.toFixed(2);
    const utcString = offsetString + ' UTC';
  
    document.querySelector("#UTC").textContent = `${utcString}`;
  }
if (document.querySelector("#UTC") !== null) {
    getUserUTC();
}
// Eng/Rus Language

// test

    function setLanguage() {
        if (localStorage.getItem("lang") != null) {
            currentLang = localStorage.getItem("lang");
        } else {
            currentLang = "ru";
        }
        const date = new Date();
        const year = date.getFullYear();
        const translations1 = [
        ['#greeting', 'Привет! Я Mikich.', 'Hello! Im Mikich.'],
        ['#description', 'Доброго времени суток, я начинающий русский фулстак (почти) программист Mikich. Мне пока что 15 лет, но я уже знаю некоторые языки и имею несколько проектов. Если есть работенка, то связывайтесь со мной по ссылкам ниже', 'Good day, I am a beginner Russian fullstack (almost) programmer Mikich. I am 15 years old, but I already know some languages ​​and have several projects. If you have any work, please contact me by links below'],
        ['#link_to_me', 'Связаться со мной:', 'Contact me:'],
        ['#achievenements', 'Личные достижения', 'My achievements:'],
        ['#guitarer', 'Гитарист', 'Guitarist'],
        ['#desc_of_guitarer', 'Я играю на гитаре уже полтора года', "I've been playing guitar for a year and a half now."],
        ['#technar', 'Технарь', 'Techie'],
        ['#desc_of_technar', 'Хорошо знаю физику и математику', 'I know physics and mathematics well'],
        ['#tennisist', 'Теннисист', 'Ping pong player'],
        ['#desc_of_tennisist', 'Играю в пинг понг 2 года', 'I have been playing ping pong for 2 years'],
        ['#my_languages', 'Языки, которые я знаю:', 'Programming languages'],
        ['#web_develop', 'Веб разработка', 'Web develop'],
        ['#izuchen', 'Изучен(а)', 'Active'],
        ['#izuchen1', 'Изучен(а)', 'Active'],
        ['#v_processe', 'В процессе', 'In progress'],
        ['#v_processe1', 'В процессе', 'In progress'],
        ['#v_processe2', 'В процессе', 'In progress'],
        ['#v_processe3', 'В процессе', 'In progress'],
        ['#my_projects', 'Мои проекты:', 'My projects:'],
        ['#changeTheme', currentTheme == 'dark' ? 'Темная тема' : 'Светлая тема', currentTheme == 'dark' ? 'Dark theme' : 'Light Theme'],
        ['#changeLang', 'RU', 'EN'],
        ['#copyright', 'Copyright © 2025 Mikich. Все права защищены. Скачивание, копирование и редактирование не допускается.', 'Copyright © 2025 Mikich. All rights reserved. No downloading, copying or editing allowed.'],
        ['#currentYear', `${year} год`, `${year} year`],
        ];
        let j;
        if (currentLang == "ru") {
            j = 1;
        } else {
            j = 2;
        }
        for (let i = 0; i < translations1.length; i++) {
            if (document.querySelector(translations1[i][0])) {
                document.querySelector(translations1[i][0]).innerHTML = translations1[i][j];
            }
        }
    }
function fnLanguage() {
    setLanguage();
    const btnLang = document.querySelector("#changeLang");
    btnLang.addEventListener("click", changeLanguage);
    function changeLanguage() {
        currentLang = currentLang == "ru" ? "en" : "ru";
        localStorage.setItem("lang", currentLang);
        setLanguage();
        getWeather();
    }
}
if (document.querySelector("#changeLang")) {
    fnLanguage();
}
