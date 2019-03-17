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



// https://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
const dictionarySortByName = (unsortedDictionary) => {
  const sortedDictionary = {}
  Object.keys(unsortedDictionary).sort().forEach(key => sortedDictionary[key] = unsortedDictionary[key])
  return sortedDictionary
}

// https://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
async function dictionarySortByCharacter () {
  console.log('by char')
  const sortable = []
  for (let char in dictionary) {
    sortable.push([char, dictionary[char]])
  }
  sortable.sort((a,b) => {
    // console.log(a[1])
    return a[1] - b[1]
  })
  const sortedDictionary = await sortable.map(name => {
    // console.log({[name[0]]: name[1]})
    return {[name[0]]: name[1]}
  })
  return sortedDictionary
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
  shuffle(playArray)
  inPlay = playArray[0]
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
  } 
}

const checkPair = () => {
  if (allowPlay(event.key)) {
    inPlay.checkInput(event.key)
    nextRound()
    loadRound()
  }
}



