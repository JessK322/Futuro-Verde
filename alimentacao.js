const tabs = document.querySelectorAll('.tabs li');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const tip = card.querySelector('.tip');
    const text = card.dataset.tip;

    document.querySelectorAll('.card .tip').forEach(t => {
      if (t !== tip) {
        t.classList.remove('show');
        t.textContent = '';
      }
    });

    if (tip.classList.contains('show')) {
      tip.classList.remove('show');
      tip.textContent = '';
    } else {
      tip.textContent = text;
      tip.classList.add('show');
    }
  });
});

const quizButtons = document.querySelectorAll('.quiz-options button');
const quizResult = document.getElementById('quizResult');

quizButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const correct = btn.dataset.correct === "true";
    quizButtons.forEach(b => b.disabled = true);

    if (correct) {
      quizResult.textContent = "Correto! Essa refeição é balanceada e saudável.";
      quizResult.style.color = "#2e7d32";
      btn.style.background = "#a5d6a7";
    } else {
      quizResult.textContent = "Não é ideal. Prefira opções naturais e variadas!";
      quizResult.style.color = "#c62828";
      btn.style.background = "#ef9a9a";
    }

    setTimeout(() => {
      quizButtons.forEach(b => {
        b.disabled = false;
        b.style.background = "#c8e6c9";
      });
      quizResult.textContent = "";
    }, 2500);
  });
});

document.querySelectorAll('.curiosidade').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});
