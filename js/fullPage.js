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
        this.checkOptions().initHtml().bindEvents()
        
    }
    initHtml(){
        dom.every(this.options.element.children,e => {
            e.style.transition = `ease ${this.options.duration}`
        })
        return this

    }
    checkOptions(){
        if(!this.options.element){
            throw new Error('element is required')
        }
        return this
    }
    bindEvents(){
        this.options.element.addEventListener('wheel',e => {
            let index = e.deltaY > 0 ? 1 : -1
            let targetIndex = this.currentIndex + index
            this.gotoNextSection(targetIndex).then(
                () => {
                    this.currentIndex = targetIndex
                },
                () => {}
            )
            
        })
        return this
    }
    gotoNextSection(targetIndex){
        // this.animate = true
        // this.currentIndex = targetIndex
        // let sections = this.options.element.children
        // let _this = this

        // if(this.currentIndex < 0){
        //     this.currentIndex = 0
        //     this.animate = false
        // }
        // if(this.currentIndex >= sections.length){
        //     this.currentIndex = sections.length - 1
        //     this.animate = false
        // } 

        // sections[this.currentIndex].addEventListener('transitionend',function callback(){
        //     this.removeEventListener('transitionend',callback)
        //     _this.animate = false
        // })

        // dom.every(sections, e => {
        //     e.style.transform = `translateY(-${this.currentIndex}00%)`
        // })
        return new Promise((resolve,reject) => {
            if(this.animate){
                reject()
            }else if(targetIndex < 0){
                reject()
            }else if(targetIndex >= this.options.element.children.length){
                reject()
            }else{
                this.animate = true
                let _this = this
                
                this.options.element.children[0].addEventListener('transitionend',function callback(){
                    this.removeEventListener('transitionend',callback)
                    _this.animate = false
                    resolve()
                })
                
                dom.every(this.options.element.children,section => {
                    section.style.transform = `translateY(-${100*targetIndex}%)`
                })
            }
        })
    }

}