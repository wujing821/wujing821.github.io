/*

//从本地存储里获取数据
var strStoreDate = window.localStorage?localStorage.getItem('data'):Cookie.read('data');

//分割字符串
var array = strStoreDate.split(',');
console.log(array);
//贷款金额
var money = parseInt(array[0]);
//还款月数
var months = parseInt(array[1]);
//年利率
var rate = parseFloat(array[2]);
//月利率
var monthRate = parseFloat(rate / 12);

//贷款金额
$('.loan_money i').text(money);
//还款月数
$('.loan_month i').text(months);
//每月月供额
var a = parseFloat(1 + monthRate);
var b = Math.pow(a,months);
var monthAmount = parseInt((money * monthRate * b) / (b - 1));

//总支付利息 等额本息
var payment = months * monthAmount - money;
var payRate = (payment).toFixed(2);
$('#payments-rate').find('i').text(payRate);
//总支付利息 等额本金
var basis = months * (money * monthRate - monthRate * (money/months)*(months -1)/2 + money/months);
console.log(basis);
console.log(111111)
var basRate = basis.toFixed(2);
$('#payments_rate_basis').find('i').text(basRate);
//本息合计
//等额本息
var allTotal = (money + payment).toFixed(2);
$('#loan-total-payment').find('i').text(allTotal);
//等额本金
var allTotal_basis = (money + basis).toFixed(2);
$('#loan-total-basis').find('i').text(allTotal_basis);
//首月月供
var first_month = parseInt((money / months) + money * monthRate);
$('.first_month_payment i').text(first_month);
//每月月供
$('#month-pay').text(monthAmount);
//每月月供递减
var monthly_decline = parseInt(money / months * monthRate);
$('#monthly-decline').text(monthly_decline);*/

//方法封装
//贷款金额输入框失焦匹配
/*必须是1到5位的正整数*/
function loanAmount(target){
    target.on('blur',function(){
        var loanAmount = $(this).val();
        var reg = /^[1-9][0-9]{0,5}$/;
        var isValid = reg.test(loanAmount);
        if(!isValid){
            $(this).val('0');
        }
    });
}
//点击显示弹出框
function showMask(target,mask){
    target.on('click',function(){
        mask.removeClass('hide').addClass('show');
    });
}
//选择贷款年限下拉列表内容
function selectMenu(menu,year,wrapper,menuId){
    menu.on('click',function(ev){
        var liTarget = $(ev.target).closest('li').eq(0).attr('id');

        if(liTarget === menuId){
            return false;
        }else{
            $(this).find('li').removeClass('active');
            var text = $(ev.target).closest('li').eq(0).addClass('active').find('span').text();
            year.val(text.substring(0,text.length-1));
            wrapper.removeClass('show').addClass('hide');
        }
    });
}
//点击遮罩层隐藏
function maskHide(wrapper,maskClassname){
    wrapper.on('click',function(ev){
        var target = ev.target;
        var t = $(target).attr('class');
        if(t === maskClassname){
            ev.stopPropagation();
            $(this).removeClass('show').addClass('hide');
        }
    });
}

//自定义年限输入框失焦事件
/*function definedYear(input,yearCont){
 input.on('blur',function(ev){
 var yearlimitStr = $(this).val();
 var reg = /^[1-9]$|(^[1-2][0-9]$)|30/;
 var isValid = reg.test(yearlimitStr);
 var defaultYearlimit = 25;

 if(!isValid){
 yearCont.html(defaultYearlimit);
 }else{
 yearCont.html(yearlimitStr);
 }
 //遮罩层消失
 $(this).closest('.loan_wrapper').removeClass('show').addClass('hide');
 });
 }*/
//自定义确认按钮
function definedSure(btn,input,menu,year){
    btn.on('click',function(){
        var yearlimitStr = input.val();
        var reg = /^[1-9]$|(^[1-2][0-9]$)|30/;
        var isValid = reg.test(yearlimitStr);
        var defaultYearlimit = 25;
        if(!isValid){
            //弹出蒙层
            coverCont.css({
                'display':'block',
                'zIndex':1000
            });
            //弹出提示框
            alertCont.css('display','block');
            $('.alertTip').html('请输入1到30之间的数字');
            //按住确定按钮，取消提示框，蒙层消失
            alertSure.on('click',function () {
                alertCont.css('display','none');
                coverCont.css({
                    'display':'none',
                    'zIndex':0
                });
                //输入框清空
                input.val('');
                //输入框聚焦
                input.focus();
            })
        }else{
            menu.find('li').removeClass('active');
            year.val(yearlimitStr);
            //遮罩层消失
            $(this).closest('.loan_wrapper').removeClass('show').addClass('hide');
        }
    });
}

