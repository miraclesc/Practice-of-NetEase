//浏览器兼容版的element.children
function getElementChild(element){
    if(element.children){
        return element.children;
    }
    else{
        var result=[],
        nodelist=element.childrenNodes;
        for (var i = 0; i < nodelist.length; i++) {
            if(nodelist[i].element_node==1){
                result.push(nodelist[i]);
            }
        }
        return result;
    }
}

//实现浏览器兼容版的element.dataset
function dataset(element){
  if(!element.dataset){
    element.dataset={};
    var attributes = element.attributes,len = attributes.length;
    for(var i=0;i<len;i++){
      if(/^data-/.test(attributes[i].name)){
        var key = attributes[i].name.match(/^data-(.+)/)[1];
        var value = attributes[i].value;
        key = key.replace(/-\w/g,function(match){
          return match.substring(1).toUpperCase();
        });
        element.dataset[key]=value;
      }
    }
 
  }
  return element.dataset;
}

//实现浏览器兼容版的window.getComputedStyle
var style = function getElementStyle(element,cssPropertyName){
    if(window.getComputedStyle){
        return window.getComputedStyle(element)[cssPropertyName];
    }
    else{
        return element.currentStyle[cssPropertyName];
    }
