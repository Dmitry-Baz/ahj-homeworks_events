export default class PlayingArea {
  constructor(container, size = 4) {
    this.container = container;
    this.size = size; // например, 4x4 = 16 ячеек
    this.totalCells = size * size;
    this.init();
  }

  init() {
    this.container.innerHTML = '';
    for (let i = 0; i < this.totalCells; i++) {
      const item = document.createElement('li');
      item.className = 'playing-area__item';
      item.dataset.index = i;
      this.container.appendChild(item);
    }
  }

  showGoblin(index) {
    this.hideAll();
    const cell = this.container.children[index];
    if (cell) cell.classList.add('goblin');
  }

  hideAll() {
    this.container.querySelectorAll('.goblin').forEach(el => {
      el.classList.remove('goblin');
    });
  }

  getCell(index) {
    return this.container.children[index];
  }

  get total() {
    return this.totalCells;
  }
}