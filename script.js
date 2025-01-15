document.addEventListener('DOMContentLoaded', () => {
    const snowContainer = document.querySelector('.snow');
    const snowflakes = 100;

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = Math.random() * window.innerWidth + 'px';
        snowflake.style.animationDuration = Math.random() * 5 + 5 + 's';
        snowflake.style.opacity = Math.random();
        snowflake.style.width = Math.random() * 10 + 2 + 'px';
        snowflake.style.height = snowflake.style.width;
        snowflake.style.animationDelay = Math.random() * 10 + 's';

        snowContainer.appendChild(snowflake);
        
        // Optionally remove the snowflake after its animation ends
        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
            createSnowflake(); // Create a new snowflake when the old one finishes falling
        });
    }

    for (let i = 0; i < snowflakes; i++) {
        createSnowflake();
    }
});




const gamesDiv = document.querySelector('.games');
const buttons = gamesDiv.querySelectorAll('button');
let currentIndex = 0;

function changeBorderColor() {
    // Скидаємо бордери до чорного для кнопок всередині .games
    buttons.forEach(button => {
        if (!button.matches(':hover')) {
            button.style.borderColor = 'black';
            button.style.borderWidth = '7px';
        }
    });

    // Змінюємо бордер для поточної кнопки, якщо на неї не наведено
    const currentButton = buttons[currentIndex];
    if (!currentButton.matches(':hover')) {
        currentButton.style.borderColor = 'rgb(0, 102, 255)';
        currentButton.style.borderWidth = '7px';
    }

    // Переходимо до наступної кнопки
    currentIndex = (currentIndex + 1) % buttons.length;
}

// Запускаємо зміну кольору кожні 1.5 секунди
setInterval(changeBorderColor, 1500);


function animateTransition(targetUrl) {
  const overlay = document.getElementById('overlay');
  overlay.classList.add('active'); // Запуск затемнення на поточній сторінці
  
  setTimeout(() => {
    location.href = targetUrl; // Переходимо на нову сторінку
  }, 500); // Затримка для анімації затемнення
}

function animateBack() {
  const overlay = document.getElementById('overlay');
  overlay.classList.add('active'); // Запуск затемнення на поточній сторінці
  
  setTimeout(() => {
    window.history.back(); // Повернення на попередню сторінку
  }, 500); // Затримка для анімації затемнення
}

window.onload = function() {
  const overlay = document.getElementById('overlay');
  
  // Після завантаження нової сторінки додаємо клас для плавного освітлення
  setTimeout(() => {
    overlay.classList.remove('active');
    overlay.classList.add('fadeOut');
  }, 100); // Затримка перед додаванням класу для освітлення
  
  // Після завершення освітлення робимо фон прозорим
  setTimeout(() => {
    overlay.classList.remove('fadeOut');
  }, 1000); // Час для плавного освітлення
};




//Код гри номер 3 нижче




document.getElementById("btn3").addEventListener("click", function() {
  document.getElementById("Game3").style.display = "block";  // Відкриваємо модальне вікно
  setTimeout(function() {
      document.getElementById("Game3").classList.add("open");
  }, 10); // Додаємо клас "open" для анімації
});

document.getElementById("closemodul").addEventListener("click", function() {
  document.getElementById("Game3").classList.remove("open");  // Видаляємо клас "open"
  setTimeout(function() {
      document.getElementById("Game3").style.display = "none"; // Сховуємо модальне вікно
  }, 500); // Чекаємо, поки анімація завершиться
});







const startGameButton = document.getElementById("startGameButton");
const gameContainer = document.getElementById("Game3Box");
const ballPlayer = document.getElementById("ballplayer");
const ballGame = document.getElementById("ballgame");

let playerScore = 0; // Рахунок гравця
let gameScore = 0; // Поточний рахунок у грі
let gameInterval; // Інтервал для створення коробок

const boxTypes = [
    { points: 1, image: "./images/Box1.jpg" },
    { points: 2, image: "./images/Box2.jpg" },
    { points: 3, image: "./images/Box3.jpg" },
    { points: 4, image: "./images/Box4.jpg" },
    { points: 5, image: "./images/Box5.jpg" },
];

