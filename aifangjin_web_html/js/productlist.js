/**
 * Created by Administrator on 2017/8/16.
 */
var Productlist = function(){
    var dropdown = function(){
        //贷款年限展开下拉列表
        $('.year').on('click',function(e){
            $(this).find('.dropdownMenu').toggle();
        });
        $('.dropdownMenu > li').on('click',function () {
            $(this).addClass('dropdownActive').siblings().removeClass('dropdownActive');
            $('.loanPeriod').text($(this).text()).css('color','#333');
        });
        //点击年限元素关闭下拉列表
        $('document,body').on('click', function (e) {
            var _target = $(e.target);
            if (_target.closest(".year").length === 0) {
                $('.dropdownMenu').css('display','none');
            }
        });
    };
    //判断贷款金额是否填写
    var amount = function(){
        $('.amount').on('focus',function(){
            $(this).parents().find('.amountUnit').css('display','block');
            /*if($(this).val()){
                $(this).val(parseFloat($(this).val()));
            }*/
        }).on('blur',function(){
            $(this).parents().find('.amountUnit').css('display','none');
            var amount = $(this).val();
            //把所有非数字的替换成空
            var reg = /^\d+(\.\d+)?$/;
            if(reg.test(amount)==true){
                $(this).val(parseFloat(amount)+'万元');
                $('.warning').css('display','none').children('p').text("");
            }else{
                if(amount == ''){
                    $('.warning').css('display','block').children('p').text("请输入借款金额");
                }else{
                    $('.warning').css('display','block').children('p').text("请输入正确的借款金额");
                }

            }
        });
    };
    //判断借款期限是否选择
    var periodValidate = function() {
        //判断期限是否有数字
        var reg = /\d/g;
        var period = $('#loan-period').text();
        if(reg.test(period)){
            $('.warning').css('display','none');
        }else{
            $('.warning').css('display','block').children('p').text('请选择借款期限');
        }
    };
    var url = 'http://192.168.85.248:8080';
    function quickapplicationlog(amount,period){
        $.ajax({
            type: "post",
            dataType: "text",
            async: false,
            url: "/applyloan/quickapplicationlog",
            data: {
                money:amount,
                year:period
            },
            success: function (data) {
                if(data == "success"){
                    $("#successTip").show();
                    $("#tipMask").css('height', $(document).height()).show();
                    // $("#tipMask").show();
                }
            }
        });
    }
    //点击快速申请按钮传递数值
    var soonApply = function(){
        $('#applyBtn').on('click',function(){
        	$('.warning').css('display','none');
        	var validation = true;
        	var errorMessage = "";
        	//判断贷款金额是否填写正确
        	var amountContent = $("#amountInput").val();
        	var amount = amountContent.substring(0, amountContent.length -2);
        	var unit = amountContent.substring(amountContent.length -2, amountContent.length);
        	var reg1 = /^\d+(\.\d+)?$/;

            if(!reg1.test(amount)==true || unit != "万元"){
                if(amount == ''){
                    $('.warning').css('display','block').children('p').text("请输入借款金额");
                    return false;
                }else{
                    validation = false;
                    errorMessage = "请输入正确的借款金额";
                    $('.warning').css('display','block').children('p').text(errorMessage);
                    return false;
                }

            }

            //判断期限是否有数字
        	var reg2 = /\d/g;
        	var period = $('#loan-period').text();
	        if(!reg2.test(period)){
	        	validation = false;
	            errorMessage = " 请选择借款期限";
	            $('.warning').css('display','block').children('p').text(errorMessage);
	        	return false;
	        }
//	        if(!validation){
//	        	$('.warning').css('display','block').children('p').text(errorMessage);
//	        	return false;
//	        }
            //如果借款金额验证成功，就验证借款期限是否成功
            /*console.log(amountContent);
	        console.log(period);*/
            quickapplicationlog(amountContent, period);

        });
    };
    //展示数据
    var getItem = function() {
        var url = 'http://192.168.85.253:8010';
        var products;
        var productsName;
        var vm = new Vue({
            el: '#productsList',
            data: {
                items: products
            },
            methods: {
                details:function(id){
                    //先清除localstorage值
                    localStorage.removeItem("product");
                    window.location.href = 'product.html?id='+id;

                },
                //判断是否点击的是立即申请
                apply: function (productName) {
                    var productNameEng = 1;
                    localStorage.setItem("product", productNameEng);
                    window.location.href = 'product.html';
                }
            }
        });
        $.ajax({
            type: "POST",
            url: url + '/polish/showProductPolishList',
            data: {},
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                    var arrAdvantage = [];
                    if(data.code === 0){
                        console.log(data.data.data);
                        products = data.data.data;
                        vm.$data.items = products;
                    }
                }
        });
    };
    //注册成功提示
    var tipSuccess = function(){
        $('#tip_sure').on('click',function(){
            $(this).closest('.successTip').hide();
            $('#tipMask').hide();
        });
        $('#tip_cancel').on('click',function(){
            $(this).closest('.successTip').hide();
            $('#tipMask').hide();
        })
    };

    return {
        init:function(){
            getItem();
            dropdown();
        },
        soonApply:function(){
            amount();
//          periodValidate();
            soonApply();
            tipSuccess();
        }

    }
}();
