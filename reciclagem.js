const tips = {
  papel: "O papel deve estar limpo e seco. Evite papéis engordurados ou plastificados.",
  plastico: "Retire resíduos antes de reciclar. Tampas e rótulos podem ser reciclados também!",
  vidro: "Lave bem e evite quebrar o vidro. Não misture com cerâmica ou espelhos.",
  metal: "Latas e alumínios devem estar limpos. São 100% recicláveis!",
  organico: "Restos de comida viram adubo! Faça compostagem se possível."
};

const images = {
  papel: "img/papel2.png",
  plastico: "img/plastico2.png",
  vidro: "img/vidro2.png",
  metal: "img/metal.png",
  organico: "img/lixo organico.png",
  metal: "img/metal.png",
  
};

function showTip(material) {
  const box = document.getElementById("tipBox");
  const img = document.getElementById("tipImage");

  if (box.textContent === tips[material]) {
    box.classList.add("hidden");
    box.textContent = '';
    img.classList.add("hidden");
    img.src = '';
  } else {
    box.textContent = tips[material];
    box.classList.remove("hidden");

    img.src = images[material];
    img.alt = material;
    img.classList.remove("hidden");
  }
}

const tabs = document.querySelectorAll('ul.tabs li');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const target = tab.dataset.tab;
    tabContents.forEach(c => {
      c.classList.remove('active');
      if (c.id === target) c.classList.add('active');
    });
  });
});

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 4 + 2;
    this.speedY = Math.random() * 1 + 0.5;
    this.color = `rgba(42,122,79,0.7)`;
  }
  update() {
    this.y += this.speedY;
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

const quizData = [
  {question: "Qual desses materiais NÃO é reciclável?", options: ["Papel limpo", "Restos de comida", "Alumínio", "Vidro"], answer:1},
  {question: "O que devemos fazer antes de reciclar plástico?", options:["Lavar e retirar resíduos","Colocar na lixeira suja","Quebrar o plástico","Queimar o plástico"], answer:0},
  {question: "Vidro pode ser reciclado?", options:["Sim, infinitamente","Não","Apenas algumas vezes","Depende da cor"], answer:0},
  {question: "O que acontece com restos de comida orgânica?", options:["Viram adubo","Viram lixo tóxico","Não se decompõem","Viram plástico"], answer:0},
  {question: "Alumínio é 100% reciclável?", options:["Sim","Não","Apenas latas","Depende da marca"], answer:0},
  {question: "Qual material precisa ser limpo antes de reciclar?", options:["Plástico","Vidro","Metal","Todos os anteriores"], answer:3},
  {question: "Papel plastificado pode ser reciclado?", options:["Não","Sim","Somente se cortado","Depende do tamanho"], answer:0},
  {question: "O que podemos fazer com restos de frutas e verduras?", options:["Compostagem","Queimar","Colocar no lixo comum","Jogar no rio"], answer:0},
  {question: "PET pode se tornar?", options:["Nova garrafa","Roupas","Tecido sintético","Todas as anteriores"], answer:3},
  {question: "Latas devem estar?", options:["Suja","Limpa","Misturada com vidro","Não importa"], answer:1}
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("quiz-question");
const optionsEl = document.getElementById("quiz-options");
const resultEl = document.getElementById("quizResult");
const quizImg = document.getElementById("quizImage");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  resultEl.textContent = "";
  quizImg.classList.add("hidden");
  quizImg.src = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(index);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const q = quizData[currentQuestion];
  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach(btn => btn.disabled = true);

  if(selected === q.answer){
    buttons[selected].classList.add("correct");
    resultEl.textContent = "Acertou!";
    score++;
  } else {
    buttons[selected].classList.add("wrong");
    resultEl.textContent = "Errou!";
  }

  setTimeout(() => {
    currentQuestion++;
    if(currentQuestion < quizData.length){
      loadQuestion();
    } else {
      showFinalResult();
    }
  }, 2000);
}

function showFinalResult(){
  questionEl.textContent = "Quiz finalizado!";
  optionsEl.innerHTML = "";
  resultEl.textContent = `Você acertou ${score} de ${quizData.length} perguntas.`;

  if(score === quizData.length){
    quizImg.src = "img/perfeito.png";
  } else if(score >= 7){
    quizImg.src = "img/muito bom.png";
  } else if(score >=4){
    quizImg.src = "img/bom.png";
  } else{
    quizImg.src = "img/precisa melhorar.png";
  }

  quizImg.alt = "Resultado do quiz";
  quizImg.classList.remove("hidden");
}

loadQuestion();
