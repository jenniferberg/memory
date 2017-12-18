//Define variables
var squares; //array of tile names
var pictures; //array of picture names
var squaresObject = []; //array of object information about each tile
var shuffled = []; //array of shuffled picture names
var matches = []; //array of picture names that have been matched
var currentMatch = []; //array of currently selected tiles, to determine if they match
var page = document.querySelector(".page"); //query selector of class "page"
var message = document.querySelector(".message"); //query selector of class "message"

//Query selectors for buttons "easy", "medium", and "hard"
var easy = document.querySelector("#easy");
var medium = document.querySelector("#medium");
var hard = document.querySelector("#hard");

//Function to reset all values
function resetValues(){
  squares = [];
  pictures = [];
  squaresObject = [];
  shuffled = [];
  matches = [];
  currentMatch = [];
}

//Function to set game to level "easy"
function levelEasy(){
  resetValues();
  removeAllTiles();

  squares = ["one", "two", "three", "four", "five", "six", "seven", "eight","nine", "ten"];
  pictures = ["Apple", "Apple", "Banana", "Banana", "Carrot", "Carrot", "Grapes", "Grapes", "Broccoli", "Broccoli"];

  shufflePictures();
  displaySquares();
}

//Function to set game to level "medium"
function levelMedium(){
  resetValues();
  removeAllTiles();

  squares = ["one", "two", "three", "four", "five", "six", "seven", "eight","nine", "ten",
                  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen",
                  "eighteen", "nineteen", "twenty"];
  pictures = ["Apple", "Apple", "Banana", "Banana", "Carrot", "Carrot", "Grapes", "Grapes", "Avocado", "Avocado",
                  "Orange", "Orange", "Watermelon", "Watermelon", "Pineapple", "Pineapple", "Broccoli", "Broccoli", "Corn", "Corn"];

  shufflePictures();
  displaySquares();
}

//Function to set game to level "hard"
function levelHard(){
  resetValues();
  removeAllTiles();

  squares = ["one", "two", "three", "four", "five", "six", "seven", "eight","nine", "ten", "eleven", "twelve",
                  "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
                  "twenty-one", "twenty-two", "twenty-three", "twenty-four", "twenty-five", "twenty-six", "twenty-seven",
                   "twenty-eight", "twenty-nine", "thirty"];
  pictures = ["Apple", "Apple", "Banana", "Banana", "Carrot", "Carrot", "Grapes", "Grapes", "Avocado", "Avocado",
                  "Orange", "Orange", "Watermelon", "Watermelon", "Pineapple", "Pineapple", "Broccoli", "Broccoli", "Corn", "Corn",
                  "Strawberry", "Strawberry", "Cherry", "Cherry", "Peppers", "Peppers", "Tomato", "Tomato", "Peas", "Peas"];

  shufflePictures();
  displaySquares();
}

//When page first loads, automatically start the game on level "easy"
document.addEventListener("DOMContentLoaded", levelEasy, false);

//Function to view board on wide view (6 tiles wide)
function wideView(){
  page.classList.add("max-page");
}

//Function to view board on narrow view (5 tiles wide)
function narrowView(){
  page.classList.remove("max-page");
}

//Event listeners for when the level buttons are clicked
easy.addEventListener("click", function(){
  levelEasy();
  narrowView();
  resetMessage();
  easy.classList.add("buttonClicked");
  medium.classList.remove("buttonClicked");
  hard.classList.remove("buttonClicked");
}, false);

medium.addEventListener("click", function(){
  levelMedium();
  narrowView();
  resetMessage();
  medium.classList.add("buttonClicked");
  easy.classList.remove("buttonClicked");
  hard.classList.remove("buttonClicked");
}, false);

hard.addEventListener("click", function(){
  levelHard();
  wideView();
  resetMessage();
  hard.classList.add("buttonClicked");
  easy.classList.remove("buttonClicked");
  medium.classList.remove("buttonClicked");
}, false);

/*Function to shuffle the picture names by randomly removing
  each name from the "pictures" array and adding to the
  "shuffled" array.
*/
function shufflePictures(){
  while(pictures.length !== 0){
    var rand = Math.floor(Math.random() * pictures.length);
    shuffled.push(pictures[rand]);
    pictures.splice(rand, 1);
  }
}

