const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader')

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// show new quote
function newQuote() {
    showLoadingSpinner();
    // pick a random quote for apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is null and replace it with "Anonymous"
    if (!quote.a) {
        authorText.innerText = 'Anonymous';
    } else {
        authorText.innerText = quote.a;
    }

    // check the quote length to determine the styling
    if (quote.q.length > 150) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // set quote and hide loader
    quoteText.innerText = quote.q;
    removeLoadingSpinner();
}

// get quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const proxy = 'https://obscure-mountain-07258.herokuapp.com/';
    const apiUrl = 'https://zenquotes.io/api/quotes'
    const res = await fetch(proxy + apiUrl)
    apiQuotes = await res.json();
    newQuote();
}

// handle tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
}

// Generates a new quote when button is clicked
newQuoteBtn.addEventListener('click', newQuote);

// Opens twitter so the user can tweet the quote with the author name
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();