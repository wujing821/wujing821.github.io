/**
 * Created by Administrator on 2017/4/19.
 */
var Public = function () {
    var min_height =  180;
    var nodeTop  = $('#goTop');
    var goTop = function () {
        //滑动条事件
        $(window).scroll(function () {
            //获取窗口的滚动条的垂直位置
            var s = $(window).scrollTop();
            //当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐
            if( s > min_height){
                nodeTop.stop()
                nodeTop.fadeIn(100);
                // nodeTop.show();
            }else{
                nodeTop.stop();
                nodeTop.fadeOut(100);
                // nodeTop.hide();
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
    var goBack = function () {
        //回退功能
        $('.return').on('click',function(){
            $(this).css('background-image','img/productList/click.png');
            history.back(-1);
            return false;
        })
    };
    var dropDown = function(){
        var dropBtn = $('#menuBtn');
        var dropdownMenu = $('#dropdown-menu');
        var flag = false;
        //下拉列表
        $('.dropdownMenuBtn').on('click',function(){

            if(dropBtn.hasClass('clickbf')){
                dropBtn.removeClass('clickbf').addClass('clickaf');
                dropdownMenu.removeClass('hide').addClass('show');
                flag = false;
            }else{

                dropBtn.removeClass('clickaf').addClass('clickbf');
                dropdownMenu.removeClass('show').addClass('hide');
                flag = true;
            }
        });
        $('document,body').on('touchstart', function (e) {
            var _target = $(e.target);
            console.log('abc',_target.closest(".dropdownMenuBtn").length)
            if (_target.closest(".dropdownMenuBtn").length == 0) {
                dropBtn.removeClass('clickaf').addClass('clickbf');
                dropdownMenu.removeClass('show').addClass('hide');
            }
        });
        /* $('document,body').click(function (e) {

         })*/
    };
    return {
        init:function () {
            goBack();
        },
        goTop:function () {
            goTop();
        },
        dropDown:function(){
            dropDown();
        }
    }
}();