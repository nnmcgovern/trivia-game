let numCorrect = 0
let hearts = 5

setEvents()
toggleCategories()

// * * Functions * *

function setTrivia(category) {
  const url = "https://opentdb.com/api.php"
  const amount = 1
  const type = "multiple"
  const question = document.querySelector(".question p")
  const questionNum = document.querySelector(".question-num")

  fetch(`${url}?amount=${amount}&type=${type}&category=${category}`)
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

function toggleCategories() {
  if (hearts) {
    const pickCategory = document.querySelector(".category")
    pickCategory.classList.toggle("hidden")
  }
}

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

  startButton.addEventListener("click", e => {
    const start = document.querySelector(".start")
    start.classList.toggle("hidden")
    toggleCategories()
  })

  categories.forEach(cat => {
    cat.addEventListener("click", handleClickCategory)
  })

  choices.forEach(choice => {
    choice.addEventListener("click", handleClickChoice)
  })

  contButtonInc.addEventListener("click", e => {
    overlay.classList.toggle("hidden")
    modalInc.classList.toggle("hidden")
    toggleCategories()
  })

  contButtonCor.addEventListener("click", e => {
    overlay.classList.toggle("hidden")
    modalCor.classList.toggle("hidden")
    toggleCategories()
  })

  againButton.addEventListener("click", e => { location.reload() })
}

function handleClickCategory(e) {
  setPlaceholders()
  setTrivia(e.target.dataset.id)
  toggleCategories()
}

function setPlaceholders() {
  const question = document.querySelector(".question p")
  const choices = document.querySelectorAll(".choice")

  question.innerHTML = "Loading..."
  choices.forEach(ch => {
    ch.innerHTML = "Loading..."
  })
}

function handleClickChoice(e) {
  const overlay = document.querySelector(".overlay")

  if (e.target.dataset.isCorrect === "false") {
    const heart = document.querySelector(`#h${hearts.toString()}`)
    const modalInc = document.querySelector(".incorrect")
    const answerDisp = document.querySelector(".inc-answer")
    const heartsRem = document.querySelector(".inc-hearts")
    const choices = document.querySelectorAll(".choice")
    let corAnswer = ""

    choices.forEach(ch => {
      if (ch.dataset.isCorrect === "true") {
        corAnswer = ch.innerHTML
      }
    })

    heart.src = "img/gray-heart.png"
    hearts--

    overlay.classList.toggle("hidden")
    modalInc.classList.toggle("hidden")
    answerDisp.innerHTML = `The correct answer was: ${corAnswer}`
    heartsRem.innerHTML = `You have ${hearts.toString()} hearts remaining.`

    if (!hearts) {
      const gameOver = document.querySelector(".end")
      const ansCorrect = document.querySelector(".ans-correct")
      const questionNum = document.querySelector(".question-num")

      ansCorrect.innerHTML = `Questions correct: ${numCorrect} / ${--questionNum.dataset.num}`
      gameOver.classList.toggle("hidden")
    }
  }
  else {
    const modalCor = document.querySelector(".correct")
    numCorrect++
    overlay.classList.toggle("hidden")
    modalCor.classList.toggle("hidden")
  }
}