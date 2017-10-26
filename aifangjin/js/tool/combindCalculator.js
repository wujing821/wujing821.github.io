var CombindCalculator = function(){
	
    /*组合贷款计算器*/

//点击显示弹出框
    var combindLoanPeriod = $('#combind-cont');
    var combindMaskWrapper = $('#combind-loan-wrapper');
//点击遮罩层隐藏
//选择贷款年限下拉列表内容
    var combindYearMenu = $('#combind-dropdownMenu');
    //获取年限值
    var combindYearCont = $('#combind-period');
//自定义输入框失焦事件
    var combindLoanInput = $('#combind-loan-input');
//公积金贷款金额输入框失焦匹配
    /*必须是1到6位的正整数*/
    var combindAccumulationAmount = $('#combind-accumulation-amount');
//点击公积金利率
    var combindAccumulationLoanRate = $('#combind-accumulation-loan-rate');
    var combindAccumulationLoanRateWrapper = $('#combind-accumulation-loan-rate-wrapper');
//选择下拉列表内容
    var combindAccumulationRateDropdownMenu = $('#combind-accumulation-rate-dropdownMenu');
    var combindAtionRatePercent = $('#combind-accumulation-year-rate');
    var combindAtionRateBase = 'combind-accumulation-rate-base';
    var combindAtionRateBaseDiscount = 'combind-accumulation-rate-base-discount';
    var combindAtionRateBaseDiscountSecond = 'combind-accumulation-rate-base-discount-second';
    //公积金利率
    var accumulationDefualtRate = 3.25;
    var accumulationDefualtDiscount = 1.1;
    var accumulationDefualtDiscountSecond = 1.2;
    //获取公积金自定义取消按钮
    var combindAccumulationCancelBtn = $('#combind-rate-cancel-btn');
    //获取公积金确认按钮
    var combindAccumulationSureBtn = $('#combind-accumulation-definition-Rate-btn');
    //获取公积金自定义输入框
    var combindAccumulationInp = $('#combind-accumulation-Rate-input');
    //公积金按钮
    var combindAccumulationRateBtn = $('#combindAccumulationRateBtn');
//自定义输入年利率

//商业贷款金额输入框失焦匹配
    /*必须是1到5位的正整数*/
    var combindBusinessAmount = $('#combind-amount');
//点击商贷利率
    var combindBusinessLoanRate = $('#combind-loan-rate');
    var combindBusinessLoanRateWrapper = $('#combind-loan-rate-wrapper');
//选择下拉列表内容
    //选择贷款利率下拉列表内容
    var businessdefualtRate = 4.9;
    var defualtDiscountOne = 1.3;
    var defualtDiscountTwo = 1.2;
    var defualtDiscountThree = 1.1;
    var defualtDiscountFour = 0.95;
    var defualtDiscountFive = 0.9;
    var defualtDiscountSix = 0.88;
    var defualtDiscountSeven = 0.85;
    var defualtDiscountEight = 0.82;
    var defualtDiscountNine = 0.8;
    var defualtDiscountTen = 0.75;
    var defualtDiscountEleven = 0.7;

    var combindBusinessRateDropdownMenu = $('#combind-business-rate-dropdownMenu');
    var combindBusinessRatePercent = $('#combind-year-rate');
    var combindBusinessRateBase = 'combind-business-rate-base';
    //获取商贷自定义取消按钮
    var combindBusinessCancelBtn = $('#combind-loan-rate-cancel-btn');
    //获取公积金确认按钮
    var combindBusinessSureBtn = $('#combind-definition-Rate-btn');
    //获取公积金自定义输入框
    var combindBusinessInp = $('#combind-loan-Rate-input');
    //商贷按钮
    var combindBusinessRateBtn = $('#combindBusinessRateBtn');
//自定义输入年利率

//点击计算按钮
    var combindBtn = $('#combind-btn');
    var combindUrl = 'combindCalculator.html';
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
    function selectMenu(menu,wrapper,menuId,yearCont){
        menu.on('click',function(ev){
            var liTarget = $(ev.target).closest('li').eq(0).attr('id');
            if(liTarget === menuId){
                return false;
            }else{
                $(this).find('li').removeClass('active');
                var text = $(ev.target).closest('li').eq(0).addClass('active').find('span').text();
                var yearText = text.substring(0,text.length-1);
                yearCont.val(yearText);
                wrapper.removeClass('show').addClass('hide');
            }
            //根据所选年限，全局基准利率做出相应改变
            businessBaseRateChange(yearText);//公积金
            accumulationBaseRateChange(yearText);//商贷

            //遍历下拉列表里所有的li，如果有active的 选项，就取它的值显示在利率显示框中
            showRate(combindAccumulationRateDropdownMenu,combindAccumulationLoanRate);
            showRate(combindBusinessRateDropdownMenu,combindBusinessLoanRate);
        });
    }
//根据所选年限，公积金全局基准利率做出相应改变

    function accumulationBaseRateChange(yearText){
        //根据年限展示不同的年利率
        switch(yearText)
        {
            case '1':
                defualtRate = '2.75';
                break;
            case '2':
                defualtRate = '2.75';
                break;
            case '3':
                defualtRate = '2.75';
                break;
            case '4':
                defualtRate = '2.75';
                break;
            case '5':
                defualtRate = '2.75';
                break;
            default:
                defualtRate = '3.25';
        }
        accumulationSelectRateBox(defualtRate);
    }
//根据所选年限，商贷全局基准利率做出相应改变
    function businessBaseRateChange(YearText){
        //根据年限展示不同的年利率
        switch(YearText)
        {
            case '1':
                defualtRate = '4.35';
                break;
            case '2':
                defualtRate = '4.75';
                break;
            case '3':
                defualtRate = '4.75';
                break;
            case '4':
                defualtRate = '4.75';
                break;
            case '5':
                defualtRate = '4.75';
                break;
            default:
                defualtRate = '4.9';
        }
		businessSelectRateBox(defualtRate);
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
                businessBaseRateChange(yearNumber);//公积金
                accumulationBaseRateChange(yearNumber);//商贷
                //遍历下拉列表里所有的li，如果有active的 选项，就取它的值显示在利率显示框中
				showRate(combindAccumulationRateDropdownMenu,combindAccumulationLoanRate);
            	showRate(combindBusinessRateDropdownMenu,combindBusinessLoanRate);
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

//点击商贷利率下拉列表，给当前点击的li添加active，显示选中的li文本内容
function addActive(menu,wrapper){
    menu.on('click',function(ev){
        $(ev.target).closest('li').eq(0).addClass('active').siblings().removeClass('active');
        wrapper.removeClass('show').addClass('hide');
        showRate(combindAccumulationRateDropdownMenu,combindAccumulationLoanRate);
        showRate(combindBusinessRateDropdownMenu,combindBusinessLoanRate);
    })
}
addActive(combindBusinessRateDropdownMenu,combindBusinessLoanRateWrapper);
addActive(combindAccumulationRateDropdownMenu,combindAccumulationLoanRateWrapper);

//遍历下拉列表里所有的li，如果有active的 选项，就取它的值显示在利率显示框中
    function showRate(menu,input){
        $.each(menu.children('li'), function() {
            if($(this).hasClass('active')){
                input.val($(this).text());
            }
        });
    }
    //商贷利率根据全局基准利率改变
    function businessSelectRateBox(businessdefualtRate){
//  	console.log(defualtDiscountOne);
        $('.newRate13').text((businessdefualtRate * defualtDiscountOne).toFixed(3));
        $('.newRate12').text((businessdefualtRate * defualtDiscountTwo).toFixed(3));
        $('.newRate11').text((businessdefualtRate * defualtDiscountThree).toFixed(3));
        $('.newRate49').text(businessdefualtRate);
        $('.newRate95').text((businessdefualtRate * defualtDiscountFour).toFixed(3));
        $('.newRate9').text((businessdefualtRate * defualtDiscountFive).toFixed(3));
        $('.newRate88').text((businessdefualtRate * defualtDiscountSix).toFixed(3));
        $('.newRate85').text((businessdefualtRate * defualtDiscountSeven).toFixed(3));
        $('.newRate82').text((businessdefualtRate * defualtDiscountEight).toFixed(3));
        $('.newRate8').text((businessdefualtRate * defualtDiscountNine).toFixed(3));
        $('.newRate75').text((businessdefualtRate * defualtDiscountTen).toFixed(3));
        $('.newRate7').text((businessdefualtRate * defualtDiscountEleven).toFixed(3));
    }
    //公积金利率根据全局基准利率改变
    function accumulationSelectRateBox(accumulationDefualtRate) {
        $('.combindNewRate1').text(accumulationDefualtRate);
        $('.combindNewRate2').text((accumulationDefualtRate * accumulationDefualtDiscount).toFixed(3));
        $('.combindNewRate3').text((accumulationDefualtRate * accumulationDefualtDiscountSecond).toFixed(3));
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
                businessdefualtRate = yearRate;
                accumulationDefualtRate = yearRate;
                //遮罩层消失
                $(this).closest('.loan_wrapper').removeClass('show').addClass('hide');
            }

        });
    }

