// Array of alphabet objects with images and words
const alphabetDictionary = [{
        letter: "Aa",
        image: 'assets/images/alphabets/apple.png',
        imageAlt: 'apple fruit',
        word: 'Apple'
    },
    {
        letter: "Bb",
        image: 'assets/images/alphabets/ball.png',
        imageAlt: 'football',
        word: 'Ball'
    },
    {
        letter: "Cc",
        image: 'assets/images/alphabets/cat.png',
        imageAlt: 'cat',
        word: 'Cat'
    },
    {
        letter: "Dd",
        image: 'assets/images/alphabets/dog.png',
        imageAlt: 'dog',
        word: 'Dog'
    },
    {
        letter: "Ee",
        image: 'assets/images/alphabets/elephant.png',
        imageAlt: 'elephant',
        word: 'Elephant'
    },
    {
        letter: "Ff",
        image: 'assets/images/alphabets/fish.png',
        imageAlt: 'fish',
        word: 'Fish'
    },
    {
        letter: "Gg",
        image: 'assets/images/alphabets/grape.png',
        imageAlt: 'grapes',
        word: 'Grapes'
    },
    {
        letter: "Hh",
        image: 'assets/images/alphabets/hat.png',
        imageAlt: 'hat',
        word: 'Hat'
    },
    {
        letter: "Ii",
        image: 'assets/images/alphabets/ice-cream.png',
        imageAlt: 'ice cream',
        word: 'Ice Cream'
    },
    {
        letter: "Jj",
        image: 'assets/images/alphabets/jug.png',
        imageAlt: 'glass jug',
        word: 'Jug'
    },
    {
        letter: "Kk",
        image: 'assets/images/alphabets/kite.png',
        imageAlt: 'kite',
        word: 'Kite'
    },
    {
        letter: "Ll",
        image: 'assets/images/alphabets/leaf.png',
        imageAlt: 'green leaf',
        word: 'Leaf'
    },
    {
        letter: "Mm",
        image: 'assets/images/alphabets/monkey.png',
        imageAlt: 'monkey',
        word: 'Monkey'
    },
    {
        letter: "Nn",
        image: 'assets/images/alphabets/nest.png',
        imageAlt: 'nest contains two eggs',
        word: 'Nest'
    },
    {
        letter: "Oo",
        image: 'assets/images/alphabets/onion.png',
        imageAlt: 'onion',
        word: 'Onion'
    },
    {
        letter: "Pp",
        image: 'assets/images/alphabets/pen.png',
        imageAlt: 'pen',
        word: 'Pen'
    },
    {
        letter: "Qq",
        image: 'assets/images/alphabets/queen.png',
        imageAlt: 'queen',
        word: 'Queen'
    },
    {
        letter: "Rr",
        image: 'assets/images/alphabets/rabbit.png',
        imageAlt: 'rabbit',
        word: 'Rabbit'
    },
    {
        letter: "Ss",
        image: 'assets/images/alphabets/sun.png',
        imageAlt: 'sun',
        word: 'Sun'
    },
    {
        letter: "Tt",
        image: 'assets/images/alphabets/tiger.png',
        imageAlt: 'tiger',
        word: 'Tiger'
    },
    {
        letter: "Uu",
        image: 'assets/images/alphabets/umbrella.png',
        imageAlt: 'umbrella',
        word: 'Umbrella'
    },
    {
        letter: "Vv",
        image: 'assets/images/alphabets/violin.png',
        imageAlt: 'violin',
        word: 'Violin'
    },
    {
        letter: "Ww",
        image: 'assets/images/alphabets/watermelon.png',
        imageAlt: 'watermelon',
        word: 'Watermelon'
    },
    {
        letter: "Xx",
        image: 'assets/images/alphabets/xylophone.png',
        imageAlt: 'xylophone',
        word: 'Xylophone'
    },
    {
        letter: "Yy",
        image: 'assets/images/alphabets/yolk.png',
        imageAlt: 'egg yolk',
        word: 'Yolk'
    },
    {
        letter: "Zz",
        image: 'assets/images/alphabets/zebra.png',
        imageAlt: 'zebra',
        word: 'Zebra'
    }
];

