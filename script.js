const hamburgerOpen = document.querySelector('.hamburger')
const hamburgerElement = document.querySelector('.hamburger__element')
const menu = document.querySelector('.menu')
const menuLink = document.querySelectorAll('.menu__link')


hamburgerOpen.addEventListener('click', () => {
    menu.classList.toggle('open')
    hamburgerOpen.classList.toggle('change')

})




for (let i = 0; i < menuLink.length; i++) {
    menuLink[i].addEventListener("click", () => {
        menu.classList.remove('open')
    });
}
