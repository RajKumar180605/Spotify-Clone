console.log("js is starting");
let currentsong = new Audio();
let songs;
let currfolder;
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


// async function getsongs(folder) {
//     currfolder = folder;
//     // console.log(currfolder);
//     let a = await fetch(`http://127.0.0.1:3000/assets/songsfolder/${currfolder}`);
//     let response = await a.text();
//     // console.log(response);
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a");
//     // console.log(as);
//     songs = [];
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             // console.log(element.href);
//             // console.log(`/${currfolder}`);
//             if(!(currfolder.endsWith("/"))){
//                 currfolder = currfolder+"/";
//                 // console.log(`/${currfolder}`);
//             }
//             // console.log(element.href.split(`/${currfolder}`)[1]);
//             songs.push(element.href.split(`/${currfolder}`)[1]);
//         }

//     }
//     // console.log(songs);
//     // return songs;

//     //show all the songs in the playlist
//     let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
//     songUl.innerHTML = "";
//     for (const song of songs) {
//         songUl.innerHTML = songUl.innerHTML + `<li>
//                         <img class="invert" src="assets/img/music.svg" alt="">
//                         <div class="songsName">${song.replaceAll("%20", " ")}</div>
//                         <div class="playNow">
//                             Play Now
//                             <img class="invert" src="assets/img/play.svg" alt="">
//                         </div>
//                       </li>`;
//     }
//     //attached each song
//     Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
//         // e = ;
//         // console.log(e);
//         e.addEventListener("click", () => {
//             playMusic(e.querySelector(".songsName").innerHTML)
//         })
//     });
//     return songs;

// }
function getsongs(folder, songList) {
    currfolder = folder; // Keep track of the current album's folder
    songs = songList;    // The list of songs is now passed directly to the function

    // This part updates the UI, it stays the same
    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songUl.innerHTML = "";
    for (const song of songs) {
        songUl.innerHTML += `<li>
            <img class="invert" src="assets/img/music.svg" alt="">
            <div class="songsName">${song.replaceAll("%20", " ")}</div>
            <div class="playNow">Play Now</div>
        </li>`;
    }

    // Attach listeners to the new list of songs
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            playMusic(e.querySelector(".songsName").innerHTML.trim());
        });
    });
}
let playMusic = (track, pause = false) => {
    console.log(track);
    currentsong.src = `assets/songsfolder/${currfolder}/` + track;
    // console.log(audio);
    if (!pause) {
        currentsong.play();
        play.src = "assets/img/pause.svg";
    }
    document.querySelector(".songsinfo").innerHTML = decodeURI(track);
    // document.querySelector(".songsinfo").innerHTML.style.color = "white";
    document.querySelector(".songtimer").innerHTML = "00:00/00:00";
}
// async function displayAlbums() {
//     let a = await fetch(`http://127.0.0.1:3000/assets/songsfolder/`);
//     let response = await a.text();
//     // console.log(response);
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let anchors = div.getElementsByTagName("a");
//     console.log(anchors);
//     let array = Array.from(anchors)
//     for (let index = 0; index < array.length; index++) {
//         const e = array[index];
//         if (e.href.includes(`/songsfolder/`)) {
//             let folder = e.href.split(`/songsfolder/`)[1];
//             // if(folder.startsWith(".")) continue;
//             if(folder.startsWith(".")) continue;
//             console.log(folder);
//             //get the meta data
//             let a = await fetch(`http://127.0.0.1:3000/assets/songsfolder/${folder}/info.json`);
//             let response = await a.json();
//             console.log(response);
//             cardContainer = document.querySelector(".cardContainer");
//             console.log(folder);
//             cardContainer.innerHTML = cardContainer.innerHTML + `<div class="card" data-folder="${folder}">
//                         <button class="play" aria-label="Play">
//                             <svg data-encore-id="icon" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"
//                                 viewBox="0 0 24 24">
//                                 <path
//                                     d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606">
//                                 </path>
//                             </svg>
//                         </button>
//                         <img src="/assets/songsfolder/${folder}cover.jpeg" alt="">
//                         <h2>${response.title}</h2>
//                         <p>${response.description}</p>
//                     </div>`
//                     // cardContainer.appendChild(card);
//             Array.from(document.getElementsByClassName("card")).forEach(e => {
//                 e.addEventListener("click", async (item) => {
//                     // console.log(item.currentTarget.dataset.folder)
//                     // folder = folder.replace(/\/$/, '').trim();
//                     // console.log(folder);
//                     songs = await getsongs(`${item.currentTarget.dataset.folder}`);
//                     // console.log(songs);
//                     playMusic(songs[0]);
//                 })
//             })
//         }

