const burgerBtn = document.querySelector('.burger-btn');
const menuMain = document.querySelector('.header__nav');
const infoBlock = document.querySelector('.header__info-links');

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    menuMain.classList.toggle('active');
    infoBlock.classList.toggle('active');
})

new Swiper('.hero__content--right', {
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 1000,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});


const titleMain = document.querySelector('.hero__title');

function updateTitle() {
    if (window.innerWidth < 1700) {
        titleMain.innerHTML = 'Металл от производителя';
    } else {
        titleMain.innerHTML = 'Металлоконструкции от производителя';
    }
}
// Вызов функции при загрузке страницы
updateTitle();

// Добавляем обработчик события resize
window.addEventListener('resize', updateTitle);