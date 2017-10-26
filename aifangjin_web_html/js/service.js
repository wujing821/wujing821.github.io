/**
 * Created by Administrator on 2017/8/7.
 */
var Service = function(){
    var min_height =  300;
    var nodeTop  = $('#goTop');
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
        $('#goTop').on('click',function(){
            // $(this).removeClass().addClass('clickafter');
            $('html,body').animate({
                scrollTop:0
            },140,function () {
                // nodeTop.hide();
                // $('#goTop').removeClass().addClass('clickbefore');
            })
        });
    };
    var closeBtn = function(){
        $('#cancelBtn').on('click',function(){
            //去掉ie的提示弹窗
            window.opener = null;
            // 兼容写法
            // window.open("about:blank","_blank").close();
            window.close();
        })
    };
    var showTip = function(){
        //移入侧边栏显示文字提示
        $('#sidebarBox').find('li').on('mouseenter',function(){
            $(this).removeClass('tipStyle').find('.textTip').css('display','block');
            $(this).find('.wechatIcon').css('border','none');
        }).on('mouseleave',function () {
            $(this).addClass('tipStyle').find('.textTip').css('display','none');
            $(this).find('.wechatIcon').css('border-bottom','1px solid #eee');
        });
    };
    return {
        init:function(){
            goTop();
            closeBtn();
            showTip();
        }
    }
}();