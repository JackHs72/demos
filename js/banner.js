~(function () {
    // 图片区域
    var banner = utils.getClass("banner")[0],
        bannerWrap = utils.getClass("bannerWrap", banner)[0],
        li = bannerWrap.getElementsByTagName('li');

    // 分页按钮
    var focusList = utils.getClass("focusList", banner)[0],
        span = focusList.getElementsByTagName("span");
        
    // 左右按钮
    var leftBtn = utils.getClass("leftBtn", banner)[0];
    var rightBtn = utils.getClass("rightBtn", banner)[0];

    // 获取数据
    ajax("get", "./data/banner.json", null, function (data) {
        bindData(JSON.parse(data));
    })

    function bindData(jsonData) {
        var str = '';
        for (var i = 0; i < jsonData.length; i++) {
            str += `<li style="background:url(${jsonData[i].url}) no-repeat center top"></li>`
        }

        //实现无缝轮播 所以把第一张复制出来，放在最后
        str += `<li style="background:url(${jsonData[0].url}) no-repeat center top"></li>`;
        bannerWrap.innerHTML = str;

        // 添加分页按钮
        var str = '';
        for (var i = 0; i < jsonData.length; i++) {
            i === 0 ? str += '<span class="active"></span>':str +='<span></span>';
        }
        focusList.innerHTML = str;
       

        // 设置ul的宽度

        // 一张图片的宽度
        var clientW = utils.win("clientWidth");
        // ul的宽度
        bannerWrap.style.width = clientW * li.length + 'px';

        // li的宽度
        for (var i = 0; i < li.length; i++) {
            li[i].style.width = clientW + 'px';
        }

        // 图片轮播

        var timer = null;
        var step = 0;


        timer = setInterval(auto, 2000);

        // 鼠标经过停止轮播
        banner.onmouseover = function () {
            clearInterval(timer);
        }

        // 鼠标离开继续轮播
        banner.onmouseout = function () {
            timer = setInterval(auto, 2000);
        }

        // 左右按钮
        rightBtn.onclick = function () {
            auto();
        }

        leftBtn.onclick = function () {
            if(step <= 0){
                step = li.length - 1;
                bannerWrap.style.width = -step * clientW + 'px';
            }
            step--;
            change();
        }

        // 分页按钮
        for(var i = 0; i < span.length; i++){
            span[i].index = i;
            span[i].onmouseover = function () {
                step = this.index;
                change();
            }
        }

        function auto() {
            if(step >= li.length - 1) {
                step = 0;
                bannerWrap.style.left = 0 + 'px';
            }
            step++;
            change();
        }

        function change() {
            utils.move1(bannerWrap,{
                left : -step * clientW,
            })
            // 分页按钮
            for(var i = 0; i < span.length;i++){
                span[i].className = '';
            }
            span[step === li.length - 1 ? 0 : step].className = 'active';
        }
    }
})()