//Function to reset the instructions message once the game is over
function resetMessage(){
  message.innerHTML = "Select a tile and find its match!";
}

//Function to reset the board by removing all the current tiles
function removeAllTiles(){
  while(page.childNodes[0]){
    page.removeChild(page.childNodes[0]);
  }
}

/*Function to set up the board by adding the appropriate tiles,
  based on the level selected
*/
function displaySquares(){
  for(var i = 0; i < squares.length; i++){
    var number = {index:i, name:squares[i], reveal:"hide"};
    squaresObject.push(number);

    var divOuter = document.createElement("div");
    divOuter.setAttribute("class", "border");
    var divInner = document.createElement("div");
    divInner.setAttribute("class", "square");
    divInner.setAttribute("id", number.name);

    var imgBack = document.createElement("img");
    imgBack.setAttribute("class", "back");
    imgBack.setAttribute("src", "images/back.png");
    imgBack.setAttribute("width", "100%");
    imgBack.setAttribute("height", "100%");
    divInner.appendChild(imgBack);

    divOuter.appendChild(divInner);
    page.appendChild(divOuter);

    var tile = document.querySelector("#"+number.name);
    tile.addEventListener("click", toggleView, false);
    tile.addEventListener("click", findMatch, false);
  }
}

//Function to hide the picture (i.e. display the back of the tile)
function hideView(tile, index){
  tile.removeChild(tile.childNodes[0]);

  var imgBack = document.createElement("img");
  imgBack.setAttribute("class", "back");
  imgBack.setAttribute("src", "images/back.png");
  imgBack.setAttribute("width", "100%");
  imgBack.setAttribute("height", "100%");
  tile.appendChild(imgBack);

  squaresObject[index].reveal = "hide";
}

/*Function to toggle the view of the tile to display
  either the picture or the back of the tile
*/
function toggleView(){
  var name = this.id;

  for(var j = 0; j < squaresObject.length; j++){
    if(name == squaresObject[j].name){
      if(squaresObject[j].reveal == "hide"){

        this.removeChild(this.childNodes[0]);
        var img = document.createElement("img");
        img.setAttribute("src", "images/"+shuffled[squaresObject[j].index]+".png");
        img.setAttribute("width", "100%");
        img.setAttribute("height", "100%");
        this.appendChild(img);

        squaresObject[j].reveal = "show";
      }else{
        var imgBack = document.createElement("img");
        imgBack.setAttribute("class", "back");
        imgBack.setAttribute("src", "images/back.png");
        imgBack.setAttribute("width", "100%");
        imgBack.setAttribute("height", "100%");
        this.appendChild(imgBack);

        squaresObject[j].reveal = "hide";
      }
    }
  }
}

//Function to determine if the two tiles selected are a match
function findMatch(){
  var name = this.id;

  for(var k = 0; k < squaresObject.length; k++){
    if(name == squaresObject[k].name){
      var tileChoice = {index:k, name:name, value:shuffled[squaresObject[k].index]};

      currentMatch.push(tileChoice);

      var tileA = document.querySelector("#"+currentMatch[0].name);

      if(currentMatch.length == 1){
        tileA.removeEventListener("click", toggleView, false);
        tileA.removeEventListener("click", findMatch, false);
      }
      else if(currentMatch.length > 1){
        var tileB = document.querySelector("#"+currentMatch[1].name);
        if(currentMatch.length == 2){
          tileA.removeEventListener("click", toggleView, false);
          tileA.removeEventListener("click", findMatch, false);
          tileB.removeEventListener("click", toggleView, false);
          tileB.removeEventListener("click", findMatch, false);

          if(currentMatch[0].name != currentMatch[1].name && currentMatch[0].value == currentMatch[1].value){
            matches.push(currentMatch[0].value);
            currentMatch = [];

            if(matches.length == (squares.length/2)){
              message.innerHTML = "You did it!  Click one of the level buttons to play again.";
            }
          }
        }else{
          hideView(tileA, currentMatch[0].index);
          hideView(tileB, currentMatch[1].index);

          tileA.addEventListener("click", toggleView, false);
          tileA.addEventListener("click", findMatch, false);
          tileB.addEventListener("click", toggleView, false);
          tileB.addEventListener("click", findMatch, false);

          currentMatch[0] = currentMatch[2];
          currentMatch.splice(1, 2);
        }
      }
    }
  }
}
