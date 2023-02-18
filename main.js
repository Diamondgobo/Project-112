prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/o4X8n9UuC/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded Successfully!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction Is "+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "point")
        {
            document.getElementById("update_emoji").innerHTML = "&#128070;";
        }
        if(results[0].label == "rock sign")
        {
            document.getElementById("update_emoji").innerHTML = "&#129304;";
        }
        if(results[0].label == "thumbs up")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }

        if(results[1].label == "point")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128070;";
        }
        if(results[1].label == "rock sign")
        {
            document.getElementById("update_emoji2").innerHTML = "&#129304;";
        }
        if(results[1].label == "thumbs up")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
        }
    }
}