let isPaused = false;
let fallingBoxes = [];

// Оновлення рахунку
function updateScore(points) {
    gameScore += points;
    ballGame.textContent = `Отримані бали: ${gameScore}`;
}

// Створення коробки
function createFallingBox() {
    if (isPaused) return;

    const boxType = boxTypes[Math.floor(Math.random() * boxTypes.length)];
    const panel = document.getElementById('panel');
    const panelRect = panel.getBoundingClientRect();
    const panelWidth = panelRect.width;

    const box = document.createElement('div');
    box.className = 'falling-box';
    box.style.left = `${Math.random() * panelWidth}px`; // випадкове розташування по осі X
    box.style.backgroundImage = `url('${boxType.image}')`;

    box.addEventListener('click', () => {
        updateScore(boxType.points);
        box.remove();
    });

    panel.appendChild(box);
    fallingBoxes.push(box);

    // Анімація коробки
    box.style.animation = `fall 5s linear forwards`;

    // Перевірка, чи коробка торкнулась панелі
    const checkBoxPosition = () => {
        const boxRect = box.getBoundingClientRect();
        const panelRect = panel.getBoundingClientRect();

        // Перевірка, чи верх коробки досяг верхнього краю панелі
        if (boxRect.bottom >= panelRect.top) {
            updateScore(-1); // Віднімаємо бал
            box.remove(); // Видаляємо коробку
        }
    };

    // Викликаємо перевірку на кожну секунду
    const interval = setInterval(checkBoxPosition, 100); // Перевірка кожні 100 мс

    // Очищаємо інтервал після видалення коробки
    box.addEventListener('animationend', () => {
        clearInterval(interval); // Зупиняємо перевірку
    });
}

// Генерація коробок
function startGame() {
    gameInterval = setInterval(createFallingBox, 1000);
    startGameButton.style.display = 'none'; // Приховуємо кнопку старту
}

// Зупинка/продовження гри
function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        stopBoxes();
        showPauseMenu();
    } else {
        resumeBoxes();
        hidePauseMenu();
    }
}

function stopBoxes() {
    fallingBoxes.forEach(box => {
        box.style.animationPlayState = 'paused';
    });
}

function resumeBoxes() {
    fallingBoxes.forEach(box => {
        box.style.animationPlayState = 'running';
    });
}

function showPauseMenu() {
    const pauseMenu = document.createElement('div');
    pauseMenu.id = 'pause-menu';
    pauseMenu.innerHTML = `
        <p>Гра на паузі</p>
        <button id="resume-game">Продовжити гру</button>
        <button id="end-game">Завершити гру</button>
    `;
    document.body.appendChild(pauseMenu);

    document.getElementById('resume-game').addEventListener('click', togglePause);
    document.getElementById('end-game').addEventListener('click', endGame);
}

function hidePauseMenu() {
    const pauseMenu = document.getElementById('pause-menu');
    if (pauseMenu) pauseMenu.remove();
}

function endGame() {
    playerScore += gameScore; // Додаємо набрані бали до рахунку гравця
    ballPlayer.textContent = `Ваші бали: ${playerScore}`; // Оновлюємо відображення балів

    gameScore = 0; // Скидаємо рахунок гри
    ballGame.textContent = `Отримані бали: ${gameScore}`; // Оновлюємо відображення отриманих балів

    removeAllBoxes(); // Видаляємо всі коробки при завершенні гри

    hidePauseMenu(); // Приховуємо меню паузи
    stopGame(); // Зупиняємо гру

    startGameButton.style.display = 'block'; // Показуємо кнопку "Почати гру"
}

function removeAllBoxes() {
    fallingBoxes.forEach(box => box.remove());
    fallingBoxes = []; // Очищаємо масив коробок
}

function stopGame() {
    clearInterval(gameInterval); // Зупиняємо генерацію коробок
}

// Додати слухачів подій
startGameButton.addEventListener("click", startGame);
window.addEventListener("blur", endGame); // Зупинка гри при втраті фокусу
document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
        event.preventDefault();
        togglePause();
    }
});
