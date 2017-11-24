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
        let sections = this.options.element.children
        for(let i=0;i<sections.length;i++){
            sections[i].style.transition = `ease ${this.options.duration}`
        }

    }
    checkOptions(){
        if(!this.options.element){
            throw new Error('element is required')
        }
    }
    bindEvents(){
        this.options.element.addEventListener('wheel',e => {
            //this.animate = false
            
            let index = e.deltaY > 0 ? 1 : -1
            this.currentIndex = this.currentIndex + index
            if(this.currentIndex < 0){
                this.currentIndex = 0
            }
            if( this.currentIndex >= this.options.element.children.length){
                this.currentIndex = this.options.element.children.length-1
            }
            
            console.log(this.currentIndex)
            this.gotoNextSection(this.currentIndex)
            
        })
    }
    gotoNextSection(index){
       // this.animate = true
        let sections = this.options.element.children
        for(let i=0;i<sections.length;i++){
            sections[i].style.transform = `translateY(-${index}00%)`
        }
        
    }

}