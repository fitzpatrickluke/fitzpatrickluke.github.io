const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

let storyText = "It was a hot 94 fahrenheit outside, so :insertx: wanted to go spend time outside. When they got to :inserty:, they knew just what they wanted to do, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

const insertX = ["Pikachu", "Paimon", "the goose"];

const insertY = ["the pool", "the ocean", "the water park"];

const insertZ = ["jumped into the water", "ran back home", "started sunbathing"];

randomize.addEventListener('click', result);

function result() {

    let newStory = storyText;
    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);

    newStory = newStory.replaceAll(":insertx:", xItem);
    newStory = newStory.replaceAll(":inserty:", yItem);
    newStory = newStory.replaceAll(":insertz:", zItem);

    if(customName.value !== '') {
        const name = customName.value;
        newStory = newStory.replace("Bob", name);
    }

    if(document.getElementById("uk").checked) {
        const weight = Math.round(300/14) + (" stone");
        const temperature =  Math.round((94-32)*5/9) + (" centigrade");

        newStory = newStory.replaceAll("300 pounds", weight);
        newStory = newStory.replaceAll("94 fahrenheit", temperature);
    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
}