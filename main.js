score_leftwrist=0;
score_rightwrist=0;

leftwristX=0;
rightwristX=0;
rightwristY=0;
leftwristY=0;

song1="";
song2="";

function preload(){
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function gotPoses(results){
if (results.length>0) {
console.log(results); 
leftwristX=results[0].pose.leftWrist.x;
rightwristX=results[0].pose.rightWrist.x;
leftwristY=results[0].pose.leftWrist.y;
rightwristY=results[0].pose.rightWrist.y;
score_leftwrist=results[0].pose.keypoints[9].score;
score_rightwrist=results[0].pose.keypoints[10].score;
}
}

function draw(){
image(video,0,0,600,500);
song1_status=song1.isPlaying();
song2_status=song2.isPlaying();
fill("blue");
stroke("blue");
if(score_leftwrist>0.2){
circle(leftwristX,leftwristY,20);
song1.stop();
if(song2_status==false){
song2.play();
document.getElementById("song").innerHTML="play peter pan song";
}
}
}

function modelLoaded(){
    console.log("Model is loaded");
    }
   

function play(){
song.play();
}