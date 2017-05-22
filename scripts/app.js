// This line will let the code work regardless of browser
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
  console.log("getUserMedia supported! Nice eh?");
  navigator.getUserMedia (
    {
      audio: true
    },
    // Success callback
    function(stream) {
      var mediaRecorder = new MediaRecorder(stream);

      record.onclick = function() {
        mediaRecorder.start();
        console.log(mediaRecorder.state); // logs 'recording' in the console
        console.log("Recorder started");
        // Might be css:
        record.style.background = 'red';
        record.style.color = 'black';
      }

      var chunks = [];

      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      }

      stop.onclick = function() {
        mediaRecorder.stop();
        console.log(mediaRecorder.state); // logs 'inactive' in the console
        console.log("Recorder stopped");
        record.style.background = '';
        record.style.color = '';
      }
    },
    // Error callback
    function(err) {
      console.log("The following getUserMedia error occured: " + err + ". That is not nice, eh?")
    }
  );
} else {
  console.log("getUserMedia not supported on your browser");
}
