const openRulesButton = document.getElementById('openRulesButton');
const rulesModal = document.getElementById('rulesModal');
const closeModalButton = document.getElementById('closeModalButton');

openRulesButton.addEventListener('click', () => {
    rulesModal.style.display = 'flex';
});

closeModalButton.addEventListener('click', () => {
    rulesModal.style.display = 'none';
});

// Close Rules Modal on Outside Click
const dialog = document.querySelector('.modal-content');

dialog.addEventListener("click", e => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        rulesModal.style.display = 'none';
    }
});
const redirectButton = document.getElementById("redirectButton");
redirectButton.addEventListener("click", () => {
    // Replace "options.html" with the actual filename or URL of your options page
    window.location.href = "options.html";
});