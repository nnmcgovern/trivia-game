const choices = document.querySelectorAll(".choice")
const questionNum = document.querySelector(".question-num")
let hearts = 3
let numCorrect = 0

setEvents()
setTrivia()

// * * Functions * *

function setTrivia() {
  const url = "https://opentdb.com/api.php"
  const amount = 1
  const type = "multiple"
  const question = document.querySelector(".question p")

  fetch(`${url}?amount=${amount}&type=${type}`)
    .then(res => res.json())
    .then(data => {
      questionNum.innerHTML = `Question ${questionNum.dataset.num++}`
      let nums = [1, 2, 3, 4]
      let incorrectI = 0

      shuffle(nums)
      question.innerHTML = data.results[0]["question"]

      let choice = document.querySelector(`#ch${nums[0].toString()}`)
      choice.innerHTML = data.results[0]["correct_answer"]
      choice.dataset.isCorrect = "true"

      for (let i = 1; i < nums.length; i++) {
        choice = document.querySelector(`#ch${nums[i].toString()}`)
        choice.innerHTML = data.results[0]["incorrect_answers"][incorrectI]
        incorrectI++
        choice.dataset.isCorrect = "false"
      }
    })
    .catch(err => { console.log(err) })
}

function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    const randI = Math.floor(Math.random() * arr.length)
    const temp = arr[i]
    arr[i] = arr[randI]
    arr[randI] = temp
  }
}

function setEvents() {
  const modalInc = document.querySelector(".incorrect")
  const startButton = document.querySelector(".start button")
  const againButton = document.querySelector(".end button")
  const contButton = document.querySelector(".incorrect button")

  startButton.addEventListener("click", e => {
    const start = document.querySelector(".start")
    start.classList.toggle("hidden")
  })

  choices.forEach(choice => {
    choice.addEventListener("click", handleClickChoice)
  })

  contButton.addEventListener("click", e => {
    modalInc.classList.toggle("hidden")
    setTrivia()
  })

  againButton.addEventListener("click", e => { location.reload() })
}

function handleClickChoice(e) {
  if (e.target.dataset.isCorrect === "false") {
    const heart = document.querySelector(`#h${hearts.toString()}`)
    const modalInc = document.querySelector(".incorrect")
    const answerDisp = document.querySelector(".inc-answer")
    const heartsRem = document.querySelector(".inc-hearts")
    let corAnswer = ""

    choices.forEach(ch => {
      if (ch.dataset.isCorrect === "true") {
        corAnswer = ch.innerHTML
      }
    })

    heart.src = "img/gray-heart.png"
    hearts--

    modalInc.classList.toggle("hidden")
    answerDisp.innerHTML = `The correct answer was: ${corAnswer}`
    heartsRem.innerHTML = `You have ${hearts.toString()} hearts remaining.`

    if (!hearts) {
      const gameOver = document.querySelector(".end")
      const correct = document.querySelector(".correct")

      correct.innerHTML = `Questions correct: ${numCorrect} / ${--questionNum.dataset.num}`

      gameOver.classList.toggle("hidden")
    }
  }
  else {
    setTrivia()
    numCorrect++
  }
}