//点击组合贷款计算按钮
    function combindCount(target,Aamount,year,Apercent,Bamount,Bpercent,defualtRateA,defualtRateB,url){
        target.on('click',function(){

            var period = year.val();
            //公积金
            var Amoney = Aamount.val();
            var Arate = Apercent.val();
            //商贷
            var Bmoney = Bamount.val();
            var Brate = Bpercent.val();
            //如果年利率没有输入或者输入值为0的时候，默认为4.9
            if(Arate === ''|| Arate === '0'){
                Arate = defualtRateA;
                Apercent.val(Arate);
            }else if(Brate === ''|| Brate === '0'){
                Brate = defualtRateB;
                Bpercent.val(Brate);
            }
			//将获取的数值匹配数字利率
            var exp = /\(([0-9])+.?([0-9])*%\)$/;
            var ra = Arate.match(exp);
            var rb = Brate.match(exp);
            var rateANum= ra[0].replace(/[^\d.]/g,'');
            var rateBNum= rb[0].replace(/[^\d.]/g,'');

            var rateANumber = rateANum;
            var rateBNumber = rateBNum;

            if(Amoney === ''){
                Aamount.attr('placeholder','请填写贷款金额');
            }else if( Bmoney === ''){
                Bamount.attr('placeholder','请填写贷款金额');
            }else if(Amoney === '0'){
                Aamount.val('');
                Aamount.attr('placeholder','请填写贷款金额');
            }else if(Bmoney === '0'){
                Bamount.val('');
                Bamount.attr('placeholder','请填写贷款金额');
            }
            if(Amoney !== ''&& Bmoney !== ''&& Amoney !== '0'&& Bmoney !== '0'){
                window.location.href = url;
            }
            var p = parseInt(period*12);
            var am = parseInt(Amoney*10000);
            var ar = parseFloat(rateANumber/100);
            var bm = parseInt(Bmoney*10000);
            var br = parseFloat(rateBNumber/100);
            //本地存储
            var array1 = [am,p,ar,bm,br];
            //存储被选中的li的data属性
            var selectedNum ;
            $.each($("ul.tabs li"),function(k,index){
                if(index.className === 'active'){
                    selectedNum = index.dataset['num'];
                    console.log(selectedNum)
                }
            });
            if(window.localStorage){
                localStorage.setItem('data',array1);
                localStorage.setItem('selectedNum',selectedNum);
            }else{
                Cookie.write('data',array1);
            }
        });
    }
