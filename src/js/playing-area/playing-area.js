export default class PlayingArea {
  constructor(container, hitsElement, missesElement) {
    this.container = container;
    this.hitsElement = hitsElement;   
    this.missesElement = missesElement; 
    this.intervalId = null;
    this.hits = 0;
    this.misses = 0;

    if (!container) {
      throw new Error('PlayingArea: container not found');
    }

    this.init();
  }

  init() {
    this.container.innerHTML = '';
    this.hits = 0;
    this.misses = 0;
    this.updateScore();

    for (let i = 0; i < 16; i++) {
      const item = document.createElement('li');
      item.className = 'playing-area__item';
      item.dataset.index = i;
      item.addEventListener('click', () => this.handleCellClick(i));
      this.container.append(item); // используем append
    }
  }

  handleCellClick(clickedIndex) {
    const items = this.container.querySelectorAll('.playing-area__item');
    const hasGoblin = items[clickedIndex].querySelector('.goblin');

    if (hasGoblin) {
      this.hits++;
    } else {
      this.misses++;
    }

    this.updateScore();
  }

  updateScore() {
    if (this.hitsElement) this.hitsElement.textContent = this.hits;
    if (this.missesElement) this.missesElement.textContent = this.misses;
  }

  randomMovingGoblin = () => {
    const items = this.container.querySelectorAll('.playing-area__item');

    
    items.forEach(item => {
      const img = item.querySelector('.goblin-img');
      if (img) item.removeChild(img);
    });

    
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * items.length);
    } while (items[randomIndex].querySelector('.goblin-img'));

    
    const img = document.createElement('img');
    img.src = '../../img/goblin.png'; 
    img.alt = 'Гоблин';
    img.className = 'goblin-img'; 
    img.style.width = '80%';
    img.style.height = 'auto';

    items[randomIndex].append(img); 
  };

  start() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(this.randomMovingGoblin, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    
    this.container.querySelectorAll('.goblin-img').forEach(img => {
      img.remove();
    });
  }
}