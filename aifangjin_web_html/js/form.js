/**
 * Created by Administrator on 2017/8/24.
 */
var Form = function () {
    /**
     * textarea限制字数
     * */
    var  textarea = function (node) {
        node.on('input propertychange',function () {
            var _this= this;
            var val = $(_this).val();
            node.siblings('p').text((100-val.length));
        })
    };
    /*输入框显示万*/
    var showUnit=  function (node) {
        node.focus(function () {
            $(this).closest('.form_group').find('.unit').show();
        })

        node.blur(function () {
            var val= $(this).val();
            if(val.length>0){
                $(this).closest('.form_group').find('.unit').show();
            }else{
                $(this).closest('.form_group').find('.unit').hide();
            }

        })
    };
    /*点击输入密码的眼睛*/
   var clickPassEye = function () {
     $('.eye').click(function () {
         var node = $(this);
         var nodeInput = node.closest('.form_group').find('input');
         if(node.hasClass('active')){
             node.removeClass('active');
             nodeInput.attr('type','password');
         }else{
             nodeInput.attr('type','text');
             node.addClass('active');
         }
     })
   };
    return{
        textarea:function (node) {
            textarea(node);
        },
        showUnit:function (node) {
            showUnit(node)
        },
        clickPassEye:function () {
            clickPassEye();
        }
    }
}();