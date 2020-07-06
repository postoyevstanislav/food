function tabs(tabsSelector, tabsContentSelector, tabsPatentSelector, activeClass) {

    const tabs = document.querySelectorAll(tabsSelector)
    const tabsContent = document.querySelectorAll(tabsContentSelector)
    const tabsParent = document.querySelector(tabsPatentSelector)

    // console.log('tabsContent: ',tabsContent)

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')
        })
        tabs.forEach(item => item.classList.remove(activeClass))
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade')
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add(activeClass)
    }

    hideTabContent()
    showTabContent()

    tabsParent.addEventListener('click', event => {
    const target = event.target
    // console.log('tabsParent: ', tabsParent)
    // console.log('target: ', target)

    if(target && target.classList.contains(tabsSelector.slice(1))) {
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
}

export default tabs;