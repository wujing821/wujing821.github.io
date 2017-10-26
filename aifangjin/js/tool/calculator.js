/**
 * Created by Administrator on 2017/5/9.
 */
var Calculator = function(){
    //贷款金额输入框失焦匹配
    /*必须是1到5位的正整数*/
    var businessLoanAmount = $('#loan-money');

//点击显示弹出框
    var businessLoanPeriod = $('#business-loan-period');
    var businessMaskWrapper = $('#loan-wrapper');

//选择贷款年限下拉列表内容
    var yearMenu = $('#dropdownMenu');
    //商贷贷款期限
    var yearCont = $('#business-year');
    //定义全局贷款年限
    var businessYearText = 0;

	//自定义年限输入框失焦事件
    //商贷自定义年限输入框
    var businessInput = $('#loan-input');
    var maskWrapper = $('.loan_cont');
    //商贷自定义利率输入框
    var businessInput = $('#loan-input');
    //自定义年利率输入框
    var businessRateInput = $('#loan-Rate-input');
	//自定义年限输入框确定按钮
    var businessCombindDefinitionBtn = $('#business-combind-definition-btn');
    //自定义利率输入框确定按钮
    var businessCombindDefinitionRateBtn = $('#business-combind-definition-Rate-btn');
    //自定义输入年限取消按钮
    var loanCancelBtn = $('#loan-cancel-btn');
	//自定义输入年利率取消按钮
    var loanRateCancelBtn = $('#loan-rate-cancel-btn');
//解决ios下，弹出输入界面挡住input的问题

//点击遮罩层隐藏

//点击商贷利率
    var businessLoanRate = $('#business-loan-rate');
    var businessLoanRateWrapper = $('#loan-rate-wrapper');

//选择贷款利率下拉列表内容
    var defualtRate = 4.9;
    // var defualtDiscount = 0.85;
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

    var businessRateMenu = $('#rate-dropdownMenu');
    var businessBaseRate = $('#loan-base-rate');
//  var businessRatePercent = $('#rate-percent');

//解决ios下，弹出输入界面挡住input的问题
//自定义输入年利率

//点击计算按钮
    var businessBtn = $('#loan-btn');
    var businessUrl = 'calculator_result.html';

//回退功能
//     Public.init();

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
//自定义输入框确定按钮
    var accumulationCombindDefinitionBtn = $('#accumulation-combind-definition-btn');
//自定义输入框失焦事件
    var accumulationLoanInput = $('#accumulation-loan-input');

//点击遮罩层隐藏

//点击公积金利率
    var accumulationLoanRate = $('#accumulation-loan-rate');
    var accumulationLoanRateWrapper = $('#accumulation-loan-rate-wrapper');

//选择下拉列表内容
    var accumulationRateDropdownMenu = $('#accumulation-rate-dropdownMenu');
    var accumulationRatePercent = $('#accumulation-year-rate');
    var accumulationRateBase = 'accumulation-rate-base';
    var accumulationRateBaseDiscount = 'accumulation-rate-base-discount';
    var accumulationRateBaseDiscountSecond = 'accumulation-rate-base-discount-second';
    var accumulationDefualtRate = 3.25;
    var accumulationDefualtDiscount = 1.1;
    var accumulationDefualtDiscountSecond = 1.2;

//自定义输入年利率



//点击计算按钮
    var accumulationBtn = $('#accumulation-btn');
    var accumulationUrl = 'calculator_accumulation.html';

    /*组合贷款计算器*/

//点击显示弹出框
    var combindLoanPeriod = $('#combind-cont');
    var combindMaskWrapper = $('#combind-loan-wrapper');
//点击遮罩层隐藏
//选择贷款年限下拉列表内容
    var combindYearMenu = $('#combind-dropdownMenu');
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
//自定义输入年利率

//商业贷款金额输入框失焦匹配
    /*必须是1到5位的正整数*/
    var combindBusinessAmount = $('#combind-amount');
//点击公积金利率
    var combindBusinessLoanRate = $('#combind-loan-rate');
    var combindBusinessLoanRateWrapper = $('#combind-loan-rate-wrapper');
//选择下拉列表内容
    var combindBusinessRateDropdownMenu = $('#combind-business-rate-dropdownMenu');
    var combindBusinessRatePercent = $('#combind-year-rate');
    var combindBusinessRateBase = 'combind-business-rate-base';
//自定义输入年利率

//点击计算按钮
    var combindBtn = $('#combind-btn');
    var combindUrl = 'combindCalculator.html';
//弹框提示
    var alertCont = $('.alert');
    var coverCont = $('.cover');
    var alertSure = $('.alertSure');
    
    /*var rate = businessBaseRate.val();
    console.log(rate);
    var exp = /\(([0-9])+.?([0-9])*%\)$/;
    var rz = rate.match(exp);
    var num= rz[0].replace(/[^0-9]/ig,"");
    console.log(num);*/

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
    function selectMenu(menu,wrapper,menuId){
        menu.on('click',function(ev){
            var liTarget = $(ev.target).closest('li').eq(0).attr('id');
//			debugger
            if(liTarget === menuId){
                return false;
            }else{
                $(this).find('li').removeClass('active');
                var text = $(ev.target).closest('li').eq(0).addClass('active').find('span').text();
//              console.log(text.substring(0,text.length-1));
                businessYearText = text.substring(0,text.length-1);
                yearCont.val(businessYearText);
//				yearContText = yearText;
                wrapper.removeClass('show').addClass('hide');
            }
            //根据所选年限，全局基准利率做出相应改变
            baseRateChange(businessYearText);
//	            selectRateList(businessRateMenu,businessBaseRate,businessLoanRateWrapper);
			
            //利率根据全局基准利率改变
           	selectRateBox(defualtRate);
           //遍历下拉列表里所有的li，如果有active的 选项，就取它的值显示在利率显示框中
            showRate();
            
        });

    }

//根据所选年限，全局基准利率做出相应改变
//businessBaseRate
function baseRateChange(businessYearText){
	//根据年限展示不同的年利率
// console.log(businessYearText);
    switch(businessYearText)
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
//  console.log(defualtRate);
    selectRateBox(defualtRate);
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
   
   
    //definedSure(businessCombindDefinitionBtn,businessInput,yearMenu,yearCont);
   
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
                console.log(year.val());
                var yearNumber = year.val();
                //根据年限展示不同的年利率
               //根据所选年限，全局基准利率做出相应改变
	            baseRateChange(yearNumber);
	            //利率根据全局基准利率改变
               	selectRateBox(defualtRate);
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
//选择贷款利率下拉列表内容
/*function selectRateList(menu,loanBaseRate,loanRateWrapper){
	menu.on('click',function(ev){
		var liTarget = $(ev.target).closest('li').eq(0).attr('id');
		$(this).find('li').removeClass('active');
		var text = $(ev.target).closest('li').eq(0).addClass('active').text();
		console.log(text);
		loanBaseRate.html(text);
		loanRateWrapper.removeClass('show').addClass('hide');
		
	})
}*/
//点击利率下拉列表，给当前点击的li添加active，显示选中的li文本内容
businessRateMenu.on('click',function(ev){
	$(ev.target).closest('li').eq(0).addClass('active').siblings().removeClass('active');
//	selectRateList(ev,businessBaseRate,businessLoanRateWrapper);
	businessLoanRateWrapper.removeClass('show').addClass('hide');
	showRate();
	
})

//function selectRateList(ev){
//	$(ev.target).closest('li').eq(0).addClass('active').siblings().removeClass('active');
//	console.log($(this));
//	$(this).addClass('active').siblings().removeClass('active');
//		var liTarget = $(ev.target).closest('li').eq(0).attr('id');
//		$(this).find('li').removeClass('active');
//		var text = $(ev.target).closest('li').eq(0).addClass('active').siblings().removeClass('active');
//		console.log($(this).children('li'));
		
//		showRate();
//		var text = $(this).addClass('active').siblings().removeClass('active');
		/*console.log(text);
		businessBaseRate.html(text);*/
		
		
	
//}
//遍历下拉列表里所有的li，如果有active的 选项，就取它的值显示在利率显示框中
function showRate(){
	$.each(businessRateMenu.children('li'), function() {
		if($(this).hasClass('active')){
			businessBaseRate.val($(this).text());
			console.log($(this).text());
			console.log($(this).html());
		}
	});
}
/*selectRateMenu(businessRateMenu,businessBaseRate,businessLoanRateWrapper,businessRatePercent,'rate-base','rate-base-discount-one',defualtRate,defualtDiscountOne);
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
                console.log(r);
                ratePercent.val(r);
            }
        });
    }*/
    //利率根据全局基准利率改变
    function selectRateBox(){
        $('.newRate13').text((defualtRate * defualtDiscountOne).toFixed(3));
        $('.newRate12').text((defualtRate * defualtDiscountTwo).toFixed(3));
        $('.newRate11').text((defualtRate * defualtDiscountThree).toFixed(3));
        $('.newRate49').text(defualtRate);
        $('.newRate95').text((defualtRate * defualtDiscountFour).toFixed(3));
        $('.newRate9').text((defualtRate * defualtDiscountFive).toFixed(3));
        $('.newRate88').text((defualtRate * defualtDiscountSix).toFixed(3));
        $('.newRate85').text((defualtRate * defualtDiscountSeven).toFixed(3));
        $('.newRate82').text((defualtRate * defualtDiscountEight).toFixed(3));
        $('.newRate8').text((defualtRate * defualtDiscountNine).toFixed(3));
        $('.newRate75').text((defualtRate * defualtDiscountTen).toFixed(3));
        $('.newRate7').text((defualtRate * defualtDiscountEleven).toFixed(3));
    }
/*//自定义输入年利率
    function definedYearRate(target,defaultValue){
        target.on('blur',function() {
            var yearRateStr = $(this).val();
            var yearRate = parseFloat(yearRateStr);
            var reg = /^[0-9]{1,2}(\.\d{1,3})*$/;
            var isValid = reg.test(yearRateStr) && yearRate > 0 && yearRate < 100;
            //匹配不成功时
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
                    //输入框聚焦
                    target.focus();
                });
            }
        });
    }*/
    //自定义利率确认按钮
   function RateDefinedSure(btn,input,menu,year){
   		btn.on('click',function(){
            var yearlimitStr = input.val();
//          var reg = /^[1-9]$|(^[1-2][0-9]$)|30/;
            var yearRate = parseFloat(yearlimitStr);
            var reg = /^[0-9]{1,2}(\.\d{1,3})*$/;
            var isValid = reg.test(yearlimitStr) && yearRate > 0 && yearRate < 100;
//          var isValid = reg.test(yearlimitStr);
//          var defaultYearlimit = 25;
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
                defualtRate = yearRate;
                //遮罩层消失
                $(this).closest('.loan_wrapper').removeClass('show').addClass('hide');
//              console.log(year.val());
//              var yearNumber = year.val();
                //根据年限展示不同的年利率
               //根据所选年限，全局基准利率做出相应改变
//	            baseRateChange(defualtRate);
	            //利率根据全局基准利率改变
               	selectRateBox(defualtRate);
               //遍历下拉列表里所有的li，如果有active的 选项，就取它的值显示在利率显示框中
	            showRate();

            }
            
        });
   }
//点击计算按钮
    function count(target,amount,year,percent,defualtRate,url){
        target.on('click',function(){
            var money = amount.val();
            var period = year.val();
            var rate = percent.val();
		    console.log(rate);
		    var exp = /\(([0-9])+.?([0-9])*%\)$/;
		    var rz = rate.match(exp);
		    var rateNum= rz[0].replace(/[^\d.]/g,'');
//			var rateNum = parseFloat(rz[0]);
		    console.log(rateNum);
		    var rateNumber = rateNum;
            
            //如果年利率没有输入或者输入值为0的时候，默认为4.9
            if(rateNumber === ''|| rateNumber === '0'){
                rateNumber = defualtRate;
                percent.val(rateNumber);
            }
            var m = money*10000;
            var p = period*12;
            var r = rateNumber/100;
//          debugger

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
//点击组合贷款计算按钮
    function combindCount(target,Aamount,year,Apercent,Bamount,Bpercent,defualtRateA,defualtRateB,url){
        target.on('click',function(){
            var Amoney = Aamount.val();
            var period = year.val();
            var Arate = Apercent.val();
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
            console.log(Arate);
            console.log(Brate);
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
            var am = parseInt(Amoney*10000);
            var p = parseInt(period*12);
            var ar = parseFloat(Arate/100);
            var bm = parseInt(Bmoney*10000);
            var br = parseFloat(Brate/100);
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
            localStorage.setItem('data',array1);
            localStorage.setItem('selectedNum',selectedNum);
        });
    }
//解决ios下，弹出输入界面挡住input的问题
    function inputPosition(target,wrapper){
        target.on('click',function(){
            var target = this;
            setTimeout(function(){
                //scrollIntoView滚动浏览器窗口或者容器元素，以便在当前视窗的可见范围看见当前元素
                target.scrollIntoView(true);
            },100);
            wrapper.attr('position','static');
        });
    }

    return{
        init:function(){
            //Default Action
            $(".contBox").hide();
            $("ul.tabs li:first").addClass("active").show();
            $(".contBox:first").show();

            //On Click Event
            $("ul.tabs li").click(function() {
                $("ul.tabs li").removeClass("active");
                $(this).addClass("active");
                $(".contBox").hide();
                var activeTab = $(this).find("a").attr("href");
                $(activeTab).fadeIn();
                return false;
            });

        },
        business:function(){
            //贷款金额输入框失焦匹配
            /*必须是1到6位的正整数*/
            loanAmount(businessLoanAmount);
            //点击显示弹出框
            showMask(businessLoanPeriod,businessMaskWrapper);
            //选择贷款年限下拉列表内容
            selectMenu(yearMenu,businessMaskWrapper,'definition');
            //自定义年限输入框失焦事件
            // definedYear(businessInput,yearCont);
           
//         			baseRateChange(businessYearText);

            //解决ios下，弹出输入界面挡住input的问题
            inputPosition(businessInput,maskWrapper);
            //点击遮罩层隐藏
            maskHide(businessMaskWrapper,'loan_mask');
            //自定义年限确认按钮
            definedSure(businessCombindDefinitionBtn,businessInput,yearMenu,yearCont);
            //自定义利率确认按钮
            RateDefinedSure(businessCombindDefinitionRateBtn,businessRateInput,businessRateMenu,businessBaseRate);
//          console.log(defualtRate);
            //自定义年限取消按钮
            definedCancel(loanCancelBtn,businessInput,businessMaskWrapper);
            //自定义利率取消按钮
            definedCancel(loanRateCancelBtn,businessRateInput,businessLoanRateWrapper);
            //重新定义利率
            definedCancel(loanCancelBtn,businessInput,businessMaskWrapper);

            //点击商贷利率
            selectRate(businessLoanRate,businessLoanRateWrapper,'loan-rate-mask');
            //选择贷款利率下拉列表内容
//          selectRateList(businessRateMenu,businessBaseRate,businessLoanRateWrapper)
            
            
           /* selectRateMenu(businessRateMenu,businessBaseRate,businessLoanRateWrapper,businessRatePercent,'rate-base','rate-base-discount-one',defualtRate,defualtDiscountOne);
            selectRateMenu(businessRateMenu,businessBaseRate,businessLoanRateWrapper,businessRatePercent,'rate-base','rate-base-discount-two',defualtRate,defualtDiscountTwo);
            selectRateMenu(businessRateMenu,businessBaseRate,businessLoanRateWrapper,businessRatePercent,'rate-base','rate-base-discount-three',defualtRate,defualtDiscountThree);
            // selectRateMenu(businessRateMenu,businessBaseRate,businessLoanRateWrapper,businessRatePercent,'rate-base','rate-base-discount',defualtRate,defualtDiscount);
            selectRateMenu(businessRateMenu,businessBaseRate,businessLoanRateWrapper,businessRatePercent,'rate-base','rate-base-discount-four',defualtRate,defualtDiscountFour);
            selectRateMenu(businessRateMenu,businessBaseRate,businessLoanRateWrapper,businessRatePercent,'rate-base','rate-base-discount-five',defualtRate,defualtDiscountFive);
            selectRateMenu(businessRateMenu,businessBaseRate,businessLoanRateWrapper,businessRatePercent,'rate-base','rate-base-discount-six',defualtRate,defualtDiscountSix);
            selectRateMenu(businessRateMenu,businessBaseRate,businessLoanRateWrapper,businessRatePercent,'rate-base','rate-base-discount-seven',defualtRate,defualtDiscountSeven);
            selectRateMenu(businessRateMenu,businessBaseRate,businessLoanRateWrapper,businessRatePercent,'rate-base','rate-base-discount-eight',defualtRate,defualtDiscountEight);
            selectRateMenu(businessRateMenu,businessBaseRate,businessLoanRateWrapper,businessRatePercent,'rate-base','rate-base-discount-nine',defualtRate,defualtDiscountNine);
            selectRateMenu(businessRateMenu,businessBaseRate,businessLoanRateWrapper,businessRatePercent,'rate-base','rate-base-discount-ten',defualtRate,defualtDiscountTen);
            selectRateMenu(businessRateMenu,businessBaseRate,businessLoanRateWrapper,businessRatePercent,'rate-base','rate-base-discount-eleven',defualtRate,defualtDiscountEleven);*/
            //根据年限显示利率
            selectRateBox();
            //解决ios下，弹出输入界面挡住input的问题
            inputPosition(businessBaseRate,maskWrapper);
            //自定义输入年利率
//          definedYearRate(businessRatePercent,defualtRate);
            //点击计算按钮
//          var businessRatePercent = businessBaseRate.find('em');
            count(businessBtn,businessLoanAmount,yearCont,businessBaseRate,defualtRate,businessUrl);
        },
        accumulation:function(){
            /*公积金计算器*/
            //贷款金额输入框失焦匹配
            /*必须是1到6位的正整数*/
            loanAmount(accumulationLoanAmount);
            //点击显示弹出框
            showMask(accumulationLoanPeriod,accumulationMaskWrapper);
            //选择贷款年限下拉列表内容
            selectMenu(accumulationYearMenu,accumulationYearCont,accumulationMaskWrapper,'accumulation-definition');
            //自定义输入框失焦事件
            // definedYear(accumulationLoanInput,accumulationYearCont);
            //自定义确认按钮
            definedSure(accumulationCombindDefinitionBtn,accumulationLoanInput,accumulationYearMenu,accumulationYearCont);
            
            //自定义取消按钮
            definedCancel($('#accumulation-loan-cancel-btn'),accumulationLoanInput,accumulationMaskWrapper);
            //点击遮罩层隐藏
            maskHide(accumulationMaskWrapper,'loan_mask');
            //点击公积金利率
            selectRate(accumulationLoanRate,accumulationLoanRateWrapper,'accumulation-loan-rate-mask');
            //选择下拉列表内容
//          selectRateMenu(accumulationRateDropdownMenu,accumulationLoanRate,accumulationLoanRateWrapper,accumulationRatePercent,accumulationRateBase,accumulationRateBaseDiscount,accumulationDefualtRate,accumulationDefualtDiscount);
//          selectRateMenu(accumulationRateDropdownMenu,accumulationLoanRate,accumulationLoanRateWrapper,accumulationRatePercent,accumulationRateBase,accumulationRateBaseDiscountSecond,accumulationDefualtRate,accumulationDefualtDiscountSecond);
            //自定义输入年利率
//          definedYearRate(accumulationRatePercent,accumulationDefualtRate);
            //点击计算按钮
            count(accumulationBtn,accumulationLoanAmount,accumulationYearCont,accumulationRatePercent,accumulationDefualtRate,accumulationUrl);

        },
        combind:function(){
            /*组合贷款计算器*/
            //点击显示弹出框
            showMask(combindLoanPeriod,combindMaskWrapper);
            //点击遮罩层隐藏
            maskHide(combindMaskWrapper,'loan_mask');
            //选择贷款年限下拉列表内容
            selectMenu(combindYearMenu,combindYearCont,combindMaskWrapper,'combind-definition');
            //自定义输入框失焦事件
            // definedYear(combindLoanInput,combindYearCont);
            //自定义确认按钮
            definedSure($('#combind-definition-btn'),combindLoanInput,combindYearMenu,combindYearCont);
            //自定义取消按钮
            definedCancel($('#combind-loan-cancel-btn'),combindLoanInput,combindMaskWrapper);
            //公积金贷款金额输入框失焦匹配
            /*必须是1到6位的正整数*/
            loanAmount(combindAccumulationAmount);
            //点击公积金利率
            selectRate(combindAccumulationLoanRate,combindAccumulationLoanRateWrapper,'combind-accumulation-loan-rate-mask');
            //选择下拉列表内容
//          selectRateMenu(combindAccumulationRateDropdownMenu,combindAccumulationLoanRate,combindAccumulationLoanRateWrapper,combindAtionRatePercent,combindAtionRateBase,combindAtionRateBaseDiscount,accumulationDefualtRate,accumulationDefualtDiscount);
//          selectRateMenu(combindAccumulationRateDropdownMenu,combindAccumulationLoanRate,combindAccumulationLoanRateWrapper,combindAtionRatePercent,combindAtionRateBase,combindAtionRateBaseDiscountSecond,accumulationDefualtRate,accumulationDefualtDiscountSecond);
            //自定义输入年利率
//          definedYearRate(combindAtionRatePercent,accumulationDefualtRate);
            //商业贷款金额输入框失焦匹配
            /*必须是1到6位的正整数*/
            loanAmount(combindBusinessAmount);
            //点击公积金利率
            selectRate(combindBusinessLoanRate,combindBusinessLoanRateWrapper,'combind-business-loan-rate-mask');
            //选择下拉列表内容

//          selectRateMenu(combindBusinessRateDropdownMenu,combindBusinessLoanRate,combindBusinessLoanRateWrapper,combindBusinessRatePercent,combindBusinessRateBase,'combind-rate-base-discount-one',defualtRate,defualtDiscountOne);
//          selectRateMenu(combindBusinessRateDropdownMenu,combindBusinessLoanRate,combindBusinessLoanRateWrapper,combindBusinessRatePercent,combindBusinessRateBase,'combind-rate-base-discount-two',defualtRate,defualtDiscountTwo);
//          selectRateMenu(combindBusinessRateDropdownMenu,combindBusinessLoanRate,combindBusinessLoanRateWrapper,combindBusinessRatePercent,combindBusinessRateBase,'combind-rate-base-discount-three',defualtRate,defualtDiscountThree);
//          selectRateMenu(combindBusinessRateDropdownMenu,combindBusinessLoanRate,combindBusinessLoanRateWrapper,combindBusinessRatePercent,combindBusinessRateBase,'combind-rate-base-discount-four',defualtRate,defualtDiscountFour);
//          selectRateMenu(combindBusinessRateDropdownMenu,combindBusinessLoanRate,combindBusinessLoanRateWrapper,combindBusinessRatePercent,combindBusinessRateBase,'combind-rate-base-discount-five',defualtRate,defualtDiscountFive);
//          selectRateMenu(combindBusinessRateDropdownMenu,combindBusinessLoanRate,combindBusinessLoanRateWrapper,combindBusinessRatePercent,combindBusinessRateBase,'combind-rate-base-discount-six',defualtRate,defualtDiscountSix);
//          selectRateMenu(combindBusinessRateDropdownMenu,combindBusinessLoanRate,combindBusinessLoanRateWrapper,combindBusinessRatePercent,combindBusinessRateBase,'combind-rate-base-discount-seven',defualtRate,defualtDiscountSeven);
//          selectRateMenu(combindBusinessRateDropdownMenu,combindBusinessLoanRate,combindBusinessLoanRateWrapper,combindBusinessRatePercent,combindBusinessRateBase,'combind-rate-base-discount-eight',defualtRate,defualtDiscountEight);
//          selectRateMenu(combindBusinessRateDropdownMenu,combindBusinessLoanRate,combindBusinessLoanRateWrapper,combindBusinessRatePercent,combindBusinessRateBase,'combind-rate-base-discount-nine',defualtRate,defualtDiscountNine);
//          selectRateMenu(combindBusinessRateDropdownMenu,combindBusinessLoanRate,combindBusinessLoanRateWrapper,combindBusinessRatePercent,combindBusinessRateBase,'combind-rate-base-discount-ten',defualtRate,defualtDiscountTen);
//          selectRateMenu(combindBusinessRateDropdownMenu,combindBusinessLoanRate,combindBusinessLoanRateWrapper,combindBusinessRatePercent,combindBusinessRateBase,'combind-rate-base-discount-eleven',defualtRate,defualtDiscountEleven);

            //自定义输入年利率
//          definedYearRate(combindBusinessRatePercent,defualtRate);
            //点击计算按钮
            /*target,Aamount,year,Apercent,Bamount,Bpercent,defualtRateA,defualtRateB,url*/
            combindCount(combindBtn,combindAccumulationAmount,combindYearCont,combindAtionRatePercent,combindBusinessAmount,combindBusinessRatePercent,accumulationDefualtRate,defualtRate,combindUrl);
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