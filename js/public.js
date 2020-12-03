~(function () {

    // 获取元素
    var eNav = utils.getClass("e_nav")[0],
        eNd = utils.getClass('e_nd', eNav);

    // var eNav = document.getElementsByClassName("e_nav")[0];
    // var eNd = document.getElementsByClassName("e_nd")[0];

    // 鼠标经过离开事件
    for (var i = 0; i < eNd.length; i++) {
        // 经过
        eNd[i].onmouseenter = function () {
            this.em = document.createElement("em");
            this.appendChild(this.em);
        }
        // 离开
        eNd[i].onmouseleave = function () {
            this.removeChild(this.em)
        }
    }

    // 表单事件

    // 获取元素
    var formSecher = utils.getClass("formSecher")[0],
    eSecher = utils.getClass("eSecher",formSecher)[0],
    eText = utils.getClass("eText",formSecher)[0];

    // 鼠标经过事件
    formSecher.onmouseover = function () {
        formSecher.style.width = "148px";
        eSecher.style.width = "146px";
        eText.style.width = "115px";
        eSecher.style.borderColor = "#ccc";
        eText.focus();
    }

    // 鼠标离开点击事件
    eText.onblur = function () {
        formSecher.style.width = "28px";
        eSecher.style.width = "26px";
        eText.style.width = 0;
        eSecher.style.borderColor = "transprent";
    }
    








})()