const grille = document.querySelector('.grille') // ajout de la grille 
let tireurIndex = 209
let width = 20
let direction = 1
let aliensuppr = []
let resultat = 0
let scorePoint = 1
const score = document.querySelector('.score')
const game = document.querySelector('.game')
const win = document.querySelector('.win')


for (let i = 0; i < 260; i++){ //Creation de 259 emplacement, 'elements', 'div' dans la grile
    const square = document.createElement('div') 
    grille.appendChild(square)
}

//Création du tableau a case 'squares'
const squares = Array.from(document.querySelectorAll('.grille div')) 

// Placement des Alien par Index 'square'
const alienInvaders = [
    4,5,6,7,8,9,10,11,12,13,14,15,
    24,25,26,27,28,29,30,31,32,33,34,35,
    44,45,46,47,48,49,50,51,52,53,54,55
]


//Ajout des Aliens
function displayAlien() {
    for (let i = 0; i < alienInvaders.length; i++) {
        
      if(!aliensuppr.includes(i)) {
        squares[alienInvaders[i]].classList.add('alien')
      }
    }
}

displayAlien() //Ajout des vaisseaux '.aliens' fixe

//Fonction pour supprimer un alien dans l'ArrayList 'alienInvaders'
function remove() {
    for(let i = 0; i < alienInvaders.length; i++){
        squares[alienInvaders[i]].classList.remove('alien')//l'Array squares va prendres chaque Index donnés dans "alienInvaders" et les supprimer
    }
}

//Ajout + Emplacement du vaisseau tireur
squares[tireurIndex].classList.add('tireur')

//Déplacement avec 'q' et 'd'
// SWITCH CASE 
// function detectKey(e){
//     squares[tireurIndex].classList.remove('tireur')
//     switch(e.key){
//         case 'q':
//             //Blocage du tireur a l'index 201 max a gauche
//             if(tireurIndex >= 201 )tireurIndex -= 1 //si conditions valide tireur index -1
//             break
//         case 'd':
//             //Blocage du tireur a l'index 218 max a droite 
//             if(tireurIndex <= 218)tireurIndex += 1 //si conditions valide tireur index +1
//             break
//         case 'z':
//             if(tireurIndex >= 150)tireurIndex -=20
//             break
//         case 's':
//             if(tireurIndex <= 150)tireurIndex +=20
//             break
//     }
//     squares[tireurIndex].classList.add('tireur')
// }



//FONCTION DETECTKEY EN IF/ELSE
function detectKey(e){
    squares[tireurIndex].classList.remove('tireur')
    if (e.key == 'ArrowLeft' && tireurIndex >= width && tireurIndex >= 141 && tireurIndex != 200 && tireurIndex != 180 && tireurIndex != 160) {
        
        tireurIndex -= 1 //si conditions valide tireur index -1
        console.log(e.key)
    }
    else if(e.key == 'ArrowRight' && tireurIndex <= 218 && width && tireurIndex != 199 && tireurIndex != 179 && tireurIndex != 159){
         
        tireurIndex += 1 //si conditions valide tireur index S+1
        console.log(e.key)
    }
    else if(e.key == 'ArrowUp' && tireurIndex >= 160 && width){
        tireurIndex -=20 //si conditions valide tireur index -20
        console.log(e.key)
    }
    else if(e.key == 'ArrowDown' && tireurIndex <= 199){
        tireurIndex +=20 //si conditions valide tireur index +20
        console.log(e.key)
    }
    squares[tireurIndex].classList.add('tireur')
}



//Ajout de l'évent keydown "Event quand touche enfoncé"
document.addEventListener('keydown', detectKey)

//Mouvement des Aliens 
function moveAlien(){
    const leftEdge = alienInvaders[0] % width === 0  //Max du bord gauche
    const rightEdge = alienInvaders[alienInvaders.length -1] % width === width -1  // max du bord Droit
    remove() // remove les vaisseaux apres deplacement vers la gauche ou droite

    if(rightEdge){
        for(let i = 0; i < alienInvaders.length; i++ ){
            alienInvaders[i] += width // saute une case apres avoir taper le bord droit
            direction = -1
        }
    }

    if(leftEdge){
        for(let i = 0; i < alienInvaders.length; i++){
            alienInvaders[i] += width // saute une case apres avoir taper le bord gauche
            direction = 1
        }
    }

    for(let i = 0; i < alienInvaders.length; i++){
        alienInvaders[i] += direction  //Cadence du decalage des aliensInvaders : alienInvaders + 1 a chaque tour
    }

    displayAlien()

    //Affichage de GAME OVER si 'alienInvaders' touche le vaisseau 
    for (let i = 0; i < alienInvaders.length; i++){
        if(alienInvaders[i] == tireurIndex){ // si alien index = tireur index
            squares[tireurIndex].classList.remove('tireur') // remove tireur
            score.innerHTML = "Score : " + resultat
            game.style.opacity = 1 // affichage game over
            timer = 0
        }
        if(scorePoint == 37){ // si score = 37
            win.style.opacity = 1 // affichage game over 
            timer = 0
            game.style.opacity = 0 // afichage du game over désactivé
            scorePoint
        }
    }
}

// fonction shoot
function shoot(e) {
    let laserId // variable laserId 
    let currentLaserIndex = tireurIndex // tire de laser = index du tireur (point départ du tir)

    // fonction mouvement du laser
    function moveLaser() {
      squares[currentLaserIndex].classList.remove('laser') // supression laser
      currentLaserIndex -= width
      squares[currentLaserIndex].classList.add('laser') // ajout laser
  
      if (squares[currentLaserIndex].classList.contains('alien')) { // si l'index du tire contien un alien alors
        squares[currentLaserIndex].classList.remove('laser') // supression laser
        squares[currentLaserIndex].classList.remove('alien') // suppression alien
        squares[currentLaserIndex].classList.add('boom') // ajout de l'explosion
        score.innerHTML = "Score : " + scorePoint++ // affichage +1 dans le score
  
        setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 100) // temps avant de supprimer l'animation de l'explosion
        clearInterval(laserId) // supprime le laser après avoir touché l'alien

        const alienRemoved = alienInvaders.indexOf(currentLaserIndex) // variable alienRemoved = alien
        aliensuppr.push(alienRemoved) // push pour supprimé alienRemoved 
  
      }
  
    }
    switch(e.key) { // si condition valide ici tir
      case ' ': // touche 'espace' pour tirer
        laserId = setInterval(moveLaser, 200) // interval du tir de 200 ms
    }
  }

  function refreshPage(){ // fonction refresh la page

    window.location.reload(); // reload de page

}
  
  document.addEventListener('keypress', shoot) // event touche appuyer = shoot (ici touche "espace")

    setInterval(moveAlien, 500)


//Timer
var paragraphe = document.createElement("p");
paragraphe.id = "strt";


var chrono = document.getElementsByClassName('timer')[0];
var start = document.getElementById('strt');
//var reset = document.getElementById('rst');
var sec = 0;
var min = 0;


function tick(){
    sec++;
    if (sec >= 60) { //fonction tick qui est tout simplement le timer
        sec = 0;
        min++;
    }
}
function add() {
    tick();
        chrono.textContent = "Timer : " +(min > 9 ? min : "0" + min) // affichage du timer
                + ":" + (sec > 9 ? sec : "0" + sec);
    timer();
}
function timer() {
    t = setTimeout(add, 1000); // temps de l'affichage du temps (1000ms donc 1s)
}

timer()