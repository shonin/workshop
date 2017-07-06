class Toneflow {
    constructor() {

        // actually all the notes, don't need these in development
        // this.allNotes = ["E2","F2","Gb2","G2","Ab2","A2","Bb2","B2","C3","Db3","D3","Eb3","E3","F3","Gb3","G3","Ab3","A3","Bb3","B3","C4","Db3","D4","Eb4","E4","F4","Gb4","G4","Ab4","A4","Bb4","B4","C5"];

        // define all the notes we want. here's a small set for easier development
        this.allNotes = ["E2","F2","Gb2","G2"];

        // here are some html elements that we'll need later
        this.audioRoot = document.getElementById("audio-root");
        this.startButton = document.getElementById("start");
        this.bpmInput = document.getElementById("bpm");
        this.saturationInput = document.getElementById("saturation");
        this.noteInput = document.getElementById("note");

        // toneflow will only play if this is set to true
        this.shouldPlay = false;

        // declare a variable that will store the last note that was played
        this.lastNotePlayed = undefined;

        // this mumbojumbo allows us to call these methods from inside the constructor
        // why? no idea
        this.startStop = this.startStop.bind(this);
        this.setup = this.setup.bind(this);
        this.getBPM = this.getBPM.bind(this);
        this.play = this.play.bind(this);

        // this runs a few other functions that sets up the html
        this.setup();

        // listen for a click on the start button, if clicked run the startStop() fn
        this.startButton.addEventListener("click", this.startStop, false);

        // this starts a timer running at 30bpm as soon as the page loads
        // we store the process in this variable for later use
        this.runProcess = setInterval(this.play, this.getBPM());
    }

    play() {
        // stops the interval from running as soon as it runs
        clearInterval(this.runProcess);

        // check if the play button was pressed
        if (this.shouldPlay) {

            // gets a random number between 0 and the length of the allNotes array - 1
            let noteIndex = Math.floor(Math.random() * (this.allNotes.length));

            // gets a note by looking up the random index in the array
            // this is a ternary, or conditional statement. basically an inline if / else
            // it says:
            // if the note we're about to play is the last note we just played, the add a "-2" onto the end of the note
            // else: lets play that note
            let noteToPlay = this.lastNotePlayed === this.allNotes[noteIndex] ? this.allNotes[noteIndex] + "-2" : this.allNotes[noteIndex];

            // reset the time on the audio element to 0
            document.getElementById(noteToPlay).currentTime = 0;

            // magic
            document.getElementById(noteToPlay).play();

            // store the value of the note we just played for later use
            this.lastNotePlayed = noteToPlay;
        }

        // start the process again, with an updated value for the BPM
        this.runProcess = setInterval(this.play, this.getBPM());
    }

    // looks at the input of BPM and does math on it, returning in milliseconds
    getBPM() {
        return 60 / this.bpmInput.value * 1000;
    }

    // sets up the html
    setup() {
        this.setupNotesSelectBox();
        this.setupAudioElements();
    }

    // this takes the array of notes defined in the constructor and adds two audio elements to the DOM for each note
    // one with the note as the id, and with with the note + "-2" as the id
    // so "c3" and "c3-2"
    // since you're following a standard naming convention for your audio files we don't need to type them out by hand - automation!
    setupAudioElements() {
        this.allNotes.forEach( note => {
            this.audioRoot.innerHTML += `<audio controls id="${note}"><source src="http://www.gntsketches.com/tones/stGtLg/stGtLg_${note}.mp3" type="audio/ogg"></audio>`;
            this.audioRoot.innerHTML += `<audio controls id="${note}-2"><source src="http://www.gntsketches.com/tones/stGtLg/stGtLg_${note}.mp3" type="audio/ogg"></audio>`;
        });
    }

    // iterates through the notes and adds the options to the select box for "note"
    setupNotesSelectBox() {
        this.allNotes.forEach( note => {
            this.noteInput.innerHTML += `<option value="${note}">${note}</option>`;
        });
    }

    // this is the method run on the click event listener for the start button
    // updates should play on click
    startStop() {
        if (this.shouldPlay) {
            this.shouldPlay = false;
            this.startButton.innerHTML = "Start";
        } else {
            this.shouldPlay = true;
            this.startButton.innerHTML = "Stop";
        }
    }
}

// launches the code
new Toneflow();
