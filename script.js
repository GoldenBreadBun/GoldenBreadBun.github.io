// Define an array of timer objects, each with a unique id, default time, and current time
const timers = [
  {
    id: 1,
    defaultTime: 120,
    currentTime: 120,
    isRunning: false,
    interval: null,
  }, // Timer 1 - 2 minutes
  {
    id: 2,
    defaultTime: 300,
    currentTime: 300,
    isRunning: false,
    interval: null,
  }, // Timer 2 - 5 minutes
]

function startTimer(timerId) {
  const timer = timers.find((t) => t.id === timerId)
  if (!timer.isRunning) {
    timer.isRunning = true
    timer.interval = setInterval(() => updateTimer(timerId), 1000)
  }
}

function updateTimer(timerId) {
  const timer = timers.find((t) => t.id === timerId)
  timer.currentTime--
  document.getElementById(`timer${timerId}`).textContent = formatTime(
    timer.currentTime,
  )

  // Stop if the timer reaches zero
  if (timer.currentTime <= 0) {
    clearInterval(timer.interval)
    timer.isRunning = false
    timer.currentTime = timer.defaultTime // Reset to default if needed
  }
}

function togglePause(timerId) {
  const timer = timers.find((t) => t.id === timerId)
  if (timer.isRunning) {
    clearInterval(timer.interval)
  } else {
    timer.interval = setInterval(() => updateTimer(timerId), 1000)
  }
  timer.isRunning = !timer.isRunning
}

function resetTimer(timerId) {
  const timer = timers.find((t) => t.id === timerId)
  clearInterval(timer.interval)
  timer.isRunning = false
  timer.currentTime = timer.defaultTime
  document.getElementById(`timer${timerId}`).textContent = formatTime(
    timer.currentTime,
  )
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
}
