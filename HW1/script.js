/*Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе. Каждое занятие имеет название, время проведения, максимальное количество участников и текущее количество записанных участников.

1. Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.

2. Загрузите информацию о занятиях из предоставленных JSON-данных. Каждое занятие должно отображаться на странице с указанием его названия, времени проведения, максимального количества участников и текущего количества записанных участников.

3. Пользователь может нажать на кнопку "Записаться" для записи на занятие. Если максимальное количество участников уже достигнуто, кнопка "Записаться" становится неактивной.

4. После успешной записи пользователя на занятие, обновите количество записанных участников и состояние кнопки "Записаться".

5. Запись пользователя на занятие можно отменить путем нажатия на кнопку "Отменить запись". После отмены записи, обновите количество записанных участников и состояние кнопки.

6. Все изменения (запись, отмена записи) должны сохраняться и отображаться в реальном времени на странице.

7. При разработке используйте Bootstrap для стилизации элементов.*/

const url1 = "./data.json";

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

async function dataToLS(url) {
    const data = await fetchData(url);
    data.forEach(subject => {
        localStorage.setItem(subject.id, JSON.stringify(subject));
    });
}

dataToLS(url1);

const showSchedule = () => {
    document.addEventListener("DOMContentLoaded", () => {

        for (let i = 0; i <= localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = JSON.parse(localStorage.getItem(key));

            scheduleEl.insertAdjacentHTML("beforeend", `
   
            <li class="subject border border-success p-2 mb-2" style="list-style-type: none;">
                <h2 class="subject-name d-flex justify-content-center text-primary-emphasis">Предмет - ${value.subject}</h2>
                <h3 class="subject-time d-flex justify-content-center">Начало занятий: ${value.subjectTime}</h3>
                <p class="visitors-max d-flex justify-content-center">Максимальное количество участников: ${value.visitorsMax}</p>
                <p class="d-flex justify-content-center">Текущее количество участников: <span class="visitors-current text-success">${value.visitorsCurrent}</span> <span id="checked" style="display: none;"> - Вы записаны</span></p>
                <div class="d-flex justify-content-center">
                <button id="${value.id}" class="signup-btn btn btn-success">${(value.visitorsCurrent >= value.visitorsMax) ? 'Нет мест' : 'Записаться'}</button>
                <button class="cancel-signup btn btn-outline-warning" style="display: none;">Отменить запись</button></div>
                
            </li>
        `)
        }
    })
}

showSchedule();

const scheduleEl = document.querySelector('.subject-list');

scheduleEl.addEventListener('click', (e) => {
    const target = e.target;
    const parentEl = target.closest('li');
    const visitorsEl = parentEl.querySelector('.visitors-current');

    if (target.textContent == 'Записаться') {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = JSON.parse(localStorage.getItem(key));

            if (key === target.id) {

                if (value.visitorsCurrent < value.visitorsMax) {
                    value.visitorsCurrent++;

                    localStorage.setItem(key, JSON.stringify(value));

                    target.setAttribute('disabled', '');
                    target.classList.add('btn');
                    visitorsEl.textContent = value.visitorsCurrent;

                    const signUpSpan = parentEl.querySelector('#checked');
                    signUpSpan.style.display = 'block';
                    signUpSpan.style.color = 'green';
                    signUpSpan.style.fontWeight = '700';

                    const cancelSingUpBtn = parentEl.querySelector('.cancel-signup');
                    cancelSingUpBtn.style.display = 'block';
                    cancelSingUpBtn.classList.add('btn-danger')
                } else if (value.visitorsCurrent >= value.visitorsMax) {
                    target.setAttribute('disabled', '');
                }
            }
        }
    }

    if (target.textContent == 'Отменить запись') {
        const signUpBtn = parentEl.querySelector('.signup-btn');
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = JSON.parse(localStorage.getItem(key));

            if (key === signUpBtn.id) {
                value.visitorsCurrent--;
                visitorsEl.textContent = value.visitorsCurrent;

                localStorage.setItem(key, JSON.stringify(value));

                signUpBtn.disabled = false;
                const signUpSpan = parentEl.querySelector('#checked');
                signUpSpan.style.display = 'none';
                const cancelSignUpBtn = parentEl.querySelector('.cancel-signup');
                cancelSignUpBtn.style.display = 'none';
            }
        }
    }
})