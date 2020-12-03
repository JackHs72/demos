/*  数据获取方式: method  get / post  
       数据地址：url  './data/data1.json'
       给后台的数据：data  ?name=123&age=20
       回调函数：callback  也就是数据请求成功，把数据返回给页面
*/
function ajax(method, url, data, callback) {

    // 创建一个ajax实列对象
    var xhr = new XMLHttpRequest();

    // 区分是get方式还是post方式 （注意大小写）
    if (method.toLowerCase() === 'get') {

        // 如果没有数据：url 
        // 如果有数据：url + '?' + 'name=123&age=20'
        if (data) {
            url = url + '?' + data;
            xhr.open(method, url);
        } else {
            xhr.open(method, url);
        }
        xhr.send();
    } else if (method.toLowerCase() === 'post') {
        xhr.open(method, url);
        // 设置请求报文头
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        // 如果没有数据：xhr.send();
        // 如果有数据：xhr.send(data)
        
        if (data) {
            xhr.send(data)
        } else {
            xhr.send()
        }
    }
    // 监听ajax和服务器状态
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback && callback(xhr.responseText)
            } else {
                throw new Error('请求失败，错误码是：' + xhr.status);
                // alert('请求失败，错误码是：' + xhr.status);
            }
        }
    }
}

