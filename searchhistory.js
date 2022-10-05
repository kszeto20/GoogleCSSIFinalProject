console.log("script running");
let searchHistory = document.querySelector('.search-history');
let history = [];
loadList();
reset();

//-----------------------------------------------------------------------------------------------------
//------------------------------------SEARCH HISTORY STUFF---------------------------------------------
//-----------------------------------------------------------------------------------------------------

// Get a random ID for search history.
function getRandomId() {
  return Math.floor(Math.random() * 1e6).toString();
}
//create a new searched item
function createNewSearch(enteredTerm) {
  let Memo = {
    id: getRandomId(),
    term: enteredTerm,
    printed: false,
  };
  return Memo;
}
//store search history in local memory
function saveHistory() {
  let memoList = JSON.stringify(history);
  window.localStorage.setItem('searchH', memoList);
}
//loading the search history each time
function loadList() {
  const h = window.localStorage.getItem('searchH');
  if (h == null) {
    history = [];
  } else {
    history = JSON.parse(h);
  }
}
//add to search history
function addSearchHistory() {
  let newS = createNewSearch(input.value.toLowerCase())
  if (input.value != "" && notExist(input.value)) {
    history.splice(0, 0, newS);
  }
  if (history.length > 6) {
    history.pop();
  }
  saveHistory();
  console.log(localStorage);
}
//return TRUE of the input term is not already in memory
function notExist(str) {
  for (let i = 0; i < history.length; i++) {
    if (str === history[i].term) {
      return false;
    }
  } return true;
}


//search history dropdown 
function displayHistory() {
  if (!searchHistory.classList.contains("clicked")) {
    for (let i = 0; i < history.length; i++) {
      if (!history[i].printed) {
        let historyDiv = document.createElement('div');
        historyDiv.classList.add("search-history-item");
        historyDiv.setAttribute('id', `${history[i].id}`);
        historyDiv.innerHTML = `
          <i class="fa fa-times" aria-hidden="true" onclick="deleteMemo('${history[i].id}')"></i>
          <p onclick="searchAgain('${history[i].term}')">${history[i].term}</p>
        `;
        searchHistory.append(historyDiv);
        history[i].printed = true;
      }
    }
  }
}

function reset() {
  searchHistory.innerHTML = "";
  for (let i = 0; i < history.length; i++) {
    history[i].printed = false;
  }
}

function deleteMemo(ID) {
  for (let i = 0; i < history.length; i++) {
    if (history[i].id === ID) {
      let elem = document.getElementById(ID);
      history.splice(i, 1);
      elem.remove();
    }
  }
  saveHistory();
}

function searchAgain(val) {
  input.value = val;
}

function addColor(count) {
  searchHistory.children[count].children[0].classList.add("orange");
}

function removeColor(count) {
  searchHistory.children[count].children[0].classList.remove("orange");
}