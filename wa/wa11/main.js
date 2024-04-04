const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageNames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Declaring the alternative text for each image file */
const altText = ['pink flowers', 'red flowers', 'purple flowers', 'purple flowers', 'pink flowers'];

/* Looping through images */

for(let i = 0; i < 5; i+=1) {
    const newImage = document.createElement('img');
    let imageName = 'images/'+imageNames[i];
    newImage.setAttribute('src', imageName);
    newImage.setAttribute('alt', altText[i]);
    thumbBar.appendChild(newImage);

    newImage.addEventListener('click', () => {
        displayedImage.src = imageName;
        displayedImage.alt = altText[i];
    });
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
    const buttonName = btn.getAttribute('class');
    console.log(buttonName)
    if(buttonName === 'Dark') {
        btn.setAttribute('class','Light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    }
    else if(buttonName === 'Light') {
        btn.setAttribute('class','Dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
    }


})