// Copy of alphabetDictionary for shuffling
let shuffledAlphabet = [...alphabetDictionary];
let shuffledVoices = [];

// Shuffle the alphabet on page load
shuffleAlphabet(shuffledAlphabet);

// Current index to keep track of the displayed alphabet object
let currentIndex = 0;

// Flag to track whether the card is showing the image side or not
let isShowingImage = false;

// Selecting necessary elements from the HTML
const card = document.querySelector('.card');
const cardFront = document.querySelector('.card-front');
const cardBack = document.querySelector('.card-back');
const letterElement = document.getElementById('letter');
const imageElement = document.getElementById('image');
const wordElement = document.getElementById('word');
const backButton = document.getElementById('backButton');
const nextButton = document.getElementById('nextButton');

// Speech synthesis related variables
const synth = window.speechSynthesis;
let voices = [];

// Function to get available speech synthesis voices
function getVoices() {
    voices = synth.getVoices();
    shuffledVoices = [...voices];
    shuffleVoices(shuffledVoices);
}

// Function to shuffle the array of voices
function shuffleVoices(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Get available voices and set the onvoiceschanged event
getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// Function to shuffle the sounds for each card
function shuffleSounds() {
    const tempVoices = [...voices];
    shuffledVoices = [];
    while (tempVoices.length > 0) {
        const index = Math.floor(Math.random() * tempVoices.length);
        shuffledVoices.push(tempVoices.splice(index, 1)[0]);
    }
}

// Function to get the British English voice, or the first available voice as fallback
function getBritishEnglishVoice() {
    const britishEnglishVoice = voices.find((voice) => voice.lang === 'en-GB');
    return britishEnglishVoice || voices[0];
}

// Function to speak the current word using speech synthesis
function speakWord() {
    const currentLetter = shuffledAlphabet[currentIndex];
    const wordToSpeak = currentLetter.word;

    const speakText = new SpeechSynthesisUtterance(wordToSpeak);
    speakText.voice = getBritishEnglishVoice();

    // Speak the word
    synth.speak(speakText);
}

// Function to flip the card
function flipCard() {
    if (!isShowingImage) {
        cardFront.style.transform = 'rotateY(180deg)';
        cardBack.style.transform = 'rotateY(0deg)';
        isShowingImage = true;
        speakWord();
        card.classList.add('flipped');
        nextButton.style.display = 'none';
        backButton.style.display = 'none';
    } else {
        cardFront.style.transform = 'rotateY(0deg)';
        cardBack.style.transform = 'rotateY(180deg)';
        isShowingImage = false;
        card.classList.remove('flipped');
        nextButton.style.display = 'block';
        backButton.style.display = 'block';
    }
}

// Function to display the current letter, image, and word
function displayCurrentLetter() {
    const currentLetter = shuffledAlphabet[currentIndex];
    letterElement.textContent = currentLetter.letter;
    imageElement.src = currentLetter.image;
    imageElement.alt = currentLetter.imageAlt;
    wordElement.textContent = currentLetter.word;
    shuffleSounds();
}

// Function to initialize the app and show the "Next" button initially
function initializeApp() {
    nextButton.style.display = 'block';
}

// Function to move to the next letter
function nextLetter() {
    currentIndex = (currentIndex + 1) % shuffledAlphabet.length;
    isShowingImage = false;
    displayCurrentLetter();
}

// Function to move to the previous letter
function previousLetter() {
    currentIndex = (currentIndex - 1 + shuffledAlphabet.length) % shuffledAlphabet.length;
    isShowingImage = false;
    displayCurrentLetter();
}

// Function to shuffle the alphabet array
function shuffleAlphabet(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Shuffle the alphabet and voices arrays on page load
shuffleAlphabet(shuffledAlphabet);
shuffleVoices(shuffledVoices);

// Initialize the app with the first letter
displayCurrentLetter();