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
        this.bindEvents()
    }
    
    initHtml(){
        let {element} = this.options
        let fileInput = this.domRefs.fileInput = dom.create('<input type="file">')
        element.appendChild(fileInput)
    }
    checkOptions(){
        let {element,upload: {url, method, inputName}} = this.options
        if(!element || !url || !method || !inputName){
            // throw new Error('Some options is required')
        }

    }

    bindEvents(){
        this.domRefs.fileInput.addEventListener('change',e => {
            
            let formData = new FormData()
            let {upload} = this.options
            formData.append(upload.inputName, e.target.files[0])
            this.upload(formData)
            console.log('发生变动了')
        })
        
        
        
    }
    willUpload(){
        this.options.element.classList.add('willUploading')
        this.domRefs.fileInput.disabled = true
    }
    upload(formData){
        let {upload} = this.options
        http(upload.method, upload.url, formData).then(
            response => {
                
            },
            () => this.failUpload(formData)
        )
    }
    didUpload(){
        
    }
    failUpload(){
        
    }
} 

function http(method,url,data){
    return new Promise((resolve,reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open(method,url)
        xhr.onload = () => {
            resolve(xhr.responseText,xhr)
            console.log(xhr.responseText,'请求成功')
        }
        xhr.onerror = () => {
            reject(xhr)
            console.log('请求失败')
        }
        xhr.send(data)
    })

}