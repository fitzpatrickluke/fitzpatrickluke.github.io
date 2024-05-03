
const volume_levels = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,100,100,-1,-1];
let volume_boxes = [];
let volume_id = "";
let update_volume_id = "";
let currentVolume = 0;

let box_1_selected = false;
let box_2_selected = false;
let box_1_selection = -1;
let box_2_selection = -1;
let double_selected = 0;
let volume_tens = -2;
let volume_ones = -2;
let hundred_on = false;

const color_grey = "rgb(249, 251, 242)";
const color_red = "rgb(255, 94, 91)";
const color_green = "rgb(169, 255, 203)";
const mean_emoji = String.fromCodePoint(128520);
const shuffleWaitTime = 400;

let canClick = true;

let reset_button = document.querySelector("#resetButton");
reset_button.addEventListener('click', function () {
    if(canClick == false) return;
    canClick = false;
    flipAllBoxes();
    setTimeout(animateShuffle, shuffleWaitTime);
    setTimeout(shuffleBoxes, 2000+shuffleWaitTime, false);
});



let currentVolumeText = document.querySelector("#currVolume");
currentVolumeText.textContent = "Volume: 00";


class VolumeBox {
    constructor(x, y, volume_level, id) {
        this.x = x;
        this.y = y;
        this.volume_level = volume_level;
        this.volume_on = false;
        this.id = id;
        const box = document.querySelector(this.id);
        this.box = box;
    }
}

function addCardFlips() {
    for(let y = 0; y < 4; y+=1) {
        for(let x = 0; x < 6; x+=1) {
            volume_id = "#volume_"+y+x;
            curr_box_inner = document.querySelector(volume_id);
            curr_box_inner.addEventListener("click", function () {
                updateCards(this.id);
            })
        }
    }  
}

function shuffleBoxes(onLoad){
    canClick = true;
    box_1_selected = false;
    box_2_selected = false;
    box_1_selection = -1;
    box_2_selection = -1;
    currentVolume = 0;
    currentVolumeText.textContent = "Volume: 00";
    volume_boxes = [];

    const shuffled_levels = volume_levels.sort((a, b) => 0.5 - Math.random());
    for(let y = 0; y < 4; y+=1) {
        for(let x = 0; x < 6; x+=1) {
            volume_id = "#volume_"+y+x;
            // console.log(shuffled_levels[6*y+x])
            const volumeBox = new VolumeBox(x, y, shuffled_levels[6*y+x], volume_id);
            volume_boxes.push(volumeBox);
            curr_box = document.querySelector(volume_id);
            // if(curr_box.classList.contains("flip"))
            //     curr_box.classList.toggle("flip");
            curr_box_back = document.querySelector(volume_id + " .boxBack");
            curr_box_back.style.backgroundColor = "lightgrey";
            curr_box_back.textContent = shuffled_levels[6*y+x];
            if(shuffled_levels[6*y+x] == -1)
                curr_box_back.textContent = mean_emoji;
        }
    }  
    if(onLoad == false) {
        for(let y = 0; y < 4; y+=1) {
            for(let x = 0; x < 6; x+=1) {
                volume_id = "#volume_"+y+x;
                curr_box = document.querySelector(volume_id);
                curr_box.classList.toggle("shuffle");
            }
        } 
    }
}

function resetNonMatching() {
    canClick = true;
    volume_boxes[6*box_1_selection.y+box_1_selection.x].volume_on = false;
    volume_boxes[6*box_2_selection.y+box_2_selection.x].volume_on = false;
    const volume_id_1 = "#volume_"+box_1_selection.y+box_1_selection.x;
    const volume_id_2 = "#volume_"+box_2_selection.y+box_2_selection.x;
    curr_box_1 = document.querySelector(volume_id_1);
    curr_box_2 = document.querySelector(volume_id_2);
    curr_box_1.classList.toggle("flip");
    curr_box_2.classList.toggle("flip");
    const volume_back_id_1 = "#volume_"+box_1_selection.y+box_1_selection.x + " .boxBack";
    const volume_back_id_2 = "#volume_"+box_2_selection.y+box_2_selection.x + " .boxBack";
    curr_box_back_1 = document.querySelector(volume_back_id_1);
    curr_box_back_2 = document.querySelector(volume_back_id_2);
    setTimeout(function () {curr_box_back_1.style.backgroundColor = "lightgrey"}, 600);
    setTimeout(function () {curr_box_back_2.style.backgroundColor = "lightgrey"}, 600);
    box_1_selected = false;
    box_2_selected = false;
    box_1_selection = -1;
    box_2_selection = -1;
    console.log("resetiing"); 
}

