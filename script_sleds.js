let gamerName = '';
let prevSettings = {};

// Все окна игры
const gameWindow = document.querySelector('.game-back'),
    allPages = gameWindow.children;

// Старт игры, ввод имени
const loginPage = document.querySelector('.login'),
    nameInput = loginPage.querySelector('.name-input'),
    btnLogin = loginPage.querySelector('.btn-name-start');

// Рестарт
const restartBtn = document.querySelector('.restart');
nameInput.value = '';

restartBtn.addEventListener('click', () => {
    hideAll();
    showElem(loginPage);
    nameInput.value = '';
    btnLogin.disabled = true;
});

// Проверяем минимальную длину имени
// Меняется disable кнопки для отправки данных
nameInput.addEventListener('input', () => {
    const value = nameInput.value;

    if (value.length > 1) {
        btnLogin.disabled = false;
    } else {
        btnLogin.disabled = true;
    }
});

// Клик на старт игры при логине
btnLogin.addEventListener('click', (event) => {
    event.preventDefault();

    gamerName = nameInput.value;

    // Получаем предыдущие настройки фона для игрока
    prevSettings = localStorage.getItem(`${gamerName.toLowerCase()}Settings`);

    goToSettings(prevSettings);
});

// Скрыть все экраны игры
function hideAll() {
    for (i = 0; i < allPages.length; i++) {
        allPages[i].classList.add('hidden');
    };
}

// Показать конкретный экран игры
function showElem(elem) {
    elem.classList.remove('hidden');
}

// Выбрать цвет
function chooseBackColor(color) {
    const pinkBlock = document.querySelector('.pink-block'),
        whiteBlock = document.querySelector('.white-block'),
        blueBlock = document.querySelector('.blue-block');

    if (color === 'blue') {
        pinkBlock.classList.remove('active-color');
        whiteBlock.classList.remove('active-color');
        blueBlock.classList.add('active-color');

        gameWindow.classList = `game-back blue-back`;
        localStorage.setItem(`${gamerName.toLowerCase()}Settings`, 'blue');
    }

    if (color === 'white') {
        pinkBlock.classList.remove('active-color');
        whiteBlock.classList.add('active-color');
        blueBlock.classList.remove('active-color');

        gameWindow.classList = `game-back white-back`;
        localStorage.setItem(`${gamerName.toLowerCase()}Settings`, 'white');
    }

    if (color === 'pink') {
        pinkBlock.classList.add('active-color');
        whiteBlock.classList.remove('active-color');
        blueBlock.classList.remove('active-color');

        gameWindow.classList = `game-back pink-back`;
        localStorage.setItem(`${gamerName.toLowerCase()}Settings`, 'pink');
    }
}

const colorSettingsBlock = document.querySelector('.color-back'),
    colorSelector = colorSettingsBlock.querySelector('.color-selector');

// Окно выбора цвета бэкграунда
function goToSettings(settings) {
    hideAll();

    showElem(colorSettingsBlock);

    if (settings === 'pink') {
        chooseBackColor('pink');
    } else if (settings === 'blue') {
        chooseBackColor('blue')
    } else {
        chooseBackColor('white');
    }
}

// Выбираем цвет фона
colorSelector.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('color-block')) {
        if (target.classList.contains('pink-block')) {
            chooseBackColor('pink');
        } else if (target.classList.contains('blue-block')) {
            chooseBackColor('blue');
        } else {
            chooseBackColor('white');
        }
    }
});

// Переходим на уровни
colorSelector.addEventListener('dblclick', (event) => {
    const target = event.target;

    if (target.classList.contains('color-block')) {
        goToChooseLevel();
    }
});

// При выполнении уровня в localstorage записывается результат с баллами с именем "Имя-lvl1"

function unblockLevels() {
    const score1 = +localStorage.getItem(`${gamerName}-lvl1`),
        score2 = +localStorage.getItem(`${gamerName}-lvl2`),
        score3 = +localStorage.getItem(`${gamerName}-lvl3`);

    const block2 = document.querySelector('.choose-2'),
        block3 = document.querySelector('.choose-3');

    if (score1 > 0) {
        block2.classList.remove('closed');
    }

    if (score2 > 0) {
        block3.classList.remove('closed');
    }
}

