/* global dictionary loadRound dictionaryModal event animateWrong animateCorrect */
// the array of Character class objects to be played
let playArray = []
// the current object in play
let inPlay = {}
// Moves along the play array each round
let playPosition = 0
// total right
let score = 0
// create another, same structure as dicitionary,
// dictionary of wrong answers
// for player to view at the end of the game
let wrongGuesses = {}

// create a class for the characters to track details of each one
// splits the character name and character into instance variables
// collects whether or not the player guessed right
// collects what the user inputted (not currently used/has feature built)
class Character {
  constructor (name, character) {
    this.character = character
    this.key = name
    this.name = this.reformatName(name)
    this.correct = null
    this.play = ''
  }
  // takes camelCase names and makes them into separate strings to be more readable for the player
  reformatName (name) {
    const rename = name.split('')
    const testForCaps = /[A-Z]/
    const newName = rename.map(l => {
      if (testForCaps.test(l)) {
        l = ` ${l.toLowerCase()}`
      }
      return l
    })
    return newName.join('')
  }
  // checks player move
  // deals with the smartquote
  // increases score
  // sets player's input for comparison later (not yet built)
  checkInput (input) {
    this.play = input
    if (this.key === 'smartQuote') {
      if (input === "'" || input === '"') {
        score++
        this.correct = true
      }
    } else {
      this.correct = (input === this.character)
      if (this.correct){
        score++
      } else {
        console.log('correct answer:', this.character)
        console.log('your input:', event.key)
      }
    }
  }
}

// leverage same function in Character class
// to be able to make a table of charactrers and names
// that matches what the user sees
const reformatNameForModal = name => {
  const rename = name.split('')
  const testForCaps = /[A-Z]/
  const newName = rename.map(l => {
    if (testForCaps.test(l)) {
      l = ` ${l.toLowerCase()}`
    }
    return l
  })
  return newName.join('')
}

// sort dictionary by name for the table
// trigger on mouseover on table header of `name`
// keeps same stucture as original dictionary
// https://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
const dictionarySortByName = (unsortedDictionary) => {
  const sortedDictionary = {}
  Object.keys(unsortedDictionary).sort().forEach(key => {
    sortedDictionary[key] = unsortedDictionary[key]
  })
  return sortedDictionary
}

// sort dictionary by character for the table
// trigger on mouseover on table header of `character`
// keeps same structure as dictioary
// https://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
const dictionarySortByCharacter = (unsortedDicitonary) => {
  const sortable = []
  for (let char in unsortedDicitonary) {
    sortable.push([char, unsortedDicitonary[char]])
  }
  sortable.sort((a, b) => {
    return a[1] - b[1]
  })
  const sortedDictionary = {}
  sortable.forEach(charObj => {
    sortedDictionary[charObj[0]] = charObj[1]
  })
  return sortedDictionary
}

// return valid play
// ignores many keys not in play to prevent users accidentally making a wrong play
// all letters and numbers, and most function keys
// tab takes focus off main window - can't be played anyway
const allowPlay = keyPress => {
  const letterCheck = /[a-z0-9]/i
  let specialKeys = ['Escape', 'CapsLock', 'Shift', 'Control', 'Alt', 'Meta', 'Backspace', 'Enter']
  if (letterCheck.test(keyPress)) {
    return false
  }
  for (let press of specialKeys) {
    if (press === keyPress) {
      return false
    }
  }
  return true
}

// starts a new game
// resets global variables
// makes a new array of character Class based on dictionary
// kicks off first round
const newGame = () => {
  playArray = []
  playPosition = 0
  score = 0
  wrongGuesses = {}
  for (let character in dictionary) {
    playArray.push(new Character(character, dictionary[character]))
  }
  shuffle(playArray)
  inPlay = playArray[0]
  loadRound()
}

// fisher-yates shuffle to shuffle the Charactrer array
// https://bost.ocks.org/mike/shuffle/
const shuffle = array => {
  let m = array.length
  let t
  let i
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--)

    // And swap it with the current element.
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }
  return array
}

// prepare for next Character
// checks if game is over
// shows wrong plays before launching new game
const nextRound = () => {
  if (playArray.length - 1 > playPosition) {
    playPosition++
    inPlay = playArray[playPosition]
    loadRound()
  } else {
    // show wrong dictionary
    dictionaryModal('wrong')
    newGame()
  }
}

// checks for valid play
// checks for correcy play
// triggers jQuery DOM updates based on play
const checkPair = () => {
  $('body').css('background', 'ghostwhite').off('keyup')
  if (allowPlay(event.key)) {
    inPlay.checkInput(event.key)

    if (!inPlay.correct) {
      wrongGuesses[inPlay.name] = inPlay.character
      animateWrong()
    } else {
      animateCorrect()
    }
    setTimeout(nextRound, 2000)
    setTimeout(loadRound, 2001)
    setTimeout(turnOnPlay, 2002)
  }
}
