const quizData = [
  {
    question: "Qual dessas ações ajuda o meio ambiente?",
    options: ["Deixar luzes acesas", "Reciclar materiais", "Usar plástico descartável", "Desperdiçar água"],
    correct: 1
  },
  {
    question: "Qual é a fonte de energia renovável?",
    options: ["Carvão", "Energia solar", "Petróleo", "Gás natural"],
    correct: 1
  },
  {
    question: "O que é compostagem?",
    options: ["Queimar lixo", "Transformar resíduos orgânicos em adubo", "Reciclar plástico", "Descartar eletrônicos no lixo comum"],
    correct: 1
  },
  {
    question: "Qual prática economiza água?",
    options: ["Tomar banho longo", "Deixar torneira aberta", "Reutilizar água da chuva", "Lavar carro com mangueira aberta"],
    correct: 2
  },
  {
    question: "Por que plantar árvores é importante?",
    options: ["Aumenta poluição", "Melhora qualidade do ar e clima", "Desperdiça espaço", "Não tem efeito"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

const startBtn = document.getElementById("startQuiz");
const optionsContainer = document.getElementById("options");
const questionText = document.getElementById("question");
const quizButtonsDiv = document.querySelector(".quiz-buttons");
const progressBar = document.getElementById("progress");

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  showQuestion();
  createNextButton();
  updateProgress();
});

function showQuestion() {
  const current = quizData[currentQuestion];
  questionText.textContent = current.question;

  optionsContainer.innerHTML = "";

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.className = "btn option-btn";
    button.addEventListener("click", () => selectOption(index));
    optionsContainer.appendChild(button);
  });
}

function selectOption(selectedIndex) {
  const correctIndex = quizData[currentQuestion].correct;

  if (selectedIndex === correctIndex) {
    score++;
  }

  document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);

  document.querySelectorAll(".option-btn").forEach((btn, idx) => {
    if (idx === correctIndex) {
      btn.style.backgroundColor = "#4CAF50";
    } else if (idx === selectedIndex) {
      btn.style.backgroundColor = "#F44336";
    }
  });

  document.getElementById("nextBtn").disabled = false;
}

function createNextButton() {
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Próximo";
  nextBtn.id = "nextBtn";
  nextBtn.className = "btn";
  nextBtn.disabled = true;
  nextBtn.addEventListener("click", nextQuestion);
  quizButtonsDiv.appendChild(nextBtn);
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    showQuestion();
    document.getElementById("nextBtn").disabled = true;
    updateProgress();
  } else {
    showResult();
  }
}

function updateProgress() {
  const progressPercent = ((currentQuestion) / quizData.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

function showResult() {
  questionText.textContent = `Quiz finalizado! Você acertou ${score} de ${quizData.length} perguntas.`;
  optionsContainer.innerHTML = "";
  document.getElementById("nextBtn").style.display = "none";
  progressBar.style.width = "100%";

  const resultImageDiv = document.getElementById("resultImage");
  resultImageDiv.innerHTML = "";

  let imgSrc = "";
  if(score <= 1){
    imgSrc = "img/gatinho triste.jpg";
  } else if(score <= 3){
    imgSrc = "img/gatinho legal.jpg";
  } else {
    imgSrc = "img/gatinho feliz.jpg";
  }

  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = "Resultado do Quiz";
  img.style.width = "150px";
  img.style.marginTop = "1rem";
  resultImageDiv.appendChild(img);
}

