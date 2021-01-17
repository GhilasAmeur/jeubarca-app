const canvas = document.getElementById("canvas");
const score = document.getElementById("score");
const clique = document.getElementById("clique");
const endScreen = document.getElementById("endScreen");
const starts = document.getElementById("start");

//variable de score et clique restant :
//ballonR = 10
cliqueRestant = 60;
var gameOver = 50; //le nombre de ballon restant sur le canvas, si plus de 50 on a perdu
compteur = 0;
var play = false;

// --> fonction start pour demarrer le jeu :

function start() {
  compteur = 0;
  var tempsBallon = 6000; //6s
  ballonsRestons = cliqueRestant;
  canvas.childElementCount = 0;

  canvas.innerHTML = ""; //logique car quand on demarre le jeu on veu plus de ballon dans canvas
  score.innerHTML = compteur;
  clique.innerHTML = ballonsRestons;

  //condition pour ne pas jouer la fonction game plusieur fois, abvant ici on avait game();
  play ? "" : game(); //si play = vrai alors tu faire rien sinon tu jeu la fonction game
  play = true;
  function game() {
    var randomTime = Math.round(Math.random() * tempsBallon);
    tempsBallon > 700 ? (tempsBallon = tempsBallon * 0.9) : "";

    setTimeout(() => {
      console.log(cliqueRestant);
      if (cliqueRestant === 0) {
        youWin();
      } else if (canvas.childElementCount < gameOver) {
        ballonPop();
        game();
        //console.log(canvas.childElementCount)
      } else {
        youLose();
      }
    }, randomTime);
  }
  const youLose = () => {
    endScreen.innerHTML = `<div class = "youLose" >Game Over <br/> Score : ${compteur}</div>`;
    endScreen.style.visibility = "visible";
    //endScreen.style.opacity = 1;
    play = false;
  };
  const youWin = () => {
    // var precision = Math.round(compteur / ballonR * 100)
    endScreen.innerHTML = `<div class = "youWin" >Bravo tu as gagné <br/> Score : ${compteur}<br/></div>`;
    endScreen.style.visibility = "visible";
    play = false;
  };
}

// --> role de ballonPop() : faire apparaitre une image dun ballon sur canvas d'une facon aléatoire :

function ballonPop() {
  //création d'une image ballon
  var ballon = new Image();
  ballon.src = "./image/ballon2.jpg";

  //a chaqye que tu ecris un ballon tu lui donne la class ballon de style.scss(sass) :

  ballon.classList.add("ballon");

  //direction selon x et y aléatoire : la taille de ballon est determiner d'une facon dynamique selon le scss x et y
  //une valeur sue axe  : x entre 0 et 500, la taille de son parent canvas

  ballon.style.top = Math.random() * 500 + "px";
  ballon.style.left = Math.random() * 500 + "px";

  //taile de ballon dynamique au moins il va faire 30px pour quil soit visible pour cliquer

  var x, y;
  x = y = Math.random() * 30 + 30;

  //la on parle a notre scss : apres avoir calculer x et y on injecte le resultats a notre scss

  ballon.style.setProperty("--x", `${x}px`);
  ballon.style.setProperty("--y", `${y}px`);

  //on va rajouter un mouvement pour notre ballon avec transform : translite configure dans le scss, avce la fonction : ballonAnim
  // on va translater et on injetcte dans : ballonAnim de scss :

  var plusOuMoins = Math.random() < 0.5 ? -1 : 1;
  var trX = Math.random() * 500 * plusOuMoins;
  var trY = Math.random() * 500 * plusOuMoins;
  ballon.style.setProperty("--trX", `${trX}%`);
  ballon.style.setProperty("--trY", `${trY}%`);

  // cette ligne est trés importante pour dire que le ballon est un  fils de la div canvas, car ballon : position absolute, canvas: position relative

  canvas.appendChild(ballon);
}

//  --> fonction quand on clique le ballon diparait :

document.addEventListener("click", function (e) {
  //tres important la var targetElement, si je fait console.log(targetElement); pour voir, là ou je clique je recupere la div ou span ou image que j'ai clique
  //dans la variable targetElement, et la on a gagné car apres je fait un if comme suit :
  var targetElement = e.target;
  if (targetElement.classList.contains("ballon")) {
    targetElement.remove();
    compteur++;
    cliqueRestant--;
    score.innerHTML = compteur;
    clique.innerHTML = cliqueRestant;
  }
});

starts.addEventListener("click", function () {
  start.innerHTML = `<div class = "startNouveau" ></div>`;
});
// a la fin de jeu quand on clique sur notre ecran endScreen ca demarre le jeu :

endScreen.addEventListener("click", () => {
  cliqueRestant = 60;
  compteur = 0;

  setTimeout(() => {
    start();
    endScreen.style.visibility = "hidden";
  }, 4500);
});
