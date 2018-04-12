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
  const green = {"colour": "#4dff4d", "sound": soundGreen};
  const red = {"colour": "FF0000", "sound": soundRed};
  const yellow = {"colour": "#ffff4d", "sound": soundYellow};
  const blue = {"colour": "#2626FF", "sound": soundBlue};

  let strictStatus = false;
  let gameArr = [];

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
      $('.counter-display').text('--')
      green["sound"].play();
    } else {
      //remove display
      $('.counter-display').text('');
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
      /*
      1. call random quad generator + push to array
      2. iterate array for player
      */
    } else {
      //render button disabled
      $('.start-button').disabled = true;
    }
  }); //start-button

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

      } else {
        strictStatus = false;
        //turn OFF 'light'
        $('#circle').css('background-color', '#333333');
        //call game in regular mode

      }

    } else {
      //render button disabled
      $('.start-button').disabled = true;
    }
  }); //strict button


});
