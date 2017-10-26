/**
 * Created by Administrator on 2017/8/2.
 */
var PayResult = function () {
    /**
     * 切换令牌
     * */
    var changeToken = function () {
      $('.token ul li').click(function () {
          var name = $(this).data('name');

          if(name===1){
              $('.token').removeClass('active');
          }else{
              $('.token').addClass('active');
          }

      })
    };
    return{
        init:function () {
            changeToken();
        }
    }
}();