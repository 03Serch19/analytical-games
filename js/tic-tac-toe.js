function loadTicTacToe(container) {
    container.innerHTML = `
        <h2>X y Cero</h2>
        <div class="board">
            <div class="cell" data-index="0"></div>
            <div class="cell" data-index="1"></div>
            <div class="cell" data-index="2"></div>
            <div class="cell" data-index="3"></div>
            <div class="cell" data-index="4"></div>
            <div class="cell" data-index="5"></div>
            <div class="cell" data-index="6"></div>
            <div class="cell" data-index="7"></div>
            <div class="cell" data-index="8"></div>
        </div>
        <div class="message">Turno de: X (2s)</div>
        <button id="reset-button-ttt">Comenzar Juego</button>
    `

    const cells = container.querySelectorAll('.cell')
    const messageElement = container.querySelector('.message')
    const resetButton = container.querySelector('#reset-button-ttt')
    let currentPlayer = 'x'
    let gameBoard = ['', '', '', '', '', '', '', '', '']
    let gameActive = true
    let timerInterval
    let timeLeft = 2
    let contador = 0
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    function handleCellClick(event) {
      if(contador!== 0){
        const clickedCell = event.target
        const cellIndex = parseInt(clickedCell.dataset.index)

        if (!gameBoard[cellIndex] && gameActive) {
            gameBoard[cellIndex] = currentPlayer
            clickedCell.textContent = currentPlayer.toUpperCase()
            clickedCell.classList.add(currentPlayer)
            clearInterval(timerInterval)
            checkWin()
            if (gameActive) {
                switchPlayer()
                startTimer()
            }
        }
    }
  }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x'
        if (gameActive) {
            messageElement.textContent = `Turno de: ${currentPlayer.toUpperCase()} (${timeLeft}s)`
        }
    }

    function checkWin() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i]
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                messageElement.textContent = `¡${gameBoard[a].toUpperCase()} gana!`
                gameActive = false
                clearInterval(timerInterval)
                highlightWinningCells(a, b, c)
                return
            }
        }
        if (!gameBoard.includes('') && gameActive) {
            messageElement.textContent = '¡Empate!'
            gameActive = false
            clearInterval(timerInterval)
        }
    }

    function highlightWinningCells(a, b, c) {
        cells[a].classList.add('winner')
        cells[b].classList.add('winner')
        cells[c].classList.add('winner')
    }

    function resetGame() {
        if (contador === 0) {
            resetButton.textContent = "Reiniciar Juego"
            contador++
        }
        gameBoard = ['', '', '', '', '', '', '', '', '']
        gameActive = true
        currentPlayer = 'x'
        timeLeft = 2
        messageElement.textContent = `Turno de: X (${timeLeft}s)`
        clearInterval(timerInterval)
        cells.forEach(cell => {
            cell.textContent = ''
            cell.classList.remove('x', 'o', 'winner')
            cell.removeEventListener('click', handleCellClick)
            cell.addEventListener('click', handleCellClick)
        })
        startTimer()
    }

    function startTimer() {
        timeLeft = 2
        updateTimerDisplay()
        timerInterval = setInterval(() => {
            timeLeft--
            updateTimerDisplay()
            if (timeLeft < 0 && gameActive) {
                const opponent = currentPlayer === 'x' ? 'o' : 'x'
                messageElement.textContent = `¡Tiempo agotado para ${currentPlayer.toUpperCase()}! ¡${opponent.toUpperCase()} gana!`
                gameActive = false
                clearInterval(timerInterval)
            }
        }, 1000)
    }

    function updateTimerDisplay() {
        if (gameActive) {
            messageElement.textContent = `Turno de: ${currentPlayer.toUpperCase()} (${timeLeft}s)`
        }
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick))
    resetButton.addEventListener('click', resetGame)
  
}