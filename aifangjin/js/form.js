/**
 * Created by Administrator on 2017/4/11.
 */
/**
 * Created by tanlu on 2016/3/28.
 */

var Form = function () {
    var TimeFlag = true;
    (function () {
        $('.cover').css('height', $(document).height());
        $('.applycover').css('height', $(document).height());
        $('.return').on('click', function () {
            window.history.back()
        });
        $('input').focus(function () {
            $('.submit').removeClass('disabled');
        })

    }());
    var ErrorTime = false;
    var VerifyFlag = false;
    var SubmitFlag = false;
    var TelFlag = false;//判断手机号是否输入到11位，11之后开始验证手机号
    var CaptchaFlag = false;//判断验证码是否输入到4位，4位之后开始验证验证码
    var CaptchaCheckFlag = false;//判断图形验证码是否正确
    var PhoneHaven  = false;
    var URL1 = 'http://192.168.85.248:8080';
    var URL = '';
    var Message = {
        name: {required: '请输入姓名',rule:'姓名为字符或者汉字'},
        tel: {required: '手机号为空', phone: '请输入正确的手机号'},
        captcha: {required: '验证码不能为空', remote: '请输入正确的图形验证码', have: '您已注册过，请重新登录'},
        smscaptcha: {required: '短信验证码不能为空', remote: '请输入正确的短信验证码', have: '您已注册过，请重新登录'},
        password: {required: '密码不能为空', num: '密码为8到16位', str: '密码为数字和字母的组合'},
        rePassword: {required: '密码不能为空', different: '密码不一致，请重新输入'},
        money:{required: '请输入金额'},
        time:{required: '请输入时间'},

    };
    var Select = {
        application_amount: {required: '请输入贷款金额', num: "贷款金额请输入数字"},
        loan_period: {required: '请选择贷款期限'},
        credit: {required: '请选择信用情况'},
        age: {required: '请输入年龄', num: '年龄在18到99之间'},
        profession: {required: '请选择职业身份'},
        providentFund: {required: '请选择公积金'},
        house_type: {required: '请选择名下房产类型'},
        car: {required: '请选择名下是否有车'}
    };
    var ErrorNode = $('.error_bottom');

    var SelectOption = {};
    /**
     * 手机号验证
     * */
    var telRuleCheck = function (string) {
        var pattern = /^1[34578]\d{9}$/;
        if (pattern.test($.trim(string))) {
            return true;
        }
        // console.log('check mobile phone ' + string + ' failed.');
        return false;
    };
    /**
     * 判断年龄
     * */
    var ageCheck = function (age) {
        var pattern = /^\+?[1-9][0-9]*$/;
        if (!age) {
            return true;
        }
        if (pattern.test(age)) {
            return age > 17 && age < 100;
        } else {
            return false;
        }

    };
    //正整数
    function isPInt(str) {
        var g = /^[1-9]*[1-9][0-9]*$/;
        return g.test(str);
    }
    //输入字母或者汉字
    function isChineseOrletter(str) {
        var g = /^[a-zA-Z\u4e00-\u9fa5]+$/;
        return g.test(str);
    }
    /*
     * 判断密码不一致
     * */
    var passDiff = function (pass, repass) {
        return pass !== repass;

    };

    /**
     * 设置cookie
     * */
    function setCookie(name, value) {
        var Days = 30;
        var exp = new Date();
        // exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        exp.setTime(exp.getTime() + 30 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
    }

    /**
     * 获得cookie
     * */
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    /**
     * 删除cookie
     * */
    function delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval !== null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }

    //显示错误信息
    var showError = function (errornode, info) {
        var node = errornode.find('span');
        node.text(info);
        errornode.show();
        if(ErrorTime){
            setTimeout(function () {
                errornode.fadeOut();
            },2000)
        }
    }
    //隐藏错误信息
    var hideError = function (errornode) {

        errornode.hide();
    }
    //图形验证码验证是否正确ajax请求
    var captchafun = function (fun) {
        var nodeerror = $('.error_bottom');//公共的错误
        var val = $('.captcha').val();
        CaptchaCheckFlag = true;
        $.ajax({
            type: "POST",
            url: "/PicVerify/picVerification",
            data: {
                picVerification: val
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                if (data.code == 0) {
                    CaptchaCheckFlag = true;
                    hideError(nodeerror);
                    if (fun) {
                        fun();
                    }
                } else {
                    CaptchaCheckFlag = false;
                    // CaptchaCheckFlag= true;
                    showError(nodeerror, Message.captcha.remote)
                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                console.error(msg);
            }
        });
    };
    //注册时、找回密码时发送短信验证码ajax请求
    var smsAjax = function (fun) {
        var time = 60;
        var phone = $.trim($('.tel').val());
        var val = $('.captcha').val();
        $.ajax({
            type: "POST",
            url: "/userRegister/sendPhoneValidate",
            data: {
                phone: phone,
                picVerification: val
            },
            success: function (data) {
                console.log("-----------------");
                console.log(data);
                if (data.code === 0) {
                    hideError(ErrorNode);
                    authCode(time, function () {
                        TimeFlag = true;
                        console.log(234)
                    });
                } else {
                    showError(ErrorNode, data.msg);
                    TimeFlag = true;
                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                console.log("---------------");
                console.error(msg);
                TimeFlag = true;
            }
        });
    };
    //登录时，发送短信验证码ajax请求
    var smsAjaxLogin = function (fun) {
        var time = 60;
        var phone = $.trim($('#tel').val()) ;
        var val = $('.captcha').val();
        $.ajax({
            type: "POST",
            url: "/Login/sendMsg",
            data: {
                phone: phone,
                imageCode: val
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                if (data.code === 0) {
                    hideError(ErrorNode)
                    authCode(time, function () {
                        TimeFlag = true;
                        console.log(234)
                    });
                    TimeFlag = false;
                } else {
                    showError(ErrorNode, data.msg)
                    TimeFlag = true;
                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                alert(JSON.stringify(msg))
                console.error(msg);
            }
        });
    };
    //立即申请第一步，发送短信验证码
    var smsApplyFir = function () {
        var time = 60;
        var phone = $.trim($('.tel').val());
        var val = $('.captcha').val();
        localStorage.phone = phone;
        $.ajax({
            type: "POST",
            url: URL+"/LendRequestPo/sendMsg",
            data: {
                phone: phone,
                // imageCode: val
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                if (data.code === 0) {
                    hideError(ErrorNode)

                    authCode(time, function () {
                        TimeFlag = true;
                        console.log(234)
                    },true);
                } else {
                    showError(ErrorNode, data.msg)
                    TimeFlag = true;
                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                alert(JSON.stringify(msg))
                console.error(msg);
            }
        });
    };
    //立即申请第一步，点击提交按钮
    var applyFir = function () {
        var phone = $('#tel').val();
        var sms = $('.smscaptcha').val();
        var name = $('.name').val();
        $.ajax({
            type: "POST",
            url: "/LendRequestPo/CheckMobileCode",
            // url: URL+"/userRegister/register",
            data: {
                phone: phone,
                mobileCode: sms
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                if (data.code === 0) {
                    sessionStorage.phone = phone;
                    sessionStorage.name = name;
                    window.location.href = '/apply_sec';
                } else {

                    showError(ErrorNode, data.msg)
                }
                // Play with returned data in JSON format
            },
            error: function (msg) {

            }
        });
    };
    /**
     * 验证select
     * */
    var validateSelect = function () {
        var selectParameter = {};
        var flag = true;
        $('.form_group_select').each(function (k, v) {
            var option = $(v).data('parameter');
            if (option === 'age') {
                selectParameter[option] = $.trim($(v).find('input').val());
                console.log('ageCheck(selectParameter[option])', ageCheck(selectParameter[option]));
                console.log(selectParameter[option]);
                if (!ageCheck(selectParameter[option])) {
                    showError(ErrorNode, Select.age.num);
                    flag = false;
                    return false;
                }
            } else if (option === 'application_amount') {
                selectParameter[option] = $.trim($(v).find('input').val());
                if (!selectParameter[option]) {
                    showError(ErrorNode, Select.application_amount.required);
                    flag = false;
                    return false;
                }
                if (!isPInt(selectParameter[option])) {
                    showError(ErrorNode, Select.application_amount.num);
                    flag = false;
                    return false;
                }
            } else if (option === 'loan_period') {
                selectParameter[option] = $(v).find('em').text();
                if (!selectParameter[option]) {
                    showError(ErrorNode, Select[option].required);
                    flag = false;
                    return false;
                }
            } else {
                selectParameter[option] = $(v).find('em').text();
            }
        });
        return flag;
    };
    /**
     * 总结select的值
     * */
    var selectVal = function (selectParameter) {
        $('.form_group_select').each(function (k, v) {
            var option = $(v).data('parameter');
            if (option) {
                if (option === 'age') {
                    selectParameter[option] = $.trim($(v).find('input').val());
                } else if (option === 'application_amount') {
                    selectParameter[option] = $.trim($(v).find('input').val());
                } else {
                    selectParameter[option] = $(v).find('em').text();
                }
            }


        });
        selectParameter.application_amount = selectParameter.application_amount * 10000;
        if (selectParameter.providentFund !== '') {
            selectParameter.providentFund === '是' ? selectParameter.providentFund = 1 : selectParameter.providentFund = 0;
        }
        if (selectParameter.car !== '') {
            selectParameter.car === '是' ? selectParameter.car = 1 : selectParameter.car = 0;
        }
        return selectParameter;
    };
    /**
     * 申请第二步，点击确定提交申请
     * */
    var applyAjaxSec = function () {
        var selectParameter = {userName: sessionStorage.name, phone: sessionStorage.phone,product:sessionStorage.id};
        var flag = true;
        // var selectParameter={userName:'啛啛喳喳',phone:'15032990822'};
        selectParameter = selectVal(selectParameter);
        console.log('selectParameter', selectParameter)
        hideError(ErrorNode);

        console.log(selectParameter)
        $.ajax({
            type: "POST",
            url: "/LendRequestPo/SubmitApplication",
            data: selectParameter,
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                sessionStorage.id='';
                if (data.code === 9999) {

                    $('.applay_alert p').text('我们会在24小时内联系您，请保持手机通畅');
                    $('.alert').show();
                    $('.cover').show();

                } else if (data.code === 9998) {
                    $('.alert').show();
                    $('.cover').show();
                    // $('.applay_alert p').text('我们会在24小时内联系您，请保持手机通畅');
                }

                // Play with returned data in JSON format
            },
            error: function (msg) {
                console.error(msg);
            }
        });


    };
    /**
     * 修改申请
     * */
    var changeApply = function () {
        var selectParameter = {id: localStorage.id, customer_id: localStorage.customerId};
        var flag = true;
        // var selectParameter={userName:'啛啛喳喳',phone:'15032990822'};
        selectParameter = selectVal(selectParameter);
        console.log('selectParameter', selectParameter)
        hideError(ErrorNode);
        console.log(selectParameter)

        $.ajax({
            type: "POST",
            url: "/lendRequest/updateLendRequestOfM",
            data: selectParameter,
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                if(data.code===0){
                    alertWhiteCover();
                    setTimeout(function () {
                        hideWhiteCover();
                        window.location.href='/myloan';
                    },1000);

                }else{
                    showError(ErrorNode,code.msg);
                }
                if (data.code === 9999) {

                    $('.applay_alert p').text('我们会在24小时内联系您，请保持手机通畅');
                    $('.alert').show();
                    $('.cover').show();

                } else if (data.code === 9998) {
                    $('.alert').show();
                    $('.cover').show();
                    // $('.applay_alert p').text('我们会在24小时内联系您，请保持手机通畅');
                }

                // Play with returned data in JSON format
            },
            error: function (msg) {
                console.error(msg);
            }
        });


    };
    //注册ajax请求
    var registerAjax = function () {
        var phone = $.trim($('.tel').val());
        var pass = $('#password').val();
        var piccode = $('.captcha').val();
        var smscode = $('.smscaptcha').val();

        $.ajax({
            type: "POST",
            url: "/userRegister/register",
            // url: URL+"/userRegister/register",
            data: {
                phone: phone,
                password: pass,
                pic_code: piccode,
                sms_code: smscode
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                localStorage.phone = phone;
                if (data.code === 0) {
                    alertCover();
                    setCookie('phone',phone);
                    setCookie('id', data.data.id);
                    window.location.href = '/'
                } else {
                    hideCover();
                    showError(ErrorNode, data.msg)
                    // showError(ErrorNode,Message.captcha.remote)
                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                console.info(msg);
                hideCover();
                showError(ErrorNode, '注册失败')
            }
        });
    };
    //密码登录ajax请求
    var loginFirAjax = function () {
        var phone = $.trim($('.tel').val());
        var pass = $('#password').val();
        $.ajax({
            type: "POST",
            url: "/Login/loginByA",
            data: {
                phone: phone,
                password: pass
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                localStorage.phone = phone;
                if (data.code === 0) {
                    setCookie('phone', phone);
                    setCookie('id', data.data.id);
                    window.location.href = '/'
                } else {
                    showError(ErrorNode, data.msg);
                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                localStorage.phone = phone;
                console.error(msg);
            }
        });
    };
    /**
     * 判断是否有密码
     * */
    var havePass  =function (phone) {

        $.ajax({
            type: "POST",
            url: "/customer/havePassword",
            data: {
                phone: phone,
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                localStorage.phone = phone;
                if (data.code === 4) {//用户还没有密码
                    window.location.href = '/setPass';
                } else {
                    window.location.href = '/'
                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                alert(JSON.stringify(msg))
                localStorage.phone = phone;
                console.error(msg);
            }
        });
    };
    //验证码登录ajax请求
    var loginSecAjax = function () {
        var phone = $.trim($('.tel').val());
        var pass = $('.smscaptcha').val();
        $.ajax({
            type: "POST",
            url: "/Login/loginByB",
            data: {
                phone: phone,
                mobileCode: pass
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                localStorage.phone = phone;
                if (data.code === 0) {
                    setCookie('phone', phone);
                    setCookie('id', data.data.id);
                    havePass(phone);

                } else {
                    showError(ErrorNode, data.msg)
                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                alert(JSON.stringify(msg))
                localStorage.phone = phone;
                console.error(msg);
            }
        });
    };
    //找回密码第一步
    var findPassFir = function () {
        var phone = $.trim($('.tel').val());
        var pass = $('.smscaptcha').val();
        $.ajax({
            type: "POST",
            url: "/userRegister/checkPhoneValidateMethod",
            data: {
                phone: phone,
                smsCode: pass
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                if (data.code === 0) {
                    sessionStorage.phone = phone;
                    window.location.href = '/findpass_sec';
                } else {
                    showError(ErrorNode, data.msg);
                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                console.error(msg);
            }
        });
    };
    //找回密码第二步
    var findPassSec = function (fun) {
        var phone = sessionStorage.phone;
        var pass = $('#password').val();
        alertCover();
        $.ajax({
            type: "POST",
            url: "/customer/resetPassWord",
            data: {
                phone: phone,
                password: pass
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data)
                if (data.code == 0) {
                    sessionStorage.phone = phone;
                    fun()
                    /*   window.location.href = './findpass_sec.html'*/
                } else {
                    hideCover();
                    showError(ErrorNode, '修改密码失败')
                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                console.error(msg);
            }
        });
    };
    //加上ajax验证
    var verifyAjax = function (name, val) {
        var nodeerror = $('.error_bottom');//公共的错误
        if (val) {
            hideError(nodeerror);
            if (name == 'tel') {
                if (val.length >= 11) {
                    TelFlag = true;
                }
                if (TelFlag) {
                    if (!telRuleCheck(val)) {
                        showError(nodeerror, Message[name].phone)
                        return false;
                    } else {
                        hideError(nodeerror);
                    }
                }
            }
            if (name == 'captcha') {
                console.log('aaaa' + val.length, ":" + CaptchaFlag);
                if (val.length >= 4) {
                    CaptchaFlag = true;
                }
                if (CaptchaFlag) {
                    if (val.length !== 4) {
                        CaptchaCheckFlag = false;
                        showError(nodeerror, Message[name].remote);
                        return false;
                    } else {
                        captchafun();//图形验证码ajax请求验证
                    }
                }

            }

        } else {
            if (Message[name]) {
                showError(nodeerror, Message[name].required)
                return false;
            }

        }

        return true;
    };
    //密码必须包含数字和字母，可以包含特殊字符
    /**
     * @return {boolean}
     */
    function CheckPassWordS(password) {
        var str = password;
        if (str == null || str.length < 8|| str.length > 16) {
            return false;
        }
        var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }

    }

    //必须包含数字加字母 不能包含特殊符号等
    /**
     * @return {boolean}
     */
    function CheckPassWord(password) {//必须为字母加数字且长度不小于8位
        var str = password;
        if (str === null || str.length < 8|| str.length>16) {
            return false;
        }
        var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
        if (!reg1.test(str)) {
            return false;
        }
        var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    }

    //没有ajax的验证
    var verify = function (name, val, v) {
        var nodeerror = $('.error_bottom');//公共的错误
        if (val) {
            if (name === 'tel' && !telRuleCheck(val)) {
                showError(nodeerror, Message[name].phone);
                $(v).focus();
                return false;
            }
            if (name === 'captcha') {
                if (val.length !== 4 || (!CaptchaCheckFlag)) {
                    showError(nodeerror, Message[name].remote);
                    $(v).focus();
                    return false;
                }
            }
            if (name === 'password') {
                if (val.length < 8||val.length > 16) {
                    $(v).focus();
                    showError(nodeerror, Message[name].num);
                    return false;
                } else if (!CheckPassWord(val)) {
                    $(v).focus();
                    showError(nodeerror, Message[name].str);
                    return false;
                }
            }
            if (name === 'name') {
                if (!isChineseOrletter(val)) {
                    showError(nodeerror, Message[name].rule);
                    return false;
                }
            }
        } else {
            if (Message[name]) {
                showError(nodeerror, Message[name].required);
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
            if(!$(v).is(":hidden")){
                if (!verify(name, val, v)) {
                    flag = false;
                    console.log(name)
                    return false;
                }
            }



        })

        return flag;
    };
    //60秒倒计时
    function authCode(second, callback,record) {
        var node = $('.get_code');
        node.css('color', '#666666');
        node.text(second + 's');
        node.attr('disabled', 'true');
        var timecount = function (second, callback) {
            setTimeout(function () {
                second--;
                if (second > 0) {
                    console.log(TimeFlag)
                    timecount(second, callback);
                    node.css('color', '#666666');
                    node.text(second + 's');
                    if(record){
                        localStorage.setItem('time',second);
                    }else{
                        localStorage.removeItem('time');
                    }
                    node.attr('disabled', 'true');
                } else {
                    node.css('color', '#ea592e');
                    localStorage.removeItem('time');

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
     * 点击输入验证码
     * */
    var changeCaptcha = function () {
        $('.get_picCode').click(function () {
            console.log(1)
            var node = $('.jcaptcha');
            var timestamp = Date.parse(new Date());
            // node.attr('src',URL+'/userRegister/getPic_code?time='+timestamp)
            node.attr('src', '/PicVerify/getPic_code?time=' + timestamp)
        })
    };
    var entiretyVerify = function (node) {
        var flag = false;
        var iscapcha = false;//判断是否图形验证码这一项
        var cssError = $('.error_bottom ').css('display');
        if ($(node).hasClass('disabled')) {
            return false;
        }
        flag = errorTip();

        /*$('input').each(function (k,v) {
         var name = $(v).attr('name');
         if(name=="captcha"){
         iscapcha=true;
         }
         });
         if(iscapcha){
         if(!CaptchaCheckFlag){
         showError(ErrorNode,Message.captcha.remote)
         return false;
         }
         }*/

        /*if(cssError==='block'){
         return false;
         }*/

        SubmitFlag = true;
        return flag
    };
    /**
     * 注册点击提交按钮
     * */
    var register = function () {
        //给提交按钮添加事件
        $('.submit').click(function (e) {
            e.preventDefault();
            if(PhoneHaven){
                showError(ErrorNode,'您已经注册过，请直接登录');
                return false;
            }
            if (entiretyVerify(this)) {
                registerAjax();
            }
        });
    };
    /**
     * 给input后面的x号，和眼睛添加事件
     * */
    var inputEvent = function () {
        $('.remove').click(function () {
            $(this).closest('.form_group').find('input').val('');
            $(this).closest('.icon').hide();
        })
        $('.eye').click(function () {
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
    /**
     * 表单验证初始化
     */
    var formValidate = function (fun) {
        inputEvent();
        //表单输入的时候验证
        $('input').each(function (k, v) {
            var _this = this;
            $(this).on('input propertychange', function () {

                var val = $(_this).val();
                var name = $(_this).attr('name');
                var flag = false;
                var iconNode =  $(_this).closest('.form_group').find('.icon');
                console.log(name, ":" + val)
                if(val){
                    iconNode.show();
                }else{
                    iconNode.hide();
                }
                verifyAjax(name, val);
            })
        });


        //给验证码添加事件
        $('.get_code').click(function () {
            console.log(TimeFlag)
            var phone = $.trim($('.tel').val());
            var code = $('.captcha ').val();
            var type = $(this).data('type');
            var time = 60
            console.log(code)
            console.log(type)
            if (!telRuleCheck(phone)) {
                showError(ErrorNode, Message.tel.phone);
                return;
            }
            console.log(TimeFlag)
            if (TimeFlag) {
                if (CaptchaCheckFlag) {
                    TimeFlag = false;
                    if (type === 'login') {
                        smsAjaxLogin();
                    } else if (type === 'apply') {
                        smsApplyFir();
                    } else {
                        smsAjax();
                        /*captchafun(function () {

                         })*/
                    }

                }else if(type==='newapply'){
                    TimeFlag = false;
                    smsApplyFir();
                } else {
                    console.log('error')
                    showError(ErrorNode, Message.captcha.remote)
                }

            }
        });
    };
    /*
     * 自定义select
     * */
    var selectCostum = function () {
        var hideUl = function () {

            $('.cover_white').hide();
            $('.select_ul').fadeOut(function () {
                $('.form_group_select').removeClass('active');
            });

        };
        $('.select').click(function () {
            var _this = this;
            var ulNode = $(_this).closest('.form_group_select')

            if (ulNode.hasClass('active')) {

                ulNode.find('.select_ul').fadeOut(function () {
                    ulNode.removeClass('active');
                });
            } else {
                $('.form_group_select').removeClass('active')
                $('.select_ul').hide()
                ulNode.find('.select_ul').fadeIn(10);
                ulNode.addClass('active');
                $('.cover_white').show();
            }

        });
        $('.cover_white').on('click', function () {
            hideUl();
        });
        $('.select_ul li').click(function () {
            var val = $(this).text();
            var _this = this;
            var pnode = $(this).closest('.form_group_select');
            console.log(val)
            $(_this).closest('.select_ul').find('li').removeClass('active');
            $(this).closest('.select_ul').fadeOut();
            $(this).addClass('active');
            pnode.find('strong').css('visibility', 'hidden')
            pnode.find('em').html(val);
            selectIsNotChoose(this);
            hideUl();
        })
    };
    /*
     * 自定义的select是否选择，如果选择则加上class='selected'
     * */
    var selectIsNotChoose = function (node, flag) {
        var pnode = $(node).closest('.form_group_select');
        if (flag) {
            pnode.removeClass('selected');//下拉框未选择
        } else {
            pnode.addClass('selected');//下拉框选择
        }

    };
    /*
     * 是否同意协议
     * */
    var agreement = function () {
        $('.input_check input').on('click', function () {
            if ($('.input_check input').is(':checked')) {

                $('.submit').removeClass('disabled').attr('disabled', false)
            } else {

                $('.submit').addClass('disabled').attr('disabled', true);

            }
        })
    }
    /**
     * 弹窗带阴影背景
     * */
    function alertCover() {
        $('.alert').show();
        $('.cover').show();
    }

    function hideCover() {
        $('.alert').hide();
        $('.cover').hide();
    }
    /**
     * 弹窗带不带阴影背景
     * */
    function alertWhiteCover() {
        $('.alert').fadeIn();
        $('.cover').show();
    }

    function hideWhiteCover() {
        $('.alert').hide();
        $('.cover').hide();
    }
    /**
     * 自定义select给一些按钮添加事件
     * */
    var selectAddEvent = function () {
        $('.form_group_select').alertBottom();
        //点击弹窗的确定按钮
        $('.alert a').on('click', function () {
            window.location.href = './'
        })
        //年龄单独处理
        $('[name=age]').on('input propertychange', function () {
            var val = $.trim($(this).val());
            var node = $(this).siblings('strong');
            if (val) {
                node.css('visibility', 'hidden')
                selectIsNotChoose(this);
            } else {
                node.css('visibility', '')
                selectIsNotChoose(this, true);
            }
        })
        $('[name=age]').focus(function () {
            $('.form_group_select').removeClass('active')
            $('.select_ul').hide();
        })
        /*  //点击蒙布
         $('.cover').on('click', function () {
         $(this).hide();
         $('.alert').hide();
         })*/
        //年龄扩大点击范围
        $('.age_form').on('click', function () {
            $('.age_form input').focus()
        })
        //年龄扩大点击范围
        $('.amount_form').on('click', function () {
            $('.amount_form input').focus()
        })
    };
    /**
     * 修改信息获取
     * */
    var getInfoApply = function () {
        var customerId = localStorage.customerId;
        var lendRequestId = localStorage.id;
        /*        var customerId = '77b12252-a818-4b1d-822c-5a6cefb92930';
         var lendRequestId = '181';*/
        /*   customerId: '77b12252-a818-4b1d-822c-5a6cefb92930',
         lendRequestId: '181'*/
        $.ajax({
            type: "POST",
            url: "/lendRequest/queryCustomerInfoByEdit",
            data: {
                customerId: customerId,
                lendRequestId: lendRequestId
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                var selectOption = data.data.data;
                if(selectOption){
                    var name = selectOption.product_name;
                    if(name){
                        $('.icon_type').addClass('active');
                        $('.type_name').text(name)
                    }else{
                        $('.icon_type').removeClass('active')
                    }
                    if (selectOption.providentFund) {
                        selectOption.providentFund = selectOption.providentFund == 0 ? '否' : '是';
                    }
                    if (selectOption.car) {
                        selectOption.car = selectOption.car == 0 ? '否' : '是';
                    }

                    $('.form_group_select').each(function (k, v) {
                        var option = $(v).data('parameter');
                        $(v).find('em').text(selectOption[option]);
                        if (option === 'application_amount') {
                            $('#application_amount').val(selectOption[option] / 10000);
                        }
                        if (option === 'age') {
                            $('#age').val(selectOption[option])
                        }
                        $(v).find('.dropdown-menu li').removeClass('active');
                        $(v).find('.dropdown-menu li').each(function (k, v) {
                            if(selectOption[option]){
                                if ($(v).find('i').text() === selectOption[option]) {
                                    $(v).addClass('active');
                                }
                            }

                        })
                    });
                }

                // Play with returned data in JSON format
            },
            error: function (msg) {
                console.error(msg);
            }
        });
    };
    /**
     * 贷款金额和年龄加上限制
     */
    var moneyAgeLimit = function () {
        $('#application_amount').on('input propertychange', function () {
            var _this = this;
            var val = $(this).val();
            var str = '';
            if(val.length>5){
                $(_this).val(val.slice(0,5));
            }
        });
    };
    /**
     * 手机号设置默认值
     * */
    var setDefaultPhone = function () {
        if(localStorage.phone){
            $('#tel').val(localStorage.phone);
            $('#tel').siblings('.icon').show();
        }
    };
    /**
     * 判断手机号注册过
     * */
    var  judgePhone = function () {
        $('#tel').on('input propertychange', function () {
            var phone = $.trim($(this).val());
            if(phone.length>=11){
                $.ajax({
                    type: "POST",
                    url: "/userRegister/checkRegister",
                    data: {
                        phone: phone,
                    },
                    dataType: "jsonp",
                    jsonp: 'jsonpcallback',
                    success: function (data) {
                        console.log(data);
                        localStorage.phone = phone;
                        if (data.code === 0) {
                            PhoneHaven = false;
                        } else if(data.code===-4) {
                            PhoneHaven = true;
                            showError(ErrorNode, data.msg);
                        }
                        // Play with returned data in JSON format
                    },
                    error: function (msg) {
                        alert(JSON.stringify(msg))
                        localStorage.phone = phone;
                        console.error(msg);
                    }
                });
            }
        })
    };
    /*****新的设计，立即申请开始******/
    /**
     * 获取参数
     * */
    var getApplyOptions = function () {
        var options = {};
        $('input').each(function (k,v) {
            var type = $(v).data('parameter');
            if(type){
                options[type] = $(v).val();
            }
        })
        options.application_amount =options.application_amount*10000;
        if(sessionStorage.phone){
            options.phone = sessionStorage.phone;
        }
        console.log(options)
        return options;
    };
    /**
     * 验证短信验证码
     * */
    var submitApplyNew = function () {
        var phone = $('#tel').val();
        var sms = $('.smscaptcha').val();
        var name = $('.name').val();
        $.ajax({
            type: "POST",
            url: URL+"/LendRequestPo/CheckMobileCode",//短信验证码是否正确
            // url: URL+"/userRegister/register",
            data: {
                phone: phone,
                mobileCode: sms
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                if (data.code === 0) {
                    applyAjaxNew();
                } else {

                    showError(ErrorNode, data.msg)
                }
                // Play with returned data in JSON format
            },
            error: function (msg) {

            }
        });
    }
    /**
     * 申请第二步，点击确定提交申请
     * */
    var applyAjaxNew = function () {
        var selectParameter = {product:sessionStorage.productid};
        var flag = true;
        // var selectParameter={userName:'啛啛喳喳',phone:'15032990822'};
        selectParameter = getApplyOptions();//获取input参数
        console.log('selectParameter', selectParameter)
        hideError(ErrorNode);

        console.log(selectParameter)
        $.ajax({
            type: "POST",
            url: URL+"/LendRequestPo/SubmitApplication",
            data: selectParameter,
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                sessionStorage.id='';
                if (data.code === 9999) {

                    $('.applay_alert p').text('我们会在24小时内联系您，请保持手机通畅');
                    $('.alert').show();
                    $('.cover').show();

                } else if (data.code === 9998) {
                    $('.alert').show();
                    $('.cover').show();
                    // $('.applay_alert p').text('我们会在24小时内联系您，请保持手机通畅');
                } else if (data.code === 1000) {
                    showError(ErrorNode, data.msg)
                    // $('.applay_alert p').text('我们会在24小时内联系您，请保持手机通畅');
                }

                // Play with returned data in JSON format
            },
            error: function (msg) {
                console.error(msg);
            }
        });


    };
    /*****新的设计，立即申请结束******/
    return {
        init: function (fun) {

            $('.submit').addClass('disabled');
            formValidate(fun);
            agreement();//点击是否同意爱房金协议
            changeCaptcha();//点击图形验证码
        },
        register: function () {
            judgePhone();//手机号输入11后验证手机号是否正常
            register();
        },
        loginFir: function () {
            $('input').val('');
            setDefaultPhone();
            //给提交按钮添加事件
            $('.submit').click(function (e) {
                e.preventDefault();
                if (entiretyVerify(this)) {
                    loginFirAjax();
                }
            });
        },
        loginSec: function () {
            $('input').val('');
            setDefaultPhone();
            //给提交按钮添加事件
            $('.submit').click(function (e) {
                e.preventDefault();
                if (entiretyVerify(this)) {
                    loginSecAjax();
                }
            });
        },
        findPassFir: function () {
            $('input').val('');
            //给提交按钮添加事件
            $('.submit').click(function (e) {
                e.preventDefault();
                if (entiretyVerify(this)) {
                    findPassFir();
                }
            });
        },
        findPassSec: function (fun) {
            $('input').val('');
            if (!sessionStorage.phone) {
                window.location.href = '/findpass_fir'
            }
            //给提交按钮添加事件
            $('.submit').click(function (e) {
                e.preventDefault();
                var pass = $('.password').val();
                var repas = $('.re_password').val();
                if (entiretyVerify(this)) {
                    if (passDiff(pass, repas)) {
                        showError(ErrorNode, Message.rePassword.different);
                        return false;
                    }
                    findPassSec(fun);
                }
            });
        },
        applyFir: function () {
            $('input').val('');
            sessionStorage.select = '';
            //给提交按钮添加事件
            $('.submit').click(function (e) {
                e.preventDefault();
                if (entiretyVerify(this)) {
                    applyFir();
                }
            });
        },
        validate: function (node, ruleo, messageo) {

        },
        select: function () {
            if (!sessionStorage.phone) {
                // window.location.href = '/apply_fir';
            }
            if (sessionStorage.select) {
                console.log(sessionStorage.select)
                var select = JSON.parse(sessionStorage.select);
                console.log(select)
                $('.form_group_select').each(function (k, v) {
                    var option = $(v).data('parameter');
                    $(v).find('em').text(select[option]);

                });
            }else{
                $('.submit').addClass('disabled');
            }
            // selectCostum();//自定义select
            agreement();//点击是否同意爱房金协议
            selectAddEvent();//添加自定义的select的事件
            // moneyAgeLimit();//贷款金额，年龄添加限制
            //点击提交信息按钮
            var flagClick = true;
            $('.submit').on('click', function (e) {
                e.preventDefault();
                var _this = this;
                var falg = $(_this).hasClass('disabled');

                if(falg){
                    return false;

                }
                var flagSelect = validateSelect();
                console.log(flagSelect);
                if ((!falg) && flagSelect) {
                    if(flagClick){
                        flagClick = false;
                        applyAjaxSec();
                    }

                }

            });

        },
        changeApply: function () {
            getInfoApply();//ajax请求信息
            selectAddEvent();//添加自定义的select的事件
            $('.submit').on('click', function (e) {
                e.preventDefault();
                var _this = this;
                var falg = $(_this).hasClass('disabled');

                var flagSelect = validateSelect();
                console.log(flagSelect);
                if ((!falg) && flagSelect) {
                    changeApply();
                }

            });
        },
        applynew:function () {
            ErrorTime = true;
            var phone = sessionStorage.phone;
            if(localStorage.getItem('time')){
                var time = localStorage.getItem('time');
                TimeFlag = false;
                authCode(time, function () {
                    TimeFlag = true;
                    console.log(234)
                });
            }
            if(phone){
                $('body').addClass('apply_container')
            }else{

            }
            $('.alert a').on('click', function () {
                window.location.href = '/'
            })
            setDefaultPhone();//获得默认的手机号
            $('.apply').click(function (e) {
                e.preventDefault();
                if (entiretyVerify(this)) {
                    if(phone){
                        applyAjaxNew();
                    }else{
                        submitApplyNew();//提交申请
                    }

                }
            });
        }

    }
}();
