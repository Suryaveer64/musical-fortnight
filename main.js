function setup() 
{
    canvas = createCanvas(300,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300,300);
    video.hide();
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/oqz-iqbrc/model.json',modelLoaded);
}

function modelLoaded() {
    console.log('model Loaded');
}

function draw() 
{
    image(video,0,0,300,300);
    classifier.classify(video,gotResult);
}

function gotResult(error,results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        person = results[0].label;
        toSpeak = "";
        if(person == "Class 2"){
            document.getElementById("object_name").innerHTML =  "Me";
            document.getElementById("object_accuracy").innerHTML = results[0].confidence.toFixed(2)*100 + "%";
        }
        if (person == "Class 1") {
            document.getElementById("object_name").innerHTML =  "My Sister";
            document.getElementById("object_accuracy").innerHTML = results[0].confidence.toFixed(2)*100 + "%";
        }
        if (person == "Class 3") {
            document.getElementById("object_name").innerHTML =  "My Mother";
            document.getElementById("object_accuracy").innerHTML = results[0].confidence.toFixed(2)*100 + "%";
        }
        speak();
    }
}

function speak(){
    var synth = window.speechSynthesis;

    speak_data = toSpeak;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

}