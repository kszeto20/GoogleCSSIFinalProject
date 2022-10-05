let storeLink = "";
let vidId = "";
let newYtLink = "";

let covArt = document.querySelector("#albumArt");
let songN = document.querySelector("#songName");
let artistN = document.querySelector("#artistName");
let lyricN = document.querySelector("#lyricArea");
let ebArea = document.querySelector("#ebPlay");
let playPause = document.querySelector("#playbutton");
let vid = document.getElementById("music-video");
// let playableVid = document.getElementById("ebPlay");
let playButton = document.querySelector("#playB");

// pulling from local storage
const mySong = window.localStorage.getItem("songTitle");
let st = JSON.parse(mySong);
const myArtist = window.localStorage.getItem("artistName");
let artistT = JSON.parse(myArtist);
const myCover = window.localStorage.getItem("coverArt");
let coverT = JSON.parse(myCover);

let searchKey = st + " " + artistT;

//------------------------------------------------

// getting lyrics
async function getLyrics() {
  const myLyr = window.localStorage.getItem("lyrPath");
  let path = JSON.parse(myLyr);

  // fetch song lyrics from API
  let r = await fetch(path);
  const lyrJson = await r.json();
  let lyrics = lyrJson.result.lyrics;
  //console.log("fetching songs from api...... \n" + lyrJson.result);
  //console.log("These are the lyrics: " + lyrics);
  lyricN.innerHTML = lyrics;
}
getLyrics();

//getting song informations
function getInfo() {
  songN.innerHTML = st;
  artistN.innerHTML = artistT;
  covArt.setAttribute("src", coverT);
}
getInfo();

//------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------Video Stuff--------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
//getting youtube video
async function ytResult() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '37749dd7e3msh939061c0790b14ap12fd49jsnf4e036dcb678',
      'X-RapidAPI-Host': 'ytube-videos.p.rapidapi.com'
    }
  };
  let result = await fetch(`https://ytube-videos.p.rapidapi.com/search-video?q=${searchKey}`, options);
  const ytJson = await result.json();
  const ytLink = await ytJson[0].link;
  vidId = ytJson[0].id
  newYtLink = ytLink.replace('watch?v=', "embed/");
}
ytResult();

function playB() {
  // Add autoplay to video
  newYtLink = newYtLink.concat("?&autoplay=1");
  vid.setAttribute('src', newYtLink);
  storeLink = newYtLink;
};

// //------------------------------------------------------------------------------------------------------------------
// //-------------------------------------------- (: PLAYLIST STUFF :) ------------------------------------------------
// //------------------------------------------------------------------------------------------------------------------
let personalPlayList = loadMyPlayList();


// Get a random ID for search history.
function getRandomId() {
  return Math.floor(Math.random() * 1e6).toString();
}

//create a new playlist item
function createPlaylistItem(t, n, a, v) {
  let likedSong = {
    id: getRandomId(),
    titleOfSong: t,
    nameOfArtist: n,
    albumOfSong: a,
    videoOfSong: v,
  };
  return likedSong;
}

//store liked song in local memory
function saveSong() {
  let likedSongs = JSON.stringify(personalPlayList);
  window.localStorage.setItem('myLikedList', likedSongs);
}

//load the playlist each time
function loadMyPlayList() {
  const s = window.localStorage.getItem('myLikedList');
  console.log(s);
  if (s == null) {
    return [];
  } else {
    return JSON.parse(s);
  }
}

// add to playlist functions
function addToPlayList() {
  let fYtLink = newYtLink;
  if (newYtLink.includes("?&autoplay=1")) {
    fYtLink = newYtLink.replace("?&autoplay=1", "");
  }
  let item = createPlaylistItem(st, artistT, coverT, fYtLink);
  if (notInPlayList()) {
    personalPlayList.splice(0, 0, item);
  } else {
    alert("This song has already been added to your playlist :)");
  }
  saveSong();
  console.log(window.localStorage.getItem('myLikedList'));
}

//return true if does not exist
function notInPlayList() {
  for (let i = 0; i < personalPlayList.length; i++) {
    if (personalPlayList[i].titleOfSong === st && personalPlayList[i].nameOfArtist === artistT && personalPlayList[i].albumOfSong === coverT) {
      return false;
    }
  } return true;
}
