import goblinImage from "../../img/goblin.png";

export default class PlayingArea {
  constructor(container, size = 4) {
    this.container = container;
    this.size = size;
    this.totalCells = size * size;
    this.init();
  }

  init() {
    this.container.innerHTML = "";
    for (let i = 0; i < this.totalCells; i++) {
      const item = document.createElement("li");
      item.className = "playing-area__item";
      item.dataset.index = i;
      this.container.append(item);
    }
  }

  // Показываем гоблина в ячейке с указанным индексом
  showGoblin(index) {
    this.hideAll(); // сначала удаляем старые изображения
    const cell = this.container.children[index];
    if (!cell) return;

    // Добавляем метку, что в ячейке гоблин
    cell.classList.add("goblin");

    // Создаём и вставляем изображение
    const img = document.createElement("img");
    img.src = goblinImage;
    img.className = "playing-area__img";
    img.alt = "Goblin";
    cell.append(img);
  }

  // Скрываем всех гоблинов (удаляем картинки и убираем класс)
  hideAll() {
    // Удаляем ВСЕ изображения гоблинов из всех ячеек
    const allGoblinImages =
      this.container.querySelectorAll(".playing-area__img");
    allGoblinImages.forEach((img) => img.remove());

    // Также убираем класс .goblin со всех ячеек (на всякий случай)
    const allCells = this.container.querySelectorAll("[data-index]");
    allCells.forEach((cell) => cell.classList.remove("goblin"));
  }

  getCell(index) {
    return this.container.children[index];
  }

  get total() {
    return this.totalCells;
  }
}
