/**
 * Created by hasee-pc on 2017/8/6.
 */
var AccumulationCalculator = function(){
    /*公积金计算器*/

//贷款金额输入框失焦匹配
    /*必须是1到5位的正整数*/
    var accumulationLoanAmount = $('#accumulation-amount');

//点击显示弹出框
    var accumulationLoanPeriod = $('#accumulation-cont');
    var accumulationMaskWrapper = $('#accumulation-loan-wrapper');

//选择贷款年限下拉列表内容
    var accumulationYearMenu = $('#accumulation-dropdownMenu');
    var accumulationYearCont = $('#accumulation-period');
    //定义全局贷款年限
    var accumulationYearText = 0;
//自定义输入框确定按钮
    var accumulationCombindDefinitionBtn = $('#accumulation-combind-definition-btn');
    //自定义年限取消按钮
    var accumulationLoanCancelBtn = $('#accumulation-loan-cancel-btn');
//自定义输入框失焦事件
    var accumulationLoanInput = $('#accumulation-loan-input');

//点击遮罩层隐藏

//点击公积金利率
    var accumulationLoanRate = $('#accumulation-loan-rate');
    var accumulationLoanRateWrapper = $('#accumulation-loan-rate-wrapper');
    var accumulationLoanRateBtn = $('#accumulationRateBtn');
//选择下拉列表内容
    var accumulationRateDropdownMenu = $('#accumulation-rate-dropdownMenu');
    var accumulationRatePercent = $('#accumulation-year-rate');
    // var accumulationRateBase = 'accumulation-rate-base';
    var accumulationDefualtRate = 3.25;
    var accumulationDefualtDiscount = 1.1;
    var accumulationDefualtDiscountSecond = 1.2;

//自定义输入年利率
    //自定义年利率取消按钮
    var accumulationCancelBtn = $('#accumulation-rate-cancel-btn');
    //自定义年利率确认按钮
    var accumulationSureBtn = $('#accumulation-combind-definition-Rate-btn');
    //自定义年利率输入框
    var accumulationRateInp = $('#accumulation-Rate-input');


//点击计算按钮
    var accumulationBtn = $('#accumulation-btn');
    var accumulationUrl = 'calculator_accumulation.html';
//弹框提示
    var alertCont = $('.alert');
    var coverCont = $('.cover');
    var alertSure = $('.alertSure');
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
    function selectMenu(menu,wrapper,menuId,yearText,yearCont){
        menu.on('click',function(ev){
            var liTarget = $(ev.target).closest('li').eq(0).attr('id');

            if(liTarget === menuId){
                return false;
            }else{
                $(this).find('li').removeClass('active');
                var text = $(ev.target).closest('li').eq(0).addClass('active').find('span').text();
                yearText = text.substring(0,text.length-1);
                yearCont.val(yearText);
                wrapper.removeClass('show').addClass('hide');
            }
            //根据所选年限，全局基准利率做出相应改变
            baseRateChange(yearText);
            //遍历下拉列表里所有的li，如果有active的 选项，就取它的值显示在利率显示框中
            showRate();
        });
    }

//根据所选年限，全局基准利率做出相应改变
    function baseRateChange(yearText){
        //根据年限展示不同的年利率
        switch(yearText)
        {
            case '1':
                accumulationDefualtRate = '2.75';
                break;
            case '2':
                accumulationDefualtRate = '2.75';
                break;
            case '3':
                accumulationDefualtRate = '2.75';
                break;
            case '4':
                accumulationDefualtRate = '2.75';
                break;
            case '5':
                accumulationDefualtRate = '2.75';
                break;
            default:
                accumulationDefualtRate = '3.25';
        }
        selectRateBox(accumulationDefualtRate);
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

    //自定义年限确认按钮
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
                var yearNumber = year.val();
                //根据年限展示不同的年利率
                //根据所选年限，全局基准利率做出相应改变
                baseRateChange(yearNumber);
                //遍历下拉列表里所有的li，如果有active的 选项，就取它的值显示在利率显示框中
                showRate();

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
    function selectRate(target,wrapper,classname){
        target.on('click',function(){
            wrapper.removeClass('hide').addClass('show');
        });
        wrapper.on('click',function(ev){
            var target = ev.target;
            var t = $(target).attr('id');
            if(t === classname){
                ev.stopPropagation();
                $(this).removeClass('show').addClass('hide');
            }
        });
    }
//点击利率下拉列表，给当前点击的li添加active，显示选中的li文本内容
    accumulationRateDropdownMenu.on('click',function(ev){
        $(ev.target).closest('li').eq(0).addClass('active').siblings().removeClass('active');
        accumulationLoanRateWrapper.removeClass('show').addClass('hide');
        showRate();

    });

//遍历下拉列表里所有的li，如果有active的 选项，就取它的值显示在利率显示框中
    function showRate(){
        $.each(accumulationRateDropdownMenu.children('li'), function() {
            if($(this).hasClass('active')){
                accumulationLoanRate.val($(this).text());
            }
        });
    }
    //利率根据全局基准利率改变
    function selectRateBox() {
        $('.acculaterNewRate1').text(accumulationDefualtRate);
        $('.acculaterNewRate2').text((accumulationDefualtRate * accumulationDefualtDiscount).toFixed(3));
        $('.acculaterNewRate3').text((accumulationDefualtRate * accumulationDefualtDiscountSecond).toFixed(3));
    }

    //自定义利率确认按钮
    function RateDefinedSure(btn,input,menu,year){
        btn.on('click',function(){
            var yearlimitStr = input.val();
//          var reg = /^[1-9]$|(^[1-2][0-9]$)|30/;
            var yearRate = parseFloat(yearlimitStr);
            var reg = /^[0-9]{1,2}(\.\d{1,3})*$/;
            var isValid = reg.test(yearlimitStr) && yearRate > 0 && yearRate < 100;

            if(!isValid){
                //弹出蒙层
                coverCont.css({
                    'display':'block',
                    'zIndex':1000
                });
                //弹出提示框
                alertCont.css('display','block');
                $('.alertTip').html('请输入100以内的数字');
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
                //最新基准利率 ( <em class="loanRateNum" id="loanRateNumber">4.9</em>% )
                year.val('最新基准利率('+yearRate+'%)');
                //全局基准利率修改
                accumulationDefualtRate = yearRate;
                //遮罩层消失
                $(this).closest('.loan_wrapper').removeClass('show').addClass('hide');
            }
        });
    }

    //点击计算按钮
    function count(target,amount,year,percent,defualtRate,url){
        target.on('click',function(){
            var money = amount.val();
            var period = year.val();
            var rate = percent.val();
            var exp = /\(([0-9])+.?([0-9])*%\)$/;
            var rz = rate.match(exp);
            var rateNum= rz[0].replace(/[^\d.]/g,'');
            var rateNumber = rateNum;

            //如果年利率没有输入或者输入值为0的时候，默认为4.9
            if(rateNumber === ''|| rateNumber === '0'){
                rateNumber = defualtRate;
                percent.val(rateNumber);
            }
            var m = money*10000;
            var p = period*12;
            var r = rateNumber/100;
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
    //监控软键盘弹出事件
    function resize(btn) {
        var interval = null;
        var bfscrolltop = document.body.scrollTop;//获取软键盘唤起前浏览器滚动部分的高度
        btn.focus(function(){//在这里‘input.inputframe’是我的底部输入栏的输入框，当它获取焦点时触发事件
            interval = setInterval(function(){//设置一个计时器，时间设置与软键盘弹出所需时间相近
                document.body.scrollTop = document.body.scrollHeight;//获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
            },100)
        }).blur(function(){//设定输入框失去焦点时的事件
            clearInterval(interval);//清除计时器
            document.body.scrollTop = bfscrolltop;//将软键盘唤起前的浏览器滚动部分高度重新赋给改变后的高度
        });
    }

    return{
        accumulation:function(){
            /*公积金计算器*/
            //贷款金额输入框失焦匹配
            /*必须是1到6位的正整数*/
            loanAmount(accumulationLoanAmount);
            //点击显示弹出框
            showMask(accumulationLoanPeriod,accumulationMaskWrapper);
            //选择贷款年限下拉列表内容
            selectMenu(accumulationYearMenu,accumulationMaskWrapper,'accumulation-definition',accumulationYearText,accumulationYearCont);
            //自定义输入框失焦事件
            // definedYear(accumulationLoanInput,accumulationYearCont);
            //自定义确认按钮
            definedSure(accumulationCombindDefinitionBtn,accumulationLoanInput,accumulationYearMenu,accumulationYearCont);
            //自定义取消按钮
            definedCancel(accumulationLoanCancelBtn,accumulationLoanInput,accumulationMaskWrapper);
            //点击遮罩层隐藏
            maskHide(accumulationMaskWrapper,'loan_mask');
            //点击公积金利率
            selectRate(accumulationLoanRateBtn,accumulationLoanRateWrapper,'accumulation-loan-rate-mask');
            // btn,input,menu,year
            //自定义利率确认按钮
            RateDefinedSure(accumulationSureBtn,accumulationRateInp,accumulationRateDropdownMenu,accumulationLoanRate);
            //自定义利率取消按钮
            definedCancel(accumulationCancelBtn,accumulationRateInp,accumulationLoanRateWrapper);
            //根据年限显示利率
            selectRateBox();
            //软键盘遮挡问题
            resize($("input.loan_input"));
            //点击计算按钮
            count(accumulationBtn,accumulationLoanAmount,accumulationYearCont,accumulationLoanRate,accumulationDefualtRate,accumulationUrl);
        },
        count:function(){
            //从本地存储里获取数据
            var strStoreDate = window.localStorage?localStorage.getItem('data'):Cookie.read('data');
            /*var sss = window.localStorage?localStorage.getItem('selectedNum'):Cookie.read('selectedNum');
             console.log(sss)*/
            //分割字符串
            var array = strStoreDate.split(',');
            console.log(array);
            //贷款金额
            var money = parseInt(array[0]);//公积金
            var money2 = parseInt(array[3]) || 0;//商贷
            //还款月数
            var months = parseInt(array[1]);
            //年利率
            var rate = parseFloat(array[2]);//公积金
            var rate2 = parseFloat(array[4])|| 0;//商贷
            //月利率
            var monthRate = parseFloat(rate / 12);//公积金
            var monthRate2 = parseFloat(rate2 / 12) || 0;//商贷

            //贷款金额总和
            var totalMoney = parseInt(money + money2);
            $('.loan_money i').text(totalMoney);
            //还款月数
            $('.loan_month i').text(months);
            //每月月供额
            var a = parseFloat(1 + monthRate);
            var b = Math.pow(a,months);
            var monthAmount = parseFloat((money * monthRate * b) / (b - 1));

            var a2 = parseFloat(1 + monthRate2);
            var b2 = Math.pow(a2,months);
            var monthAmount2 = parseFloat((money2 * monthRate2 * b2) / (b2 - 1))|| 0;
            /*组合贷款 每月月供*/
            var totalMonthAmount = (monthAmount + monthAmount2).toFixed(2);

            //总支付利息 等额本息
            var payment = parseFloat(months * monthAmount - money);//公积金
            // var payRate = payment.toFixed(2);
            var payment2 = parseFloat(months * monthAmount2 - money2);//商贷
            // var payRate2 = payment2.toFixed(2);
            var totalPayment = parseFloat(payment + payment2).toFixed(2);
            var nTotalPayment = Number(totalPayment);
            $('#payments-rate').find('i').text(totalPayment);

            //总支付利息 等额本金
            var basis = months * (money * monthRate - monthRate * (money/months)*(months -1)/2 + money/months) - money;//公积金
            var basis2 = months * (money2 * monthRate2 - monthRate2 * (money2/months)*(months -1)/2 + money2/months) - money2;//商贷

            var basRate = parseFloat(basis.toFixed(2));
            var basRate2 = parseFloat(basis2.toFixed(2));
            var totalBasRate = parseFloat(basRate+basRate2).toFixed(2);

            $('#payments_rate_basis').find('i').text(totalBasRate);

            //本息合计
            //等额本息
            var allTotal = (totalMoney + nTotalPayment).toFixed(2);
            $('#loan-total-payment').find('i').text(allTotal);
            //等额本金 总支付利息
            var allTotal_basis = (totalMoney + basis + basis2).toFixed(2);
            $('#loan-total-basis').find('i').text(allTotal_basis);
            //首月月供
            var first_month = parseFloat((money / months) + money * monthRate);
            var first_month2 = parseFloat((money2 / months) + money2 * monthRate2);
            var totalFirst_month = parseFloat(first_month + first_month2).toFixed(2);
            $('.first_month_payment i').text(totalFirst_month);
            //每月月供
            $('#month-pay').text(totalMonthAmount);
            //每月月供递减
            var monthly_decline = parseFloat(money / months * monthRate);
            var monthly_decline2 = parseFloat(money2 / months * monthRate2);
            var totalMonthly_decline = parseFloat(monthly_decline+monthly_decline2).toFixed(2);
            $('#monthly-decline').text(totalMonthly_decline);

        }
    }
}();