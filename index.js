import Shrugman from "./Shrugman.js" 

const movies=["No Country for Old Men", "The Silence of the Lambs", "The Silence of the Lambs", "Anon", "Idiocracy" , "Inception", "Queen Gambit" , "Black Mirror", "Seven" , "They live" , "Prisoners" , "The social dilemma", "Zero days"]
const books =["Homo Deus", "East of Eden", "A hundred years loneliness", "Fooled by Randomness", "The Tipping" , "Outliers", "The Black Swan" , "Skin in the Game", "Arguing with Idiots" , "The Subtle Art of Not Giving a Fuck" , "The Overton Window" , "Thinking, Fast and Slow" ]

const gameEl = document.getElementById('gamebox')
const catEl = document.getElementById('category')
const catBtn =document.querySelectorAll('.cat')
const wordEl = document.getElementById('word')
const shrugmanEl = document.getElementById('shrugman')
const guessedEl = document.getElementById('guessed')
const letter = document.getElementById('letter')
const letterEl = document.getElementById('letterField')
const guessBtn = document.getElementById('guess')

const guessedLetters = []
let badGuesses = 0 
let currentPattern = []
let category = ''
let word = {}
const shrugman = Array.from('¯\\_(:/)_/¯')

//add event listeners to category buttons

catBtn.forEach(el => {el.addEventListener('click', () => {
    const selection =el.textContent
    category = selection 
    //When the user clicks a category, we show a random movie or a book
    showGame(category)
})
})

// Show the movie or a book when we've chosen a category

function showGame(cat) {
    //Show the game
    gameEl.style.display = 'block'
    //Replace the category buttons with the chosen category
    catEl.innerHTML = `<p> Guess the ${cat} </p>`

    switch(cat) {
        case 'Movie':
            word = new Shrugman(movies).title
            break
        case 'Book':
                word = new Shrugman(books).title
                break
    }
    const title = word.title
    const pattern = word.pattern

    currentPattern= pattern
    printPattern(currentPattern)

    guessBtn.addEventListener('click', () => {
        shrugmanGame(title, pattern)
    })
}

// When the user clicks the guess button, we run the game function 
function shrugmanGame(cat, pattern) {
    const letterValue = letter.value.toLowerCase()
    const letterOnly = new RegExp('[a-z]') 

    if(letterValue && !guessedLetters.includes(letterValue) && letterOnly.test(letterValue)) {
        guessedLetters.push(letterValue.toLowerCase())
        guessedEl.innerHTML = `${guessedLetters.join (', ')}`

        if(!cat.join('').toLowerCase().includes(letterValue)) {
            badGuesses += 1
        }

        letter.value = ''
        currentPattern = []

        if(badGuesses <10) {
            for(let i=0; i < cat.length; i++) {
                if(guessedLetters.includes(cat[i].toLowerCase ())) {
                    currentPattern.push(cat[i]) 

                } else {
                            currentPattern.push(pattern[i])
                        }
                    }  

                printPattern(currentPattern) 

                if(!currentPattern.includes ("_")) {
                 catEl.style.display = 'none'
                 letterEl.innerHTML = `
                 <h2> Congratulations! </h2>
                 <img src ="./YouWin.gif">
                 `
                } 

            }  else {
                catEl.style.display = 'none'
                letterEl.innerHTML = `
                <h2> GAME OVER </h2>
                <img src ="./gameOver.gif">
                `
            }
        
        }  else {
            alert ('Existing letter ot illegal character')
        }
        shrugmanStatus(badGuesses)
    }

 function shrugmanStatus (bad) {
     let shrugmanStatus = ''

            for(let i=0; i < bad; i ++) {
                shrugmanStatus += shrugman [i]
            }
            shrugmanEl.innerHTML = `<p>${shrugmanStatus}</p>`
        }


//print the pattern including spaces
function printPattern(pattern) {
    let printPattern = ``
    pattern.forEach(el => {
        if(el !== ' ') {
            printPattern += `${el}`
        } else {
            printPattern +=`&nbsp;&nbsp;`
        }
    })
    wordEl.innerHTML = `<p>${printPattern}</p>` 
} 

