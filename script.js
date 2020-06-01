const hamburgerOpen = document.querySelector('.hamburger')
const menu = document.querySelector('.menu')
const menuLink = document.querySelectorAll('.menu__link')

hamburgerOpen.addEventListener('click', () => {
    menu.classList.toggle('open')
})




for (let i = 0; i < menuLink.length; i++) {
    menuLink[i].addEventListener("click", () => {
        menu.classList.remove('open')
    });
}
