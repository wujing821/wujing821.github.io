/**
 * Created by Administrator on 2017/8/23.
 */
/**
 * Created by Administrator on 2017/5/8.
 */
(function ($) {
    $.selectCom = function (element,option) {
        var SelectOption = {};
        var defaults = {
            callback:function () {

            }
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

        });
        //点击下拉框其他地方去掉下拉框
        $('document,body').on('click', function (e) {
            var _target = $(e.target);
            if (_target.closest(".select_com").length == 0) {
                $(node).removeClass('active');
            }
        });
        //step4 支持JQuery选择器
        //step5 支持链式调用
        $('li',node).click(function (e) {
            e.stopPropagation();//阻止冒泡
            var text = $(this).text();
            console.log(e)
            console.log(node)
            $(node).removeClass('active');
            $('li',node).removeClass('active');
            $(this).addClass('active');
            $('p span',node).text(text);
            $('p span',node).css('color','#444444');
            options.callback(text)
        })
    };

    //step02 插件的扩展方法名称
    $.fn.selectCom = function (options) {
        $(this).data('alert', new  $.selectCom(this,options));
    }
})(jQuery);