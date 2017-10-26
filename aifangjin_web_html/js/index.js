/**
 * Created by Administrator on 2017/7/26.
 */
var Index = function(){
    var showInfo = function(){

        //移入显示微信号
        $('.weChatBox').on('mouseenter',function () {
            $('.wechatIconPic').css('display','block');
        }).on('mouseleave',function(){
            $('.wechatIconPic').css('display','none');
        });
        //移入侧边栏显示文字提示
        $('#sidebarBox').find('li').on('mouseenter',function(){
            $(this).removeClass('tipStyle').find('.textTip').css('display','block');
            $(this).find('.wechatIcon').css('border','none');
        }).on('mouseleave',function () {
            $(this).addClass('tipStyle').find('.textTip').css('display','none');
            $(this).find('.wechatIcon').css('border-bottom','1px solid #eee');
        });
        //弹出拨打电话
        $('#telCont').on('mouseenter',function () {
            $('.telIconBox').css('display','block');
        }).on('mouseleave',function(){
            $('.telIconBox').css('display','none');
        });
    };
    var productsShow  = function () {
        //鼠标移入li显示详情
        function hoverLi() {
            var timer = null;
            $('#productLoanCont').find('li').on('mouseenter', function() {
                $(this).find('.productsMask').stop().fadeOut();
                $(this).find('.productsBox').stop(true,false).animate({bottom:'0px'},500);

            }).on('mouseleave', function() {
                $(this).find('.productsMask').stop().fadeIn();
                $(this).find('.productsBox').stop(true,false).animate({bottom:'-101%'},500);

            })
        }
        hoverLi();
    };
    var dropdown = function(){
        //贷款年限展开下拉列表
        $('.year').on('click',function(e){
            $(this).find('.yearIcon').toggleClass('yearIconAfter');
            $(this).find('.dropdownMenu').toggle();
        });
        $('.dropdownMenu > li').on('click',function () {
            $(this).addClass('dropdownActive').siblings().removeClass('dropdownActive');
            $('.loanPeriod').text($(this).text()).css('color','#333');
        });
//点击年限元素关闭下拉列表
        $('document,body').on('click', function (e) {
            var _target = $(e.target);
            // console.log('abc',_target.closest("#year").length)
            if (_target.closest(".year").length === 0) {
                $('.dropdownMenu').css('display','none');
                $(this).find('.yearIcon').removeClass('yearIconAfter');
            }
        });
    };
    var toolsShow = function () {
        //实用工具移入效果
        $('#taxPic').on('mouseenter',function(){
            $(this).removeClass('toolsTaxBefore').addClass('toolsTaxAfter');
        }).on('mouseleave',function(){
            $(this).removeClass('toolsTaxAfter').addClass('toolsTaxBefore');
        });
        $('#homePic').on('mouseenter',function(){
            $(this).removeClass('homeBefore').addClass('homeAfter');
        }).on('mouseleave',function(){
            $(this).removeClass('homeAfter').addClass('homeBefore');
        });
        $('#accumulatePic').on('mouseenter',function(){
            $(this).removeClass('accumulationBefore').addClass('accumulationAfter');
        }).on('mouseleave',function(){
            $(this).removeClass('accumulationAfter').addClass('accumulationBefore');
        });
        $('#creditloanPic').on('mouseenter',function(){
            $(this).removeClass('creditloanBefore').addClass('creditloanAfter');
        }).on('mouseleave',function(){
            $(this).removeClass('creditloanAfter').addClass('creditloanBefore');
        });
        $('#amountPic').on('mouseenter',function(){
            $(this).removeClass('amountBefore').addClass('amountAfter');
        }).on('mouseleave',function(){
            $(this).removeClass('amountAfter').addClass('amountBefore');
        });
    };
    // var flagBtn = false;
    var rapidApplication = function () {
        //贷款申请
        $('.amount').on('focus',function(){
            $(this).parent().addClass('active').siblings().removeClass('active');
            $(this).parent().find('i').removeClass('amountIcon').addClass('amountIconAfter');
            $(this).css('textAlign','left').parents().find('.amountUnit').css('display','block');

            if($(this).val() !== (null || '')){
                $(this).val(parseInt($(this).val()));
            }
        }).on('blur',function(){
            $(this).parent().removeClass('active').find('i').removeClass('amountIconAfter').addClass('amountIcon');
            $(this).css('textAlign','left').parents().find('.amountUnit').css('display','none');
            if($(this).val() !== (null || '')){
                $(this).val(parseInt($(this).val())+'万元');
            }
        });
        //电话

        $('#tel').on('focus',function(){
            $(this).parent().addClass('active').siblings().removeClass('active');
            $(this).parent().find('i').removeClass('telIcon').addClass('telIconAfter');
            $('#get_code').addClass('getCodeActive');
            // $(this).css('textAlign','left');
        }).on('blur',function(){
            $(this).parent().removeClass('active').find('i').removeClass('telIconAfter').addClass('telIcon');
            $('#get_code').removeClass('getCodeActive');
            // $(this).css('textAlign','center');
        });
        //获取验证码
        $('#code').on('focus',function(){
            $(this).parent().addClass('active').siblings().removeClass('active');
            $(this).parent().find('i').removeClass('codeIcon').addClass('codeIconAfter');
            // $(this).css('textAlign','left');
           
        }).on('blur',function(){
            $(this).parent().removeClass('active').find('i').removeClass('codeIconAfter').addClass('codeIcon');
            // $(this).css('textAlign','center');
        });

    };
    /*var backToTop = function () {
        //返回顶部
        $('#backToTop').on('click',function(){
            var speed=200;//滑动的速度
            $('body,html').animate({ scrollTop: 0 }, speed);
            return false;
        });
    };*/
    var slider = function () {
        //产品滑动方法
        $('#productLoanCont').slick({
            dots: false,
            infinite: false,
            speed: 300,
            autoplaySpeed: 1000,
            autoplay: false,
            arrows: true,
            slidesToShow: 4
        });
        //银行滑动方法
        $('#banksCont').slick({
            dots: false,
            infinite: false,
            speed: 300,
            autoplaySpeed: 1000,
            autoplay: false,
            arrows: true
        });
        //banner轮播图方法
        /*
         $('#bannerSlideshow').slick({
         dots: false,
         infinite: false,
         speed: 300,
         autoplaySpeed: 1000,
         autoplay: true,
         arrows: false
         });*/
    };
    var tabSwitch = function () {
        //点击nav切换
        $('.nav>li').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
        });
    };
    //注册成功提示
    var tipSuccess = function(){
        $('#tip_sure').on('click',function(){
            $(this).closest('.successTip').css('display','none');
            $('#tipMask').css('display','none');
        });
        $('#tip_cancel').on('click',function(){
            $(this).closest('.successTip').css('display','none');
            $('#tipMask').css('display','none');
        })
    };
    //倒计时
    var countDown = function(){
    	var second = 10;
        var timer = null;
    	function time(obj){
    		if(second == 0){
    			obj.text('重新获取');
    			second = 10;
                $('#get_code').css('cursor','pointer');
    		}else{
    			obj.text(second+'s');
    			second--;
                timer = setTimeout(function(){
    				time(obj);
    				// console.log(12222)
    			},1000);
                $('#get_code').css('cursor','not-allowed');
    		}
    		
    	}
    	$('#get_code').on('click',function(){
    	    clearTimeout(timer);
            time($(this));
    	})
    };
    /*关闭设置登录密码弹窗*/
    var  closePassModal = function () {
      $('.reminder_pass .close').click(function () {
          $(this).closest('.reminder_pass').hide();
      })
    };
  
    return {
        init:function(){
            closePassModal();
            showInfo();
            productsShow();
            dropdown();
            toolsShow();
            rapidApplication();
            // backToTop();
            slider();
            tabSwitch();
            tipSuccess();
            countDown();
        }
    }
}();