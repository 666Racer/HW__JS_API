window.addEventListener('load', () => {
    renderPhoto();
});

async function getRandomPhoto() {
    const accessKey = 'zVcHHmcehTnEIipPhROxK9UbHNzoBC5MgWrqrZJixPA';
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`);
            const photo = await response.json();
            return photo;
        } catch (error) {
            console.error('Ошибка при загрузке фотографий:', error);
            return {};
        }
    }

async function renderPhoto() {
    const photo = await getRandomPhoto();
    const imageBox = document.querySelector('.image__box');
    const photographerInfo = document.querySelector('.image__photographer-info');
    if (photo) {
        const img = document.createElement('img');

        img.classList.add('image');
        img.src = photo.urls.small;
        img.alt = photo.alt_description;

        imageBox.appendChild(img);
        photographerInfo.textContent = `${photo.user.name}`;

        const likesCounter = document.querySelector('.image__likes-counter');
        likesCounter.textContent = `${photo.likes}`;
    }
}

const counterButton = document.querySelector('.image__likes-button');
counterButton.addEventListener('click', function () {
    increaseCounter();
});

function increaseCounter() {
    const likesCounter = document.querySelector('.image__likes-counter');
    const currentLikes = parseInt(likesCounter.textContent, 10);
    likesCounter.textContent = currentLikes++;
}