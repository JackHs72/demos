~(function () {

    // 获取元素
    var tab2 = document.getElementById("tab2");
    zgZbbt = utils.getClass('zg_zbbt', tab2)[0],
        listTitle = utils.getClass('list_title', zgZbbt)[0];

    function TbaChane(id) {
        // 设置私有属性
        var box = document.getElementById(id);
        this.aLis = box.getElementsByClassName("tab_title");
        this.aDivs = box.getElementsByClassName("tab_body");


        // 保存this
        var _this = this;

        // 用for循环添加鼠标经过事件  让鼠标每一次经过都有效果
        for (var i = 0; i < this.aLis.length; i++) {
            // 自定义下标
            this.aLis[i].index = i;
            this.aLis[i].onmouseover = function () {
                _this.tabChange(this.index);
            }
        }
    }
    // 内容区域切换 放在构造函数的原型方法上

    TbaChane.prototype.tabChange = function (index) {

        // 排他思想
        for (var i = 0; i < this.aLis.length; i++) {
            this.aLis[i].className = 'fl tab_title';
            this.aDivs[i].className = 'clearfix list_body tab_body';
        }
        this.aLis[index].className = 'fl tab_title on';
        this.aDivs[index].className = 'clearfix list_body tab_body show';
    }


    // 获取数据
    ajax('get', './data/networkClass.json', null, function (data) {
        bindData(JSON.parse(data));
    })

    function bindData(jsonData) {

        // 如果数据被请求过来了  就执行这个代码里的语句
        if (jsonData) {
            var str = '';
            for (var i = 0; i < jsonData.length; i++) {
                i == 0 ? str += '<li class="fl tab_title on">' + jsonData[i].title + '</li>' : str += '<li class="fl tab_title">' + jsonData[i].title + '</li>';
            }
            listTitle.innerHTML = str;

            // 内容区域

            // 文档碎片
            var frg = document.createDocumentFragment();
            for (var i = 0; i < jsonData.length; i++) {
                // 创建ul标签
                var ul = document.createElement('ul');
                i == 0 ? ul.className = 'clearfix list_body tab_body show' : ul.className = 'clearfix list_body tab_body';


                var str = '';
                for (var j = 0; j < jsonData[i].list.length; j++) {
                    var cur = jsonData[i].list[j];
                    str += ` <li class="fl">
                    <div>
                        <a href="${cur.href}">
                            <img src="${cur.img}" alt="">
                        </a>
                    </div>
                    <h6>
                        <a href="${cur.href}">
                            ${cur.name}
                        </a>
                    </h6>
                    <p class="clearfix">
                        <span class="fl">${cur.price}</span>
                        <i class="fr">${cur.hour}</i>
                    </p>
                </li>`;
                    ul.innerHTML = str;
                }
                frg.appendChild(ul);
            }
            tab2.appendChild(frg);
            frg = null;
        }
        new TbaChane('tab2');
    }




})()