//     }
// }
// This function now ONLY handles displaying the cards.
function displayAlbums(albums) {
    let cardContainer = document.querySelector(".cardContainer");
    cardContainer.innerHTML = "";

    // Loop through the albums data that was passed to the function
    for (const album of albums) {
        cardContainer.innerHTML += `<div class="card" data-folder="${album.folder}">
            <button class="play" aria-label="Play">
                <svg data-encore-id="icon" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"
                    viewBox="0 0 24 24">
                    <path
                        d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606">
                    </path>
                </svg>
            </button>
            <img src="${album.cover}" alt="Cover for ${album.title}">
            <h2>${album.title}</h2>
            <p>${album.description}</p>
        </div>`;
    }
}


(async function main() {
    // get songs
    // await getsongs(`songs`);
    // // console.log(songs);
    // playMusic(songs[0], true);

    // //display all the albums on the page
    // displayAlbums();

    // 1. Fetch data ONCE and store it
    // let response = await fetch(`/assets/database.json`);
    // let allAlbums = await response.json();
    //let albumsData = allAlbums.albums;
    console.log("Attempting to fetch /assets/database.json...");
    const response = await fetch(`https://rajkumar180605.github.io/Spotify-Clone/assets/database.json`);
    
    // Check if the fetch was successful (status 200 OK)
    if (!response.ok) {
        // If not OK, log the error status and the response text
        console.error("Error fetching data. Status:", response.status); // e.g., 404
        const errorText = await response.text();
        console.error("Server sent back this:", errorText); // This will show the HTML error page
        return; // Stop the script
    }
    
    // If we get here, the fetch was successful, so we can parse the JSON
    const allAlbums = await response.json();
    console.log("Successfully loaded JSON data:", allAlbums);
    let albumsData = allAlbums.albums;

    // 2. NOW, display the albums on the page using the data
    displayAlbums(albumsData);

    // 3. Load the first album's playlist by default
    if (albumsData && albumsData.length > 0) {
        let firstAlbum = albumsData[0];
        getsongs(firstAlbum.folder, firstAlbum.songs);
        playMusic(songs[0], true);
    }

    // 4. Add the click listener to the card container
    document.querySelector(".cardContainer").addEventListener("click", (event) => {
        const card = event.target.closest(".card");
        if (card) {
            const folderName = card.dataset.folder;
            const album = albumsData.find(a => a.folder === folderName);
            if (album) {
                getsongs(album.folder, album.songs);
                playMusic(songs[0]);
            }
        }
    });



    // add event listener to play
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "assets/img/pause.svg";
        }
        else {
            currentsong.pause();
            play.src = "assets/img/play.svg";
        }
    })
    //add event listener to previous
    // previous.addEventListener("click", () => {
    //     let index = songs.indexOf(currentsong.src.split("/songs/")[1]);
    //     if (index > 0) {
    //         playMusic(songs[index - 1]);
    //     }
    // })
    previous.addEventListener("click", () => {
    // Decode the full URL to handle spaces, then get the song filename
    let currentTrack = decodeURI(currentsong.src.split(`/${currfolder}/`)[1]);
    let index = songs.indexOf(currentTrack);
    if (index > 0) {
        playMusic(songs[index - 1]);
    }
});
    //add event listener to next
    // next.addEventListener("click", () => {
    //     console.log(currentsong);
    //     let index = songs.indexOf(currentsong.src.split("/songs/")[1]);
    //     if (index < songs.length - 1) {
    //         playMusic(songs[index + 1]);
    //     }
    // })
    next.addEventListener("click", () => {
    // Decode the full URL to handle spaces, then get the song filename
    let currentTrack = decodeURI(currentsong.src.split(`/${currfolder}/`)[1]);
    let index = songs.indexOf(currentTrack);
    if (index < songs.length - 1) {
        playMusic(songs[index + 1]);
    }
});

    // updating time
    currentsong.addEventListener("timeupdate", () => {
        // console.log(currentsong.currentTime, currentsong.duration);
        document.querySelector(".songtimer").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`;
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    })
    // add event to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = (currentsong.duration * percent) / 100;
    })
    //add an event to hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0;
    })
    // add an event to cross
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    })
    // add an event to volume slide
    document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("change", e => {
        // console.log(e, e.target);
        currentsong.volume = e.target.value / 100;
    })
    // getting songs from playlist
    // Array.from(document.getElementsByClassName("card")).forEach(e => {
    //     e.addEventListener("click", async (item) => {
    //         console.log(item.currentTarget.dataset.folder)
    //         songs = await getsongs(`${item.currentTarget.dataset.folder}`);
    //     })
    // })
    
    //add an event listener to sound button
    document.querySelector(".volume").getElementsByTagName("img")[0].addEventListener("click",(e)=>{
        // console.log(e.target.src);
        if(e.target.src.includes("volume.svg")){
           e.target.src=  e.target.src.replace("volume.svg","mute.svg");
           currentsong.volume = 0;
           document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else{
            e.target.src=  e.target.src.replace("mute.svg","volume.svg");
            currentsong.volume = 0.3;
           document.querySelector(".range").getElementsByTagName("input")[0].value = 30;

        }
    })

})();
