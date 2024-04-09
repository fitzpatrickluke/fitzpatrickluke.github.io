const btn = document.querySelector("#js-new-quote");
btn.addEventListener('click', getQuote);

const answerBtn = document.querySelector("#js-tweet");
answerBtn.addEventListener('click', getAnswer);

let answer = '';

const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion'

getQuote();

async function getQuote() {
    // console.log("Test");
    try {
        answer = '';
        getAnswer();
        const response = await fetch(endpoint);
        if(!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json['question']);
        console.log(json['answer']);
        displayQuote(json['question']);
        answer = json['answer'];

    } catch (err) {
        console.log(err);
        alert('Failed to fetch new quote');
    }
}

function displayQuote(quote) {
    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = quote;
}

function getAnswer(){
    const quoteText = document.querySelector("#js-answer-text");
    quoteText.textContent = answer;
}
