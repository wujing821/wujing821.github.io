/**
 * Created by Administrator on 2017/5/12.
 */
var Register = function () {
    var VerifyFlag = false;
    var SubmitFlag = false;
    var TelFlag = false;//判断手机号是否输入到11位，11之后开始验证手机号
    var CaptchaFlag = false;//判断验证码是否输入到4位，4位之后开始验证验证码
    var CaptchaCheckFlag = false;
    var URL1 = 'http://192.168.85.248:8080';
    // var URL = 'http://192.168.85.248:8080';
    var URL = 'http://192.168.85.253:8082';
    var Message = {
        money: {required: '请输入金额',int:'金额请输入数字'},
        tel: {required: '手机号为空', phone: '请输入正确的手机号'},
        smscaptcha: {required: '短信验证码不能为空', remote: '请输入正确的短信验证码', have: '您已注册过，请重新登录'},
    };
    var ErrorNode = $('.error_bottom');
    var TimeFlag = true;
    /**
     * 手机号验证
     * */
    var telRuleCheck = function (string) {
        var pattern = /^1[34578]\d{9}$/;
        if (pattern.test(string)) {
            return true;
        }
        // console.log('check mobile phone ' + string + ' failed.');
        return false;
    };
    //正整数
    function isPInt(str) {
        var g = /^[1-9]*[1-9][0-9]*$/;
        return g.test(str);
    }
    //显示错误信息
    var showError = function (errornode,info) {
        errornode.text(info);
        errornode.fadeIn();
        setTimeout(function () {
            errornode.fadeOut();
        },2100)
    };
    //隐藏错误信息
    var hideError = function (errornode) {

        errornode.hide();
    };
    //没有ajax的验证
    var verify = function (name, val,v) {
        var nodeerror =  $('.error_bottom');//公共的错误
        if (val) {

          if(name==='money'){
                if(!isPInt(val)){
                    showError(nodeerror,Message[name].int);
                    return false;
                }
            }else  if(name === 'tel'){
              if(val.length>=11){
                  TelFlag = true;
              }
              if(TelFlag){
                  if (!telRuleCheck(val)) {
                      showError(nodeerror,Message[name].phone);
                      return false;
                  }else{
                      hideError(nodeerror);
                  }
              }
          }

        } else {
            if(Message[name]){
                showError(nodeerror,Message[name].required);
                $(v).focus();
                return false;
            }

        }
        hideError(nodeerror);
        return true;
    };
    var errorTip = function () {
        /* var rule = {tel:{required:true,phone:true},captcha:{required:true}}*/
        var flag = true;
        $('input').each(function (k, v) {
            var val = $.trim($(v).val());
            var name = $(v).attr('name');
            if (!verify(name, val,v)) {
                flag = false;
                console.log(name);
                return false;
            }


        });

        return flag;
    };
    //60秒倒计时
    var authCode = function (second, callback) {
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
                    node.css('color', '#ec6334');
                    node.text('重新获取');
                    if (callback) {
                        console.log(12312);
                        callback();
                    }
                }

            }, 1000)


        }
        timecount(second, callback)
    };
    /**
     * 发送短信验证码
     * */
    var smsAjax = function (fun) {
        var time = 60;
        var phone = $('.tel').val();
        var val = $('.captcha').val();
        $.ajax({
            type: "POST",
            url: URL+"/activity/sendSmsValidate",
            data: {
                phone:phone
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                if (data.code === 0) {
                    hideError(ErrorNode);
                    authCode(time, function () {
                        TimeFlag = true;
                        console.log(234)
                    });
                } else {
                    showError(ErrorNode, Message.captcha.remote);
                    TimeFlag = true;
                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                alert('错误')
               /* authCode(time, function () {
                    TimeFlag = true;
                    console.log(234)
                });*/
                console.error(msg);
                TimeFlag = true;
            }
        });

    };
    /**
     * 表单验证初始化
     */
    var formValidate = function (fun) {
        //给验证码添加事件
        $('.get_code').click(function () {
            console.log(TimeFlag)
            var phone = $('.tel').val();
            var code = $('.captcha ').val();
            var type = $(this).data('type');
            var time = 60
            console.log(code)
            console.log(type)
            if(!telRuleCheck(phone)){
                showError(ErrorNode,Message.tel.phone);
                return;
            }
            console.log(TimeFlag)
            if(TimeFlag){
                TimeFlag =false;
                smsAjax();
            }
        });
    };
    /**
     * ajax请求
     * */
    var webChatAjax = function (fun) {
        var money = $('.money').val()*10000;
        var phone = $('.tel').val();
        var smscode = $('.smscaptcha').val();
        $.ajax({
            type: "POST",
            url: URL+"/activity/checkPhoneValidateMethod",
            data: {
                phone:phone,
                smsCode:smscode
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                if (data.code === 0) {
                    $.ajax({
                        type: "POST",
                        url: URL+"/activity/applicationLoan",
                        // url: URL+"/userRegister/register",
                        data: {
                            phone:phone,
                            application_amount:money
                        },
                        dataType: "jsonp",
                        jsonp: 'jsonpcallback',
                        success: function (data) {
                            console.log(data);

                            if(data.code===0){
                                sessionStorage.total = data.total;
                                fun();


                            }else{
                                showError(ErrorNode,data.msg)
                                // showError(ErrorNode,Message.captcha.remote)
                            }
                            // Play with returned data in JSON format
                        },
                        error: function (msg) {
                            console.info(msg);
                            showError(ErrorNode,'失败')
                        }
                    });
                } else {
                    showError(ErrorNode,data.msg)
                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                alert('错误')
                console.error(msg);
                TimeFlag = true;
            }
        });

    };
    /**
     * 给手机号加验证
     * */
    var phoneval = function () {
        var TelFlag = false;
        $('.tel').on('input propertychange',function () {
           var  val = $(this).val()
            if (val.length >= 11) {
                TelFlag = true;
            }
            if (TelFlag) {
                if (!telRuleCheck(val)) {
                    showError(ErrorNode, Message['tel'].phone)
                    return false;
                } else {
                    hideError(ErrorNode);
                }
            }
        });

    }
     return{
         init:function (fun) {
             phoneval();
             formValidate();
             $('.submit').click(function (e) {
                 e.preventDefault();
                 if(errorTip(this)){
                     webChatAjax(fun);
                 }
             });
         }
     }
}();
