let playArray = []
let name = ''
let character = ''
let inPlay = {}
let playPosition = 0
let score = 0

class Character {
  constructor (name, character){
    this.character = character
    this.key = name
    this.name = this.reformatName(name)
    this.correct = null
    this.play = ''
  }
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
  checkInput (input) {
    this.play = input
    this.correct = (input === this.character) ? true : false  
    if(this.correct) score ++ 
  }
}

// return valid play
const allowPlay = keyPress => {
  const letterCheck = /[a-z0-9]/i
  let specialKeys = ['Escape' , 'CapsLock', 'Shift', 'Control', 'Alt', 'Meta', 'Backspace', 'Enter']
  if (letterCheck.test(keyPress)) {
    return false
  }
  for (let press of specialKeys ) {
    if (press === keyPress) {
      return false
    }
  }
  return true
}

const newGame = () => {
  playArray = []
  for (let character in dictionary) {
    playArray.push(new Character(character, dictionary[character]))
  }
  console.log(playArray)
  shuffle(playArray)
  inPlay = playArray[0]
  console.log(inPlay)
  loadRound()
}

// fisher-yates shuffle
// https://bost.ocks.org/mike/shuffle/
const shuffle = array => {
  let m = array.length, t, i

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--)

    // And swap it with the current element.
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }
  return array;
}


const nextRound = () => {
  if(playArray.length - 1 > playPosition) {
    playPosition ++
    inPlay = playArray[playPosition]
    loadRound()
  } else {
    alert('all done')
    console.log(playArray);     
  } 
}

const checkPair = () => {
  if (allowPlay(event.key)) {
    inPlay.checkInput(event.key)
    nextRound()
    loadRound()
  }
}


