var chars = ["─","░","▒","▒","█"]
var img;

document.getElementById("img").onchange = function(event) {
   var url = URL.createObjectURL(this.files[0]);
   img = new Image();
   img.src = url;
}

function calc(){
  let canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
  let string = "";
  let invert = document.getElementById("cb").checked;
  for(let i =0;i<img.height;i++){
    for(let j =0;j<img.width;j++){
      let pixel = canvas.getContext('2d').getImageData(j,i, 1, 1).data;
      let average = (pixel[0]+pixel[1]+pixel[2])/3;
      let color = Math.round((255-average)/63.75);
      if(invert){
        color=4-color;
      }
      if(pixel[3]===0){
        color=0;
      }
      string+=chars[color]+chars[color];
    }
    string+="\n";
  }
  document.getElementById("result").value = string;
}

function copy(){
  document.getElementById("result").select();
  document.execCommand('copy');
}