function updateCards(vol_id){
    if(canClick == false) return;

    // get the seleced box
    const curr_box = document.querySelector("#"+vol_id)
    const len = vol_id.length;
    const y = parseInt(vol_id.substring(len-2,len-1));
    const x = parseInt(vol_id.substring(len-1,len));
    const box = volume_boxes[6*y+x];
    // console.log(box.volume_on)

    // no box selected yet of this turn's pair
    if(box_1_selected == false && volume_boxes[6*y+x].volume_on == false) {
        console.log("making the first selection")
        volume_boxes[6*y+x].volume_on = true;
        curr_box.classList.toggle("flip")
        // THIS IS THE LINE OF CODE IVE BEEN LOOKING FOR
        console.log(curr_box.classList.contains("flip"))
        console.log(box.x, box.y);
        box_1_selected = true;
        box_1_selection = box;
    }
    // first box selected but not second of this turn's pair
    // also check to make sure not selecting the same box as the first ones
    else if(box_2_selected == false && box_1_selection != box && volume_boxes[6*y+x].volume_on == false) {
        console.log("selected two boxes")
        curr_box.classList.toggle("flip");
        volume_boxes[6*y+x].volume_on = true;
        console.log(box.x, box.y);
        box_2_selected = true;
        box_2_selection = box;
        // had a match
        if(box_1_selection.volume_level == box_2_selection.volume_level)
        {
            // Matched single digit first pair
            if(volume_tens == -2 && box_1_selection.volume_level != 100
                && box_1_selection.volume_level != -1) {
                console.log("Selection 1: Matched single digit first pair")
                volume_tens = box_2_selection.volume_level;
                updateMinusOne();

                const volume_id_1 = "#volume_"+box_1_selection.y+box_1_selection.x + " .boxBack";
                const volume_id_2 = "#volume_"+box_2_selection.y+box_2_selection.x + " .boxBack";
                vol_box_1 = document.querySelector(volume_id_1);
                vol_box_2 = document.querySelector(volume_id_2);
                vol_box_1.style.backgroundColor = color_green;
                vol_box_2.style.backgroundColor = color_green;
            }
            // Matched 100
            else if(box_1_selection.volume_level == 100) {
                console.log("Selection 2: Matched 100")
                volume_ones = box_2_selection.volume_level;
                double_selected = 0;
                currentVolumeText = document.querySelector("#currVolume");
                currentVolumeText.textContent = "Volume: 100";
                volume_tens = -2;
                volume_ones = -2;
                console.log("changeinG!!!");

                const volume_id_1 = "#volume_"+box_1_selection.y+box_1_selection.x + " .boxBack";
                const volume_id_2 = "#volume_"+box_2_selection.y+box_2_selection.x + " .boxBack";
                vol_box_1 = document.querySelector(volume_id_1);
                vol_box_2 = document.querySelector(volume_id_2);
                vol_box_1.style.backgroundColor = color_green;
                vol_box_2.style.backgroundColor = color_green;
            }
            // Matched single digit second pair
            else if(volume_tens != -2 && volume_ones == -2) {
                console.log("Selection 3: Matched single digit second pair")
                volume_ones = box_2_selection.volume_level;
                double_selected = 0;
                currentVolumeText = document.querySelector("#currVolume");
                currentVolumeText.textContent = "Volume: " + volume_tens + volume_ones;
                volume_tens = -2;
                volume_ones = -2;
                console.log("changeinG!!!");

                const volume_id_1 = "#volume_"+box_1_selection.y+box_1_selection.x + " .boxBack";
                const volume_id_2 = "#volume_"+box_2_selection.y+box_2_selection.x + " .boxBack";
                vol_box_1 = document.querySelector(volume_id_1);
                vol_box_2 = document.querySelector(volume_id_2);
                vol_box_1.style.backgroundColor = color_green;
                vol_box_2.style.backgroundColor = color_green;
            }
            // Matched -1 evil reset
            else {
                console.log("Selection 4: Matchd -1 evil reset")
                const volume_id_1 = "#volume_"+box_1_selection.y+box_1_selection.x + " .boxBack";
                const volume_id_2 = "#volume_"+box_2_selection.y+box_2_selection.x + " .boxBack";
                vol_box_1 = document.querySelector(volume_id_1);
                vol_box_2 = document.querySelector(volume_id_2);
                vol_box_1.style.backgroundColor = color_red;
                vol_box_2.style.backgroundColor = color_red;

                canClick = false;
                setTimeout(flipAllBoxes, 1000);
                setTimeout(animateShuffle, shuffleWaitTime+1000);
                setTimeout(shuffleBoxes, 2000+shuffleWaitTime+1000, false);
            }
            box_1_selected = false;
            box_2_selected = false;
            box_1_selection = -1;
            box_2_selection = -1;
        }
        // had no match
        else {
            console.log("No match");
            const volume_id_1 = "#volume_"+box_1_selection.y+box_1_selection.x + " .boxBack";
            const volume_id_2 = "#volume_"+box_2_selection.y+box_2_selection.x + " .boxBack";
            vol_box_1 = document.querySelector(volume_id_1);
            vol_box_2 = document.querySelector(volume_id_2);
            vol_box_1.style.backgroundColor = color_red;
            vol_box_2.style.backgroundColor = color_red;

            // two non matching cards so reset the two
            canClick = false;
            setTimeout(resetNonMatching, 600)
        }
    }
}

function flipAllBoxes() {
    for(let y = 0; y < 4; y+=1) {
            for(let x = 0; x < 6; x+=1) {
                volume_id = "#volume_"+y+x;
                curr_box = document.querySelector(volume_id);
                if(curr_box.classList.contains("flip"))
                    curr_box.classList.toggle("flip");
            }
        }    
}

var id = null;
function animateShuffle() {
    console.log("ANIMATING SHUFFLE");
    for(let y = 0; y < 4; y+=1) {
        for(let x = 0; x < 6; x+=1) {
            volume_id = "#volume_"+y+x;
            curr_box = document.querySelector(volume_id);
            curr_box.classList.toggle("shuffle");
        }
    }    
}

// need a way for users to get double, ie 77, 55
function updateMinusOne(){
    for(let y = 0; y < 4; y+=1) {
        for(let x = 0; x < 6; x+=1) {
            if(volume_boxes[6*y+x].volume_level == -1) {
                volume_id = "#volume_"+y+x;
                const volumeBox = new VolumeBox(x, y, volume_tens, volume_id);
                volume_boxes[6*y+x] = volumeBox;
                curr_box_back = document.querySelector(volume_id + " .boxBack");
                curr_box_back.style.backgroundColor = "lightgrey";
                curr_box_back.textContent = volume_tens;
                
            }
        }
    }    
}


shuffleBoxes(true);
addCardFlips();





