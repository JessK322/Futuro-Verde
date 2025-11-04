    const canvas = document.getElementById('energyParticles');
    const ctx = canvas.getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    let particles = [];

    class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1.5 + 0.2;
        this.color = `rgba(255, 214, 10, ${Math.random() * 0.8 + 0.2})`;
    }
    update() {
        this.y += this.speedY;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
    }
    }

    function init() {
    for (let i = 0; i < 120; i++) particles.push(new Particle());
    }
    function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
    }
    init();
    animate();

    const quizData = [
    { q: "Qual é a principal fonte de energia do planeta?", o: ["Solar", "Nuclear", "Eólica", "Carvão"], a: 0 },
    { q: "A energia eólica vem de qual elemento natural?", o: ["Água", "Vento", "Sol", "Terra"], a: 1 },
    { q: "O que caracteriza uma energia renovável?", o: ["Não se esgota", "É cara", "Polui", "Depende do petróleo"], a: 0 },
    { q: "Qual destas NÃO é uma fonte limpa?", o: ["Solar", "Eólica", "Hidrelétrica", "Carvão"], a: 3 },
    { q: "O que é eficiência energética?", o: ["Desperdiçar energia", "Usar energia de forma inteligente", "Gerar poluição", "Usar mais energia"], a: 1 }
    ];

    let current = 0;
    let score = 0;
    const question = document.getElementById("question");
    const options = document.getElementById("options");
    const result = document.getElementById("quizResult");
    const finalMsg = document.getElementById("finalMsg");

    function loadQuestion() {
    const q = quizData[current];
    question.textContent = q.q;
    options.innerHTML = "";
    q.o.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(i);
        options.appendChild(btn);
    });
    }

    function checkAnswer(i) {
    if (i === quizData[current].a) {
        result.textContent = "Correto!";
        score++;
    } else {
        result.textContent = "Resposta incorreta.";
    }
    current++;
    setTimeout(() => {
        if (current < quizData.length) {
        result.textContent = "";
        loadQuestion();
        } else {
        question.textContent = "";
        options.innerHTML = "";
        result.textContent = "";
        finalMsg.classList.remove("hidden");
        finalMsg.innerHTML += `<br><br>Seu desempenho: ${score}/${quizData.length}`;
        }
    }, 1500);
    }

    document.getElementById("finishBtn").addEventListener("click", () => {
    loadQuestion();
    document.getElementById("finishBtn").classList.add("hidden");
    });
