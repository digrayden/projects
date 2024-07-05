window.onload = function (){
    let actualCity = {name: 'Минск', offset: 3};
    let stopwatchInterval;
    let timeOver = 0;
    let running = false;
    let colonFlash = true;
    
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => openTab(tab.dataset.tab));
    });
    
    document.querySelectorAll('.city-buttons button').forEach(button => {
      button.addEventListener('click', () => setCity(button.dataset.city, parseInt(button.dataset.offset, 10)));
    });
    
    document.getElementById('stopwatch-button').addEventListener('click', startStopStopwatch);
    
    function openTab(tabName) {
      document.querySelectorAll('.tab, .content').forEach(tab => tab.classList.remove('active'));
      document.querySelector(`.tab[data-tab="${tabName}"]`).classList.add('active');
      document.getElementById(tabName).classList.add('active');
    }
    
    function setCity(name, offset) {
      actualCity = {name, offset};
      document.querySelectorAll('.city-buttons button').forEach(button => button.classList.remove('active'));
      document.querySelector(`.city-buttons button[data-city="${name}"][data-offset="${offset}"]`).classList.add('active');
      updateClock();
    }
    
    function updateClock() {
      const date = new Date();
      const gmt = date.getTime() + (date.getTimezoneOffset() * 60000);
      const localTime = new Date(gmt + (3600000 * actualCity.offset));
      const hours = localTime.getHours().toString().padStart(2, '0');
      const minutes = localTime.getMinutes().toString().padStart(2, '0');
      const seconds = localTime.getSeconds().toString().padStart(2, '0');
      const colon = colonFlash ? ':' : '&nbsp;';
      document.querySelector('.time').innerHTML = `${hours}${colon}${minutes}${colon}${seconds}`;
      document.getElementById('timezone').innerText = `${actualCity.name}, ${actualCity.offset > 0 ? '+' : ''}${actualCity.offset} часа к Гринвичу`;
      document.getElementById('city-image').src = `images/${actualCity.name}.jpg`;
    }
    
    function updateStopwatch() {
      const hours = Math.floor(timeOver / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((timeOver % 3600) / 60).toString().padStart(2, '0');
      const seconds = (timeOver % 60).toString().padStart(2, '0');
      document.querySelector('.stopwatch').innerHTML = `${hours}:${minutes}:${seconds}`;
    }
    
    function startStopStopwatch() {
      const button = document.getElementById('stopwatch-button');
      if (running) {
          clearInterval(stopwatchInterval);
          button.innerHTML = 'Сброс';
          running = false;
      } else if (button.innerHTML === 'Сброс') {
          timeOver = 0;
          updateStopwatch();
          button.innerHTML = 'Пуск';
      } else {
          stopwatchInterval = setInterval(() => {
              timeOver++;
              updateStopwatch();
          }, 1000);
          button.innerHTML = 'Стоп';
          running = true;
      }
    }
    
    setInterval(() => {
      colonFlash = !colonFlash;
      updateClock();
      if (running) {
          updateStopwatch();
      }
    }, 500);
    
    setInterval(updateClock, 1000);
    }