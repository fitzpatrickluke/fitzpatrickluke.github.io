const btn = document.querySelector("#button_1");
btn.addEventListener('click', getFact);

const endpoint = 'https://catfact.ninja/fact';
const endpoint_2 = 'https://randomfox.ca/floof';

getFact();

async function getFact() {
    try {
        const response = await fetch(endpoint);
        if(!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json['fact']);
        setFact(json['fact']);

    } catch (err) {
        console.log(err);
        alert('Failed to fetch');
    }

    getImage();
}

async function getImage() {
    try {
        const response = await fetch(endpoint_2);
        if(!response.ok) {
            throw Error(response.statusText);
        }
        const src = await response.json();
        console.log(src['image']);
        setImage(src['image']);

    } catch (err) {
        console.log(err);
        alert('Failed to fetch');
    }

}

function setFact(fact) {
    const quoteText = document.querySelector("#cat_fact");
    quoteText.textContent = fact;
}

function setImage(src) {
    const img = document.querySelector("#cat_img");
    img.src = src;
}

