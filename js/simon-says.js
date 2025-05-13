function loadSimonSays(container) {
    container.innerHTML = `
        <h2>Simón Dice</h2>
        <div class="simon-buttons">
            <button class="simon-button green" data-color="green"></button>
            <button class="simon-button red" data-color="red"></button>
            <button class="simon-button yellow" data-color="yellow"></button>
            <button class="simon-button blue" data-color="blue"></button>
        </div>
        <button id="start-simon">Comenzar Juego</button>
        <p id="simon-message">¡Prepárate para empezar!</p>
        <p>Nivel: <span id="simon-level">1</span></p>
    `

    const buttons = container.querySelector('.simon-buttons').children
    const startButton = container.querySelector('#start-simon')
    const message = container.querySelector('#simon-message')
    const levelDisplay = container.querySelector('#simon-level')
    let sequence = []
    let userSequence = []
    let level = 1
    let canClick = false
    let gameStarted = false
    let sequenceIndex = 0 // Para rastrear en qué parte de la secuencia está el usuario

    // Función para generar un color aleatorio para la secuencia
    function getRandomColor() {
        const colors = ['green', 'red', 'yellow', 'blue']
        return colors[Math.floor(Math.random() * colors.length)]
    }

    // Función para iluminar un botón
    function flashButton(color) {
        const button = Array.from(buttons).find(btn => btn.dataset.color === color)
        if (button) {
            button.classList.add('active')
            // Reproducir un sonido corto (opcional)
            playSound(color)
            setTimeout(() => {
                button.classList.remove('active')
            }, 500)
        }
    }

    // Función para reproducir un sonido (opcional, requiere archivos de sonido)
    function playSound(color) {
        const audio = new Audio(`sounds/${color}.mp3`) // Asume archivos green.mp3, red.mp3, etc. en una carpeta 'sounds'
        audio.play()
    }

    // Función principal para mostrar la secuencia a seguir
    function playSequence() {
        canClick = false // Deshabilitar clics del usuario durante la secuencia
        sequenceIndex = 0
        let i = 0
        const interval = setInterval(() => {
            flashButton(sequence[i])
            i++
            if (i >= sequence.length) {
                clearInterval(interval)
                message.textContent = `Tu turno. ¡Repite la secuencia!`
                canClick = true // Habilitar clics del usuario
                sequenceIndex = 0 // Reiniciar el índice de la secuencia del usuario
            }
        }, 1000)
    }

    // Función para manejar el clic de un botón por el usuario
    function handleButtonClick(event) {
        if (!canClick || !gameStarted) return

        const clickedColor = event.target.dataset.color
        flashButton(clickedColor)
        userSequence.push(clickedColor)

        // Verificar si el color clicado coincide con el color actual en la secuencia
        if (clickedColor === sequence[sequenceIndex]) {
            sequenceIndex++

            // Verificar si el usuario ha completado la secuencia actual
            if (userSequence.length === sequence.length) {
                message.textContent = `¡Correcto! Nivel ${level} completado. ¡Siguiente ronda!`
                canClick = false
                userSequence = [] // Reiniciar la secuencia del usuario
                level++
                levelDisplay.textContent = level
                setTimeout(startGame, 1500)
            }
        } else {
            // El usuario se equivocó
            message.textContent = `¡Incorrecto! Llegaste al nivel ${level}. ¡Intenta de nuevo!`
            canClick = false
            gameStarted = false
            startButton.textContent = 'Jugar de Nuevo'
            sequence = [] // Reiniciar la secuencia
            userSequence = [] // Reiniciar la secuencia del usuario
            level = 1
            levelDisplay.textContent = level
        }
    }

    // Función para iniciar una nueva ronda
    function startGame() {
        sequence.push(getRandomColor()) // Añadir un nuevo color a la secuencia
        message.textContent = '¡Simón Dice!'
        startButton.textContent = 'Comenzar' // El texto cambia solo si el juego se reinicia
        gameStarted = true
        levelDisplay.textContent = level
        setTimeout(playSequence, 1000)
    }

    // Evento para el botón de comenzar
    startButton.addEventListener('click', () => {
        if (!gameStarted) {
            startGame()
        } else {
            // Si el juego ya comenzó y el usuario hace clic en "Comenzar" (ahora "Jugar de Nuevo")
            startGame()
        }
    })

    // Eventos para los botones de color
    Array.from(buttons).forEach(button => {
        button.addEventListener('click', handleButtonClick)
    })
}