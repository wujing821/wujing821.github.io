/**
 * Created by Administrator on 2017/7/4.
 */
var Feedback  = function () {

    return{
        init:function () {
            $('.com_select').selectDown();//自定义下拉框
            $('.input_group').click(function () {
                $(this).find('input').focus();
            })
            $('.suggest').on('input propertychange', function () {
               var _this=  this;
                var length = $(_this).val().length;
                $('#numCount').text(length)
            })
        }
    }
}();