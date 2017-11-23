var dom = {
    create: function(html,child){
        let ele = document.createElement('template')
        ele.innerHTML = html
        let node = ele.content.firstChild

        if(child){
            dom.append(node,child)
        }
        return node
    },
    append: function(parent,children){

        for(let i=0;i<children.length;i++){
            parent.appendChild(children[i])
        }
        
    },
    on: function(element,eventType,selector,fn){
        element.addEventListener(eventType,e=>{
            let ele = e.target
            while(!ele.matches(selector)){
                if(ele === element){
                    ele = null
                    break
                }
                ele = ele.parentNode
            }

            ele && fn.call(ele,e,ele)
            
        })
        return element
    },
    uniqueClass: function(element,className){
        let siblings = element.parentNode.children
        for(let i=0;i<siblings.length;i++){
            siblings[i].classList.remove(className)
        }
        element.classList.add(className)
    },
    index: function(element){
        let ele = element.parentNode.children
        for(let i=0;i<ele.length;i++){
            if(element === ele[i]){
                return i
            }
        }
        return -1
    }

}