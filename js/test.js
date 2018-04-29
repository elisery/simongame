function userPlay() {
  for (var i = 0; i < gameArr.length; i++) {
    let clickedID = userClicks();
    if (clickedID !== gameArr[i]["id"]) {
      return false;
    }
  }
  return true;
}


function userClicks() {
  let clickedID;
  $(this).on("mousedown", function() {
    clickedID = event.target.id;
    if (clickedID === 'green') {
      soundOnClick(green);
    } else if (clickedID === 'red') {
      soundOnClick(red);
    } else if (clickedID === 'blue') {
      soundOnClick(blue);
    } else if (clickedID === 'yellow') {
      soundOnClick(yellow);
    }
    lightColour(clickedID);
    $(this).on("mouseup", function() {
      regularColour(clickedID);
    });
  });
  return clickedID;
}
