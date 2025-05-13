document.addEventListener('DOMContentLoaded', () => {
    const gameSelector = document.querySelector('.game-selector')
    const gameContainer = document.getElementById('game-container')
    const gameButtons = gameSelector.querySelectorAll('button')

    // Ocultar todos los contenedores de juego al inicio
    gameContainer.innerHTML = `
        <div id="tic-tac-toe-game"></div>
        <div id="guess-number-game"></div>
       <div id="simon-says-game"></div>
        <div id="coming-soon-game"><h2>¡Próximamente!</h2><p>Este juego estará disponible pronto.</p></div>
    `

    const ticTacToeGame = document.getElementById('tic-tac-toe-game')
    const guessNumberGame = document.getElementById('guess-number-game')
    const simonSaysGame = document.getElementById('simon-says-game')
    const comingSoonGame = document.getElementById('coming-soon-game')
    const allGames = [ticTacToeGame, guessNumberGame, simonSaysGame, comingSoonGame]


    gameButtons.forEach(button => {
        button.addEventListener('click', function() {
            const gameToLoad = this.dataset.game

            // Ocultar todos los juegos
            allGames.forEach(gameDiv => gameDiv.classList.remove('active'))

            // Cargar y mostrar el juego seleccionado
            switch (gameToLoad) {
                case 'tic-tac-toe':
                    loadTicTacToe(ticTacToeGame)
                    ticTacToeGame.classList.add('active')
                    break
                case 'guess-number':
                    loadGuessNumber(guessNumberGame)
                    guessNumberGame.classList.add('active')
                    break
                case 'simon-says':
                    loadSimonSays(simonSaysGame)
                    simonSaysGame.classList.add('active')
                    break
                case 'coming-soon':
                    comingSoonGame.classList.add('active')
                    break
            }
        })
    })
})