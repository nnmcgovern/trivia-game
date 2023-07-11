let qNum = 1
let numCorrect = 0
let hearts = 5

setEvents() // set event listeners for all buttons, categories, choices

// * * Functions * *

function setTrivia(category) { // category passed in from handleClickCategory
  const url = "https://opentdb.com/api.php"
  const amount = 1
  const type = "multiple"
  const question = document.querySelector(".question p")
  const questionNum = document.querySelector(".question-num")

  // set question number
  questionNum.innerHTML = `Question ${qNum++}`

  fetch(`${url}?amount=${amount}&type=${type}&category=${category}`)
    .then(res => res.json())
    .then(data => {
      // randomize choice div ids
      let nums = [1, 2, 3, 4]
      let incorrectI = 0 // incorrect answer array index

      shuffle(nums)
      question.innerHTML = data.results[0]["question"] // set question

      // place correct answer in first id of shuffled array
      let choice = document.querySelector(`#ch${nums[0].toString()}`)
      choice.innerHTML = data.results[0]["correct_answer"]
      choice.dataset.isCorrect = "true" // mark as the correct answer

      // iterate through array of incorrect answers and add them to choice divs
      for (let i = 1; i < nums.length; i++) {
        choice = document.querySelector(`#ch${nums[i].toString()}`) // select choice
        choice.innerHTML = data.results[0]["incorrect_answers"][incorrectI] // set choice text
        incorrectI++
        choice.dataset.isCorrect = "false" // mark as incorrect answers
      }
    })
    .catch(err => { console.log(err) })
}

// to shuffle array
function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    const randI = Math.floor(Math.random() * arr.length)
    const temp = arr[i]
    arr[i] = arr[randI]
    arr[randI] = temp
  }
}

// toggle category screen
function toggleCategories() {
  if (hearts) { // should only appear if player still has hearts
    const pickCategory = document.querySelector(".category")
    pickCategory.classList.toggle("hidden")
  }
}

// all event listeners
function setEvents() {
  const overlay = document.querySelector(".overlay")
  const modalInc = document.querySelector(".incorrect")
  const modalCor = document.querySelector(".correct")
  const startButton = document.querySelector(".start button")
  const againButton = document.querySelector(".end button")
  const contButtonInc = document.querySelector(".incorrect button")
  const contButtonCor = document.querySelector(".correct button")
  const categories = document.querySelectorAll(".categories div")
  const choices = document.querySelectorAll(".choice")

  // button to begin the game
  startButton.addEventListener("click", e => {
    const start = document.querySelector(".start")
    start.classList.toggle("hidden")
    toggleCategories()
  })

  // selecting a category
  categories.forEach(cat => {
    cat.addEventListener("click", handleClickCategory)
  })

  // selecting a choice
  choices.forEach(choice => {
    choice.addEventListener("click", handleClickChoice)
  })

  // continue button on incorrect answer modal
  contButtonInc.addEventListener("click", e => {
    overlay.classList.toggle("hidden")
    modalInc.classList.toggle("hidden")
    toggleCategories()
  })

  // continue button on corrrect answer modal
  contButtonCor.addEventListener("click", e => {
    overlay.classList.toggle("hidden")
    modalCor.classList.toggle("hidden")
    toggleCategories()
  })

  // play again button
  againButton.addEventListener("click", e => { location.reload() })
}

// when user clicks a category option, grab id in dataset and pass to setTrivia
function handleClickCategory(e) {
  setPlaceholders()
  setTrivia(e.target.dataset.id)
  toggleCategories()
}

// Loading... text placeholders in question and choices in case API takes a few seconds to respond
function setPlaceholders() {
  const question = document.querySelector(".question p")
  const choices = document.querySelectorAll(".choice")

  question.innerHTML = "Loading..."
  choices.forEach(ch => {
    ch.innerHTML = "Loading..."
  })
}

// when user selects an answer
function handleClickChoice(e) {
  const overlay = document.querySelector(".overlay")

  // if user selects an incorrect answer
  if (e.target.dataset.isCorrect === "false") {
    const heart = document.querySelector(`#h${hearts.toString()}`) // select heart
    const modalInc = document.querySelector(".incorrect") // incorrect modal
    const answerDisp = document.querySelector(".inc-answer") // paragraph that will display correct answer
    const heartsRem = document.querySelector(".inc-hearts") // paragraph that tells user how many hearts remain
    const choices = document.querySelectorAll(".choice")
    let corAnswer = "" // will hold text of correct answer

    // find correct answer
    choices.forEach(ch => {
      if (ch.dataset.isCorrect === "true") {
        corAnswer = ch.innerHTML
      }
    })

    // change heart image from pink to gray, minus one heart
    heart.src = "img/gray-heart.png"
    hearts--

    // toggle incorrect answer modal as well as overlay behind it
    overlay.classList.toggle("hidden")
    modalInc.classList.toggle("hidden")
    answerDisp.innerHTML = `The correct answer was: ${corAnswer}`
    heartsRem.innerHTML = `You have ${hearts.toString()} hearts remaining.`

    // if user has lost last remaining heart, game over
    if (!hearts) {
      const gameOver = document.querySelector(".end") // game over screen
      const ansCorrect = document.querySelector(".ans-correct") // paragraph with number of correct answers
      const questionNum = document.querySelector(".question-num") // num will equal total questions + 1

      // set info then toggle screen
      ansCorrect.innerHTML = `Questions correct: ${numCorrect} / ${--qNum}`
      gameOver.classList.toggle("hidden")
    }
  }
  else { // if user selects correct answer
    const modalCor = document.querySelector(".correct") // select correct modal
    numCorrect++ // add one to number of correct answers
    overlay.classList.toggle("hidden") // toggle overlay
    modalCor.classList.toggle("hidden") // toggle correct modal
  }
}