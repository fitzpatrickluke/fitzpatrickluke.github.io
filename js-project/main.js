
const volume_levels = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,100,100,-1,-1];
let volume_boxes = [];
let volume_id = "";
let currentVolume = 0;

let box_1_selected = false;
let box_2_selected = false;
let box_1_selection = -1;
let box_2_selection = -1;
let double_selected = 0;
let volume_tens = -2;
let volume_ones = -2;
let hundred_on = false;

let reset_button = document.querySelector("#resetButton");
reset_button.addEventListener('click', shuffleBoxes);


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

function shuffleBoxes(){
    box_1_selected = false;
    box_2_selected = false;
    box_1_selection = -1;
    box_2_selection = -1;
    currentVolume = 0;
    currentVolumeText.textContent = "Volume: 00";

    const shuffled_levels = volume_levels.sort((a, b) => 0.5 - Math.random());
    for(let y = 0; y < 4; y+=1) {
        for(let x = 0; x < 6; x+=1) {
            volume_id = "#volume_"+y+x;
            const volumeBox = new VolumeBox(x, y, shuffled_levels[6*y+x], volume_id);
            volume_boxes.push(volumeBox);
            curr_box = document.querySelector(volume_id);
            curr_box.addEventListener('click', getLast);
            curr_box.textContent = "";
        }
    }    
}

function getLast(){
    if(box_1_selection.volume_level != box_2_selection.volume_level
    && box_1_selected == true && box_2_selected == true)
    {
        volume_boxes[6*box_1_selection.y+box_1_selection.x].volume_on = false;
        volume_boxes[6*box_2_selection.y+box_2_selection.x].volume_on = false;
        const volume_id_1 = "#volume_"+box_1_selection.y+box_1_selection.x;
        const volume_id_2 = "#volume_"+box_2_selection.y+box_2_selection.x;
        curr_box_1 = document.querySelector(volume_id_1);
        curr_box_2 = document.querySelector(volume_id_2);
        curr_box_1.textContent = "";
        curr_box_2.textContent = "";
        box_1_selected = false;
        box_2_selected = false;
        box_1_selection = -1;
        box_2_selection = -1;
        console.log("resetiing"); 
    }
    const str = this.id;
    const len = str.length;
    const y = parseInt(str.substring(len-2,len-1));
    const x = parseInt(str.substring(len-1,len));
    const box = volume_boxes[6*y+x];
    if(box_1_selected == false && volume_boxes[6*y+x].volume_on == false) {
        volume_boxes[6*y+x].volume_on = true;
        console.log(box.x, box.y);
        this.textContent = box.volume_level;
        box_1_selected = true;
        box_1_selection = box;
    }
    else if(box_2_selected == false && box_1_selection != box && volume_boxes[6*y+x].volume_on == false) {
        volume_boxes[6*y+x].volume_on = true;
        console.log(box.x, box.y);
        this.textContent = box.volume_level;
        box_2_selected = true;
        box_2_selection = box;
        if(box_1_selection.volume_level == box_2_selection.volume_level)
        {
            if(volume_tens == -2 && box_1_selection.volume_level != 100) {
                volume_tens = box_2_selection.volume_level;
                updateMinusOne();
            }
            else if(box_1_selection.volume_level == 100) {
                volume_ones = box_2_selection.volume_level;
                double_selected = 0;
                currentVolumeText = document.querySelector("#currVolume");
                currentVolumeText.textContent = "Volume: 100";
                volume_tens = -2;
                volume_ones = -2;
                console.log("changeinG!!!");
            }
            else if(volume_tens != -2 && volume_ones == -2) {
                volume_ones = box_2_selection.volume_level;
                double_selected = 0;
                currentVolumeText = document.querySelector("#currVolume");
                currentVolumeText.textContent = "Volume: " + volume_tens + volume_ones;
                volume_tens = -2;
                volume_ones = -2;
                console.log("changeinG!!!");
            }
            box_1_selected = false;
            box_2_selected = false;
            box_1_selection = -1;
            box_2_selection = -1;
        }
    }
}

function updateMinusOne(){
    for(let y = 0; y < 4; y+=1) {
        for(let x = 0; x < 6; x+=1) {
            if(volume_boxes[6*y+x].volume_level == -1) {
                volume_id = "#volume_"+y+x;
                const volumeBox = new VolumeBox(x, y, volume_tens, volume_id);
                volume_boxes[6*y+x] = volumeBox;
                curr_box = document.querySelector(volume_id);
                curr_box.addEventListener('click', getLast);
                curr_box.textContent = "";
            }
        }
    }    
}

shuffleBoxes();




