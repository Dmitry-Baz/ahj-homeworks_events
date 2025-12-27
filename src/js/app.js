import Game from './game/game';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.playing-area');
  const hitsElement = document.getElementById('hits');
  const missesElement = document.getElementById('misses');
  const resultElement = document.getElementById('game-result');

  const game = new Game({
    container,
    size: 4,            
    maxMisses: 5,       
    interval: 1000,
    onScoreUpdate: (score) => {
      if (hitsElement) hitsElement.textContent = score;
    },
    onMissUpdate: (misses) => {
      if (missesElement) missesElement.textContent = misses;
    },
    onGameOver: (finalScore) => {
      resultElement.innerHTML = `
        <div class="game-over-modal">
          <h2>Игра окончена!</h2>
          <p>Ваш счёт: <strong>${finalScore}</strong></p>
          <button onclick="location.reload()">Сыграть ещё</button>
        </div>
      `;
    },
  });

  game.start();
});