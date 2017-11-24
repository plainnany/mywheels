// wheelEvent.deltaY  > 0 'up' : 'down'

class FullPage{
    constructor(options){
        let defaultOptions = {
            element: '',
            duration: ''
        }
        this.options = Object.assign({},defaultOptions,options)
        this.currentIndex = 0
        this.animate = false
        this.initHtml()
        this.bindEvents()
    }
    initHtml(){
        dom.every(this.options.element.children,e => {
            e.style.transition = `ease ${this.options.duration}`
        })

    }
    checkOptions(){
        if(!this.options.element){
            throw new Error('element is required')
        }
    }
    bindEvents(){
        this.options.element.addEventListener('wheel',e => {
            let index = e.deltaY > 0 ? 1 : -1
            let targetIndex = this.currentIndex + index
            if(this.animate){return }
            this.gotoNextSection(targetIndex)  // 
            
        })
    }
    gotoNextSection(targetIndex){
        this.animate = true
        this.currentIndex = targetIndex
        let sections = this.options.element.children
        let _this = this

        if(this.currentIndex < 0){
            this.currentIndex = 0
            this.animate = false
        }
        if(this.currentIndex >= sections.length){
            this.currentIndex = sections.length - 1
            this.animate = false
        } 

        sections[this.currentIndex].addEventListener('transitionend',function callback(){
            this.removeEventListener('transitionend',callback)
            _this.animate = false
        })

        dom.every(sections, e => {
            e.style.transform = `translateY(-${this.currentIndex}00%)`
        })
    }

}