const chooseLevelBlock = gameWindow.querySelector('.choose-level');
// Показываем окно выбора уровня
function goToChooseLevel() {
    hideAll();
    showElem(chooseLevelBlock);

    unblockLevels();
}

// Переходим на уровень
const lvlBlocks = document.querySelector('.choose-level .lvls');

lvlBlocks.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('choose-block') && !target.classList.contains('closed')) {
        if (target.classList.contains('choose-1')) {
            goToLvl1();
        }

        if (target.classList.contains('choose-2')) {
            goToLvl2();
        }

        if (target.classList.contains('choose-3')) {
            goToLvl3();
        }
    }
});

// Начинаем уровни с описания
const rules1 =  gameWindow.querySelector('.level1-rules'),
    rules2 =  gameWindow.querySelector('.level2-rules'),
    rules3 =  gameWindow.querySelector('.level3-rules');

function goToLvl1() {
    hideAll();
    showElem(rules1);
}

function goToLvl2() {
    hideAll();
    showElem(rules2);
}

function goToLvl3() {
    hideAll();
    showElem(rules3);
}

// Кликаем по кнопкам поехали, начинаем уровень
const lvl1Window = gameWindow.querySelector('.level1'),
    lvl2Window = gameWindow.querySelector('.level2'),
    lvl3Window = gameWindow.querySelector('.level3');

const goLvl1Btn = gameWindow.querySelector('.start-btn1'),
    goLvl2Btn = gameWindow.querySelector('.start-btn2'),
    goLvl3Btn = gameWindow.querySelector('.start-btn3');

goLvl1Btn.addEventListener('click', () => {
    hideAll();
    showElem(lvl1Window);
    level1Start();
});

goLvl2Btn.addEventListener('click', () => {
    hideAll();
    showElem(lvl2Window);
    level2Start();
});

goLvl3Btn.addEventListener('click', () => {
    hideAll();
    showElem(lvl3Window);
    level3Start();
});

// Таймер
function timerRender(seconds, container) {
    const timer = container.querySelector('.timer');

    let sec = seconds % 60;
    sec = sec > 9 ? `${sec}` : `0${sec}`;

    let min = Math.floor(seconds / 60);
    min = min > 9 ? `${min}` : `0${min}`;

    timer.textContent = `${min}:${sec}`;
}

const looseWindow = gameWindow.querySelector('.loose-result'),
    looseBtnBack = looseWindow.querySelector('.toLvls');

// При дохождении до 0 на задании игра не сбрасывается, пользователь просто получает 0 баллов
function decrementTimer(container) {
    globalTimer--;
    timerRender(globalTimer, container);

    // таймер в 0 - игра заканчивается!
    if (globalTimer === 0) {
        clearInterval(timeInterval);

        hideAll();
        showElem(looseWindow);
    }
}

looseBtnBack.addEventListener('click', (event) => {
    event.preventDefault();

    hideAll();
    showElem(chooseLevelBlock);
});

let globalTimer;
let timeInterval;

