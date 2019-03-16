let playArray = []
let name = ''
let character = ''
let inPlay = {}
let playPosition = 0

class Character {
  constructor (name, character){
    this.character = character
    this.key = name
    this.name = this.reformatName(name)
    this.correct = null
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
    this.correct = (input === this.character) ? true : false
  }
}

// return valid play
const validPlay = () => {
  // unique set
}

const newGame = () => {
  playArray = []

  for (let character in dictionary) {
    playArray.push(new Character(character, dictionary[character]))
  }
  shuffle(playArray)
  inPlay = playArray[0]
  round()
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

const round = () => {
  let $character = $('.character')
  let $name = $('.name')
  $character.text(inPlay.character)
    // .css('opacity', 0)
  $name.text(inPlay.name)
 
}

const nextRound = () => {
  if(playArray.length - 1 > playPosition) {
    playPosition ++
    inPlay = playArray[playPosition]
    round(inPlay)
    console.log(playArray.length, playPosition); 
  } else {
    alert('all done')
    console.log(playArray.length, playPosition);     
  } 
}

const checkPair = () => {
  if (event.key !== 'Shift') {
    inPlay.checkInput(event.key)
    nextRound()
  }
}




$(()=>{
   newGame()
   $('body').keyup(checkPair)
})
