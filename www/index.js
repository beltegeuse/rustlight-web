import * as wasm from "rustlight-web";

const button = document.getElementById('render');
const canvas = document.getElementById('canvas');
const scene = document.getElementById('scene');

// Timing
var startTime, endTime;

// TODO: Non blocking call
var x = 0;
var y = 0;
var ctx = canvas.getContext('2d');
var rustlight_scene;
const BLOCK_SIZE = 256;
var running = false;

function run() {
   if(!running) {
        return;
   }

   // Render one block
   rustlight_scene.render_block(x, y, BLOCK_SIZE, BLOCK_SIZE);
   y = y + BLOCK_SIZE;
   if(y >= rustlight_scene.height) {
       y = 0;
       x = x + BLOCK_SIZE;
   }
   if(x >= rustlight_scene.width) {
       x = 0;

       // Compute time 
       endTime = new Date();
       var timeDiff = endTime - startTime; //in ms
       document.getElementById('timing-val').innerText = timeDiff + " ms";
       startTime = endTime;
   }

   rustlight_scene.get_img(ctx);
   window.requestAnimationFrame(run);
}

button.onclick = function() {
    if(running) {
        running = false;
        rustlight_scene = null; // Free memory?
        x = 0;
        y = 0;
        button.innerText = 'Render!';
    } else {
        rustlight_scene = new wasm.Scene(scene.value);
        canvas.width = rustlight_scene.width;
        canvas.height = rustlight_scene.height;
        running = true;
        button.innerText = 'Stop!';
        startTime = new Date();
        window.requestAnimationFrame(run);
    }
};

button.innerText = 'Render!';
button.disabled = false;
