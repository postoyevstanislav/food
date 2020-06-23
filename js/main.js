window.addEventListener('DOMContentLoaded', () => {
    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item')
    const tabsContent = document.querySelectorAll('.tabcontent')
    const tabsParent = document.querySelector('.tabheader__items ')

    // console.log('tabsContent: ',tabsContent)

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')
        })
        tabs.forEach(item => item.classList.remove('tabheader__item_active'))
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade')
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active')
    }

hideTabContent()
showTabContent()

tabsParent.addEventListener('click', event => {
    const target = event.target
    console.log('tabsParent: ', tabsParent)
    console.log('target: ', target)

    if(target && target.classList.contains('tabheader__item')) {
        // console.log('tabs: ',tabs)
        tabs.forEach((item, i) => {
            // console.log('item: ',item)
            if(target == item) {
                
                hideTabContent()
                showTabContent(i)
            }
        })
    }
})

//Timer

const deadLine = '2021-06-15'

function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - new Date
    const days = Math.floor(t / (1000*60*60*24))
    const hours = Math.floor((t / (1000*60*60)) % 24)
    const minutes = Math.floor((t / (1000*60)) % 60)
    const seconds = Math.floor((t / 1000) % 60)

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
}

function addZero(num) {
    return (num < 10) ? '0' + num : num 
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector)
    const days = timer.querySelector('#days')
    const hours = timer.querySelector('#hours')
    const minutes = timer.querySelector('#minutes')
    const seconds = timer.querySelector('#seconds')
    const timeInterval = setInterval(updateClock, 1000)

    updateClock()

    function updateClock() {
        const t = getTimeRemaining(endtime)

        days.innerHTML = addZero(t.days)
        hours.innerHTML = addZero(t.hours)
        minutes.innerHTML = addZero(t.minutes)
        seconds.innerHTML = addZero(t.seconds)

        if(t.total <= 0) {
            clearInterval(timeInterval)
        }
    }
}
setClock('.timer', deadLine)

// Modal

const modalTrigger = document.querySelectorAll('[data-modal]')
const modal = document.querySelector('.modal')
const modalCloseBtn = document.querySelector('[data-close]')

function openModal() {
    modal.classList.add('show')
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden'
    clearInterval(modalTimerId)
}

modalTrigger.forEach(el => {
    el.addEventListener('click', openModal)
})

function closeModal() {
    modal.classList.add('hide')
    modal.classList.remove('show')
    document.body.style.overflow = '' 
}

modalCloseBtn.addEventListener('click', closeModal)

modal.addEventListener('click', event => {
    if(event.target == modal) {
        closeModal()
    }
})

document.addEventListener('keydown', (event) => {
if(event.code === 'Escape' && modal.classList.contains('show')) {
    closeModal()
    }
})

// const modalTimerId = setTimeout(openModal, 5000);

function showModalByScroll() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        openModal()
        window.removeEventListener('scroll', showModalByScroll)
    }
}

window.addEventListener('scroll', showModalByScroll)

// use Classes for menu cards

class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes){
        this.src = src
        this.alt = alt
        this.title = title
        this.descr = descr
        this.price = price
        this.classes = classes
        this.parent = document.querySelector(parentSelector)
        this.transfer = 27
        this.changeToUAH()
    }
    changeToUAH() {
        this.price = this.price * this.transfer
    }
    render() {
        const element = document.createElement('div')

        if(this.classes.length === 0) {
            this.element = 'menu__item'
            element.classList.add(this.element)
        } else {
            this.classes.forEach(className => element.classList.add(className))
        }
        
        element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
        `
        this.parent.append(element)
    }
}

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
     'Меню "Фитнес"',
     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
     9,
     '.menu .container',
     'menu__item'
).render()

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    21,
    '.menu .container',
    'menu__item'
).render()

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    '.menu .container',
    'menu__item'
).render()

console.log(document.querySelector('.menu .container'))
})