const alphabetDictionary = [{
        letter: "A",
        image: 'assets/images/alphabets/apple.png',
        imageAlt: 'apple fruit',
        word: 'Apple'
    },
    {
        letter: "B",
        image: 'assets/images/alphabets/ball.png',
        imageAlt: 'football',
        word: 'Ball'
    },
    {
        letter: "C",
        image: 'assets/images/alphabets/cat.png',
        imageAlt: 'cat',
        word: 'Cat'
    },
    {
        letter: "D",
        image: 'assets/images/alphabets/dog.png',
        imageAlt: 'dog',
        word: 'Dog'
    },
    {
        letter: "E",
        image: 'assets/images/alphabets/elephant.png',
        imageAlt: 'elephant',
        word: 'Elephant'
    },
    {
        letter: "F",
        image: 'assets/images/alphabets/fish.png',
        imageAlt: 'fish',
        word: 'Fish'
    },
    {
        letter: "G",
        image: 'assets/images/alphabets/grape.png',
        imageAlt: 'grapes',
        word: 'Grapes'
    },
    {
        letter: "H",
        image: 'assets/images/alphabets/hat.png',
        imageAlt: 'hat',
        word: 'Hat'
    },
    {
        letter: "I",
        image: 'assets/images/alphabets/ice-cream.png',
        imageAlt: 'ice cream',
        word: 'Ice Cream'
    },
    {
        letter: "J",
        image: 'assets/images/alphabets/jug.png',
        imageAlt: 'glass jug',
        word: 'Jug'
    },
    {
        letter: "K",
        image: 'assets/images/alphabets/kite.png',
        imageAlt: 'kite',
        word: 'Kite'
    },
    {
        letter: "L",
        image: 'assets/images/alphabets/leaf.png',
        imageAlt: 'green leaf',
        word: 'Leaf'
    },
    {
        letter: "M",
        image: 'assets/images/alphabets/monkey.png',
        imageAlt: 'monkey',
        word: 'Monkey'
    },
    {
        letter: "N",
        image: 'assets/images/alphabets/nest.png',
        imageAlt: 'nest contains two eggs',
        word: 'Nest'
    },
    {
        letter: "O",
        image: 'assets/images/alphabets/onion.png',
        imageAlt: 'onion',
        word: 'Onion'
    },
    {
        letter: "P",
        image: 'assets/images/alphabets/pen.png',
        imageAlt: 'pen',
        word: 'Pen'
    },
    {
        letter: "Q",
        image: 'assets/images/alphabets/queen.png',
        imageAlt: 'queen',
        word: 'Queen'
    },
    {
        letter: "R",
        image: 'assets/images/alphabets/rabbit.png',
        imageAlt: 'rabbit',
        word: 'Rabbit'
    },
    {
        letter: "S",
        image: 'assets/images/alphabets/sun.png',
        imageAlt: 'sun',
        word: 'Sun'
    },
    {
        letter: "T",
        image: 'assets/images/alphabets/tiger.png',
        imageAlt: 'tiger',
        word: 'Tiger'
    },
    {
        letter: "U",
        image: 'assets/images/alphabets/umbrella.png',
        imageAlt: 'umbrella',
        word: 'Umbrella'
    },
    {
        letter: "V",
        image: 'assets/images/alphabets/violin.png',
        imageAlt: 'violin',
        word: 'Violin'
    },
    {
        letter: "W",
        image: 'assets/images/alphabets/watermelon.png',
        imageAlt: 'watermelon',
        word: 'Watermelon'
    },
    {
        letter: "X",
        image: 'assets/images/alphabets/xylophone.png',
        imageAlt: 'xylophone',
        word: 'Xylophone'
    },
    {
        letter: "Y",
        image: 'assets/images/alphabets/yolk.png',
        imageAlt: 'egg yolk',
        word: 'Yolk'
    },
    {
        letter: "Z",
        image: 'assets/images/alphabets/zebra.png',
        imageAlt: 'zebra',
        word: 'Zebra'
    }
];



//Initial References
let draggableObjects;
let dropPoints;
const dragContainer = document.querySelector(".draggable-objects");
const dropContainer = document.querySelector(".drop-points");
const playAgainButton = document.querySelector(".play-again-button");

let deviceType = "";
let initialX = 0,
    initialY = 0;
let currentElement = "";
let moveElement = false;

//Detect touch device
const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

let count = 0;

//Random value from Array
const randomValueGenerator = () => {
    return alphabetDictionary[Math.floor(Math.random() * alphabetDictionary.length)];
};

