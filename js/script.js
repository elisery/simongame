$(document).ready(function() {
  /*
  
  3. "Start" starts the game from counts of 1
    a) all values are reset
  4. "Strict" lights up "circle" - changes color to bright red
    a) if mistake made, display shows "!!"
    b) game resets to 1
  5. Game play:
    a) game chooses and plays random colour
    b) user has to repeat colour
    c) if correct, game chooses another random color and plays the entire array
    d) if incorrect, game shows "!!" and plays the array until user correct
  */

  let strictStatus = false;

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
    } else {
      //remove display
      $('.counter-display').text('');
    }
  });

  //Click Start Button
  $('.start-button').click(function() {
    //check if game is on
    if (checkGameStatus()) {
      //do game stuff
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
        //set mode

      } else {
        strictStatus = false;
        //turn OFF 'light'
        $('#circle').css('background-color', '#333333');
        //set mode

      }

    } else {
      //render button disabled
      $('.start-button').disabled = true;
    }
  }); //strict button


});
