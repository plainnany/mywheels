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
            let { upload } = this.options

            formData.append(upload.inputName, e.target.files[0])
            this.willUpload(formData)
            this.upload(formData)
            console.log('文件发生变动了',this.domRefs.fileInput.value)
        })
        
        
        
    }
    willUpload(formData){
        this.options.element.classList.add('willUploading')
        this.domRefs.fileInput.disabled = true
    }
    upload(formData){
        let { upload,parseResponse } = this.options
        http(upload.method, upload.url, formData).then(
            response => {
                //console.log(typeof response)
                let path = parseResponse(response)

                this.didUpload()
                this.willDownload()
                prefecth(path).then(()=>{
                        this.didDownload(path)
                    },
                    () => {
                        this.failDownload()
                    }
                )
            },
            () => this.failUpload(formData)
        )
    }
    didUpload(){
        this.options.element.classList.remove('willUploading')
        this.domRefs.fileInput.disabled = false
    }
    failUpload(){
        this.options.element.classList.remove('uploading')
        this.options.element.classList.add('failUploading')
        this.domRefs.fileInput.disabled = false
        this.domRefs.fileInput.value = ''
    }

    willDownload(){
        this.options.element.classList.add('uploading')
        
    }
    didDownload(paths){
        this.domRefs.img.src = paths
        this.options.element.classList.remove('uploading')
        this.domRefs.fileInput.disabled = false
        
    }
    failDownload(){
        let { fallbackImage } = this.options 
        this.options.element.classList.remove('uploading')
        this.domRefs.fileInput.disabled = false
        if(fallbackImage){
            this.domRefs.img.src = fallbackImage
        }
        
    }



} 

function prefecth(paths){
    return new Promise((resolve,reject)=>{
        let image = new Image()
        image.onload = resolve
        image.onerror = reject
        image.src = paths
    })
    

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
            console.log('请求失败'+xhr.responseText)
            
        }
        xhr.send(data)
    })

}