// Исходные объекты
const animals = [
    {
        id: 1,
        name: 'Кошка',
        mainImg: 'url(img_sleds/Кошка.jpg)',
        squizedImg: 'url(img_sleds/Кошка_сжатое.jpg)',
        manyImg: 'url(img_sleds/Кошка_много.jpg)',
        grassImg: 'url(img_sleds/Кошка_трава.jpg)'
    },
    {
        id: 2,
        name: 'Лошадь',
        mainImg: 'url(img_sleds/Лошадь.jpg)',
        squizedImg: 'url(img_sleds/Лошадь_сжатое.jpg)',
        manyImg: 'url(img_sleds/Лошадь_много.jpg)',
        grassImg: 'url(img_sleds/Лошадь_трава.jpg)'
    },
    {
        id: 3,
        name: 'Цыпленок',
        mainImg: 'url(img_sleds/Цыпленок.jpg)',
        squizedImg: 'url(img_sleds/Цыпленок_сжатое.jpg)',
        manyImg: 'url(img_sleds/Цыпленок_много.jpg)',
        grassImg: 'url(img_sleds/Цыпленок_трава.jpg)'
    },
    {
        id: 4,
        name: 'Гусь',
        mainImg: 'url(img_sleds/Гусь.jpg)',
        squizedImg: 'url(img_sleds/Гусь_сжатое.jpg)',
        manyImg: 'url(img_sleds/Гусь_много.jpg)',
        grassImg: 'url(img_sleds/Гусь_трава.jpg)'
    },
    {
        id: 5,
        name: 'Медведь',
        mainImg: 'url(img_sleds/Медведь.jpg)',
        squizedImg: 'url(img_sleds/Медведь_сжатое.jpg)',
        manyImg: 'url(img_sleds/Медведь_много.jpg)',
        grassImg: 'url(img_sleds/Медведь_трава.jpg)'
    },
    {
        id: 6,
        name: 'Волк',
        mainImg: 'url(img_sleds/Волк.jpg)',
        squizedImg: 'url(img_sleds/Волк_сжатое.jpg)',
        manyImg: 'url(img_sleds/Волк_много.jpg)',
        grassImg: 'url(img_sleds/Волк_трава.jpg)'
    },
    {
        id: 7,
        name: 'Лягушка',
        mainImg: 'url(img_sleds/Лягушка.jpg)',
        squizedImg: 'url(img_sleds/Лягушка_сжатое.jpg)',
        manyImg: 'url(img_sleds/Лягушка_много.jpg)',
        grassImg: 'url(img_sleds/Лягушка_трава.jpg)'
    },
    {
        id: 8,
        name: 'Слон',
        mainImg: 'url(img_sleds/Слон.jpg)',
        squizedImg: 'url(img_sleds/Слон_сжатое.jpg)',
        manyImg: 'url(img_sleds/Слон_много.jpg)',
        grassImg: 'url(img_sleds/Слон_трава.jpg)'
    }
];

function renderQuestionImg(src, container, lvl = 0, id = 0) {
    const imgBLock = container.querySelector('.question-pic');

    imgBLock.style.backgroundImage = src;

    if (lvl === 3) {
        imgBLock.setAttribute('data-n', `${id}`);
    }
}

// Отрисовка вариантов ответов
function renderAnswers(answers, level, container) {
    const answersContainer = container.querySelector('.answers');

    answersContainer.innerHTML = '';

    answers.forEach(answer => {
        answersContainer.innerHTML += `
            <div class="answer-pic" data-n="${answer.id}"
                style="background-image: ${level == 1 ? answer.squizedImg : answer.grassImg}">
                <span class="delta hidden">${level == 1 ? '-5' : '-10'}</span>
            </div>
        `;
    });
}

const rezPage = gameWindow.querySelector('.level-result'),
    toLvlBtn = rezPage.querySelector('.rez-lvl-btn');

toLvlBtn.addEventListener('click', (e) => {
    e.preventDefault();

    goToChooseLevel();
});

// Показываем результаты уровня
function goToLevelResult(totalScore, level) {
    hideAll();
    showElem(rezPage);

    // Получаем предыдущий результат
    const prevScore = localStorage.getItem(`${gamerName}-lvl${level}`);

    const scoreCont = rezPage.querySelector('.rezult-score'),
        comment = rezPage.querySelector('.rez-phrase');

    scoreCont.textContent = totalScore;

    if (prevScore === null) {
        localStorage.setItem(`${gamerName}-lvl${level}`, totalScore);
    } else if (prevScore > totalScore) {
        comment.textContent = "К сожалению, предыдущий рекорд побить не удалось!";
    } else if (prevScore < totalScore) {
        comment.textContent = "Ты побил свой предыдущий рекорд!";
        localStorage.setItem(`${gamerName}-lvl${level}`, totalScore);
    }
}

function showOneQuestion(questOrder, i, lvl, container) {
    // Старт таймера
    globalTimer = lvl == 1 ? 10 : 15;
    timerRender(globalTimer, container);
    timeInterval = setInterval(decrementTimer, 1000, container);

    if (i < questOrder.length) {
        const animal = questOrder[i];
        renderQuestionImg(animal.mainImg, container);

        // Рисуем варианты ответов
        const answersCards = [...questOrder.slice(questOrder.length - 2 + i),
            ...questOrder.slice(i < 2 ? 0 : i - 2, i + 3),
            ...questOrder.slice(i + 3 > questOrder.length ? 0 : questOrder.length, i + 3 - questOrder.length)]
        .sort(() => Math.random() - 0.5);

        renderAnswers(answersCards, lvl, container);
    } else {
        clearInterval(timeInterval);
        goToLevelResult(score, lvl);
    }
}

