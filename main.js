Status = true;
objects = [];

function preload(){
    song = loadSound("old_telephone.mp3");
}

function setup(){
    canvas = createCanvas(300,300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(300,300);
    
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("baby_status").innerHTML="Status:Detecting a Baby";
}

function modelLoaded(){
    console.log("Model is Loaded");
    Status = true;
}

function draw(){
    image(video,0,0,300,300);
    if(Status==true){
        objectDetector.detect(video,gotResult);
        if(Status ==true)
        {
            for(i=0; i < objects.length;i++){
                document.getElementById("status").innerHTML="Status : Object Detected";

                fill("#FF0000");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + "" +percent+"%",objects[i].x +15, objects[i].y + 15);
                noFill();
                stroke("FF0000");
                rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

                if(objects[i].label=="person"){
                    document.getElementById("baby_status").innerHTML="Baby Found";
                    song.stop();
                }
                else{
                    document.getElementById("baby_status").innerHTML="Baby Not Found";
                    song.play();
                }
                if(objects.length==0){
                    document.getElementById("baby_status").innerHTML="Baby Not Found";
                    song.play();
                }
            }
        }    
    }
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}