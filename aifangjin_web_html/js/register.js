/**
 * Created by Administrator on 2017/8/4.
 */
var Register = function () {
    /**
     * 切换登录和注册
     * */
    var switchover = function () {
      $('.switch').click(function (e) {
          var node = $(this);
          var name = node.data('name');
          var form = "."+name;
          $('.title span').removeClass('active');
          if(name){
              $('.main_page').hide();
              console.log(name)
              $(form).show();
          }
          if(name.indexOf('register')===0){

              $('.title span').eq(1).addClass('active');
          }else{
              $('.title span').eq(0).addClass('active');
          }

      })
    };
    /**
     * 给眼睛添加事件
     * */
    var eyes = function () {
        $('.eyes').click(function () {
            var _this = this;
            var input  = $(_this).closest('.form_group').find('input')
            if($(_this).hasClass('active')){
                $(_this).removeClass('active');
                input.attr('type','password')
            }else{
                $(_this).addClass('active');
                input.attr('type','text');
            }
        })
    };
    //60秒倒计时
    function countDown(second, callback) {
        var node = $('.get_code');
        node.css('color', '#666666');
        node.text(second + 's');
        node.attr('disabled', 'true');
        var timecount = function (second, callback) {
            setTimeout(function () {
                second--;
                if (second > 0) {
                    timecount(second, callback);
                    node.css('color', '#666666');
                    node.text(second + 's');
                    node.attr('disabled', 'true');
                } else {
                    node.css('color', '#ea592e');
                    node.text('重新获取');
                    if (callback) {
                        console.log(12312)
                        callback();
                    }
                }

            }, 1000)


        }
        timecount(second, callback)
    }

    /**
     *给获取验证码添加效果，事件
     */

    var smsGet = function () {
        var flag = true;
      $('.smscaptcha').on('input propertychange',function () {
         var val = $.trim($(this).val());
         if(val){
             $('.get_code').addClass('active');
         }else{
             $('.get_code').removeClass('active');
         }
      });
      $('.get_code').click(function () {
          if(flag){
              flag = false
              countDown(5,function () {
                  flag = true
              })
          }

      })
    };

    return{
        init:function () {
            $('.successTip .mask').css('height', $('body').height());
            switchover();
            eyes();
            smsGet();
        }
    }
}();