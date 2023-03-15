console.log('Welcome to Spotify');

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let backward = document.getElementById("backward");
let forward = document.getElementById("forward");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let nowPlay = document.getElementById("nowPlay");
let el = document.getElementById(songIndex+1);
// console.log(el);


let songs= [
    {SongName: "Alone", filePath: "song/1.mp3", coverPath: "cover/cov1.jpeg", timeDuration: "02:43"},
    {SongName: "Brazil la la ala", filePath: "song/2.mp3", coverPath: "cover/cov2.jpeg", timeDuration: "05:29"},
    {SongName: "Memories", filePath: "song/3.mp3", coverPath: "cover/cov3.jpeg", timeDuration: "03:04"},
    {SongName: "The Nights", filePath: "song/4.mp3", coverPath: "cover/cov4.jpeg", timeDuration: "03:10"},
    {SongName: "Unstoppable", filePath: "song/5.mp3", coverPath: "cover/cov5.jpeg", timeDuration: "03:38"},
    {SongName: "FIFA World Cup Montage", filePath: "song/6.mp3", coverPath: "cover/cov6.jpg", timeDuration: "05:43"},
    {SongName: "Para para Pere Pere dj", filePath: "song/7.mp3", coverPath: "cover/cov7.jpeg", timeDuration: "03:00"},
    {SongName: "See You Again", filePath: "song/8.mp3", coverPath: "cover/cov8.jpeg", timeDuration: "03:57"},
    {SongName: "Shape of You Official", filePath: "song/9.mp3", coverPath: "cover/cov9.jpeg", timeDuration: "04:23"},
    {SongName: "Waiting For Love", filePath: "song/10.mp3", coverPath: "cover/cov10.jpeg", timeDuration: "03:50"}
] 

songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].SongName;
    element.getElementsByClassName("timeStamp")[0].innerText = songs[i].timeDuration;
});

 
// Handel play/pause click
masterPlay.addEventListener('click',()=>{
    if (audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        el.classList.remove('fa-circle-play');
        el.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        makeAllPlays();
    }

})

// Handel forward/backward click
forward.addEventListener('click',()=>{
    if(songIndex > 9){
        songIndex = 0;
    }
    else{
        songIndex += 1; 
    }
    audioElement.src = `song/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    nowPlay.innerText = songs[songIndex-1].SongName;
    gifAllPause();
    document.getElementById(`g${songIndex}`).style.opacity = 1;
    el = document.getElementById(songIndex);
})

backward.addEventListener('click',()=>{
    if(songIndex < 1){
        songIndex = 10;
    }
    else{
        songIndex -= 1; 
    }
    audioElement.src = `song/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    nowPlay.innerText = songs[songIndex-1].SongName;
    gifAllPause();
    document.getElementById(`g${songIndex}`).style.opacity = 1;
    el = document.getElementById(songIndex);
})

//  Listen to Events 
audioElement.addEventListener('timeupdate', ()=>{
    // Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*1000);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = ((audioElement.duration*myProgressBar.value)/1000);
})

const makeAllPlays= ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

const gifAllPause= ()=>{
    Array.from(document.getElementsByClassName("gif2")).forEach((element)=>{
        element.style.opacity = 0; 
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    
    element.addEventListener('click', (e)=>{
        songIndex = parseInt(e.target.id);
        el = document.getElementById(songIndex);
        if (audioElement.paused || audioElement.currentTime<=0) {
            // audioElement.currentTime = 0;
            audioElement.src = `song/${songIndex}.mp3`;
            makeAllPlays();
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
            el.classList.remove('fa-circle-play');
            el.classList.add('fa-circle-pause');
            // console.log("play");
        }
        else{
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
            makeAllPlays();
            // console.log("pause");
        }
        // console.log(e.target);
        // e.target.classList.remove('fa-circle-play'); 
        // e.target.classList.add('fa-circle-pause');
        // audioElement.play();
        // masterPlay.classList.remove('fa-circle-play');
        // masterPlay.classList.add('fa-circle-pause');
        // gif.style.opacity = 1;
        nowPlay.innerText = songs[songIndex-1].SongName;
        gifAllPause();
        document.getElementById(`g${songIndex}`).style.opacity = 1; 
    })
})