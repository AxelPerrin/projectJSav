const faces = document.querySelectorAll('.double-face')
const active = document.querySelector('.active')
const attributes = document.querySelectorAll("[data-attr]")
let tab = []


let tabCartesTrouvee = []

//Retourner les cartes 'double face'
function cartReturn()
{
    faces.forEach(face =>
    {
        face.addEventListener('click', function() {
            face.classList.add('active')
            fonction(face.parentElement);
        })
    })
}
cartReturn()

// cartReturn()

// function fonction(daron)
// {
//     const nourriture = daron.getAttribute("data-attr")

//     if (tab.length < 2)
//     {
//         console.log("Ajout de: " + nourriture);
//         tab.push(nourriture);
//     }

//     if (tab.length === 2)
//     {
//         if (tab[0] === tab[1])
//         {
//             console.log("les deux cartes retournées sont les mêmes.")
//         }

//         else
//         {
//             daron.classList.toggle("active")
//             console.log("les deux cartes retournées ne sont les mêmes.")


//         }
//     }
// }


//Trouve le Fruit de la carte avec le data-attribute
function attribus() 
{
    attributes.forEach(attribute => 
    {
        attribute.addEventListener('click', function()
        {
            console.log(attribute.getAttribute("data-attr"));
            tab.push(attribute.getAttribute("data-attr"))
            console.log(tab);
            
            if(tab.length === 2)
            {
                if(tab[0] === tab[1])
                {
                    console.log("T'as trouver une paire");
                    tabCartesTrouvee.push(tab[0])
                    tabCartesTrouvee.push(tab[1])
                    console.log('tab trouver'+tabCartesTrouvee)
                    console.log('tab de base'+ tab);
                    tabCartesTrouvee = true
                }

                else if(tab[0] != tab[1])
                {
                    setTimeout(() =>{
                        faces.forEach(face =>{
                            face.removeEventListener('click', cartReturn, true);
                                setTimeout(() =>{
                                    face.classList.remove('active')
                                    console.log(face);
                                }, 700)   
                        })    
                    })    
                }
                
                tab = [];
            } 
        })
    })
}

attribus()
