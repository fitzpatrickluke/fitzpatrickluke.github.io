const button = document.querySelector(".b1");
button.addEventListener("click", changeText);

function changeText() {
    // alert('test successful!');
    const h1 = document.querySelector("h1");
    h1.textContent = "Different text";
}


// const x = 'hello';
// console.log(x);

// const button = document.querySelector("button");
// button.addEventListener("click", runFunction);

// function runFunction() {
//     // console.log("test");
//     const name = prompt("Please eneter a name: ");
//     button.textContent =   `player 1: ${name}`;
// }