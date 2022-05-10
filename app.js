// Query all the created items
const background = document.querySelector('.backImage');
const song = document.querySelector('.song');
const play = document.querySelector('.play');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.vid-container video');
const customTime = document.querySelector('#customTime');

// Query the Sound buttons
const rainButton = document.querySelector('.rain');
const beachButton = document.querySelector('.beach');
const focusButton = document.querySelector('.focus');
const customButton = document.querySelector('.customSound');

// Query the Time Display
const timeDisplay = document.querySelector('.time-display');
const two = document.querySelector('.two');
const five = document.querySelector('.five');
const ten = document.querySelector('.ten');
const custom = document.querySelector('.custom');

const startUp = () => {
    
    buttonDev();

    counterAnimation();

    songPlayer();
    
};

const buttonDev = () =>  {
    // Pick prefixed sounds
    rainButton.addEventListener('click', function() {
        song.src = this.getAttribute('data-sound');
        video.src = this.getAttribute('data-video');
        checkPlaying(song);
    });

    beachButton.addEventListener('click', function() {
        song.src = this.getAttribute('data-sound');
        video.src = this.getAttribute('data-video');
        checkPlaying(song);
    });

    focusButton.addEventListener('click', function() {
        song.src = this.getAttribute('data-sound');
        video.src = this.getAttribute('data-video');
        checkPlaying(song);
    });

    customButton.addEventListener('click', function (){
        background.src = './images/lion.jpg'
        var animals = [];
        var counter = 0;
        $.get('https://zoo-animal-api.herokuapp.com/animals/rand/10', function(data) {
            for (let i = 0; i < data.length; i++) {
                const current = data[i];
                animals.push(current.image_link)
                console.log(current.image_link)
            };
            video.src = '';
            setInterval(change, 5000)
            function change () {
                background.src = `${animals[counter]}`;
                counter++;
                if(counter >= animals.length) {
                    counter = 0;
                }
            }
        });
        song.src = this.getAttribute('data-sound');
        checkPlaying(song);
    });
}

const counterAnimation = () =>  {

    // Get the length of the outline
    const outlineLength = outline.getTotalLength();
            
    // Duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Animate the circle and time
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg'
            video.pause();
        }
    };

    // Select time
    two.addEventListener('click', function() {
        fakeDuration = this.getAttribute('data-time');
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
    });
    five.addEventListener('click', function() {
        fakeDuration = this.getAttribute('data-time');
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
    });
    ten.addEventListener('click', function() {
        fakeDuration = this.getAttribute('data-time');
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
    });
    custom.addEventListener('click', function() {
        customTime.style.display = 'block';
    });
    customTime.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            fakeDuration = customTime.value * 60;
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
            customTime.style.display = 'none';
        }
    })

}

const songPlayer = () => {
    
    // Play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

}

// Create function to stop and play the sounds
const checkPlaying = song => {
    if(song.paused) {
        song.play();
        video.play();
        play.src = './svg/pause.svg';
    } else {
        song.pause();
        video.pause();
        play.src = './svg/play.svg'
    }
};

startUp();