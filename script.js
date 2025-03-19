document.addEventListener('DOMContentLoaded', function() {
    const consoleElem = document.getElementById('console');
  
    // Textos que serão "digitados"
    const messages = ["Hello, World... ☕︎", "Eu sou a Sarah e você está no meu portfólio, prazer! ♡"];
    let messageIndex = 0;
    let charIndex = 0;
    let deleting = false;
  
    // Função para digitar texto letra por letra
    function typeText() {
      if (messageIndex < messages.length) {
        const currentMsg = messages[messageIndex];
        if (!deleting) {
          if (charIndex < currentMsg.length) {
            consoleElem.textContent += currentMsg.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100); 
          } else {
            if (messageIndex === 0) {
              deleting = true;
              setTimeout(typeText, 1000); 
            } else {
            }
          }
        } else {
          if (charIndex > 0) {
            consoleElem.textContent = currentMsg.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeText, 50); 
          } else {
            deleting = false;
            messageIndex++;
            setTimeout(typeText, 500); 
          }
        }
      }
    }
  
    setTimeout(typeText, 500);
  
    // Configura Intersection Observer para animar seções ao entrar na tela
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.1 }); 
  
    // Observa todas as seções (ou outros elementos) com classe .fade-in
    document.querySelectorAll('.fade-in').forEach(elem => {
      observer.observe(elem);
    });
  
   // --- Lógica do Jogo da Cobrinha ---
const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

const tileCount = 20; 
const tileSize = canvas.width / tileCount; 
let gameInterval = null;
let gameRunning = false; 


let snake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];

let velocity = { x: 0, y: 0 }; 
let food = generateFood(); 

// Função para desenhar o jogo (chamado em loop)
function drawGame() {
  const headX = snake[0].x + velocity.x;
  const headY = snake[0].y + velocity.y;

  // ⚠️ Evita que o jogo rode antes de uma tecla ser pressionada
  if (velocity.x === 0 && velocity.y === 0) {
    return;
  }

  // ❌ Verifica colisão com paredes
  if (headX < 0 || headY < 0 || headX >= tileCount || headY >= tileCount) {
    endGame();
    return;
  }

  // ❌ Verifica colisão com o próprio corpo
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === headX && snake[i].y === headY) {
      endGame();
      return;
    }
  }

  // ✅ Adiciona nova cabeça
  snake.unshift({ x: headX, y: headY });

  // 🍎 Se a cobra comeu a comida
  if (headX === food.x && headY === food.y) {
    food = generateFood(); // Gera nova comida
  } else {
    snake.pop(); // Se não comeu, remove a cauda
  }

  // 🎨 Limpa o canvas e redesenha o jogo
  ctx.fillStyle = "#333"; // Cor do fundo
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 🍎 Desenha a comida
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

  // 🐍 Desenha a cobra
  ctx.fillStyle = "lime";
  snake.forEach(segment => {
    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  });
}

// Função para gerar uma nova comida em posição válida
function generateFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)); // Evita spawn em cima da cobra
  return newFood;
}

//  Função de término do jogo
function endGame() {
  clearInterval(gameInterval);
  alert("Game Over! 😅");
  resetGame();
}

//  Função para reiniciar o jogo após Game Over
function resetGame() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];
  velocity = { x: 0, y: 0 }; 
  food = generateFood();
  gameRunning = false;
  document.getElementById('startSnake').style.display = 'block';
}

document.addEventListener('keydown', function (e) {
  if (!gameRunning) return; 

  // Impede que as setas movam a página
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
  }

  switch (e.key) {
      case "ArrowLeft":
          if (velocity.x !== 1) velocity = { x: -1, y: 0 };
          break;
      case "ArrowRight":
          if (velocity.x !== -1) velocity = { x: 1, y: 0 };
          break;
      case "ArrowUp":
          if (velocity.y !== 1) velocity = { x: 0, y: -1 };
          break;
      case "ArrowDown":
          if (velocity.y !== -1) velocity = { x: 0, y: 1 };
          break;
  }
});

//  Inicia o jogo ao clicar no botão
document.getElementById('startSnake').addEventListener('click', function () {
  if (!gameRunning) {
    gameRunning = true;
    document.getElementById('startSnake').style.display = 'none';
    gameInterval = setInterval(drawGame, 100);
  }
});

//  Inicializa o jogo parado
resetGame();
});
