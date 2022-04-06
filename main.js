status_ = false;

object = [];

function setup() {

    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    objDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modeolLoaded() {

    console.log("Model Is Loaded");
    status_ = true;
}

function draw() {

    image(video, 0, 0, 380, 380);

    if (status_ != false) {

        objDetector.detect(video, gotResults);
        for (i = 0; i < gotResults.length; i++) {
            document.getElementById("status").innerHTML = "Baby & other Objects Detected";

            fill("red");

            percent = floor(object[i].confidence * 100);

            text(object[1].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            strokeWeight(2.2);
            stroke("blue");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if (object[i].label == person) {
                document.getElementById("status").innerHTML = "Baby Found"
            }

        }
    }

    function gotResults(error, results) {
        if (error) {
            console.log(error);
        }
        console.log(results);
        results = object;
    }