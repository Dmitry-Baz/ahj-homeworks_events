import Game from "./game/game";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".playing-area");
  const maxMisses = 5;

  const game = new Game({
    container,
    size: 4,
    maxMisses: maxMisses,
    interval: 1000,
    onScoreUpdate: (score) => {
      document.getElementById("scoreValue").textContent = score;
    },
    onMissUpdate: (misses) => {
      document.getElementById("missesValue").textContent = misses;
    },
    onGameOver: (finalScore) => {
      document.getElementById("finalScore").textContent = finalScore;
      document.getElementById("gameOverModal").style.display = "flex";
    },
  });
  document.getElementById("maxMissesValue").textContent = maxMisses;
  document.getElementById("maxMissesValue").textContent = 5;
  document.getElementById("restartButton").addEventListener("click", () => {
    document.getElementById("gameOverModal").style.display = "none";
    game.scoreBoard.reset();
    game.start();
  });
  game.start();
});
