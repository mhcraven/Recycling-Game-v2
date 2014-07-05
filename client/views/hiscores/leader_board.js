Template.leaderboard.score = function() {
  return Session.get('score') || 0;
};

Template.leaderboard.helpers({
  hiscores: function() {
    return Hiscores.find();
  },

  /*scoreData: {"theStats" : []},

  // FIXME: DOM reference
  scoreArea: document.getElementById("scoreboard"),

  //add and store when 'add name' button is clicked
  saveScore: function() {

    //if no name is entered into the field, use 'anonymous'
    if ( nameField.value === ""){
      nameField.value = "TIM the Beaver";
    }

    //save name and score to JSON object
    scoreData.theStats.push({
      "player": nameField.value,
      "score": getScore()
    });

    //store JSON object locally
    var stringObj = JSON.stringify(scoreData);
    localStorage.setItem("scoreData", stringObj);

    //remove end screen
    endScreen.setAttribute("class", "no-screen");

    //add intro screen
    introScreen.setAttribute("class", "screen");

    reSet();
    displayScore();
  },

  //add name and score to leaderboard
  displayScore: function() {
    var storedItem = localStorage.getItem("scoreData");
    var convertObj = JSON.parse(storedItem);

    //sort top five scores so highest score is at the top
    if (convertObj == null || storedItem == undefined) {

    } else if ( convertObj != null ) {

      clearDisplay();

      if ( convertObj.theStats.length > 1 ) {
        sortScores( convertObj.theStats, "score");
      }

      var numScores = convertObj.theStats.length;
      if ( numScores > 3) {
        numScores = 3;
      }

      for ( var i = 0; i < numScores; i++ ){
        var li = document.createElement("ol");
        li.innerHTML = "<em>" + convertObj.theStats[i].player + "</em>" + "<br> score: " + convertObj.theStats[i].score;
        scoreArea.appendChild(li); // FIXME: DOM reference
      }
    }
  },

  clearDisplay: function() {
    var theLi = document.getElementsByTagName("ol");
    while (theLi[0]) theLi[0].parentNode.removeChild(theLi[0]);
  },

 

  sortScores: function(objects, key) {
    objects.sort(sortBy('score', true, parseInt));
  }*/

});
