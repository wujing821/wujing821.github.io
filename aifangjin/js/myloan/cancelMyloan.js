/**
 * Created by Administrator on 2017/6/30.
 */
var Cancel = function(){
    var wrapper = $('.loan_wrapper');
    var reason;
    var addReason;
    var flag = false;
    var _flag = true;
    var url = 'http://192.168.85.245:8080';


    var productId = localStorage.id;
    var customerId = localStorage.customerId;
    /*获取点击取消按钮传过来的状态值*/
    var status = localStorage.status;
    console.log(status);
    console.log(customerId);
    console.log(status);
    //如果传递过来的状态值是4，就显示面签那句话。其他情况不显示。
    if(status == '4'){
        $('.description').show();
    }else{
        $('.description').hide();
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
    //获取客户id
    // var customerId = getCookie('id');
    //输入框聚焦事件
    function inputCancel(btn,textSpan){
        btn.on('focus',function(){
            textSpan.css('color','#444').find('span').css('color','#444');
        }).on('blur',function(){
            if($(this).val().length > 0){
                textSpan.css('color','#444').find('span').css('color','#444');
            }else{
                textSpan.css('color','#aaa').find('span').css('color','#aaa');
            }
            // addReason = $(this).val();
            btn.val($(this).val());
            addReason = $('#cancelReasonCont').val();
        });

    }
    /*$('#cancelReasonCont').on('focus',function () {
        $('.numberCount').css('color','#444').find('span').css('color','#444');
    }).on('blur',function(){
        if($(this).val().length > 0){
            $('.numberCount').css('color','#444').find('span').css('color','#444');
        }else{
            $('.numberCount').css('color','#aaa').find('span').css('color','#aaa');
        }
        addReason = $(this).val();
    });*/
    //统计字数
    function wordCount(text,btn){
        text.on('input',function(){
            if($(this).val().trim().length >= 0 && $(this).val().trim().length <= 100) {
                // console.log($(this).val().trim().length);
                btn.text($(this).val().trim().length);
            }
        });
    }
    /*$('textarea[name="cancelReasonCont"]').on('input',function(){
        if($(this).val().trim().length >= 0 && $(this).val().trim().length <= 100) {
            console.log($(this).val().trim().length);
            $('#numCount').text($(this).val().trim().length);
        }
    });*/
    //点击取消原因弹出下拉列表
    function dropdownMenu(btn,wrapper){
        btn.on('click',function () {
//            $('.loan_wrapper').toggle();
            var _this = $(this);
            if(wrapper.hasClass('cancelReasonShow')){
                wrapper.removeClass('cancelReasonShow');
                _this.css('borderBottom','1px solid #ddd');
            }else{
                wrapper.addClass('cancelReasonShow');
                _this.css('borderBottom','none');
            }

        });
    }
    /*$('#cancel-reason-header').on('click',function () {
//            $('.loan_wrapper').toggle();
        var _this = $(this);
        if(wrapper.hasClass('cancelReasonShow')){
            wrapper.removeClass('cancelReasonShow');
            _this.css('borderBottom','1px solid #ddd');
        }else{
            wrapper.addClass('cancelReasonShow');
            _this.css('borderBottom','none');
        }
    });*/
    //选择下拉列表选项
    function dropdownSelect(menu,textInput,wrapper,header){
        menu.find('li').on('click',function () {
            var dropdownText = $(this).find('i').text();
            console.log(dropdownText);
            textInput.text(dropdownText);
            wrapper.removeClass('cancelReasonShow');
            header.css({
                'borderBottom': '1px solid #ddd',
                'color':'#444'
            });
            $(this).addClass('active').siblings().removeClass('active');
            // reason = textInput.text();

            flag = true;
            reason = $('#require-reason').text();

        });
    }
    /*$('.dropdown-menu').find('li').on('click',function () {
        var dropdownText = $(this).find('i').text();
        console.log(dropdownText);
        $('#require-reason').text(dropdownText);
        $('.loan_wrapper').removeClass('cancelReasonShow');
        $('#cancel-reason-header').css({
            'borderBottom': '1px solid #ddd',
            'color':'#444'
        });
        $(this).addClass('active').siblings().removeClass('active');
        reason = $('#require-reason').text();
        flag = true;
    });*/
    //提交
    function submit(btn){
        btn.on('click',function(){
            /*alert(status);
            alert(customerId);
            alert(productId);*/
            console.log(reason);
            console.log(addReason);
            if(flag === true){
                console.log(66666);
            }else{
                console.log(9999);
                return false;
            }
            $.ajax({
                type: "POST",
                url: url + '/lendRequest/saveRemarkOfM',
                data: {lendRequestId: productId, customerId: customerId,remark: reason +'-' +addReason ,status:status},
                dataType: "jsonp",
                jsonp: 'jsonpcallback',
                success: function (data) {
                    console.log(data);
                    if (data.code === 0) {
                        console.log(233333);
                        _flag = true;
                        showSuccess('修改成功',_flag);
                        // history.back(-1);
                    }else{
                        _flag = false;
                        showSuccess('提交失败，请重新填写',_flag);
                        console.log(99999)
                    }
                },
                error:function(){
                    _flag = false;
                    showSuccess('提交失败，请重新填写',_flag);
                    console.log(88888)
                }
            });
        });
    }
    /*$('#submit-button').on('click',function(){
        console.log(reason);
        console.log(addReason);
        if(flag === true){
            console.log(66666);
        }else{
            console.log(9999);
            return false;
        }
        $.ajax({
            type: "POST",
            url: url + '/lendRequest/saveRemarkOfM',
            data: {lendRequestId: customId, remark: reason +'-' +addReason },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                if (data.code === 0) {
                    console.log(233333);
                    _flag = true;
                    showSuccess('修改成功',_flag);
                }else{
                    _flag = false;
                    showSuccess('提交失败，请重新填写',_flag);
                }
            },
            error:function(){
                _flag = false;
                showSuccess('提交失败，请重新填写',_flag);
            }
        });
    });*/
    //显示错误信息
    var showSuccess = function (info,f) {
        var nonde =  $('.success_bottom');
        nonde.text(info);
        nonde.fadeIn();
        setTimeout(function (f) {
            nonde.fadeOut(function(){
                if(_flag === true){
                    window.location.href = 'myloan.html';
                    // history.back(-1);//跳转到账户中心
                    // location.replace(document.referrer);
                    /*location.reload();
                    history.go(-1);*/
                    localStorage.setItem("localstorage",1);
                }
            });
        },1000)
    };
    return {
        init:function(){
            //输入框聚焦事件
            inputCancel($('#cancelReasonCont'),$('.numberCount'));
            //统计字数
            wordCount($('textarea[name="cancelReasonCont"]'),$('#numCount'));
            //点击取消原因弹出下拉列表
            dropdownMenu($('#cancel-reason-header'),$('.loan_wrapper'));
            //选择下拉选项
            dropdownSelect($('.dropdown-menu'),$('#require-reason'),$('.loan_wrapper'),$('#cancel-reason-header'));
            //提交
            submit($('#submit-button'));
        }
    }
}();
