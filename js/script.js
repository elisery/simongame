$(document).ready(function() {
  /*

  4. "Strict" lights up "circle" - changes color to bright red
    a) if mistake made, display shows "!!"
    b) game resets to 1
  5. Game play:
    a) game chooses and plays random colour
    b) user has to repeat colour
    c) if correct, game chooses another random color and plays the entire array
    d) if incorrect, game shows "!!" and plays the array until user correct
  */
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
    }
  });

  //Click Start Button
  $('.start-button').click(function() {
    //check if game is on
    if (checkGameStatus()) {
      //reset variables & display
      gameArr = [];
      $('.counter-display').text('01');
      //call game in regular mode or strict mode
      if (strictStatus === true) {
        strictGame();
      } else  {
        regularGame();
      }
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
        //call game in strict mode
        strictGame();
      } else {
        strictStatus = false;
        //turn OFF 'light'
        $('#circle').css('background-color', '#333333');
        //call game in regular mode
        regularGame();
      }
    } else {
      //render button disabled
      $('.start-button').disabled = true;
    }
  });

  //Choose random colour object for game array
  function simonChoice() {
    //Choose random # between 1 and 8
    let n = Math.floor(Math.random() * (8 - 1) + 1);
    //Based on number choose object to add to gameArr
    switch (true) {
      case (n === 1 || n === 5):
        gameArr.push(green);
        break;
      case (n === 2 || n === 6):
        gameArr.push(red);
        break;
      case (n === 3 || n === 7):
        gameArr.push(yellow);
        break;
      case (n === 4 || n === 8):
        gameArr.push(blue);
        break;
      default:
        console.log("Error");
    }
  }

  //Playback gameArr
  function playBack() {
    let period = 2000;
    //let endTime = gameArr.length * 1000;
    //let counter = 0;
    let n = 0
    let soundPlay = setInterval(function (){
      let soundObj = gameArr[n];
      soundObj["sound"].load();
      soundObj["sound"].play();
      soundObj["sound"].playbackRate = 0.3;
      lightColour(soundObj["id"]);
      if (/*counter === endTime || */n === gameArr.length - 1) {
        clearInterval(soundPlay);
      }
      //counter += period;
      let changeBack = setTimeout(function() {
        regularColour(soundObj["id"]);
      }, 1000);
      n++;
    }, period);
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
  }

  //Regular game
  function regularGame() {

    /*
    for (var i = 1; i <= 20; i++) {
      ///for each push to gameArr, playBack the arr
      simonChoice();
      playBack();
      for (var j = 0; j < gameArr.length; j++) {
        //for each gameArr entry, get a user click - use code below
        clickAble();
        if (gameArr[i]["id"] !== clickedID) {
          //show error message
          errorMessage();
          //turn off clicks
          unClickable();
          //reset j
          j = 0;
          //reset the display
          $('.counter-display').text('01');
          //play back the arr
          playBack();
        } else {
          unClickable();
        }
      }
      if (displayVal === 20) {
        $('.counter-display').text('01');
        gameArr = [];
        //break;
      } else  {
        displayVal++;
        $('.counter-display').text(displayVal);
      }
    }*/



    let i = 0;

    //Simon chooses random colour & push value to array
    simonChoice();
    console.log(gameArr);
    //Iterate through gameArr to match values to user input

      if (i === 0) {
        playBack();
      }
      let clickedID;
      let displayVal = $('.counter-display').text();

      clickAble();

      $('.quad').on("mousedown", function() {
        clickedID = event.target.id;
        console.log(clickedID + " " + i);
        if (clickedID === 'green') {
          soundOnClick(green);
          //$('#green').css('background-color', '' + green["colour"] + '');
        } else if (clickedID === 'red') {
          soundOnClick(red);
          //$('#red').css('background-color', '' + red["colour"] + '');
        } else if (clickedID === 'blue') {
          soundOnClick(blue);
          //$('#blue').css('background-color', '' + blue["colour"] + '');
        } else if (clickedID === 'yellow') {
          soundOnClick(yellow);
          //$('#yellow').css('background-color', '' + yellow["colour"] + '');
        }
        lightColour(clickedID);
        $('.quad').on("mouseup", function() {
          regularColour(clickedID);
        });
        if (gameArr[i]["id"] === clickedID) {
          //allow iteration to next value in gameArr;
          console.log("got it!");
          unClickable();
          //Increment display value
          displayVal++;
          //if counter = 20, reset value to 1 and reset gameArr
          if (displayVal === 20) {
            $('.counter-display').text('01');
            gameArr = [];
            //break;
          } else if (displayVal < 10) {
            displayVal = "0" + displayVal;
            $('.counter-display').text(displayVal);
            } else  {
            $('.counter-display').text(displayVal);
          }
        } else {
          //error message, go back to beginning of array & disallow clicks
          errorMessage();
          unClickable();
          i = 0;
        }
      });

  }

  //Strict game
  function strictGame() {
    /*
    1. While start is enabled && on button is on {
        let i = 0
        simon chooses
        gamearr.push
        //ADD CONDITION FOR STRICT BUTTON to call regular game
        if strict-button = false
          regularGame() //which resets the counter

        while i < gamearr.length {
          if i === 0
            simon plays
          ALLOW CLICKS & call userClicks to hear user's sound
          let clickedID = userClicks() //does this play sound at same time?
          if gamearr[i][id] === clickedID
            i++
          else
            error message
            i = 0
            DISALLOW CLICKS
        }
        increment counter AND display value
        i)  if count === 20 reset to 1, reset gameArr
        ii) find way to flip back to original while loop
      }
    */

  }

  //I DONT THINK I NEED THIS FUNCTION???
  function userPlay() {
    for (var i = 0; i < gameArr.length; i++) {
      let clickedID = userClicks();
      if (clickedID !== gameArr[i]["id"]) {
        //SHOW ERROR
        return false;
      }
    }
    return true;
  }

  function soundOnClick(colour) {
    colour["sound"].load();
    colour["sound"].playbackRate = 0.3;
    //colour["sound"].play();
    setTimeout(function () {
      colour["sound"].play();
    }, 150);
  }

  function userClicks() {
    let clickedID;
    $(this).on("mousedown", function() {
      clickedID = event.target.id;
      if (clickedID === 'green') {
        soundOnClick(green);
        //$('#green').css('background-color', '' + green["colour"] + '');
      } else if (clickedID === 'red') {
        soundOnClick(red);
        //$('#red').css('background-color', '' + red["colour"] + '');
      } else if (clickedID === 'blue') {
        soundOnClick(blue);
        //$('#blue').css('background-color', '' + blue["colour"] + '');
      } else if (clickedID === 'yellow') {
        soundOnClick(yellow);
        //$('#yellow').css('background-color', '' + yellow["colour"] + '');
      }
      lightColour(clickedID);
      $(this).on("mouseup", function() {
        regularColour(clickedID);
      });
    });
    return clickedID;
  }

  //Error message & sound
  function errorMessage() {
    /*
    1. Flash !! in display twice
    2. Play sound twice
    */

    let n = 0
    let soundPlay = setInterval(function (){
      //let soundObj = gameArr[n];
      //red["sound"].load();
      //red["sound"].playbackRate = 0.1;
      //red["sound"].play();
      $('.counter-display').text('!!');
      if (n === 1) {
        clearInterval(soundPlay);
        $('.counter-display').text('01');
      }
      n++;
    }, 1000);
    console.log('error!');
  }

});
