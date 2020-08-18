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
        logoPaths[i].style.strokeDasharray = logoPaths[i].getTotalLength()
        logoPaths[i].style.strokeDashoffset = logoPaths[i].getTotalLength()
        logoPaths[i].style.animation = `line-anim 1.5s ease forwards ${delay}s`
        delay += delayIncrement
      }
      logo.style.animation = `fill 0.3s ease forwards ${delay}s`
    }
    animateSgv('logo', 0.05, 0.1)
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

// ----------- Toggle class : projects-----------//

const firstProject = document.querySelector('#first-project')
const secondProject = document.querySelector('#second-project')

const firstLink = document.querySelector('.first-link')
const secondLink = document.querySelector('.second-link')
const firstAbout = document.querySelector('.first-about')
const secondAbout = document.querySelector('.second-about')
const firstName = document.querySelector('.first-name')
const secondName = document.querySelector('.second-name')
firstProject.addEventListener('mouseover', () => {
  firstProject.classList.add('project__onHover')
  firstProject.classList.remove('first-project')
  firstLink.classList.remove('none')
  firstAbout.classList.remove('none')
  firstName.classList.add('none')
})

secondProject.addEventListener('mouseover', () => {
  secondProject.classList.add('project__onHover')
  secondProject.classList.remove('second-project')
  secondLink.classList.remove('none')
  secondAbout.classList.remove('none')
  secondName.classList.add('none')
})

firstProject.addEventListener('mouseout', () => {
  firstProject.classList.remove('project__onHover')
  firstLink.classList.add('none')
  firstProject.classList.add('first-project')
  firstAbout.classList.add('none')
  firstName.classList.remove('none')
})

secondProject.addEventListener('mouseout', () => {
  secondProject.classList.remove('project__onHover')
  secondLink.classList.add('none')
  secondProject.classList.add('second-project')

  secondAbout.classList.add('none')
  secondName.classList.remove('none')
})
