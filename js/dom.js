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
        
    }
}