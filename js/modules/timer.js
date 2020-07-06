function timer(id, deadLine) {

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
    setClock(id, deadLine)

}

export default timer;