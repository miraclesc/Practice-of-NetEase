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
    
   
//Ajax请求GET方法的封装
    //使用表单编码数据发起一个HTTP GET请求
    function getData(url, options, callback){
                var request = new XMLHttpRequest();
                request.open = open("GET", url + "?" + encodeFormData(options)); //获取指定的URL
                request.onreadystatechange = function(){
                    if(request.readyState === 4 && callback) callback(request); 
                };
                request(null);
            }
    //HTTP请求编码对象
    function encodeFormData(data){
                if (!data) return "";
                var pairs = [];
                for(var name in data){
                    if (!data.hasOwnProperty(name)) continue; //跳过继承属性
                    if (typeof data[name] === "function") continue; //跳过方法
                    var value = data[name].toString();
                    name = encodeURIComponent(name.replace("%20","+")); //编码名字
                    value = encodeURIComponent(value.replace("%20","+")); //编码值
                    pairs.push(name + "=" + value);
                }
                return pairs.join("&");
            }
            
            
    //Ajax请求POST方法的封装       
function post(url, data, callback){
            var request = new XMLHttpRequest();
            request.open("POST","url");
            request.onreadystatechange = function(){
                if (request.readyState === 4 && callback) callback(request);
            };
            request.setRequestHeader("Content-Type","application/json");
            request.send(JSON.stringify(data));
        }
