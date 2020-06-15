window.addEventListener('DOMContentLoaded', () => {
    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item')
    const tabsContent = document.querySelectorAll('.tabcontent')
    const tabsParent = document.querySelector('.tabheader__items ')

    console.log('tabsContent: ',tabsContent)

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
        console.log('tabs: ',tabs)
        tabs.forEach((item, i) => {
            console.log('item: ',item)
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
})