export default class ScoreBoard {
  constructor(maxMisses = 5) {
    this.score = 0;
    this.misses = 0;
    this.maxMisses = maxMisses;
    this.onGameOver = null; // callback
  }

  hit() {
    this.score += 1;
  }

  miss() {
    this.misses += 1;
    if (this.misses >= this.maxMisses && this.onGameOver) {
      this.onGameOver();
    }
  }

  reset() {
    this.score = 0;
    this.misses = 0;
  }

  get isGameOver() {
    return this.misses >= this.maxMisses;
  }
}
