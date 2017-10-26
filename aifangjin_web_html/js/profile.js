/**
 * Created by Administrator on 2017/8/28.
 */
var Profile = function () {
    /*页面效果*/
    var pageMotion = function () {
        //点击绿色按钮展开
        $('.item_title a').click(function () {
             var node = $(this).closest('.item_set');
            node.addClass('active')

        })
    //    点击关闭按钮
        $('.close').click(function () {
            $(this).closest('.item_set').removeClass('active');
        })
    //    点击眼睛
        Form.clickPassEye();
    }
    return{
        init:function () {
            pageMotion();
        }
    }
}();