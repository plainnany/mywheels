// 面向对象，初始化对象，传入的参数为一个obj
// 

class ImagePicker{
    constructor(options){
        let defaultOptions = {
            element: null,
            upload: {
                url: '',
                method: '',
                inputName: ''
            },
            parseResponse: null,
            fallbackImage: ''
        }
        this.options = Object.assign({}, defaultOptions, options)
        this.checkOptions()
        this.domRefs = {
            img: this.options.element.querySelector('img')
        }
        this.initHtml()
    }
    
    initHtml(){
        let {element} = this.options
        let fileInput = this.domRefs.fileInput = dom.create('<input type="file">')
        element.appendChild(fileInput)
    }
    checkOptions(){

    }
    bindEvents(){

    }

} 