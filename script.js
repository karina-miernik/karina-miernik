
// -----------Hamburger Menu -----------//

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

// -----------Smooth scroll -----------//

const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((link) => {
    let scrollTarget = link.getAttribute('href')
    link.addEventListener('click', (e) => {
        e.preventDefault();
        scrollTo(scrollTarget, 500)
    })
})

function scrollTo(to, duration) {
    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    };

    return new Promise((resolve, reject) => {
        const element = document.scrollingElement;

        if (typeof to === 'string') {
            to = document.querySelector(to) || reject();
        }
        if (typeof to !== 'number') {
            to = to.getBoundingClientRect().top + element.scrollTop;
        }

        let start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;

        const animateScroll = function () {
            currentTime += increment;
            let val = ease(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            } else {
                resolve();
            }
        };
        animateScroll();
    });
}

// ----------- Title animation -----------//

const pathUp = document.querySelectorAll('#up path')
for (i = 0; i < pathUp.length; i++) {
    console.log(`letter ${i} is ${pathUp[i].getTotalLength()}`)
}