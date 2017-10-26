/**
 * Created by Administrator on 2017/4/19.
 */
var Public = function () {
    var min_height =  300;
    // var nodeTop  = $('#slideContent');
    var nodeTop = $('#backToTop');
    var goTop = function () {
        //滑动条事件
        $(window).scroll(function () {
            //获取窗口的滚动条的垂直位置
            var s = $(window).scrollTop();
//          console.log(s)
            //当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐
            if( s > min_height){
                nodeTop.stop();
                nodeTop.fadeIn(100);
            }else{
                nodeTop.stop();
                nodeTop.fadeOut(100);
            }
        });
        //点击到达顶部按钮
        $('#backToTop').on('click',function(){
            // $(this).removeClass().addClass('clickafter');
            $('html,body').animate({
                scrollTop:0
            },140,function () {
                // nodeTop.hide();
                // $('#goTop').removeClass().addClass('clickbefore');
            })
        });
    };
    //移入微信显示图片
    var dropDown = function(){
        $('.weChat').on('mouseover', function() {
            $('.weChatPic').toggle()
        }).on('mouseout', function() {
            $('.weChatPic').toggle()
        });
    };
    //点击服务协议跳转页面
    var service = function(btn){
        btn.on('click',function(){
            window.open('service.html','_blank')
        })

    };
    var showInfo = function(){

        //移入显示微信号
        $('.weChatBox').on('mouseenter',function () {
            $('.wechatIconPic').css('display','block');
        }).on('mouseleave',function(){
            $('.wechatIconPic').css('display','none');
        });
        //移入侧边栏显示文字提示
        $('#sidebarBox').find('li').on('mouseenter',function(){
            $(this).removeClass('tipStyle').find('.textTip').css('display','block');
            $(this).find('.wechatIcon').css('border','none');
        }).on('mouseleave',function () {
            $(this).addClass('tipStyle').find('.textTip').css('display','none');
            $(this).find('.wechatIcon').css('border-bottom','1px solid #eee');
        });
        //弹出拨打电话
        $('#telCont').on('mouseenter',function () {
            $('.telIconBox').css('display','block');
        }).on('mouseleave',function(){
            $('.telIconBox').css('display','none');
        });
    };
    //点击nav
    var tabSwitch = function () {
        //点击nav切换
        $('.nav>li').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
        });
    };
    /*左面导航不变右面带滑动效果*/
    var leftNavFixed = function () {
        var currTop = $(window).scrollTop();
        if (currTop >= 109) { //判断小于则为向上滚动
            $('.scroll_fixed').css({'position':'fixed',top:'0px'})
        }else{
            $('.scroll_fixed').css({'position':'absolute',top:'0px'})
        }

        var t = document.documentElement.scrollTop || document.body.scrollTop;  //离上方的距离
        var h =window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //可见宽度
        // console.log(t,h,document.documentElement.scrollHeight,-t+(document.documentElement.scrollHeight -h),756-(document.documentElement.scrollHeight -h-t) )
        if(h<768){
            $('.loan_container').css("minHeight",'768px')
        }
        if(h<678){
            if( t >= document.documentElement.scrollHeight -h-366 ) {
                $('.scroll_fixed').css({'position':'fixed',top:'auto',bottom:(666-(document.documentElement.scrollHeight -h-t))})
            }
        }
    };

    return {
        init:function () {
            dropDown();
            tabSwitch();
        },
        goTop:function () {
            goTop();
        },
        service:function(btn){
            service(btn);
        },
        sidebar:function () {
            showInfo();
        },
        leftNavFixed:function () {
            leftNavFixed();
            /*页面滑动条滑动*/
            $(window).scroll(function() {
                leftNavFixed();

            });
        }
    }
}();