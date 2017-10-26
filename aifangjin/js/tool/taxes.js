/**
 * Created by Administrator on 2017/6/19.
 */
var Taxes = function () {
    var lastPage_record = "";
    var History = [];
    var List = [];
    var App = null;
    var Message = {};
    var Result = {
        add: '',//增值税
        addition: '',//增值税附加税
        own: '',//个税
        deed: ''//契税
    };
    var ErrorNode = $('.error_com');
    var ErrorMessage = {
        type: {required: '请选择房屋性质'},
        firsthouse: {required: '请选择买房家庭首次购房'},
        solehouse: {required: '请选择卖房家庭唯一住房', remote: '请输入正确的图形验证码', have: '您已注册过，请重新登录'},
        area: {required: '请输入建筑面积'},
        total: {required: '请输入房屋总价', num: '密码至少8个字符', str: '密码为数字和字母的组合'},
        original: {required: '请输入房屋原价', different: '密码不一致，请重新输入'},
        guidancemoney: {required: '请输入房屋指导价', different: '密码不一致，请重新输入'},
        originalrate: {required: '请选择房屋原契税率', different: '密码不一致，请重新输入'},
        ratemoney: {required: '请输入房屋原契税', different: '密码不一致，请重新输入'},
        time: {required: '请选择房产证年限', different: '密码不一致，请重新输入'},

    };
    /**
     * 存历史
     * */
    var history_record = function (e) {
        /************用于防止push 进重复页面 *****/
        if (e && e != lastPage_record) {

            //TODO:记得打开
            //history.pushState({label:e});
            lastPage_record = e;
            //alert("PUSHED:"+e);
        }
        history.pushState({label: e}, "");
        History.push(e);
    };
    /*
     * 返回按钮
     * */
    var backwardEventHandle = function () {
        var his = function () {
            console.log(History[History.length - 1]);
            console.log(History)
            if (History.length < 2) {
                console.log('没有记录了');
                history.back()
                return
            }
            var pop = History.pop();
            var node = $('#' + History[History.length - 1]);
            showPage(node, true);
        };
        $('.return').click(function () {
            his();
        });
        window.onpopstate = function (event) {
            his();

            /*  if (event.state) {
             //labelOutput.textContent = event.state.label;
             //alert("backward");
             //alert(JSON.stringify(event.state))
             } else {
             // alert("last Page");
             }*/

        }

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
    /**
     * 显示界面
     * */
    var showPage = function (obj, flag) {

        var nodeBack = $('.entitle_container')
        $('.main_page').hide();
        obj.show();
        // obj.animate({'display':'table'})
        // console.log(obj.attr('id'))
        if (!flag) {
            history_record(obj.attr('id'));
        }
        // console.log(History)
    };
    /**
     * 获取计算器的值
     * */
    var getValue = function () {
        $('.select_group').each(function (k, v) {
            var node = $(v).find('.cont');
            var type = node.data('type');
            if (node.val()) {
                Message[type] = node.val()
            } else if(type==='guidancemoney') {
                if(parseInt(node.text())){
                    Message[type] = parseInt(node.text())
                }else{
                    Message[type] = 0
                }

            }else{
                Message[type] = node.text()
            }
        })

        console.log(Message)
    };
    /**
     * 正则判断是否为正数
     * */
    var number = function (str) {
        var regu = /^(\+)?\d+(\.\d+)?$/;
        return regu.test(str)
    };
    /**
     * 表单验证
     * */
    var formVerify = function () {
        var flag = true;
        $('.select_group').each(function (k, v) {
            var node = $(v).find('.cont')
            if(node.val()||node.text()){
                if(node.val()){
                    if(!number(node.val())){
                        showError(ErrorNode,'请输入数字');
                        return false;
                    }
                }
            }else{
                showError(ErrorNode,ErrorMessage[node.data('type')].required)
                node.focus();
                flag = false;
                return  false;
            }
        });
        return flag;
    };

    /**
     * 计算增值税，增值税附加税
     * */
    var resultComment = function () {
        var result = {};
        var money = Message.total < Message.guidancemoney ? Message.guidancemoney : Message.total;
        if (Message.type === '普通住宅') {
            if (Message.time === '两年以内') {
                result.add = (money / 1.05) * 0.05;
                result.addition = result.add * 0.12;
            } else {
                result.add = '0';
                result.addition = '0';
            }
        }
        if (Message.type === '非普通住宅') {
            if (Message.time === '两年以内') {
                result.add = (money / 1.05) * 0.05;
                result.addition = result.add * 0.12;
            } else {
                result.add = ((money - Message.original) / 1.05) * 0.05;
                result.addition = result.add * 0.12;
            }
        }
        return result;
    };
    /**
     * 计算个税
     * */
    var resultOwn = function () {
        var result = resultComment();//计算增值税，增值税附加税
        var returnOwn;
        //网签价>=指导价，公式
        var own = (Message.total - Message.original - Message.ratemoney - result.add - result.addition - (Message.total * 0.1)) * 0.2;
        //网签价<指导价，公式
        var ownF = (Message.guidancemoney / 1.05 - Message.original - Message.ratemoney - result.addition - (Message.total * 0.1)) * 0.2;

        if (Message.total >= Message.guidancemoney) {     //网签价>=指导价

            if (Message.time === '五年以上') {
                if (Message.solehouse === '是') {//唯一住房
                    result.own = 0;
                } else {
                    result.own = own;
                }
            } else {//未满5年
                result.own = own;
            }

        } else {        //网签价<指导价
            if (Message.time === '五年以上') {
                if (Message.solehouse === '是') {//唯一住房
                    result.own = 0
                } else {
                    result.own = ownF;
                }
            } else {//未满5年
                result.own = ownF;
            }

        }
        returnOwn = result.own;
        return returnOwn;
    };
    /**
     * 计算契税
     * */
    var resultDeed = function () {
        var result = resultComment();
        var deed = null;
        // 网签价≥指导价，按网签价计税
        var formula = function (rate) {
            return (Message.total - result.add) * rate;
        };
        // 网签价<指导价，按指导价计税
        var formulaS = function (rate) {
            return Message.guidancemoney / 1.05 * rate;
        };
        if (Message.total >= Message.guidancemoney) {

            if (Message.solehouse === '是') {//唯一住房
                if (Message.area > 90) {
                    deed = formula(0.015);
                } else {
                    deed = formula(0.01);
                }
            } else {//不是唯一住房
                deed = formula(0.03);
            }
        } else {
            if (Message.solehouse === '是') {//唯一住房
                if (Message.area > 90) {
                    deed = formulaS(0.015);
                } else {
                    deed = formulaS(0.01);
                }
            } else {//不是唯一住房
                deed = formulaS(0.03);
            }
        }
        return deed;
    };
    /**
     * 计算结果
     * */
    var calculate = function () {
        /*   Message = {
         type:'房屋性质',普通住宅，非普通住宅
         firsthouse:'买房家庭首次购房',是，否
         solehouse:'卖房家庭唯一住房',是，否
         area:'建筑面积',
         total:'房屋总价',网签价
         original:'房屋原价',原值
         guidancemoney:'房屋指导价',指导价
         originalrate:'房屋原契税率',1%，1.5%，3%
         ratemoney:'房屋原契税',
         time:'房产证年限'，两年以内，两年至五年，五年以上
         }*/
        var result = resultComment();
        var own = resultOwn();
        var deed = resultDeed();
        Result.add = parseInt(result.add)?result.add.toFixed(2):result.add;
        Result.addition = parseInt(result.addition)?result.addition.toFixed(2):result.addition;
        Result.own = parseInt(own)>0?own.toFixed(2):0;
        Result.deed = parseInt(deed)?deed.toFixed(2):deed;
        Result.total =  (parseFloat(Result.add) +parseFloat(Result.addition)+parseFloat(Result.own)+parseFloat(Result.deed)).toFixed(2);
        App.$data.result = Result;


    };
    /**
     * 计算房屋原契税公式
     * */
    var originTax  = function () {
        var str = 0|| $('.originalrate').text();
        var rate = str.replace(/%/, "")/100;
        var money = parseInt($('.original').val()*10000*rate);
        $('.ratemoney').val(money);
    };
    /**
     * 输入框添加事件
     * */
    var inputOriginalChange = function () {
        // 计算房屋原契税
        $('.original').on('input propertychange', function () {

            originTax();
        })
        $('.select_group').each(function (k,v) {
            $(v).find('.c_select input').on('input propertychange', function () {
                var val = $(this).val();
                var type  = $(this).data('type');
                if(val){
                    hideError(ErrorNode);
                }else{
                    showError(ErrorNode,ErrorMessage[type].required);
                }
            })

        })
    };
    return {
        init: function () {
            App = new Vue({
                el: '#result',
                data: {
                    result: {
                    }
                }

            });
            $('.select_group').alertBottom({callback:function () {
                originTax();
            }});
            inputOriginalChange();//计算契税
            showPage($('#select'));//显示首页

            backwardEventHandle();//返回按钮

            $('#loan-btn').click(function () {
                getValue();
                Message.total = Message.total*10000;
                Message.guidancemoney =  Message.guidancemoney*Message.area;
                // Message.guidancemoney = Message.guidancemoney*10000;
                Message.original = Message.original*10000;
                if(formVerify()){
                    hideError(ErrorNode)
                    showPage($('#result'))
                    calculate();
                }

                /* App.$watch("message",function(val,oldval){
                 console.log(val)
                 console.log(message.type)
                 })
                 console.log(   App.$data.message)*/
            })
        }
    }
}();