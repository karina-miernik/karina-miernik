// -----------Hamburger Menu -----------//

const hamburgerOpen = document.querySelector('.hamburger')
const hamburgerElement = document.querySelector('.hamburger__element')
const menu = document.querySelector('.menu')
const menuLink = document.querySelectorAll('.menu__link')
const headerLogo = document.querySelector('.header__logo')

hamburgerOpen.addEventListener('click', () => {
  menu.classList.toggle('open')
  hamburgerOpen.classList.toggle('change')
})

for (let i = 0; i < menuLink.length; i++) {
  menuLink[i].addEventListener('click', () => {
    menu.classList.remove('open')
    hamburgerOpen.classList.remove('change')
  })
}

// -----------Smooth scroll -----------//

const anchorLinks = document.querySelectorAll('a[href^="#"]')

anchorLinks.forEach((link) => {
  let scrollTarget = link.getAttribute('href')
  link.addEventListener('click', (e) => {
    e.preventDefault()
    scrollTo(scrollTarget, 500)
  })
})

function scrollTo(to, duration) {
  //t = current time
  //b = start value
  //c = change in value
  //d = duration
  function ease(t, b, c, d) {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t * t + b
    t -= 2
    return (c / 2) * (t * t * t + 2) + b
  }

  return new Promise((resolve, reject) => {
    const element = document.scrollingElement

    if (typeof to === 'string') {
      to = document.querySelector(to) || reject()
    }
    if (typeof to !== 'number') {
      to = to.getBoundingClientRect().top + element.scrollTop
    }

    let start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20

    const animateScroll = function () {
      currentTime += increment
      let val = ease(currentTime, start, change, duration)
      element.scrollTop = val
      if (currentTime < duration) {
        setTimeout(animateScroll, increment)
      } else {
        resolve()
      }
    }
    animateScroll()
  })
}

// ----------- Title animation -----------//

document.addEventListener(
  'DOMContentLoaded',
  () => {
    function animateSgv(id, delay, delayIncrement) {
      const logo = document.getElementById(id)
      const logoPaths = document.querySelectorAll(`#${id} path`)
      delay = delay
      for (let i = 0; i < logoPaths.length; i++) {
        //console.log(logoPaths[i].getTotalLength());
        logoPaths[i].style.strokeDasharray = logoPaths[i].getTotalLength()
        logoPaths[i].style.strokeDashoffset = logoPaths[i].getTotalLength()
        logoPaths[i].style.animation = `line-anim 2s ease forwards ${delay}s`
        delay += delayIncrement
        console.log(delay)
      }
      logo.style.animation = `fill 0.5s ease forwards ${delay}s`
    }
    animateSgv('logo', 0.1, 0.1)
  },
  false,
)

// ----------- Navigation - toggle class & Arrow Up-----------//

const nav = document.getElementById('nav')
const arrow = document.querySelector('.scroll__up')

window.onscroll = function () {
  'use strict'
  if (
    document.body.scrollTop >= 80 ||
    document.documentElement.scrollTop >= 80
  ) {
    nav.classList.add('scroll')
    arrow.classList.add('scroll__display')
    arrow.classList.remove('scroll__up')
  } else {
    nav.classList.remove('scroll')
    arrow.classList.remove('scroll__display')
    arrow.classList.add('scroll__up')
  }
}
