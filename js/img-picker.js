// 面向对象，初始化对象，传入的参数为一个obj
// 用户点击图片上传时，请求对应的服务器，上传到服务器，再从服务器下载，
// 分别对应为处理中（即将上传），上传中（发起ajax请求），下载中（fetch图片）

// 重写

class ImagePicker{
    constructor(options){
        let defaultOptions = {
            element: '',
            upload: {
                url: '',
                method: '',
                fileName: ''
            },
            parseResponse: null,
            fallbackImage: ''
        }
        this.options = Object.assign({},defaultOptions,options)
        this.domRefs = {
            img: this.options.element.querySelector('img')
        }
        this.checkOptions()
        this.initHtml()
        this.bindEvent()
    }
    checkOptions(){
        let { element, upload:{ url, method, fileName } } = this.options
        if(!element || !url || method || !fileName){
            throw new Error('some options is required')
        }
    }
    initHtml(){
        let {element} = this.options
        let template = document.createElement('template')
        template.innerHTML = '<input type="file" name="file">'
        let fileInput = (this.domRefs.fileInput = template.content.firstChild)
        element.appendChild(fileInput)
    }
    bindEvent(){
        this.domRefs.fileInput.addEventListener('change',e => {
            
            let formData = new FormData()
            let {upload} = this.options
            console.log(e.target.files[0])
            formData.append(upload.fileName,e.target.files[0])
            this.willUpload()
            this.upload(formData)
        })
        
    }
    willUpload(){
        this.options.element.classList.add('willUploading')
        this.domRefs.fileInput.disabled = true
    }
    upload(formData){
        let { upload,parseResponse} = this.options
        
        http(upload.method,upload.url,formData).then(
            responseBody => {
                let path = parseResponse(responseBody)
                this.didUpload()
                this.willDownload()
                prefechImg(path).then(()=>{
                        this.didDownload(path)
                    },
                    () => {
                        this.failedDownload()
                    }
                )
            },
            this.failedUpload
        )
    }
    didUpload(){
        this.options.element.classList.remove('willUploading')
        this.domRefs.fileInput.disabled = false
    }
    failedUpload(){
        this.options.element.classList.remove('willUploading')
        this.domRefs.fileInput.disabled = false
    }
    willDownload(){
        this.options.element.classList.add('uploading')
    }
    didDownload(path){
        this.domRefs.img.src = path
        this.options.element.classList.remove('uploading')
    }
    failedDownload(){
        this.options.element.classList.remove('uploading')
        let { fallbackImage } = this.options
        if(fallbackImage){
            this.domRefs.img.src = fallbackImage
        }
        
    }

}
function prefechImg(url){
    return new Promise((resolve,reject) => {
        let image = new Image()
        image.onload = resolve
        image.onerror = reject
        image.src = url
    
    })

}

function http(method,url,formData){
    return new Promise((resolve,reject) =>{
        let xhr = new XMLHttpRequest()
        xhr.open(method,url)
        xhr.onload = () => resolve(xhr.responseText) // resolve只能传递一个参数
        xhr.onerror = () => reject(xhr)
        xhr.send(formData)
    })
}