function scoreRender(score, container) {
    const scoreCont = container.querySelector('.score');

    scoreCont.textContent = score;
}

let score;
// Логика игры 1 уровня
let currAnimal;
let questionOrder;

function level1Start() {
    const container = gameWindow.querySelector('.level1');

    score = 0;
    scoreRender(score, container);

    // Перемешиваем порядок вопросов
    questionOrder = animals.slice().sort(() => Math.random() - 0.5);

    currAnimal = 0;
    showOneQuestion(questionOrder, currAnimal, 1, container);

    // Проверка правильного ответа
    const answersContainer = container.querySelector('.answers');

    answersContainer.addEventListener('click', (event) => {
        const target = event.target;
        const correctWord = container.querySelector('.correct');

        // Ткнули верно
        if (target.classList.contains('answer-pic')) {
            // Проверяем индексы картинок
            const index = +target.dataset.n;

            if (index === questionOrder[currAnimal].id) {
                // Удаляем отсчёт времени
                clearInterval(timeInterval);

                // Сообщили, что правильное действие сделано
                correctWord.classList.remove('hidden');
                setTimeout(() => {
                    const correctWord = container.querySelector('.correct');
                    correctWord.classList.add('hidden')
                }, 2000);

                // Добавляем баллы
                score += globalTimer;
                scoreRender(score, container);

                // Показали следующий след
                currAnimal += 1;
                showOneQuestion(questionOrder, currAnimal, 1, container)
            } else {
                const currDelta = target.querySelector('.delta');
                currDelta.classList.remove('hidden');
                currDelta.style.top = '120px';
                currDelta.style.color = 'rgba(255, 0, 0, 0.8)';

                score = score < 5 ? 0 : score - 5;
                scoreRender(score, container);
            }
        }
    });
}



// Логика игры 2 уровня
function level2Start() {
    const container = gameWindow.querySelector('.level2');

    score = 0;
    scoreRender(score, container);
    // Перемешиваем порядок вопросов
    questionOrder = animals.slice().sort(() => Math.random() - 0.5);

    currAnimal = 0;
    showOneQuestion(questionOrder, currAnimal, 2, container);

    // Проверка правильного ответа
    const answersContainer = container.querySelector('.answers');

    answersContainer.addEventListener('click', (event) => {
        const target = event.target;
        const correctWord = container.querySelector('.correct');

        // Ткнули верно
        if (target.classList.contains('answer-pic')) {
            // Проверяем индексы картинок
            const index = +target.dataset.n;

            if (index === questionOrder[currAnimal].id) {
                // Удаляем отсчёт времени
                clearInterval(timeInterval);

                // Сообщили, что правильное действие сделано
                correctWord.classList.remove('hidden');
                setTimeout(() => {
                    const correctWord = container.querySelector('.correct');
                    correctWord.classList.add('hidden')
                }, 2000);

                // Добавляем баллы
                score += globalTimer;
                scoreRender(score, container);

                // Показали следующий след
                currAnimal += 1;
                showOneQuestion(questionOrder, currAnimal, 2, container)
            } else {
                const currDelta = target.querySelector('.delta');
                currDelta.classList.remove('hidden');
                currDelta.style.top = '120px';
                currDelta.style.color = 'rgba(255, 0, 0, 0.8)';

                score = score < 10 ? 0 : score - 10;
                scoreRender(score, container);
            }
        }
    });
}


// Задаем вопрос на 3 уровне
function showDragQuestion(questOrder, i, container) {
    const question = container.querySelector('.question-pic');

    if (i < questOrder.length) {
        const animal = questOrder[i];
        renderQuestionImg(animal.manyImg, container, 3, animal.id);

        help.textContent = `Это же ${animal.name.toLowerCase()}!`;
    } else {
        clearInterval(timeInterval);

        question.removeEventListener('contextmenu', showHelp);
        goToLevelResult(score, 3);
    }
}

