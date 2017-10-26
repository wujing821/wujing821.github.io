/*
/!**
 * Created by Administrator on 2017/7/12.
 *!/
//可拖拽的快速申请按钮
var scrollH = 0;
function dragEvent(sh){
    console.log(sh)
    // 获取节点
    var drag = document.getElementById('soonApply');
    var oW,oH;
// 绑定touchstart事件
    drag.addEventListener("touchstart", function(e) {
        // console.log(e);
        var touches = e.touches[0];
        oW = touches.clientX - drag.offsetLeft;
        oH = touches.clientY - drag.offsetTop;
        //阻止页面的滑动默认事件
        document.addEventListener("touchmove",defaultEvent,false);
    },false);

    drag.addEventListener("touchmove", function(e) {
        var touches = e.touches[0];
        var oLeft = touches.clientX - oW ;
        var oTop = touches.clientY - oH;
        if(oLeft < 30) {
            oLeft = 0;
        }else if(oLeft > document.documentElement.clientWidth - drag.offsetWidth - 30) {
            oLeft = (document.documentElement.clientWidth - drag.offsetWidth);
        }

        if(oTop < 200) {
            oTop = 200;
        }else if(oTop > document.documentElement.clientHeight - drag.offsetHeight + sh) {
            oTop = (document.documentElement.clientHeight - drag.offsetHeight + sh);
        }
        drag.style.left = oLeft + "px";
        drag.style.top = oTop + "px";
    },false);

    drag.addEventListener("touchend",function() {
        document.removeEventListener("touchmove",defaultEvent,false);
    },false);
    function defaultEvent(e) {
        e.preventDefault();
    }
}

//关于我们 点击变色
$('document,body').on('touchstart', function () {
});
//滑块滑动
var myScroll;

function loaded () {
    myScroll = new IScroll('#wrapper', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
}
loaded();

window.onscroll = function(){
    // scrollH = document.documentElement.scrollHeight;
    scrollH = document.body.scrollTop;
    // console.log(scrollH)
    // dragEvent(currentScreenW,currentScreenH,scrollW,scrollH);
    dragEvent(scrollH);
}
*/
var Index = function(){
    //可拖拽的快速申请按钮
    function dragEvent() {
        // 获取节点
        var drag = document.getElementById('soonApply');
        var oW, oH;
        var oLeft, oTop;
        // 绑定touchstart事件
        drag.addEventListener("touchstart", function (e) {
            // console.log(e);
            var touches = e.touches[0];
            //clientX返回当事件被触发时鼠标指针向对于浏览器页面（或客户区）的水平坐标。
            //debugger
            oW = touches.clientX - drag.offsetLeft;
            //offsetLeft:获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置
            oH = touches.clientY - drag.offsetTop;
            //阻止页面的滑动默认事件
            document.addEventListener("touchmove", defaultEvent, false);
        }, false);

        drag.addEventListener("touchmove", function (e) {

            var touches = e.touches[0];
            oLeft = touches.clientX - oW;
            oTop = touches.clientY - oH;
            if (oLeft < 30) {
                oLeft = 0;
            } else if (oLeft > document.documentElement.clientWidth - drag.offsetWidth - 30) {
                oLeft = (document.documentElement.clientWidth - drag.offsetWidth);
            }

            if (oTop > document.documentElement.clientHeight - drag.offsetHeight) {
                oTop = (document.documentElement.clientHeight - drag.offsetHeight);
            }
            if (oTop < 0) {
                oTop = 0;
            }
            drag.style.left = oLeft + "px";
            drag.style.top = oTop + "px";
        }, false);

        drag.addEventListener("touchend", function () {
            document.removeEventListener("touchmove", defaultEvent, false);
        }, false);

        function defaultEvent(e) {
            e.preventDefault();
        }
    }
    function resize(){
        window.onresize = function () {
            var drag = document.getElementById('soonApply');
            if (oTop > document.documentElement.clientHeight - drag.offsetHeight) {
                oTop = (document.body.clientHeight - drag.offsetHeight);
            }
        }
    }


    //滑块滑动
    var myScroll;
    function loaded() {
        myScroll = new IScroll('#wrapper', {
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
            preventDefault: false
        });
    }
    //轮播图
    /*    $('.slider').slick({
     dots: true,
     infinite: false,
     speed: 300,
     autoplaySpeed: 2000,
     autoplay: true,
     arrows: false
     });*/


    //点击产品模块跳转地址
    $('#credit_loan').delegate('a', 'click', function () {
        window.location.href = '/productList?id=' + $(this).attr('id') + 'm';
    });
    //获取产品
    function getItem(){
        var url = 'http://192.168.85.253:8080';
        var products;
        var productsName;
        var vm = new Vue({
            el: '#productsLoanContent',
            data: {
                items: products
            }
        });
        $.ajax({
            type: "POST",
            url: url + '/polish/showProductPolishList',
            data: {},
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                var arrAdvantage = [];
                if(data.code === 0){
                    console.log(data.data.data);
                    products = data.data.data;
                    vm.$data.items = products;
                }
            }
        });
    }

    return {
        init:function(){
            loaded();
            dragEvent();
            resize();
            getItem();
        }
    }
}();





