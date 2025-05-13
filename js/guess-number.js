function loadGuessNumber(container) {
    container.innerHTML = `
        <h2>Adivina el Número</h2>
        <p>Estoy pensando en un número entre 1 y 100. ¡Intenta adivinarlo!</p>
        <input type="number" id="guess-input">
        <button id="guess-button">Adivinar</button>
        <p id="guess-message"></p>
        <button id="new-number-button">Nuevo Número</button>
    `

    let secretNumber = generateRandomNumber()
    const guessInput = container.querySelector('#guess-input')
    const guessButton = container.querySelector('#guess-button')
    const guessMessage = container.querySelector('#guess-message')
    const newNumberButton = container.querySelector('#new-number-button')

    guessButton.addEventListener('click', () => {
        const guess = parseInt(guessInput.value)
        if (isNaN(guess)) {
            guessMessage.textContent = 'Por favor, ingresa un número válido.'
            return
        }

        if (guess === secretNumber) {
            guessMessage.textContent = `¡Correcto! Adivinaste el número (${secretNumber}).`
            guessInput.disabled = true
            guessButton.disabled = true
        } else if (guess < secretNumber) {
            guessMessage.textContent = 'Demasiado bajo. ¡Intenta de nuevo!'
        } else {
            guessMessage.textContent = 'Demasiado alto. ¡Intenta de nuevo!'
        }
        guessInput.value = ''
    })

    newNumberButton.addEventListener('click', () => {
        secretNumber = generateRandomNumber()
        guessMessage.textContent = ''
        guessInput.disabled = false
        guessButton.disabled = false
        guessInput.value = ''
    })
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}