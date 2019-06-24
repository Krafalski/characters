/* global $ inPlay playArray score playPosition dictionary wrongGuesses */

// uses inPlay global variable to load character onto browser
// adds character to page as well but sets opacity to 0
// this helps keep name and charactrers in consisent place through round
const loadRound = () => {
  let $character = $('.character')
  let $name = $('.name')
  $character.html(`<input autofocus/><h4>${inPlay.character}</h4>`)
    .css('opacity', 0)
  $name.html(`<h4>${inPlay.name}</h4>`)
  $('.correct').text(score)
  $('.remaining > span').text(playArray.length - playPosition)
}

// simple aninmation on correct guess
const animateCorrect = () => {
  $('.character').css({ 'opacity': 1, 'color': 'turquoise' })
  $('.name')
}

// simple animation on wrong guess
const animateWrong = () => {
  $('.character').css({ 'opacity': 1, 'color': 'firebrick' })
  $('.name')
}
const openModal = () => {
  $('.modal').show().on('click', () => {
    $('.modal').hide()
  })
}

// on click about this modal opens
const aboutModal = () => {
  $('.modal-content').empty().html(`
    <h2>About</h2>
    <p>This project is to help people learn the keyboard character keys they may not be used to using. Espcially, when they just start coding</p>
  `)
  openModal()
}

// on click how to play, this modal opens
const howModal = () => {
  $('.modal-content').empty().html(`
  <h2>How to Play</h2>
  <p>The name of the character appears in black. Just type the character. Don't forget to use the shift key, as needed!</p>
  <p>You only get one chance per letter. At the end of the game you'll get to reivew the ones you got wrong.</p>
  <p>Charcters can have multiple names, so you can enter the same character multiple times</p>
  <p>For characters that are pairs, like parenthesis (), only type the opening one.</p>
  <p>Your total correct guesses appear in the upper right</p>
  <p>The remaining characters to guess appears on the bottom left</p>
`)
  openModal()
}

// loads a table view of characters based on user interaction
// whole dicitonary alphabelticlly by name
// whole dictionary by charcodes by characters
// wrong gusses dicdtionary that can also be sorted by name or character
const dictionaryModal = type => {
  let $table
  let $h2
  let displayDictionary
  const $content = $('.modal-content')
  if (type === 'name' || !type) {
    displayDictionary = dictionarySortByName(dictionary)
    $table = tableBuilder(displayDictionary)
  } else if (type === 'character') {
    displayDictionary = dictionarySortByCharacter(dictionary)
    $table = tableBuilder(displayDictionary)
  } else if (type === 'wrong') {
    displayDictionary = dictionarySortByName(wrongGuesses)
    $table = tableBuilder(displayDictionary)
    $content.append($h2)
  } else {
    displayDictionary = dictionarySortByName(dictionary)
    $table = tableBuilder(displayDictionary)
  }
  if (type === 'wrong') {
    $content.empty()
    if (Object.keys(displayDictionary).length === 0) {
      winModal()
    } else {
      const $h2 = $('<h2>').text('Nice job! Here are some characters to review')
      const $p = $('<p>').text(`
          GOTCHA: Smart quotes are quotes that are auto-formated into a different character than the default.You can't automatically type a smart quote, and using a smart quote in code will break your code
        `)
      $content.append($h2, $table, $p)
    }
  } else {
    $content.empty().append($table)
  }
  openModal()
}

// what happens when you get them all right
// alternavitve get which ones you got wrong
const winModal = () => {
  $('.modal-content').empty().html(`
    <h2>🎉🎊⚡️⭐️✨🌟</h2>
    <h2>💫 Perfect Typing! 💫</h2>
    <h2>🌟✨⭐️⚡️🎊🎉</h2>
  `)
  openModal()
}

// builds a table based on data passed in from dictionaryModal
const tableBuilder = (dictionaryInput) => {
  const $table = $('<table>')
  const $tableHeader = $('<tr>')
  const $tableHeaderName = $('<th>').text('name').on('mouseenter', () => {
    $('.modal-content').empty()
    dictionaryModal('name')
  })
  const $tableHeaderCharacter = $('<th>').text('character').on('mouseenter', () => {
    $('.modal-content').empty()
    dictionaryModal('character')
  })
  $tableHeader.append($tableHeaderName, $tableHeaderCharacter)
  $table.append($tableHeader)
  for (let character in dictionaryInput) {
    const $tr = $('<tr>').html(`
      <td>${reformatNameForModal(character)}</td>
      <td>${dictionaryInput[character]}</td>
    `)
    $table.append($tr)
  }
  return $table
}
const turnOffPlay = () => {
  $('body').css('background', 'ghostwhite').off('keyup')
}
const turnOnPlay = () => {
  $('body').css('background', 'white').on('keyup', checkPair)
}

// document on ready - make sure page loads before selecting these items
$(() => {
  newGame()
  $('body').on('keyup', checkPair)
  $('.start').on('click', newGame)
  $('#about').on('click', aboutModal)
  $('#how').on('click', howModal)
  $('#dictionary').on('click', dictionaryModal)
})