//自定义取消按钮
function definedCancel(btn,input,wrapper){
    btn.on('click',function(){
        //置空input
        input.val('');
        //下拉列表选项默认重置为25
        // yearMenu.find('li').removeClass('active').end().find('.last_item').addClass('active');
        //隐藏遮罩层
        wrapper.removeClass('show').addClass('hide');
    });
}

//点击贷款利率
function selectRate(target,wrapper,id){
    target.on('click',function(){
        wrapper.removeClass('hide').addClass('show');
    });
    wrapper.on('click',function(ev){
        var target = ev.target;
        var t = $(target).attr('id');
        if(t === id){
            ev.stopPropagation();
            $(this).removeClass('show').addClass('hide');
        }
    });
}
//选择贷款利率下拉列表内容
function selectRateMenu(menu,loanBaseRate,loanRateWrapper,ratePercent,rateBase,rateBaceDiscount,defualtRate,defualtDiscount ){
    menu.on('click',function(ev){
        var liTarget = $(ev.target).closest('li').eq(0).attr('id');
        $(this).find('li').removeClass('active');
        var text = $(ev.target).closest('li').eq(0).addClass('active').find('span').text();
        loanBaseRate.html(text);
        loanRateWrapper.removeClass('show').addClass('hide');
        //根据选项展示不同数值
        if(liTarget === rateBase){
            ratePercent.val(defualtRate);
        }else if(liTarget === rateBaceDiscount){
            var rate = defualtRate * defualtDiscount;
            var r = rate.toFixed(3);
            ratePercent.val(r);
        }
    });
}
//还款方式
function paymentMethod(menu,cont,wrapper){
    menu.on('click',function(ev){
        var liTarget = $(ev.target).closest('li').eq(0).attr('id');
        $(this).find('li').removeClass('active');
        var text = $(ev.target).closest('li').eq(0).addClass('active').find('span').text();
        cont.html(text);
        wrapper.removeClass('show').addClass('hide');
        //如果选择的是部分还清，显示另外两个字段
        if(liTarget === 'partPay'){
            $('#prepayment-amount').css('display','block');
            $('#process-mode').css('display','block');
        }else{
            $('#prepayment-amount').css('display','none');
            $('#process-mode').css('display','none');
        }
    });
}
//choose
function choose(menu,cont,wrapper){
    menu.on('click',function(ev){
        var liTarget = $(ev.target).closest('li').eq(0).attr('id');
        $(this).find('li').removeClass('active');
        var text = $(ev.target).closest('li').eq(0).addClass('active').find('span').text();
        cont.html(text);
        wrapper.removeClass('show').addClass('hide');
    });
}
//自定义输入年利率
function definedYearRate(target,defaultValue){
    target.on('blur',function() {
        var yearRateStr = $(this).val();
        var yearRate = parseFloat(yearRateStr);
        var reg = /^[0-9]{1,2}(\.\d{1,3})*$/;
        var isValid = reg.test(yearRateStr) && yearRate > 0 && yearRate < 100;
        if (!isValid) {
            //弹出蒙层
            coverCont.css({
                'display': 'block',
                'zIndex': 1000
            });
            //弹出提示框
            alertCont.css('display', 'block');
            $('.alertTip').html('请输入100以内的数字');
            //按住确定按钮，取消提示框，蒙层消失
            alertSure.on('click', function () {
                alertCont.css('display', 'none');
                coverCont.css({
                    'display': 'none',
                    'zIndex': 0
                });
                //输入框清空
                // target.val('');
                // target.placeholder = '';
                //输入框聚焦
                target.focus();
            });
        }
    });
}
//点击计算按钮
function count(target,amount,year,percent,defualtRate,url){
    target.on('click',function(){
        var money = amount.val();
        var period = year.val();
        var rate = percent.val();
        //如果年利率没有输入或者输入值为0的时候，默认为4.9
        if(rate === ''|| rate === '0'){
            rate = defualtRate;
            percent.val(rate);
        }
        var m = money*10000;
        var p = period*12;
        var r = rate/100;

        if(money === ''){
            amount.attr('placeholder','请填写贷款金额');
        }else if(money === '0'){
            amount.val('');
            amount.attr('placeholder','请填写贷款金额');
        }else{
            window.location.href = url;
        }
        //本地存储
        var array = [m,p,r];
        //存储被选中li的data属性
        var selectedNum ;
        $.each($("ul.tabs li"),function(k,index){
            if(index.className === 'active'){
                selectedNum = index.dataset['num'];
                console.log(selectedNum)
            }
        });
        if(window.localStorage){
            localStorage.setItem('data',array);
            localStorage.setItem('selectedNum',selectedNum);

        }else{
            Cookie.write('data',array);
        }
    });
}
//点击所选列，input自动聚焦
function autoFocus(target){
    target.on('click',function () {
        $(this).find('input').focus();
    })
}