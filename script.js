const url = "https://opentdb.com/api.php"
const amount = 1
const type = "multiple"
const question = document.querySelector(".question p")
const questionNum = document.querySelector(".question-num")
const choices = document.querySelectorAll(".choice")
const startButton = document.querySelector(".start button")
const againButton = document.querySelector(".end button")
let hearts = 3

startButton.addEventListener("click", e => {
  const start = document.querySelector(".start")
  start.classList.toggle("hidden")
})

setTrivia()

choices.forEach(choice => {
  choice.addEventListener("click", handleClick)
})

againButton.addEventListener("click", e => { location.reload() })

function setTrivia() {
  fetch(`${url}?amount=${amount}&type=${type}`)
    .then(res => res.json())
    .then(data => {
      console.log(data.results[0])
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

function handleClick(e) {
  if (e.target.dataset.isCorrect === "false") {
    const heart = document.querySelector(`#h${hearts.toString()}`)
    heart.src = "img/gray-heart.png"
    hearts--

    if (!hearts) {
      console.log("you lose!")
      const gameOver = document.querySelector(".end")
      const numCorrect = document.querySelector(".correct")

      numCorrect.innerHTML = `Questions correct: ${parseInt(questionNum.dataset.num) - 1}`

      gameOver.classList.toggle("hidden")
    }
  }
  else {
    setTrivia()
    questionNum.innerHTML = `Question ${++questionNum.dataset.num}`
  }
}