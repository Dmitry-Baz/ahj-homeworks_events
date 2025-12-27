import Game from './game/game';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.playing-area');

  const game = new Game({
    container,
    size: 4,           
    maxMisses: 5,      
    interval: 1000,    
    onScoreUpdate: (score) => {
      console.log('Очки:', score);
    },
    onMissUpdate: (misses) => {
      console.log('Промахи:', misses);
    },
    onGameOver: (finalScore) => {
      alert(`Игра окончена! Ваш счёт: ${finalScore}`);
    },
  });

  game.start();
});
