/**
 * Created by Administrator on 2017/5/22.
 */
var Profile = function () {
    var URL = 'http://192.168.85.253:8080';
    // var URL = '';
    // var phone = '13456247856';
    var ErrorNode = $('.error_bottom');
    var Message = {
        password: {required: '密码不能为空', num: '密码至少8个字符', str: '密码为数字和字母的组合'},
        rePassword: {required: '新密码不能为空', different: '密码不一致，请重新输入'}

    };
    //显示错误信息
    var showError = function (errornode, info) {
        var node = errornode.find('span');
        node.text(info);
        errornode.show();
    }
    //隐藏错误信息
    var hideError = function (errornode) {

        errornode.hide();
    }
    /*
     * 判断密码不一致
     * */
    var passDiff = function (pass, repass) {
        return pass !== repass;

    };

    function setCookie(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()
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
        exp.setTime(-1000);
        var cval = getCookie(name);
        console.log(cval)
        if (cval !== null) {
            document.cookie = name + "=" + "123" + ";expires=" + exp.toGMTString() + ";path=/";
        }


    }

    //必须包含数字加字母 不能包含特殊符号等
    /**
     * @return {boolean}
     */
    function CheckPassWord(password) {//必须为字母加数字且长度不小于8位
        var str = password;
        if (str === null || str.length < 8) {
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

    //显示错误信息
    var showSuccess = function (info) {
        var nonde = $('.success_bottom')
        nonde.text(info);
        nonde.fadeIn();
        setTimeout(function () {
            nonde.fadeOut();
        }, 2000)
    };
    /**
     * input输入时添加事件
     * */
    var inputFocus = function () {
        $('input').on('input propertychange', function () {
            var _this = this;
            var val = $(_this).val();
            var name = $(this).attr('name');
            var iconNode = $(_this).closest('.form_group').find('.icon')
            if (val) {
                iconNode.show();
                hideError(ErrorNode);
            } else {
                iconNode.hide();
                showError(ErrorNode, Message[name].required);
            }
        })
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
            var input = $(_this).closest('.form_group').find('input')
            if ($(_this).hasClass('active')) {
                $(_this).removeClass('active');
                input.attr('type', 'password')
            } else {
                $(_this).addClass('active');
                input.attr('type', 'text');
            }
        })
    };
    /**
     * 验证输入框
     * */
    var validate = function () {
        var pass = $.trim($('.password').val());
        var repass = $.trim($('.rePassword').val());
        if (!pass) {
            $('.password').focus();
            showError(ErrorNode, '原密码不能为空');
            return false;
        }
        if (!repass) {
            $('.rePassword').focus();
            showError(ErrorNode, '新密码不能为空');
            return false;
        }

        if (pass.length < 8) {
            $('.password').focus();
            showError(ErrorNode, Message.password.num);
            return false;
        } else if (!CheckPassWord(pass)) {
            $('.password').focus();
            showError(ErrorNode, Message.password.str);
            return false;
        }
        if (passDiff(pass, repass)) {
            showError(ErrorNode, Message.rePassword.different);
            return false;
        }
        hideError(ErrorNode);
        return true;
    };
    /**
     * 给确认修改添加事件
     * */
    var submit = function (fun, funsession) {
        var flag = true;
        $('.submit').click(function (e) {
            e.preventDefault();
            var pass = $.trim($('.password').val());
            var repass = $.trim($('.rePassword').val());

            if (validate()) {


                if (flag) {
                    flag = false;
                    $.ajax({
                        type: "POST",
                        url: URL + "/customer/updatePWD",
                        data: {
                            password: pass,
                            newPassWord: repass
                        },
                        dataType: "jsonp",
                        jsonp: 'jsonpcallback',
                        success: function (data) {
                            console.log(data);
                            flag = true;
                            if (data.code === 0) {
                                showSuccess('修改成功');
                                setTimeout(function () {
                                    fun();
                                }, 1000)

                            } else if (data.code === (-5)) {
                                delCookie('phone');
                                showSuccess('登录失效，请重新登录');
                                setTimeout(function () {
                                    funsession();
                                }, 1000)


                            } else {
                                showError(ErrorNode, data.msg);
                            }

                            // Play with returned data in JSON format
                        },
                        error: function (msg) {
                            console.info(msg);
                            flag = true;
                        }
                    });
                }

            }

        })
    };
    /**
     * 登出接口
     * */
    var loginOut = function (fun) {
        $('.loan_cont .ok').click(function () {
            $.ajax({
                type: "POST",
                url: URL + "/Login/logout",
                dataType: "jsonp",
                jsonp: 'jsonpcallback',
                success: function (data) {
                    console.log(data);

                    if (data.code === 0) {
                        delCookie('phone');
                        fun();
                    }

                    // Play with returned data in JSON format
                },
                error: function (msg) {
                    console.info(msg);

                }
            });
        })
    };
    /**
     * 设置页面我的贷款
     * */
    /*var info = function (fun) {
        var phone = getCookie('phone');
        var products;
        var vm = new Vue({
            el: '#status',
            data: {
                loadList: {},
            },
            created: function () {
                if (phone) {
                    $.ajax({
                        type: "POST",
                        url: URL + "/accountCenter/myLoan",
                        data: {
                            phone: getCookie('phone')
                        },
                        dataType: "jsonp",
                        jsonp: 'jsonpcallback',
                        success: function (data) {
                            if (data.code === 0) {
                                this.loadList = data.data;
                            }
                        },
                        error: function (msg) {
                            console.info(msg);
                        }
                    });
                } else {
                    fun();
                }
            }
        });
        /!*if (phone) {
            $.ajax({
                type: "POST",
                url: URL + "/accountCenter/myLoan",
                data: {
                    phone: getCookie('phone')
                },
                dataType: "jsonp",
                jsonp: 'jsonpcallback',
                success: function (data) {
                    console.log(data);
                    var processArr = [];
                    var arrFile = [];
                    if (data.code === 0) {
                        console.log(data.data);
                        products = data.data;
                        console.log(products)
                        vm.$data.items = products;

                         products.processArr = processArr;
                         //资料
                        for(var i in products){
                            console.log(products[i])

                        }
                         if( products.indexOf('product_') > -1){
                         var number = k.replace(/product_/, "");
                         // console.log(number,v);
                         if(parseInt(number)){
                         console.log(v)
                         if(v){
                         arrFile[number-1] = v;
                         }

                         }
                         }
                         console.log(arrFile);
                         products.arrFile = arrFile;

                        $('.apply').text(data.product_1).addClass('noApply');
                    } else {
                        $('.apply').text(data.product_2).addClass('alreadyApply');
                    }

                    // Play with returned data in JSON format
                },
                error: function (msg) {
                    console.info(msg);

                }
            });
        } else {
            fun();
        }*!/

    };*/

    var info = function (fun) {
        var phone = getCookie('phone');
        var products;
        var vm = new Vue({
            el: '#status',
            data: {
                loadList: {},
            },
            created: function () {
                if (phone) {
                    $.ajax({
                        type: "POST",
                        url: URL + "/accountCenter/myLoan",
                        data: {
                            phone: getCookie('phone')
                        },
                        dataType: "jsonp",
                        jsonp: 'jsonpcallback',
                        success: function (data) {
                            if (data.code === 0) {
                                console.log(data.data);
                                console.log(data.total);
                                if(data.total > 3){
                                    $('i.applyMore').show();
                                }else{
                                    $('i.applyMore').hide();
                                }
                                vm.loadList = data.data;
                            }
                        },
                        error: function (msg) {
                            console.info(msg);
                        }
                    });
                } else {
                    fun();
                }
            }
        });
    };
    /********密码设置*******/

    /**
     * 密码设置验证
     * */
    var validate = function () {
        var pass = $('.password').val();
        if (!pass) {
            $('.password').focus();
            showError(ErrorNode, '密码不能为空');
            return false;
        }

        if (pass.length < 8) {
            $('.password').focus();
            showError(ErrorNode, Message.password.num);
            return false;
        } else if (!CheckPassWord(pass)) {
            $('.password').focus();
            showError(ErrorNode, Message.password.str);
            return false;
        }

        hideError(ErrorNode);
        return true;

    };
    /***
     * 提交修改密码，ajax
     * */
    var ajaxSetPass = function (fun) {
        var flag = true;
        $('.submit').click(function (e) {
            e.preventDefault();
            var pass = $.trim($('.password').val());
            var phone = getCookie('phone');
            console.log(flag)
            if (validate()) {


                if (flag) {
                    flag = false;
                    $.ajax({
                        type: "POST",
                        url: URL + "/customer/resetPassWord",
                        data: {
                            phone: phone,
                            password: pass
                        },
                        dataType: "jsonp",
                        jsonp: 'jsonpcallback',
                        success: function (data) {
                            console.log(data);
                            flag = true;
                            if (data.code === 0) {
                                sessionStorage.phone = phone;
                                fun()
                                /*   window.location.href = './findpass_sec.html'*/
                            } else {
                                showError(ErrorNode, '修改密码失败')
                            }

                            // Play with returned data in JSON format
                        },
                        error: function (msg) {
                            console.info(msg);
                            flag = true;
                        }
                    });
                }

            }

        })
    };
    return {
        init: function (fun, funsession) {
            inputFocus();
            inputEvent();
            submit(fun, funsession);
        },
        loginOut: function (fun) {
            $('.login_out').click(function () {
                $('.loan_wrapper').addClass('active');
            });
            $('.loan_mask').click(function () {
                $('.loan_wrapper').removeClass('active');
            });
            $('.loan_cont .cancel').click(function () {
                $('.loan_wrapper').removeClass('active');
            });
            loginOut(fun);
        },
        info: function (fun) {
            $(".phone").html(getCookie('phone').substring(0, 3) + "****" + getCookie('phone').substring(7, 11));
            info(fun);
        },
        setPass: function (fun) {
            inputFocus();
            ajaxSetPass(fun);
            inputEvent();
        }
    }
}();