$(document).ready(function() {
  //Set Sound constants
  const soundGreen = new Audio('./resources/sounds/simonSound1.mp3');
  const soundRed = new Audio('./resources/sounds/simonSound2.mp3');
  const soundYellow = new Audio('./resources/sounds/simonSound3.mp3');
  const soundBlue = new Audio('./resources/sounds/simonSound4.mp3');
  //Set game quadrant constants
  const green = {"colour": "#4dff4d", "sound": soundGreen, "id": "green"};
  const red = {"colour": "#FF5c00", "sound": soundRed, "id": "red"};
  const yellow = {"colour": "#ffff4d", "sound": soundYellow, "id": "yellow"};
  const blue = {"colour": "#2626FF", "sound": soundBlue, "id": "blue"};

  let strictStatus = false;
  let gameArr = [];
  let userArr = [];

  //Render quadrants unclickable by default
  $('.row').css('pointer-events', 'none');

  //Check if game is on or off
  function checkGameStatus() {
    if ($('input').is(':checked')) {
      return true;
    } else  {
      return false;
    }
  }

  //Click on and off
  $('.switch').click(function() {
    if (checkGameStatus()) {
      //set display
      $('.counter-display').text('--');
    } else {
      //remove display & reset strict light
      $('.counter-display').text('');
      $('#circle').css('background-color', '#333333');
      unClickable();
    }
  });

  //Click Start Button
  $('.start-button').click(function() {
    //check if game is on
    if (checkGameStatus()) {
      //reset variables & display
      gameArr = [];
      userArr = [];
      $('.counter-display').text('01');
      //Play initial step
      addCommand();

    } else {
      //render button disabled
      $('.start-button').disabled = true;
    }
  });

  //Click Strict Button
  $('.strict-button').click(function() {
    //check if game is on
    if (checkGameStatus()) {
      //toggle status
      if (strictStatus === false ) {
        strictStatus = true;
        //turn ON 'light'
        $('#circle').css('background-color', 'red');
      } else {
        strictStatus = false;
        //turn OFF 'light'
        $('#circle').css('background-color', '#333333');
      }
    } else {
      //render button disabled
      $('.start-button').disabled = true;
    }
  });

  //Choose random colour object for game array
  function simonChoice() {
    //Choose random # between 1 and 8
    let n = Math.floor(Math.random() * (12 - 1) + 1);
    //Based on number choose object to add to gameArr
    switch (true) {
      case (n === 1 || n === 5 || n === 9):
        gameArr.push(green);
        break;
      case (n === 2 || n === 6 || n === 10):
        gameArr.push(red);
        break;
      case (n === 3 || n === 7 || n === 11):
        gameArr.push(yellow);
        break;
      case (n === 4 || n === 8 || n === 12):
        gameArr.push(blue);
        break;
      default:
        console.log("Error");
    }
  }

  //Playback gameArr
  function playBack() {
    let period = 2000;
    let n = 0

    let soundPlay = setInterval(function (){
      let soundObj = gameArr[n];
      soundObj["sound"].load();
      soundObj["sound"].play();
      if (!checkGameStatus()) {
        gameArr, userArr = [];
        clearInterval(soundPlay);
        return;
      }
      soundObj["sound"].playbackRate = 0.3;
      lightColour(soundObj["id"]);
      if (n === gameArr.length - 1) {
        clearInterval(soundPlay);
      }
      //counter += period;
      let changeBack = setTimeout(function() {
        regularColour(soundObj["id"]);
      }, 1000);
      n++;
    }, period);
    clickAble();

  }

  function addCommand() {
    simonChoice();
    playBack();
  }

  function lightColour(id) {
    switch(id) {
      case "green":
        $('#green').css('background-color', '#4dff4d');
        break;
      case "red":
        $('#red').css('background-color', '#FF5c00');
        break;
      case "blue":
        $('#blue').css('background-color', '#2626FF');
        break;
      case "yellow":
        $('#yellow').css('background-color', '#ffff4d');
        break;
    }
  }

  function regularColour(id) {
    switch(id) {
      case "green":
        $('#green').css('background-color', '#00b300');
        break;
      case "red":
        $('#red').css('background-color', '#cc0000');
        break;
      case "blue":
        $('#blue').css('background-color', '#0000cc');
        break;
      case "yellow":
        $('#yellow').css('background-color', '#E3E348');
        break;
    }
  }

  //Activate quadrants for play
  function clickAble() {
    $('.quad').css('pointer-events', 'auto');
    $('.quad').css('cursor', 'pointer');
  }

  function unClickable() {
    $('.row').css('pointer-events', 'none');
    $('.row').css('cursor', 'default');
    $('.quad').css('pointer-events', 'none');
  }

  //User pushes button
  $('.quad').on("mousedown", function() {
    clickedID = event.target.id;
    if (clickedID === 'green') {
      soundOnClick(green);
      userArr.push(green);
    } else if (clickedID === 'red') {
      soundOnClick(red);
      userArr.push(red);
    } else if (clickedID === 'blue') {
      soundOnClick(blue);
      userArr.push(blue);
    } else if (clickedID === 'yellow') {
      soundOnClick(yellow);
      userArr.push(yellow);
    }
    lightColour(clickedID);
    $('.quad').on("mouseup", function() {
      regularColour(clickedID);
    });

    regularGame();

  });

  function compare(firstArr, secondArr) {
    for (var i = 0; i < firstArr.length; i++) {
      if (firstArr[i] !== secondArr[i]) {
        return false;
      }
    }
    return true;
  }

  //Regular game
  function regularGame() {
    //Match userArr and section of gameArr
    let displayVal = $('.counter-display').text();
    if (!compare(userArr, gameArr.slice(0, userArr.length))) {
      userArr = [];
      errorMessage();
      if (strictStatus === true) {
        gameArr = [];
        addCommand();
      }

      playBack();
    } else if (userArr.length === gameArr.length && compare(userArr, gameArr)) {
      unClickable();
      userArr = [];
      displayVal++;
      if (displayVal < 10) {
        displayVal = "0" + displayVal;
        $('.counter-display').text(displayVal);
      } else if (displayVal === 21) {
        //reset game
        winSound();
        gameArr = [];
      } else {
        $('.counter-display').text(displayVal);
      }
      addCommand();
    }
  }

  function soundOnClick(colour) {
    colour["sound"].load();
    colour["sound"].playbackRate = 0.3;
    setTimeout(function () {
      colour["sound"].play();
    }, 150);
  }

  function winSound() {
    red["sound"].load();
    red["sound"].playbackRate = 0.3;

    let winMessage = setInterval(function() {
      $('.counter-display').text('**');
      let clearMessage = setInterval(function() {
        $('.counter-display').text('01');
        clearInterval(clearMessage);
      }, 1500);
      clearInterval(winMessage);
    }, 150);

  }

  //Error message & sound
  function errorMessage() {
    unClickable();
    let soundPlay = setInterval(function (){

      let displayVal = $('.counter-display').text();
      $('.counter-display').text('!!');
      let errorDisplay = setInterval(function() {
        if (strictStatus === true) {
          $('.counter-display').text('01');

        } else {
          $('.counter-display').text(displayVal);
        }
        clearInterval(errorDisplay);
      }, 1000);
      clearInterval(soundPlay);
    }, 1000);
  }
});
