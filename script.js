let currentQuestion;
let hearts = 3;
let score = 0;
let hintFree = 1;
let timer;
let timeLeft;

let questions = []; // will hold questions after fetching

async function loadQuestions() {
  try {
    const response = await fetch('questions.json');
    questions = await response.json();
  } catch (err) {
    console.error("Failed to load questions:", err);
  }
}

function getRandomQuestionWeighted() {
  const rand = Math.random();
  let candidates;
  if(rand < 0.5) candidates = questions.filter(q => q.difficulty === 'Easy');
  else if(rand < 0.8) candidates = questions.filter(q => q.difficulty === 'Medium');
  else candidates = questions.filter(q => q.difficulty === 'Hard');
  // ถ้าไม่มีคำถามระดับนั้น ให้ fallback เป็น Easy
  if (candidates.length === 0) candidates = questions.filter(q => q.difficulty === 'Easy');
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function nextQuestion() {
  document.getElementById('hintArea').textContent = '';
  document.getElementById('hintBtn').disabled = false;
  document.getElementById('choices').innerHTML = '';
  document.getElementById('gameOver').textContent = '';
  document.getElementById('gameClear').textContent = '';

  if(score >= 10){
    let endTime = Date.now();
    let playTime = Math.round((endTime - window.startTime) / 1000); // วินาที

    // ขอชื่อผู้เล่น
    const playerName = prompt("🎉 You reached 10 points! Enter your name for the leaderboard:");
    if (playerName) {
      const record = { name: playerName, time: playTime };
      let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
      leaderboard.push(record);
      leaderboard.sort((a, b) => a.time - b.time); // เรียงเวลาเร็วสุดอยู่บน
      localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }
    document.getElementById('gameClear').textContent = '🎉 Game clear! Congratulations! Choose your reward!';
    document.getElementById('codeArea').textContent = '';
    document.getElementById('choices').innerHTML = '';
    document.getElementById('difficultyLevel').textContent = '';
    document.getElementById('hintBtn').style.display = 'none';
    
    // เพิ่มปุ่ม Restart
    const restartBtn = document.createElement('button');
    restartBtn.id = 'restartBtn';
    restartBtn.textContent = 'Restart Game';
    restartBtn.onclick = startGame;
    document.getElementById('game').appendChild(restartBtn);
    return;
  }
  if(hearts <= 0){
    clearInterval(timer);
    document.getElementById('gameOver').textContent = '💀 Game Over! Final Score: ' + score;
    document.getElementById('codeArea').textContent = '';         // ลบโจทย์
    document.getElementById('choices').innerHTML = '';            // ลบช้อยส์
    document.getElementById('difficultyLevel').textContent = '';  // ลบระดับ
    document.getElementById('hintBtn').style.display = 'none';    // ซ่อนปุ่ม Hint

    // สร้างปุ่มรีสตาร์ท
    const restartBtn = document.createElement('button');
    restartBtn.id = 'restartBtn';
    restartBtn.textContent = 'Restart Game';
    restartBtn.onclick = startGame;
    document.getElementById('game').appendChild(restartBtn);
    return;
  }

  currentQuestion = getRandomQuestionWeighted();
  document.getElementById('difficultyLevel').textContent = 
      'Levels: ' + currentQuestion.difficulty + ' | ' + currentQuestion.task;
  document.getElementById('codeArea').textContent = currentQuestion.code;

  currentQuestion.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.classList.add('choice-btn');
    btn.onclick = () => checkAnswer(choice, btn);
    document.getElementById('choices').appendChild(btn);
  });

  timeLeft = currentQuestion.time;
  const timerFill = document.getElementById('timer-fill');
  const timerText = document.getElementById('timer-text');
  clearInterval(timer);
  timerText.textContent = timeLeft + ' seconds';
  timerFill.style.width = '100%';
  timerFill.style.backgroundColor = '#00ff00';

  timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft + ' seconds';
    const progress = (timeLeft / currentQuestion.time) * 100;
    timerFill.style.width = progress + '%';
    if (progress <= 25) {
      timerFill.style.backgroundColor = '#ff0000';
    } else if (progress <= 50) {
      timerFill.style.backgroundColor = '#ffff00';
    } else {
      timerFill.style.backgroundColor = '#00ff00';
    }
    if (timeLeft <= 0) {
      clearInterval(timer);
      loseHeart('Time is up!');
    }
  }, 1000);
}

function checkAnswer(choice, btn){
  clearInterval(timer);
  if(choice === currentQuestion.answer){
    score += currentQuestion.points;
    document.getElementById('score').textContent = score;
    nextQuestion();
  }else{
    btn.style.background = '#800';
    loseHeart('Wrong answer!');
  }
}

function loseHeart(msg){
  hearts--;
  let heartDisplay = '';
  for(let i=0;i<hearts;i++) heartDisplay+='❤';
  document.getElementById('hearts').textContent = heartDisplay;
  document.getElementById('hintArea').textContent = msg;
  if(hearts <=0){
    nextQuestion(); // เรียก nextQuestion เพื่อเคลียร์โจทย์และช้อยส์
  }else{
    setTimeout(nextQuestion,1000);
  }
}

function useHint(){
  if(hintFree > 0){
    document.getElementById('hintArea').textContent = '💡 Hint (Free): ' + currentQuestion.hint;
    hintFree--;
    document.getElementById('hintFree').textContent = hintFree;
    document.getElementById('hintBtn').disabled = true;
  } else {
    if(score >= 0.5){
      score -= 0.5;
      document.getElementById('score').textContent = score;
      document.getElementById('hintArea').textContent = '💡 Hint (Cost 0.5 points): ' + currentQuestion.hint;
      document.getElementById('hintBtn').disabled = true;
    } else {
      document.getElementById('hintArea').textContent = '❌ Not enough points for Hint!';
    }
  }
}

async function startGame() {
  await loadQuestions(); // make sure JSON is loaded
  document.getElementById('restartBtn')?.remove();
  window.startTime = Date.now();
  document.getElementById('rules').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  document.getElementById('startBtn').style.display = 'none';
  document.getElementById('hintBtn').style.display = 'inline-block';
  score = 0;
  hearts = 3;
  hintFree = 1;
  document.getElementById('score').textContent = score;
  document.getElementById('hearts').textContent = '❤❤❤';
  document.getElementById('hintFree').textContent = hintFree;
  nextQuestion();
}