//Drag & Drop Functions
function dragStart(e) {
    if (isTouchDevice()) {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
        moveElement = true;
        currentElement = e.target;
    } else {
        e.dataTransfer.setData("text", e.target.id);
    }
}

function dragOver(e) {
    e.preventDefault();
}

const touchMove = (e) => {
    if (moveElement) {
        e.preventDefault();
        let newX = e.touches[0].clientX;
        let newY = e.touches[0].clientY;
        let currentSelectedElement = document.getElementById(e.target.id);
        currentSelectedElement.parentElement.style.top =
            currentSelectedElement.parentElement.offsetTop - (initialY - newY) + "px";
        currentSelectedElement.parentElement.style.left =
            currentSelectedElement.parentElement.offsetLeft - (initialX - newX) + "px";
        initialX = newX;
        initialY - newY;
    }
};

const drop = (e) => {
    e.preventDefault();
    if (isTouchDevice()) {
        moveElement = false;
        const currentDrop = document.querySelector(`div[data-id='${e.target.id}']`);
        const currentDropBound = currentDrop.getBoundingClientRect();
        if (
            initialX >= currentDropBound.left &&
            initialX <= currentDropBound.right &&
            initialY >= currentDropBound.top &&
            initialY <= currentDropBound.bottom
        ) {
            currentDrop.classList.add("dropped");
            currentElement.classList.add("hide");
            currentDrop.innerHTML = ``;
            currentDrop.insertAdjacentHTML(
                "afterbegin",
                `<img src="${currentElement.getAttribute("src")}" alt="${currentElement.getAttribute("alt")}">`
            );
            count += 1;
        }
    } else {
        const draggedElementData = e.dataTransfer.getData("text");
        const droppableElementData = e.target.getAttribute("data-id");
        if (draggedElementData === droppableElementData) {
            const draggedElement = document.getElementById(draggedElementData);
            e.target.classList.add("dropped");
            draggedElement.classList.add("hide");
            draggedElement.setAttribute("draggable", "false");
            e.target.innerHTML = ``;
            e.target.insertAdjacentHTML(
                "afterbegin",
                `<img src="${draggedElement.getAttribute("src")}" alt="${draggedElement.getAttribute("alt")}">`
            );
            count += 1;
        }
    }
    if (count === 3) {
        playAgainButton.classList.remove("hide");
        stopGame();
    }
};

// Creates alphabet images and word drop points
const creator = () => {
    dragContainer.innerHTML = "";
    dropContainer.innerHTML = "";
    let randomData = [];
    for (let i = 1; i <= 3; i++) {
        let randomWord = randomValueGenerator();
        if (!randomData.includes(randomWord)) {
            randomData.push(randomWord);
        } else {
            i -= 1;
        }
    }
    for (let i of randomData) {
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("draggable-image");
        imgDiv.setAttribute("draggable", true);
        imgDiv.innerHTML = `<img src="${i.image}" alt="${i.imageAlt}" id="${i.letter}">`;
        dragContainer.appendChild(imgDiv);
    }
    randomData = randomData.sort(() => 0.5 - Math.random());
    for (let i of randomData) {
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `<div class='words' data-id='${i.letter}'>
        ${i.word}
      </div>`;
        dropContainer.appendChild(wordDiv);
    }
    setupEventListeners(); // Call the function to set up event listeners for new elements
};

// const stopGame = () => {
//     // Your code to handle game completion, if needed
//     // ...
// };

const setupEventListeners = () => {
    // Set up event listeners for draggable objects and drop points
    dropPoints = document.querySelectorAll(".words");
    draggableObjects = document.querySelectorAll(".draggable-image");

    draggableObjects.forEach((element) => {
        element.addEventListener("dragstart", dragStart);
        element.addEventListener("touchstart", dragStart);
        element.addEventListener("touchend", drop);
        element.addEventListener("touchmove", touchMove);
    });

    dropPoints.forEach((element) => {
        element.addEventListener("dragover", dragOver);
        element.addEventListener("drop", drop);
    });
};

playAgainButton.addEventListener("click", () => {
    draggableObjects.forEach((element) => {
        element.classList.remove("hide");
        element.setAttribute("draggable", "true");
    });

    dropPoints.forEach((element) => {
        element.classList.remove("dropped");
        element.innerHTML = "";
    });

    count = 0;
    playAgainButton.classList.add("hide");
    creator();
});

window.onload = async () => {
    await creator();
    count = 0;
};