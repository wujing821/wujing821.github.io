/**
 * Created by Administrator on 2017/5/8.
 */
(function ($) {
    $.alertBottom = function (element,option) {
        var SelectOption = {};
        var defaults = {
            //……
        };
        //step03-b 合并用户自定义属性，默认属性
        var options = $.extend(defaults, option);
        var $element = $(element);
        var node = null;
        $element.click(function () {
            node =  this;
            $(node).find('.loan_wrapper').addClass('active');
            $('.submit').removeClass('disabled');
            $(node).find('.c_select input').focus();
            // $('.loan_wrapper').addClass('active');

        });
        $('.loan_mask').click(function (e) {
            e.stopPropagation();//阻止冒泡
            $('.loan_wrapper').removeClass('active');
        });
        //step4 支持JQuery选择器
        //step5 支持链式调用
        $('.loan_wrapper .dropdown-menu li').click(function (e) {
            e.stopPropagation();//阻止冒泡
            var li = $(this).closest('.dropdown-menu').find('li');
            var text = $(this).text();
            console.log(e)
            li.removeClass('active');
            $(this).addClass('active');
            if($(this).hasClass('special')){
               $('.definition').show();
               $('.select_cancel').show();

            }else{
                $('.definition').hide();
                $('.select_cancel').hide();
                $(node).find('em').html(text);
                // $(node).find('strong').css('visibility','hidden');
                var name =   $(node).closest('.form_group_select').data('parameter');
                SelectOption[name] = text;
                sessionStorage.select = JSON.stringify(SelectOption);;


                $('.loan_wrapper').removeClass('active');
                $('.error_com').hide();
                if(option.callback){
                    option.callback();
                }
            }


        })
        $('.combind_definition_btn').click(function () {
             var val = $.trim($('.loan_input').val());
             if(val){
                 $(node).find('em').html(val+"元");
                 $('.loan_wrapper').removeClass('active');
                 $('.error_com').hide();
             }
            return false;
        })
        $('.select_cancel').click(function () {
            $('.loan_wrapper').removeClass('active');
            $('.error_com').hide();
            return false;
        })
    };

    //step02 插件的扩展方法名称
    $.fn.alertBottom = function (options) {
        $(this).data('alert', new  $.alertBottom(this,options));
    }
})(jQuery);