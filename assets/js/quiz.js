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

 let correct = 0;
 let total = 0;
 const totalDraggableItems = 3;
 const totalMatchingPairs = 3; // Should be <= totalDraggableItems

 const scoreSection = document.querySelector(".score");
 const correctSpan = scoreSection.querySelector(".correct");
 const totalSpan = scoreSection.querySelector(".total");
 const playAgainBtn = scoreSection.querySelector("#play-again-btn");

 const draggableItems = document.querySelector(".draggable-items");
 const matchingPairs = document.querySelector(".matching-pairs");
 let draggableElements;
 let droppableElements;

 initiateGame();

 function initiateGame() {
     const randomDraggableObjects = generateRandomItemsArray(totalDraggableItems, alphabetDictionary);
     const randomDroppableWords = totalMatchingPairs < totalDraggableItems ? generateRandomItemsArray(totalMatchingPairs, randomDraggableObjects.map(obj => obj.word)) : randomDraggableObjects.map(obj => obj.word);
     const alphabetDictionarySubset = alphabetDictionary.filter(obj => randomDraggableObjects.includes(obj) || randomDroppableWords.includes(obj.word));

     // Shuffle the draggable and droppable arrays
     shuffleArray(randomDraggableObjects);
     shuffleArray(randomDroppableWords);

     // Create "draggable-items" and append to DOM
     for (let i = 0; i < randomDraggableObjects.length; i++) {
         const draggableElement = createDraggableElement(randomDraggableObjects[i]);
         draggableItems.appendChild(draggableElement);
     }

     // Create "matching-pairs" and append to DOM
     for (let i = 0; i < randomDroppableWords.length; i++) {
         const dropPointElement = createDropPointElement(randomDroppableWords[i]);
         matchingPairs.appendChild(dropPointElement);
     }

     draggableElements = document.querySelectorAll(".draggable-element");
     droppableElements = document.querySelectorAll(".drop-point");

     draggableElements.forEach(elem => {
         elem.addEventListener("dragstart", dragStart);
     });

     droppableElements.forEach(elem => {
         elem.addEventListener("dragenter", dragEnter);
         elem.addEventListener("dragover", dragOver);
         elem.addEventListener("dragleave", dragLeave);
         elem.addEventListener("drop", drop);
     });
 }

 // Drag and Drop Functions

 // Events fired on the drag target

 function dragStart(event) {
     event.dataTransfer.setData("text/plain", event.target.id);
 }

 // Events fired on the drop target

 function dragEnter(event) {
     if (event.target.classList && event.target.classList.contains("drop-point") && !event.target.classList.contains("dropped")) {
         event.target.classList.add("drop-point-hover");
     }
 }

 function dragOver(event) {
     if (event.target.classList && event.target.classList.contains("drop-point") && !event.target.classList.contains("dropped")) {
         event.preventDefault();
     }
 }

 function dragLeave(event) {
     if (event.target.classList && event.target.classList.contains("drop-point") && !event.target.classList.contains("dropped")) {
         event.target.classList.remove("drop-point-hover");
     }
 }

 function drop(event) {
     event.preventDefault();
     event.target.classList.remove("drop-point-hover");
     const draggableElementId = event.dataTransfer.getData("text/plain");
     const matchingWord = event.target.textContent;
     const draggableObject = alphabetDictionary.find(obj => obj.letter === draggableElementId);
     const isCorrectMatching = draggableObject.word === matchingWord;
     total++;
     if (isCorrectMatching) {
         event.target.classList.add("dropped");
         correct++;
     }
     scoreSection.style.opacity = 0;
     setTimeout(() => {
         correctSpan.textContent = correct;
         totalSpan.textContent = total;
         scoreSection.style.opacity = 1;
     }, 200);
     if (correct === Math.min(totalMatchingPairs, totalDraggableItems)) {
         // Game Over!!
         playAgainBtn.style.display = "block";
         setTimeout(() => {
             playAgainBtn.classList.add("play-again-btn-entrance");
         }, 200);
     }
 }

 // Other Event Listeners
 playAgainBtn.addEventListener("click", playAgainBtnClick);

 function playAgainBtnClick() {
     playAgainBtn.classList.remove("play-again-btn-entrance");
     correct = 0;
     total = 0;
     draggableItems.style.opacity = 0;
     matchingPairs.style.opacity = 0;
     setTimeout(() => {
         scoreSection.style.opacity = 0;
     }, 100);
     setTimeout(() => {
         playAgainBtn.style.display = "none";
         while (draggableItems.firstChild) draggableItems.removeChild(draggableItems.firstChild);
         while (matchingPairs.firstChild) matchingPairs.removeChild(matchingPairs.firstChild);
         initiateGame();
         correctSpan.textContent = correct;
         totalSpan.textContent = total;
         draggableItems.style.opacity = 1;
         matchingPairs.style.opacity = 1;
         scoreSection.style.opacity = 1;
     }, 500);
 }

 // Auxiliary functions
 function generateRandomItemsArray(n, originalArray) {
     let res = [];
     let clonedArray = [...originalArray];
     if (n > clonedArray.length) n = clonedArray.length;
     for (let i = 1; i <= n; i++) {
         const randomIndex = Math.floor(Math.random() * clonedArray.length);
         res.push(clonedArray[randomIndex]);
         clonedArray.splice(randomIndex, 1);
     }
     return res;
 }

 function shuffleArray(arr) {
     for (let i = arr.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [arr[i], arr[j]] = [arr[j], arr[i]];
     }
 }

 // Initialize the game on page load
 initiateGame();