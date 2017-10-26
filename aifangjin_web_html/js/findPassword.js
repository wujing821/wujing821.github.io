/**
 * Created by Administrator on 2017/7/31.
 */

var password = function () {
    var inpFocus = function () {
        //input输入框聚焦事件
        $('.item').children('input').on('focus',function(){
            $(this).removeClass('inpActive').siblings('.getCode').addClass('getCodeActive');

        }).on('blur',function(){
            $(this).addClass('inpActive').siblings('.getCode').removeClass('getCodeActive');
        });
    };
    var passwordShow = function(){
        //点击密码显示隐藏按钮
        $('.passwordClose').on('click',function () {
            if($(this).hasClass('passwordIcon')){
                $(this).removeClass('passwordIcon');
                $(this).siblings('input').attr('type','password')
            }else{
                $(this).addClass('passwordIcon');
                $(this).siblings('input').attr('type','text');
            }
        });
    };
    //倒计时
    var countDown = function(){
        var second = 10;
        var timer = null;
        function time(obj){
            if(second == 0){
                obj.text('重新获取');
                second = 10;
                $('#get_code').css('cursor','pointer');
            }else{
                obj.text(second+'s');
                second--;
                timer = setTimeout(function(){
                    time(obj);
                    // console.log(12222)
                },1000);
                $('#get_code').css('cursor','not-allowed');
            }

        }
        $('#get_code').on('click',function(){
            clearTimeout(timer);
            time($(this));
        })
    };
    return {
        init:function () {
            inpFocus();
            passwordShow();
            countDown();
        }
    }
}();