/*//解决ios下，弹出输入界面挡住input的问题
    function inputPosition(target,wrapper){
        target.on('click',function(){
            var target = this;
            setTimeout(function(){
                //scrollIntoView滚动浏览器窗口或者容器元素，以便在当前视窗的可见范围看见当前元素
                target.scrollIntoView(true);
            },100);
            wrapper.attr('position','static');
        });
    }*/
    //监控软键盘弹出事件
    function resize() {
        var interval = null;
        var bfscrolltop = document.body.scrollTop;//获取软键盘唤起前浏览器滚动部分的高度
        $("input.loan_input").focus(function(){//在这里‘input.inputframe’是我的底部输入栏的输入框，当它获取焦点时触发事件
            interval = setInterval(function(){//设置一个计时器，时间设置与软键盘弹出所需时间相近
                document.body.scrollTop = document.body.scrollHeight;//获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
            },100)
        }).blur(function(){//设定输入框失去焦点时的事件
            clearInterval(interval);//清除计时器
            document.body.scrollTop = bfscrolltop;//将软键盘唤起前的浏览器滚动部分高度重新赋给改变后的高度
        });
    }
    return {
    	combind:function(){
            /*组合贷款计算器*/
            //点击显示弹出框
            showMask(combindLoanPeriod,combindMaskWrapper);
            //点击遮罩层隐藏
            maskHide(combindMaskWrapper,'loan_mask');
            //选择贷款年限下拉列表内容
            selectMenu(combindYearMenu,combindMaskWrapper,'combind-definition',combindYearCont);
            //自定义输入框失焦事件
            // definedYear(combindLoanInput,combindYearCont);
            //自定义确认按钮
            definedSure($('#combind-definition-btn'),combindLoanInput,combindYearMenu,combindYearCont);
            //自定义取消按钮
            definedCancel($('#combind-loan-cancel-btn'),combindLoanInput,combindMaskWrapper);
            //公积金贷款金额输入框失焦匹配
            /*必须是1到6位的正整数*/
            loanAmount(combindAccumulationAmount);
            //点击公积金利率弹出下拉选框
            selectRate(combindAccumulationRateBtn,combindAccumulationLoanRateWrapper,'combind-accumulation-loan-rate-mask');
            //自定义利率确认按钮
            RateDefinedSure(combindAccumulationSureBtn,combindAccumulationInp,combindAccumulationRateDropdownMenu,combindAccumulationLoanRate);
            //自定义利率取消按钮
            definedCancel(combindAccumulationCancelBtn,combindAccumulationInp,combindAccumulationLoanRateWrapper);
            //根据年限显示利率
            accumulationSelectRateBox(accumulationDefualtRate);
            
            //选择下拉列表内容
            //自定义输入年利率
//          definedYearRate(combindAtionRatePercent,accumulationDefualtRate);
            //商业贷款金额输入框失焦匹配
            /*必须是1到6位的正整数*/
            loanAmount(combindBusinessAmount);
            //点击商贷利率
            selectRate(combindBusinessRateBtn,combindBusinessLoanRateWrapper,'combind-business-loan-rate-mask');
            //自定义利率确认按钮
            RateDefinedSure(combindBusinessSureBtn,combindBusinessInp,combindBusinessRateDropdownMenu,combindBusinessLoanRate);
            //自定义利率取消按钮
            definedCancel(combindBusinessCancelBtn,combindBusinessInp,combindBusinessLoanRateWrapper);
            //根据年限显示利率
            businessSelectRateBox(businessdefualtRate);
            //选择下拉列表内容
            //自定义输入年利率
            //点击计算按钮
combindCount(combindBtn,combindAccumulationAmount,combindYearCont,combindAccumulationLoanRate,combindBusinessAmount,combindBusinessLoanRate,accumulationDefualtRate,businessdefualtRate,combindUrl);
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
            // console.log( nTotalPayment);
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
