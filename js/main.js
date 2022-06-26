// save the markup of the html page in variable
const sourceMarkup = document.body.innerHTML;
// put all of the functional things in a function called (allOfIt)
function allOfIt() {
  // elements
  const theGameElement = document.querySelector(".the-game");
  const startingGameElement = document.querySelector(".starting-game");
  const gameDetailsElement = document.querySelector(".game-details");
  const overlayElement = document.querySelector(".overlay");
  const infoContainer = overlayElement.querySelector(".info-container");

  // game choices
  let theGridSize = 4;
  let numberGameArray = [];
  let iconsGameArray = [];
  const iconsMarkupArray = [
    "",
    `<i class="fa-solid fa-bath"></i>`,
    `<i class="fa-solid fa-dragon"></i>`,
    `<i class="fa-solid fa-ghost"></i>`,
    `<i class="fa-solid fa-ice-cream"></i>`,
    `<i class="fa-solid fa-user-secret"></i>`,
    `<i class="fa-brands fa-android"></i>`,
    `<i class="fa-brands fa-apple"></i>`,
    `<i class="fa-brands fa-avianex"></i>`,
    `<i class="fa-solid fa-baseball-bat-ball"></i>`,
    `<i class="fa-solid fa-blender"></i>`,
    `<i class="fa-brands fa-bluetooth"></i>`,
    `<i class="fa-solid fa-cat"></i>`,
    `<i class="fa-solid fa-chess-rook"></i>`,
    `<i class="fa-solid fa-clock"></i>`,
    `<i class="fa-solid fa-democrat"></i>`,
    `<i class="fa-solid fa-dice-d20"></i>`,
    `<i class="fa-solid fa-earth-europe"></i>`,
    `<i class="fa-solid fa-face-flushed"></i>`,
  ];
  // declare an array of active choices
  let activeChoices;
  // select the start game button
  const startGame = document.querySelector(".start-game");

  // function to check the active choices and start the game
  function checkActiveChoice() {
    // select all the choices
    const allChocies = Array.from(document.querySelectorAll(".choice"));
    // loop over them and put them in a new array called active choices
    activeChoices = allChocies
      .filter((choice) => {
        return choice.classList.contains("active");
      })
      .map((ch) => {
        return ch.dataset.choice;
      });
      // call start the game function and pass to it the active choices array 
    startTheGame(activeChoices);
  }

  // add an evnet listener to the start game button
  startGame.addEventListener("click", checkActiveChoice);

  // all the game needs
  let activeIcons = 0;
  let ele1;
  let ele2;
  let arrayOfTwoClickedIcons = [];
  let lockFlip = false;
  let isGameOver = false;

  // function will add an event listener to all the clicked icons
  function activeNonActive() {
    let icons = document.querySelectorAll(".icon");
    icons.forEach((icon) => {
      icon.addEventListener("click", handlingClickIcons);
    });
  }

  // the function that will run when the icons has been clicked
  const handlingClickIcons = function (e) {
    const theIcon = e.currentTarget;
    // check if the lock flip is not false
    if (!lockFlip) {
      // check if the the array of two clicked elements's length is equal to 2, if so empty the array
      if (arrayOfTwoClickedIcons.length === 2) {
        arrayOfTwoClickedIcons = [];
      }
      // check if the active icons no equal to 2
      if (activeIcons !== 2) {
        // check if the icon doesn't have the class active
        if (!theIcon.classList.contains("active")) {
          theIcon.classList.add("active");
          theIcon.classList.remove("not-active");
          activeIcons++;
          if (activeIcons === 1) {
            // make the ele1 = the icon, and push this [ele1] to the [arrayOfTwoClickedIcons]
            ele1 = theIcon;
            arrayOfTwoClickedIcons.push(ele1);
          } else if (activeIcons === 2) {
            // the same with the second clicked icon but i you have to make the [lockFlip] = true, and make activeIcons = 0;
            ele2 = theIcon;
            arrayOfTwoClickedIcons.push(ele2);
            lockFlip = true;
            activeIcons = 0;
            handlingMoves();
            // check if the two clicked icons are equal
            if (!areEqual(ele1.dataset.id, ele2.dataset.id)) {
              // if not
              setTimeout(() => {
                addNotActiveClass(arrayOfTwoClickedIcons);
                lockFlip = false;
                activeNextPlayer();
              }, 1000);
            } else {
              // if so
              setTimeout(() => {
                const activePlayer =
                  document.querySelector(".detail-box.active");
                const managePairs = activePlayer.querySelector(".moves");
                ++managePairs.dataset.pairs;
                lockFlip = false;
                ele1.classList.add("disabled");
                ele2.classList.add("disabled");
              }, 500);
            }
          }
        }
      }
    }
    // check if the game is over
    checkGameOver();
  };

  // save all the choices in a variable
  const allChoices = document.querySelectorAll(".choices .choice");
  function handlingChoices() {
    // loop over all of the choices
    allChoices.forEach((choice) => {
      // add an event listener for every choice
      choice.addEventListener("click", function (e) {
        // save the clicked choice in a variable
        const theChoice = e.currentTarget;
        // save all the choice's parent's children in a variable and turn it into an array [to take advantage of (forEach)]
        const allChidren = Array.from(theChoice.parentElement.children);
        // check if the clicked choice doesn't have the class active
        if (!theChoice.classList.contains("active")) {
          // if so, loop over all of the choice's parent's children and remove the class active from them
          allChidren.forEach((child) => {
            child.classList.remove("active");
          });
          // and then add the class active to the clicked choice
          theChoice.classList.add("active");
        }
      });
    });
  }

  // generate the icons function that will return an array of objects
  function generateIcons() {
    iconsGameArray = [];
    let gameSize = 8;
    if (theGridSize === 6) {
      gameSize = 18;
    }
    for (let i = 1; i <= gameSize; i++) {
      const obj = {
        value: iconsMarkupArray[i],
        dataId: i,
      };
      iconsGameArray.push(obj);
    }
    for (let i = 1; i <= gameSize; i++) {
      const obj = {
        value: iconsMarkupArray[i],
        dataId: i,
      };
      iconsGameArray.push(obj);
    }
    return iconsGameArray;
  }

  // generate the number function that will return an array of objects
  function generateNums() {
    numberGameArray = [];
    let gmaeSize = 8;
    if (theGridSize === 6) {
      gmaeSize = 18;
    }

    for (let i = 1; i <= gmaeSize; i++) {
      const obj = {
        value: i,
        dataId: i,
      };
      numberGameArray.push(obj);
    }
    for (let i = 1; i <= gmaeSize; i++) {
      const obj = {
        value: i,
        dataId: i,
      };
      numberGameArray.push(obj);
    }

    return numberGameArray;
  }

  // shuffle the array for the game
  function randomizeArray(arr) {
    return arr.sort(function () {
      return Math.random() - 0.5;
    });
  }

  // generating the game markup
  function generateTheGame() {
    const theGridContainer = document.querySelector(".the-grid-container");
    theGridContainer.innerHTML = "";
    const grid = document.createElement("div");
    grid.classList.add("the-grid", `grid-${theGridSize}`);
    for (let i = 0; i < theGridSize; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      for (let j = 0; j < theGridSize; j++) {
        const icon = document.createElement("div");
        icon.classList.add("icon");
        icon.textContent = 1;
        row.appendChild(icon);
      }
      grid.appendChild(row);
    }
    theGridContainer.appendChild(grid);
    const gameDetails = document.querySelector(".game-details");
    document.body.appendChild(gameDetails);
    gameDetails.classList.remove("d-none");
    activeFirstPlayer();
    activeNonActive();
  }

  // fixing the icons markup by passing the array of icons object and put [value and dataId] of every object inside the icon [innerhtml and dataset.id]
  function fixingIconsMarkup(array) {
    const allTheIcons = document.querySelectorAll(".icon");
    allTheIcons.forEach((icon, index) => {
      icon.innerHTML = array[index].value;
      icon.dataset.id = array[index].dataId;
    });
  }

  // excution
  handlingChoices();
  // startTheGame by the giving the array of choices
  function startTheGame(arr) {
    theGameElement.classList.remove("d-none");
    startingGameElement.classList.add("d-none");
    if (arr[2] === "grid-6") {
      theGridSize = 6;
    }
    manageGameDetails(arr[1]);
    if (arr[0] === "numbers") {
      generateNums();
      randomizeArray(numberGameArray);
      generateTheGame();
      fixingIconsMarkup(numberGameArray);
    } else if (arr[0] === "icons") {
      generateIcons();
      randomizeArray(iconsGameArray);
      generateTheGame();
      fixingIconsMarkup(iconsGameArray);
    }
  }

  // pretty clear
  function addNotActiveClass(arr) {
    arr.forEach((ele) => {
      ele.classList.remove("active");
      ele.classList.add("not-active");
    });
  }

  // pretty clear also
  function areEqual(dataId1, dataId2) {
    if (dataId1 === dataId2) {
      return true;
    } else {
      return false;
    }
  }

  // checking if all the icons has active class and depending on that the game is over
  function checkGameOver() {
    const allIcons = Array.from(document.querySelectorAll(".icon"));
    isGameOver = allIcons.every((icon) => icon.classList.contains("active"));
    if (isGameOver) {
      clearInterval(theIntervalOfTime);
      manageOverlay();
    }
    return isGameOver;
  }

  // managing time 
  const timer = document.querySelector(".timer");
  let seconds = 0;
  let minutes = 0;

  // the function that will manage the time
  function setTimer() {
    seconds++;
    if (seconds < 10) {
      timer.innerHTML = `${minutes}:0${seconds}`;
    } else if (seconds >= 10 && seconds < 60) {
      timer.innerHTML = `${minutes}:${seconds}`;
    } else if (seconds >= 60) {
      minutes++;
      seconds = 0;
      timer.innerHTML = `${minutes}:0${seconds}`;
    }
  }
  let theIntervalOfTime;

  // managing the game details depending on the players that are playing
  function manageGameDetails(players) {
    if (players === "1-player") {
      gameDetailsElement.classList.remove("d-none");
      gameDetailsElement.querySelector(".moves").textContent = "0";
      gameDetailsElement.querySelector(".moves").dataset.pairs = "0";

      theIntervalOfTime = setInterval(() => {
        setTimer();
      }, 1000);
    } else if (players === "2-players") {
      gameDetailsElement.innerHTML = "";
      for (let i = 1; i <= 2; i++) {
        generateDetailBox(i);
      }
    } else if (players === "3-players") {
      gameDetailsElement.innerHTML = "";
      for (let i = 1; i <= 3; i++) {
        generateDetailBox(i);
      }
    } else if (players === "4-players") {
      gameDetailsElement.innerHTML = "";
      for (let i = 1; i <= 4; i++) {
        generateDetailBox(i);
      }
    }
  }

  // the function that will take care of the game details of there is more than one player playing
  function generateDetailBox(player) {
    const detailBox = document.createElement("div");
    detailBox.classList.add("detail-box");
    const lightText = document.createElement("p");
    lightText.classList.add("light-text");
    lightText.innerHTML = `Player ${player}`;
    const activeColor = document.createElement("p");
    activeColor.classList.add("active-color", "moves");
    activeColor.innerHTML = 0;
    activeColor.setAttribute("data-pairs", "0");
    detailBox.append(lightText, activeColor);
    gameDetailsElement.appendChild(detailBox);
  }

  // handling the moves of every player
  function handlingMoves() {
    const activePlayer = document.querySelector(".detail-box.active");
    let theMoves = Number(activePlayer.querySelector(".moves").textContent);
    theMoves++;
    activePlayer.querySelector(".moves").textContent = theMoves;
  }

  // active the first player in the first
  function activeFirstPlayer() {
    const firstPlayer = gameDetailsElement
      .querySelector(".moves")
      .parentElement.classList.add("active");
  }

  // active the next player if the icons doesn't match
  function activeNextPlayer() {
    if (activeChoices[1] !== "1-player") {
      // moves = 0;
      const activePlayer = document.querySelector(".detail-box.active");
      if (activePlayer.nextElementSibling) {
        activePlayer.classList.remove("active");
        activePlayer.nextElementSibling.classList.add("active");
      } else {
        activePlayer.classList.remove("active");
        activePlayer.parentElement.children[0].classList.add("active");
      }
    }
  }

  // manage the overlay
  function manageOverlay() {
    document.body.classList.add("over");
    overlayElement.classList.remove("d-none");
    if (activeChoices[1] === "1-player") {
      overlayElement.querySelector(".time-result").textContent =
        timer.textContent;
      overlayElement.querySelector(
        ".info-result.moves-result"
      ).textContent = `${
        document.querySelector(".detail-box .moves").textContent
      } Moves`;
    } else if (activeChoices[1] === "2-players") {
      infoContainer.innerHTML = "";
      for (let i = 1; i <= 2; i++) {
        generateInfoBox(i);
      }
      addWinnerPlayer();
    } else if (activeChoices[1] === "3-players") {
      infoContainer.innerHTML = "";
      for (let i = 1; i <= 3; i++) {
        generateInfoBox(i);
      }
      addWinnerPlayer();
    } else if (activeChoices[1] === "4-players") {
      infoContainer.innerHTML = "";
      for (let i = 1; i <= 4; i++) {
        generateInfoBox(i);
      }
      addWinnerPlayer();
    }
  }

  // generate the inforamtion box of the array depending on the player and his/her info
  function generateInfoBox(player) {
    const playerMoves =
      gameDetailsElement.children[player - 1].querySelector(
        ".moves"
      ).textContent;
    const playerPairs =
      gameDetailsElement.children[player - 1].querySelector(".moves").dataset
        .pairs;
    const infoBox = document.createElement("div");
    infoBox.classList.add("info-box");
    const infoName = document.createElement("p");
    infoName.classList.add("info-name");
    infoName.textContent = `Player ${player}`;
    const infoResCont = document.createElement("div");
    infoResCont.classList.add("info-result-container");
    const infoResult = document.createElement("p");
    infoResult.classList.add("info-result");
    infoResult.textContent = `${playerMoves} Moves`;
    const infoPairs = document.createElement("p");
    infoPairs.classList.add("info-pairs", "info-result");
    infoPairs.textContent = `${playerPairs} Pairs`;
    infoResCont.append(infoResult, infoPairs);
    infoBox.append(infoName, infoResCont);
    infoContainer.appendChild(infoBox);
  }

  // add winner player if the game has been over and there's more than one player
  function addWinnerPlayer() {
    const infoPairs = Array.from(
      overlayElement.querySelectorAll(".info-pairs")
    );
    let newArray = infoPairs
      .map((ele, index) => {
        return { val: parseInt(ele.textContent), index: index };
      })
      .sort((a, b) => b.val - a.val);
    const infoBoxes = overlayElement.querySelectorAll(".info-box");
    infoBoxes[newArray[0].index].classList.add("active");
  }

  // select the restart game buttons and loop over them and add an event listener to restart the game with the same active choices
  const restartGame = document.querySelectorAll(".restart-game");
  restartGame.forEach((btn) => {
    btn.addEventListener("click", restartTheGame);
  });

  // the function that will run when the user want to restart the game
  function restartTheGame() {
    activeIcons = 0;
    arrayOfTwoClickedIcons = [];
    clearInterval(theIntervalOfTime);
    overlayElement.classList.add("d-none");
    document.body.classList.remove("over");
    seconds = 0;
    minutes = 0;
    checkActiveChoice();
  }

  // call set up new game function 
  setUpNewGame()
}

// execute my everything function
allOfIt();

// make a function that will handle a newGame for the user
function setUpNewGame() {
  const newGame = document.querySelectorAll(".new-game");
  newGame.forEach((btn) => {
    btn.addEventListener("click", function () {
      // window.location.reload()
      document.body.innerHTML = sourceMarkup;
      allOfIt();
    });
  });
}

// call the setUpNewGame
setUpNewGame()