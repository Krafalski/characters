const loadRound = () => {
    let $character = $('.character')
    let $name = $('.name')
    $character.html(`<h4>${inPlay.character}</h4>`)
      .css('opacity', 0)
    $name.html(`<h4>${inPlay.name}</h4>`)
    $('.correct').text(score)
    $('.remaining > span').text(playArray.length - playPosition)
  }
  
  $(()=>{
    newGame()
    $('body').keyup(checkPair)
    $('.start').on('click', newGame)
  })