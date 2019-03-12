let playArray = []
let name = ''
let character = ''

class Character {
  constructor (name, character){
    this.name = name
    this.character= character
  }
}

const newGame = () => {
  playArray = []

  for (let character in dictionary) {
    const newName = reformatName(character)
    playArray.push(new Character(newName, dictionary[character]))
  }
  shuffle(playArray)
  round(playArray[0])
}

const reformatName = name => {
  return name
  // console.log(name.toUpperCase())
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

const round = pair => {
  let $character = $('.character')
  let $name = $('.name')
  $character.text(pair.character).css('opacity', 0)
  $name.text(pair.name)
  console.log('round', pair);
}

const checkPair = letter => {
  if (event.key !== 'Shift') {
    console.log(event.key);
  }
}


$(()=>{
   newGame()
   $('body').keyup(checkPair)
})
