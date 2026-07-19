import { defineStore } from 'pinia'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    questions: [],
    currentIndex: 0,
    score: 0,
    selected: null,
    shuffledOptions: [],
    answers: [],
    timerEnabled: false,
    timerDuration: 15,
    timeLeft: 15,
  }),

  getters: {
    currentQuestion: (state) => state.questions[state.currentIndex] || null,
    progress: (state) =>
      state.questions.length > 0
        ? (state.currentIndex / state.questions.length) * 100
        : 0,
    isLastQuestion: (state) => state.currentIndex >= state.questions.length - 1,
    totalQuestions: (state) => state.questions.length,
  },

  actions: {
    startQuiz(questions, timerEnabled = false, timerDuration = 15) {
      this.questions = questions
      this.currentIndex = 0
      this.score = 0
      this.selected = null
      this.answers = []
      this.timerEnabled = timerEnabled
      this.timerDuration = timerDuration
      this.timeLeft = timerDuration
      this.shuffleOptions()
    },

    shuffleOptions() {
      const q = this.currentQuestion
      this.shuffledOptions = q ? shuffle(q.options) : []
    },

    selectAnswer(opt) {
      if (this.selected !== null) return
      this.selected = opt
      const correct = opt === this.currentQuestion?.answer
      if (correct) this.score++
      this.answers.push({
        question: this.currentQuestion,
        selected: opt,
        correct,
      })
    },

    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++
        this.selected = null
        this.timeLeft = this.timerDuration
        this.shuffleOptions()
      }
    },

    reset() {
      this.$reset()
    },
  },
})
