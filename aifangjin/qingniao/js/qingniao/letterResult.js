/**
 * Created by Administrator on 2017/7/31.
 */
var LetterResult = function () {
    /**
     * 修改分期金额,月还款金额
     * */
    var changeInfo = function () {
        var number =  parseInt($('.circle').find('input').val());
        var month = parseInt($('.monthtime').text());
        if(number){
            $('.totalMoney').val(number);
            $('.monthMoney').val((number/month).toFixed(2));
        }else{
            $('.totalMoney').val('');
            $('.monthMoney').val('');
        }
    };
    /**
     * 圆上的input输入框加事件
     * */
    var inputCircle = function () {
      $('.circle').click(function () {
          var node  = $(this).find('.input_group')
          node.find('input').focus();

      })
        $('.circle').find('input').on('input propertychange',function () {
            var val = $.trim($(this).val());
            var over = 6000-parseInt(val);
            var number = parseInt(val);

            if(val){
                $('.input_group').find('i').hide();
            }else{
                $('.input_group').find('i').show();
            }
            if(number>=6000){
               $('.reminder span').text('青鸟券总费用为¥6000元，可分期金额'+val+'元，可立即分期')
            }else{
                 if(over){
                     $('.reminder span').text('青鸟券总费用为¥6000元，可分期金额'+val+'元，您需另行准备'+over+'元');
                 }else{
                     $('.reminder span').text('*青鸟券总费用为¥6000元，可分期金额0元，可立即分期');

                 }
            }
            //修改可分期金额，预计月还款

            changeInfo();

        });

        $('.circle').find('input').focusout(function () {
            var node  = $('.circle').find('.input_group')
            var val = $.trim($(this).val());
            if(val){
                node.addClass('active');
            }else{

                node.removeClass('active');
            }
        })
        $('.circle').find('input').focus(function () {
            var node  = $('.circle').find('.input_group')
                node.removeClass('active');

        })
    };
    /**
     * 给快速分期添加事件
     * */
    var quickly = function () {
        $('.quicklyStages').click(function () {
            $('.payModal').show();
        })
    }
    return{
        init:function () {
            inputCircle();//给圆添加事件
            $('.select_group').alertBottom({callback:function () {
                changeInfo();
            }});//自定义的下拉框
            quickly();//快速申请按钮添加事件
        }
    }
}();