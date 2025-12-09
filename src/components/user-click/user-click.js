import endGame from '../end-game/end-game';

export default function userClick(timerId) {
    const playingItemsCollection = document.querySelectorAll('.playing-area__item');

    const userPoints = document.querySelector('.user-got-points__number');

    let userFailPoints = 0;

    for (const playingItem of playingItemsCollection) {
      playingItem.addEventListener('click', (e) => {
          //console.log(e.target.className);

          if (e.target.className === 'playing-area__img') {
            userPoints.textContent = +userPoints.textContent + 1;
          } else {
            userFailPoints++;
            console.log(userFailPoints);
            if (userFailPoints >= 5) {
                endGame();
                clearTimeout(timerId);
            }
          }
      })
    }
}
