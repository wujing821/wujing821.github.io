/**
 * Created by Administrator on 2017/7/4.
 */
(function ($) {
    $.selectDown = function (element,option) {
        var defaults = {
            callback:''
            //……
        };
        //step03-b 合并用户自定义属性，默认属性
        var options = $.extend(defaults, option);
        var $element = $(element);
        var node = null;
        $element.click(function () {
            node =  this;
            if($(node).hasClass('active')){
                $(node).removeClass('active');
            }else{
                $(node).addClass('active');
            }

            // $('.loan_wrapper').addClass('active');

        });
        $('.loan_mask').click(function (e) {
            e.stopPropagation();//阻止冒泡
            $('.loan_wrapper').removeClass('active');
        });
        //step4 支持JQuery选择器
        //step5 支持链式调用
        $('.com_options_con .dropdown-menu li').click(function (e) {
            e.stopPropagation();//阻止冒泡
            var li = $(this).closest('.dropdown-menu').find('li');
            var text = $(this).text();
            console.log(e)
            $(node).find('.com_sheader em').html(text);
            $(node).find('.com_sheader i').hide();
            li.removeClass('active');
            $(this).addClass('active');
            $(node).removeClass('active');
            if(options.callback){
                options.callback();
            }
        })
    };

    //step02 插件的扩展方法名称
    $.fn.selectDown = function (options) {
        $(this).data('selectDown', new  $.selectDown(this,options));
    }
})(jQuery);