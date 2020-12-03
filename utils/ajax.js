// 防止 污染全局     将方法挂到widnow上
~ function (window) {
    // 处理IE 兼容问题
    // 创建ajax的实例
    function createXHR() {
        if (window.ActiveXObject) { //IE的
            return new ActiveXObject("Microsoft.XMLHttp");
        } else { //标准
            return new XMLHttpRequest;
        }
    }

    // ajax方法
    // options {...}
    function ajax(options) {
        //用户不传递是默认参数 传递了就是传递进来的参数

        // 默认的对象
        var _default = { //值都是默认值
            method: "get", //请求方式 默认值是get
            url: null, //请求的url地址
            async: true, //同步还是异步
            dataType: null, //返回的数据格式
            getHead: null, //获取响应头信息
            success: null, //获取响应主体内容  成功的回调
            setRequest: null, //设置请求头  
            data: null
        };

        //将默认对象的值进行覆盖
        //循环遍历用户传递进来的对象   给默认对象重新赋值 
        for (var key in options) {
            // 只循环遍历私有的属性
            if (options.hasOwnProperty(key)) {
                _default[key] = options[key];
            }
        }

        //创建ajax实例
        var xhr = createXHR();

        // GET请求有缓存  如果是get请求处理缓存
        // 先转为小写 再进行比较
        if (_default.method.toLowerCase() === "get") {
            // url: "json/data.json?_="+Math.random(), //请求的url地址
            //   url: "json/data.json?name=哈哈&age=100&_=" + Math.random(), //请求的url地址
            //如果用户传递的url  没有传递参数  ?_="+Math.random()  传递了&_=" + Math.random()
            _default.url += _default.url.indexOf("?") > 0 ? "&_=" + Math.random() : "?_=" + Math.random();
        }

        //配置请求参数
        xhr.open(_default.method, _default.url, _default.async);

        // 监听请求状态
        xhr.onreadystatechange = function () {
            // 请求状态成功
            if (/^2\d{2}$/.test(xhr.status)) {
                // ajax的处理进度为2  获取响应头信息
                if (xhr.readyState === 2) {
                    // 函数存在            将这个函数执行并且让这个函数中的this变为第一个参数
                    _default.getHead && _default.getHead.call(xhr);
                }
                // ajax处理进度为4    获取响应主体内容
                if (xhr.readyState === 4) {
                    // 服务器返回的数据
                    var jsonData = xhr.responseText;
                    if (_default.dataType && _default.dataType.toUpperCase() === "JSON") {
                        // 转为JSON格式对象
                        jsonData = "JSON" in window ? JSON.parse(jsonData) : eval('(' + jsonData + ')');
                    }
                    _default.success && _default.success.call(xhr, jsonData);
                }
            }
        }

        // 设置请求头信息
        _default.setRequest ? xhr.setRequestHeader("content-type", _default.setRequest) : null;

        //发送请求
        xhr.send(_default.data);
    }

    // 将ajax方法赋值给widnow的自定义ajax属性
    window.ajax = ajax;
}(window);