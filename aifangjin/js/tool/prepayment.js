/**
 * Created by Administrator on 2017/6/20.
 */

//弹框提示
var alertCont = $('.alert');
var coverCont = $('.cover');
var alertSure = $('.alertSure');
//选择贷款利率下拉列表内容
var defualtRate = 4.9;
var defualtDiscountOne = 1.3;
var defualtDiscountTwo = 1.2;
var defualtDiscountThree = 1.1;
var defualtDiscountFour = 0.95;
var defualtDiscountFive = 0.90;
var defualtDiscounSix = 0.88;
var defualtDiscountSeven = 0.85;
var defualtDiscountEight = 0.82;
var defualtDiscountNine = 0.80;
var defualtDiscountTen = 0.75;
var defualtDiscountEleven = 0.70;
var accumulationRateBase = 3.25;
var accumulationRateBaseDiscount = 1.1;
var accumulationRateBaseDiscountSecond = 1.2;

var loanMoney = $('#loanMoney');
var loanWrapper = $('#loan-wrapper');
var dropdownMenu = $('#dropdownMenu');
var year = $('#year');
var loanInput = $('#loan-input');
var loanRateWrapper = $('#loanRateWrapper');
var rateDropdownMenu = $('#rateDropdownMenu');
var rate = $('#rate');
var ratePercent = $('#ratePercent');
var paymentMethodWrapper = $('#payment-method-wrapper');
var prepaymentAmount = $('#prepayment-amount');
var processModeWrapper = $('#process-mode-wrapper');
var prepaymentMethodWrapper=$('#prepayment-method-wrapper');

//贷款金额输入框失焦匹配
/*必须是1到6位的正整数*/
loanAmount(loanMoney);
//点击显示弹出框
showMask($('#loanPeriod'),loanWrapper);
//选择贷款年限下拉列表内容
selectMenu(dropdownMenu,year,loanWrapper,'definition');
//自定义年限输入框失焦事件
// definedYear($('#loan-input'),$('#year'));

//解决ios下，弹出输入界面挡住input的问题
// inputPosition(businessInput,maskWrapper);
 //点击遮罩层隐藏
 maskHide(loanWrapper,'loan_mask');
 //自定义确认按钮
 definedSure($('#definition-btn'),loanInput,dropdownMenu,year);

 //自定义取消按钮
 definedCancel($('#loan-cancel-btn'),loanInput,loanWrapper);

 //点击商贷利率
 selectRate($('#loanRate'),loanRateWrapper,'loanRateMask');
 //选择贷款利率下拉列表内容
 selectRateMenu(rateDropdownMenu,rate,loanRateWrapper,ratePercent,'rateBase','rate-base-discount-one',defualtRate,defualtDiscountOne);
selectRateMenu(rateDropdownMenu,rate,loanRateWrapper,ratePercent,'rateBase','rate-base-discount-two',defualtRate,defualtDiscountTwo);
selectRateMenu(rateDropdownMenu,rate,loanRateWrapper,ratePercent,'rateBase','rate-base-discount-three',defualtRate,defualtDiscountThree);
selectRateMenu(rateDropdownMenu,rate,loanRateWrapper,ratePercent,'rateBase','rate-base-discount-four',defualtRate,defualtDiscountFour);
selectRateMenu(rateDropdownMenu,rate,loanRateWrapper,ratePercent,'rateBase','rate-base-discount-five',defualtRate,defualtDiscountFive);
selectRateMenu(rateDropdownMenu,rate,loanRateWrapper,ratePercent,'rateBase','rate-base-discount-six',defualtRate,defualtDiscounSix);
selectRateMenu(rateDropdownMenu,rate,loanRateWrapper,ratePercent,'rateBase','rate-base-discount-seven',defualtRate,defualtDiscountSeven);
selectRateMenu(rateDropdownMenu,rate,loanRateWrapper,ratePercent,'rateBase','rate-base-discount-eight',defualtRate,defualtDiscountEight);
selectRateMenu(rateDropdownMenu,rate,loanRateWrapper,ratePercent,'rateBase','rate-base-discount-nine',defualtRate,defualtDiscountNine);
selectRateMenu(rateDropdownMenu,rate,loanRateWrapper,ratePercent,'rateBase','rate-base-discount-ten',defualtRate,defualtDiscountTen);
selectRateMenu(rateDropdownMenu,rate,loanRateWrapper,ratePercent,'rateBase','rate-base-discount-eleven',defualtRate,defualtDiscountEleven);

selectRateMenu(rateDropdownMenu,rate,loanRateWrapper,ratePercent,'accumulation-rate-base','accumulation-rate-base-discount',accumulationRateBase,accumulationRateBaseDiscount);
selectRateMenu(rateDropdownMenu,rate,loanRateWrapper,ratePercent,'accumulation-rate-base','accumulation-rate-base-discount-second',accumulationRateBase,accumulationRateBaseDiscountSecond);




//解决ios下，弹出输入界面挡住input的问题
 // inputPosition(businessBaseRate,maskWrapper);
 //自定义输入年利率
 definedYearRate(ratePercent,defualtRate);
 //还款方式
 selectRate($('#payment-method'),paymentMethodWrapper,'payment-method-mask');
choose($('#payment-method-menu'),$('#payment-method-cont'),paymentMethodWrapper);
 //提前还款方式
selectRate($('#prepayment-method'),prepaymentMethodWrapper,'Prepayment-method-mask');
paymentMethod($('#prepayment-method-menu'),$('#prepayment-method-cont'),prepaymentMethodWrapper);
//部分提前还款金额
loanAmount(prepaymentAmount);
//处理方式
selectRate($('#process-mode'),processModeWrapper,'process-mode-mask');
choose($('#process-mode-menu'),$('#process-mode-cont'),processModeWrapper);
 //点击计算按钮
 // count(businessBtn,businessLoanAmount,yearCont,businessRatePercent,defualtRate,businessUrl);
//点击所选列input自动获取焦点
autoFocus(loanMoney);
autoFocus($('#yearRate'));
autoFocus(prepaymentAmount);