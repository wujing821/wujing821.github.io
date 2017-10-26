/**
 * Created by Administrator on 2017/7/28.
 */
var Index = function () {

    /**
     *  获得总额
     * */
    var getTotal = function () {
        var total=  0;
      $('.p_item').each(function (k,v) {
          if($(v).hasClass('active')){
              total+=$(v).find('.price').data('number');
          }
      })
        return total;
    };
    /**
     *给预授信添加事件
     */
    var submit = function () {
        $('.submit').click(function () {
            $('.submit').hide();
            $('.cover').show();
        })
        $('.reminder h3').click(function () {
            $('.submit').show();
            $('.cover').hide();
        })
        $('.item_group').click(function () {
            var node = $(this).find('.p_item');
            if(node.hasClass('active')){
                node.removeClass('active');
            }else{
                node.addClass('active');
            }
            $('.result').text("￥"+getTotal())
        })
    };
    return{
       init:function () {
           $('.cover').css('height', $(document).height());
           submit();
       }
   }
}()