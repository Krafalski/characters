/* global $ inPlay playArray score playPosition dictionary wrongGuesses */
const loadRound = () => {
  let $character = $('.character')
  let $name = $('.name')
  $character.html(`<h4>${inPlay.character}</h4>`)
    .css('opacity', 0)
  $name.html(`<h4>${inPlay.name}</h4>`)
  $('.correct').text(score)
  $('.remaining > span').text(playArray.length - playPosition)
}

const animateCorrect = () => {
  $('.character').css({ 'opacity': 1, 'color': 'turquoise' })
}

const animateWrong = () => {
  $('.character').css({ 'opacity': 1, 'color': 'firebrick' })
}
const openModal = () => {
  $('.modal').show().on('click', () => {
    $('.modal').hide()
  })
}

const aboutModal = () => {
  $('.modal-content').empty().html(`
    <h2>About</h2>
    <p>This project is to help people learn the keyboard character keys they may not be used to using. Espcially, when they just start coding</p>
  `)
  openModal()
}

const howModal = () => {
  $('.modal-content').empty().html(`
  <h2>How to Play</h2>
  <p>The name of the character appears in black. Just type the character. Don't forget to use the shift key, as needed!</p>
  <p>Charcters can have multiple names, so you can enter the same character multiple times</p>
  <p>For characters that are pairs, like parenthesis (), only type the opening one.</p>
  <p>Your total correct guesses appear in the upper right</p>
  <p>The remaining characters to guess appears on the bottom left</p>
`)
  openModal()
}

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

const winModal = () => {
  $('.modal-content').empty().html(`
    <h2>🎉🎊⚡️⭐️✨🌟</h2>
    <h2>💫 Perfect Typing! 💫</h2>
    <h2>🌟✨⭐️⚡️🎊🎉</h2>
  `)
  openModal()
}

const tableBuilder = (dictionaryInput) => {
  const $table = $('<table>')
  const $tableHeader = $('<tr>')
  const $tableHeaderName = $('<th>').text('name').on('mouseenter',()=>{
    $('.modal-content').empty()
    dictionaryModal('name')
  })
  const $tableHeaderCharacter = $('<th>').text('character').on('mouseenter',()=>{
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

$(() => {
  newGame()
  $('body').keyup(checkPair)
  $('.start').on('click', newGame)
  $('#about').on('click', aboutModal)
  $('#how').on('click', howModal)
  $('#dictionary').on('click', dictionaryModal)
})
