const cardContainer = document.querySelector('#flashcard-container');
// Task 1: flip word/ definition
/**
 * @param {MouseEvent} event 
 */
function flipCard(event) {
    //get clicked flash card
    const flashcard = event.currentTarget;
    console.log(flashcard);
    //get word - toggle show/hide
    const wordSide = flashcard.querySelector('.word');
    if (wordSide.classList.contains('hidden')){
        wordSide.classList.remove('hidden');
    } else {
        wordSide.classList.add('hidden');
    }
    
    //get definition - toggle show/hide
    const definitionSide = flashcard.querySelector('.definition');
    definitionSide.classList.toggle('hidden');
}

// const flashcard = cardContainer.querySelector('.flashcard-box');
// flashcard.addEventListener('click', flipCard);

//Task 2: Populate data
function createCard(word, definition) {
    const flashCard  = document.createElement('div');
    flashCard.classList.add('flashcard-box', 'hidden')

    //word side
    const wordSide  = document.createElement('div');
    wordSide.classList.add('flashcard', 'word');
    wordSide.textContent = word;

    flashCard.appendChild(wordSide);

    //definition side
    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard', 'definition', 'hidden');
    definitionSide.textContent = definition;

    flashCard.appendChild(definitionSide);

    return flashCard;
}

function populateCard(){
    const cards = [];

    for(const word in ENGLISH){
        const definition = ENGLISH[word];

        const card = createCard(word, definition);

        //hanlde event
        card.addEventListener('click', flipCard);

        cardContainer.appendChild(card);

        cards.push(card);
    }
    return cards;

}

const cards = populateCard();

//show first card
cards[0].classList.remove('hidden');
//Task 3: mouse event - navigation
const statusBar = document.querySelector('#status-bar');
const btnPrev = statusBar.querySelector('#prev')
const btnNext = statusBar.querySelector('#next')

const statusCurrentIndex = statusBar.querySelector('strong')
const statusNoWords = statusBar.querySelector('span')

//set max index
statusNoWords.textContent = cards.length;

//start: show first word
let currentIndex = 0;

function setIndex(index){
    //check if valid index
    if(index >= 0 && index <cards.length){
        // hide current card
        cards[currentIndex].classList.add('hidden');

        //show card at index
        cards[index].classList.remove('hidden');
        currentIndex = index;
        statusCurrentIndex.textContent = currentIndex + 1;

        //disable / enable navifating buttons
        btnPrev.disabled = currentIndex == 0;
        btnNext.disabled = currentIndex == cards.length - 1;
    }
}

function prevCard(){
    setIndex(currentIndex - 1);
}

function nextCard(){
    setIndex(currentIndex + 1);
}

btnPrev.addEventListener('click', prevCard);
btnNext.addEventListener('click', nextCard);
//Task 4: keybroad events - navigation
/**
 * 
 * @param {KeyboardEvent} event 
 */
function onKeyUp(event) {
    switch(event.key){
        case 'ArrowLeft':
            prevCard();
            break;
        case 'ArrowRight':
            nextCard();
            break;
    }
    console.log(event.key);
}

document.addEventListener('keydown', onKeyUp);