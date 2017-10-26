/**
 * Created by Administrator on 2017/8/23.
 */
var Loan = function () {
    /*弹窗效果弹出效果*/
    var modalOpenMeipi = function (node) {
        node.fadeIn(10)
    };
    var modalCloseMeipi = function (node) {
        node.fadeOut(10)
    };
    /**
     * 页面效果
     * */
    var pageMotion = function () {
        //下拉框
      $('.select_com').selectCom({
          callback:function (text) {
               console.log(text)
          }
      });
        /*切换,办理中 已放款 已结束*/
        $('.table_title').find('li').click(function () {
            $('.table_title ul li').removeClass('active');
            $(this).addClass('active')
        })
        /*textarea输入框限制字数*/
        Form.textarea($('.cancel_reason'))
          /*输入框显示万单位*/
          Form.showUnit($('.change_money'))
        /*点击状态 弹窗*/
        $('.loan_status').click(function () {
            modalOpenMeipi($('.modal.status'));
        });
        /*点击取消申请 弹出*/
        $('.list_cancel').click(function () {
            modalOpenMeipi($('.modal.cancel'));
        });
        /*点击修改申请 弹出*/
        $('.list_change').click(function () {
            modalOpenMeipi($('.modal.change_apply'));
        });

        /*弹窗关闭按钮 */
        $('.modal_alert .close').click(function () {
            modalCloseMeipi($(this).closest('.modal'));
        })
        /*点击蒙层关闭弹窗 */
        $('.mask').click(function () {
            modalCloseMeipi($(this).closest('.modal'));
        })
         /*点击弹窗取消按钮关闭弹窗*/
        $('.modal .modal_cancel').click(function () {
            modalCloseMeipi($(this).closest('.modal'));
        })
        /*弹窗里状态列表显示最后一个显示元素设置特殊样式*/
        console.log($('.modal.status').find('.status_one.show'))
        $('.modal.status').find('.status_one.show').eq(-1).css('marginRight','0').find('.hx').hide()
    };
    return{
        init:function () {
            $(".mask").css('height', $(document).height()).show();
            pageMotion();
        }
    }
}();