// Логика игры 3 уровня
function level3Start() {
    const container = gameWindow.querySelector('.level3'),
        question = container.querySelector('.question-pic');

    question.addEventListener('contextmenu', showHelp);

    score = 0;
    scoreRender(score, container);
    // Перемешиваем порядок вопросов
    questionOrder = animals.slice().sort(() => Math.random() - 0.5);

    currAnimal = 0;
    showDragQuestion(questionOrder, currAnimal, container);

    // Старт таймера - общий для всех заданий
    globalTimer = 65;
    timerRender(globalTimer, container);
    timeInterval = setInterval(decrementTimer, 1000, container);
}

const help = lvl3Window.querySelector('.help');

function showHelp(event) {
    event.preventDefault();

    help.classList.remove('hidden');

    setTimeout(() => {
        help.classList.add('hidden');
    }, 1000);
}

// Настройка блоков для перетаскиваний
const homeContainer = gameWindow.querySelector('.right-block'),
    wildContainer = gameWindow.querySelector('.left-block'),
    questionPic = gameWindow.querySelector('.level3 .question-pic');

// Анимации при наведении элемента
wildContainer.addEventListener('dragenter', (event) => {
    if (event.target.classList.contains('block')) {
        event.target.style.boxShadow = "0px 0px 10px #2F496E";
    }
});

homeContainer.addEventListener('dragenter', (event) => {
    if (event.target.classList.contains('block')) {
        event.target.style.boxShadow = "0px 0px 10px #2F496E";
    }
});

wildContainer.addEventListener('dragleave', (event) => {
    if (event.target.classList.contains('block')) {
        event.target.style.boxShadow = "";
    }
});
homeContainer.addEventListener('dragleave', (event) => {
    if (event.target.classList.contains('block')) {
        event.target.style.boxShadow = "";
    }
});

function allowDrop(e) {
    e.preventDefault();
}

wildContainer.ondragover = allowDrop;
homeContainer.ondragover = allowDrop;

questionPic.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('id', questionPic.dataset.n);
});

// Проверка правильного ответа
// Домашние животные - 1, 2, 3, 4
// Дикие животные - 5, 6, 7, 8
homeContainer.addEventListener('drop', (event) => {
    event.target.style.boxShadow = "";

    console.log(currAnimal);
    const itemId = event.dataTransfer.getData('id');
    console.log(itemId);

    const correctWord = lvl3Window.querySelector('.correct');

    // Ткнули верно
    if (itemId <= 4) {
        // Сообщили, что правильное действие сделано
        correctWord.classList.remove('hidden');
        setTimeout(() => {
            const correctWord = lvl3Window.querySelector('.correct');
            correctWord.classList.add('hidden');
        }, 2000);

        // Добавляем баллы
        score += 20;
        scoreRender(score, lvl3Window);

        // Показали следующий след
        currAnimal += 1;
        showDragQuestion(questionOrder, currAnimal, lvl3Window);
        } else {
            const currDelta = lvl3Window.querySelector('.delta');
            currDelta.classList.remove('hidden');
            setTimeout(() => {
                const delta = lvl3Window.querySelector('.delta');
                delta.classList.add('hidden');
            }, 2000);

            score = score < 10 ? 0 : score - 10;
            scoreRender(score, lvl3Window);
        }
});

wildContainer.addEventListener('drop', (event) => {
    event.target.style.boxShadow = "";

    console.log(currAnimal);
    const itemId = event.dataTransfer.getData('id');
    console.log(itemId);

    const correctWord = lvl3Window.querySelector('.correct');

    // Ткнули верно
    if (itemId > 4) {
        // Сообщили, что правильное действие сделано
        correctWord.classList.remove('hidden');
        setTimeout(() => {
            const correctWord = lvl3Window.querySelector('.correct');
            correctWord.classList.add('hidden');
        }, 2000);

        // Добавляем баллы
        score += 20;
        scoreRender(score, lvl3Window);

        // Показали следующий след
        currAnimal += 1;
        showDragQuestion(questionOrder, currAnimal, lvl3Window);
        } else {
            const currDelta = lvl3Window.querySelector('.delta');
            currDelta.classList.remove('hidden');
            setTimeout(() => {
                const delta = lvl3Window.querySelector('.delta');
                delta.classList.add('hidden');
            }, 2000);

            score = score < 10 ? 0 : score - 10;
            scoreRender(score, lvl3Window);
        }
});