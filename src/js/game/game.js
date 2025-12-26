import PlayingArea from '../playing-area/playing-area';
import ScoreBoard from '../score-board/score-board';

export default class Game {
  constructor({
    container,
    onScoreUpdate,
    onMissUpdate,
    onGameOver,
    size = 4,
    maxMisses = 5,
    interval = 1000,
  }) {
    this.playingArea = new PlayingArea(container, size);
    this.scoreBoard = new ScoreBoard(maxMisses);
    this.interval = interval;
    this.intervalId = null;

    this.onScoreUpdate = onScoreUpdate || (() => {});
    this.onMissUpdate = onMissUpdate || (() => {});
    this.onGameOver = onGameOver || (() => {});

    this.lastIndex = -1;

    
    this.handleCellClick = this.handleCellClick.bind(this);

    
    this.playingArea.container.addEventListener('click', this.handleCellClick);

    this.scoreBoard.onGameOver = () => {
      this.stop();
      this.onGameOver(this.scoreBoard.score);
    };
  }

  getRandomIndex() {
    const { total } = this.playingArea;
    let index;
    do {
      index = Math.floor(Math.random() * total);
    } while (index === this.lastIndex);
    this.lastIndex = index;
    return index;
  }

  start() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.playingArea.showGoblin(this.getRandomIndex());
      setTimeout(() => {
        if (!this.playingArea.container.querySelector(`[data-index="${this.lastIndex}"].goblin`)) return;
        this.scoreBoard.miss();
        this.onMissUpdate(this.scoreBoard.misses);
      }, this.interval - 50);
    }, this.interval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.playingArea.hideAll();
    this.playingArea.container.removeEventListener('click', this.handleCellClick);
  }

  handleCellClick(e) {
    const cell = e.target.closest('[data-index]');
    if (!cell) return;

    const index = Number(cell.dataset.index);

    if (cell.classList.contains('goblin')) {
      cell.classList.remove('goblin');
      this.scoreBoard.hit();
      this.onScoreUpdate(this.scoreBoard.score);
    }
  }
}