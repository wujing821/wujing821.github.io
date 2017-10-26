/**
 * Created by Administrator on 2017/7/27.
 */
var Voucher = function(){
    var totalAmountNum = 0;
    var NextFlag = true;
    var dropdwonMenu = function(){
        $('.dropdownIconPic').on('click',function () {
            $(this).toggleClass('upIcon');
            $(this).parent().siblings().children('.voucherInfo').toggleClass('voucherInfoShow');

        })
    };
    //默认初始化选项
    /* js封装数组包含某个元素
    * */
    var ArrContains = function () {
        Array.prototype.contains = function ( needle ) {
            for (i in this) {
                if (this[i] == needle) return true;
            }
            return false;
        }
    };
    /**
     * 进到页面，查看是否详情页选择了青鸟券
     * */
    var getTypeHistory = function () {
        var typeArr = localStorage.getItem('type').split('_');
        console.log(typeArr);
        //遍历其他券
        $('i.voucher').each(function (k,v) {
            var dataType  = $(v).data('num');
            if(dataType){
                if(typeArr.contains(dataType)){
                    // $(v).closest('.down_list').siblings('.item_group').find('.show_list').addClass('active')
                    $(v).addClass('checkActiveIcon');
                }
            }
        })
        //遍历亲子旅游券
        $('li.chooseMenuItem').each(function (k,v) {
            var dataType  = $(v).data('number');
            if(dataType){
                if(typeArr.contains(dataType)){
                    $(v).addClass('activeItem').siblings().removeClass('activeItem');
                    $('#chooseText').text($(v).text()).closest('li.voucherItem').find('i.checkIcon').addClass('checkActiveIcon');
                }
            }
        })
    };

    var showMenu =  function(btn,mask,chooseMenu){
        //出现弹窗
        btn.on('click',function () {
            $('.mask').removeClass('hide').addClass('show');
            $('.chooseMenu').removeClass('hide').addClass('show');
        })
    };
    var cancelMenu = function (btn,mask,chooseMenu){
        //关闭弹窗
        btn.on('click',function(){
            $('.mask').removeClass('show').addClass('hide');
            $('.chooseMenu').removeClass('show').addClass('hide');

        });
    };
    //选择亲子旅游券
    var selectItem = function () {
        $('#chooseMenuBox').find('li').on('click',function () {
            $(this).addClass('activeItem').siblings().removeClass('activeItem');
            $('#chooseText').text($(this).text());
            var homeAmount = $(this).find('.homeAmount').text();
            $('#homeAmountNum').text(homeAmount);
            $('#homeTravel').addClass('checkActiveIcon');
            //
            if($(this).hasClass('activeItem')){
                number = $(this).data('number');
            }
            count();
        })
    };
    var select = function () {
        showMenu($('.chooseBox'));
        cancelMenu($('.cancel'));
        cancelMenu($('.mask'));
        cancelMenu($('.chooseMenuItem'));
        selectItem();
    };


    //单选多选
    var checked = function(item){
        item.toggleClass('checkActiveIcon');
        var flag = true;
        $('#voucher-list').find('.checkIcon').each(function(){
            if(!$(this).hasClass('checkActiveIcon')){
                flag = false;
            }
        });
        if(flag){
            $('#checkedAll').addClass('voucherChooseActiveIcon');
        }else{
            $('#checkedAll').removeClass('voucherChooseActiveIcon');
        }
    };
    //全选反选
    var checkedAll = function(btn){
        btn.toggleClass('voucherChooseActiveIcon');
        $('#voucher-list').find('.checkIcon').each(function(){
            //反选
            // $(this).toggleClass('checkActiveIcon');
            if(btn.hasClass('voucherChooseActiveIcon')){
                $(this).addClass('checkActiveIcon');
            }else{
                $(this).removeClass('checkActiveIcon');
            }
        });
    };
    //计算
    var count = function(){
        totalAmountNum = 0;
        //遍历所有li是否加上了active
        $('#voucher-list').find('.checkIcon').each(function(){
            var totalAmount = 0;
            // 获取计算值
            if($(this).hasClass('checkActiveIcon')){
                totalAmount = $(this).parent().siblings().children().find('.amountNum').text();
                console.log(totalAmount);
            }
            totalAmountNum += parseInt(totalAmount);
            $('#totalAmountNum').text(totalAmountNum)
        });
    };



    //全选多选计算金额操作
    var checkItem = function () {
        $('#checkedAll').on('click',function () {
            checkedAll($(this));
            count();
        });
        //选择item
        $('#voucher-list').find('.checkIcon').on('click',function(){
            checked($(this));
            count();
        });
    };
    //声明全局票券数组
    var selectedTickets = [];
    var number = 1;

    //获取亲子旅游券选项标志位
    function getHomeItem() {
        $('#chooseMenuBox').find('li').on('click',function () {
            if($(this).hasClass('activeItem')){
                number = $(this).data('number');
            }
        });
        selectedTickets.push(number);
    }
    //获取剩余的优惠券选项data
    function getListItem(){
        $("i.voucher","#voucher-list").each(function(item){//选取界面上选中的所有项，遍历所有项，把每项加到合计票券数组里去


            if($(this).attr('id')=='homeTravel'){
                if($(this).hasClass('checkActiveIcon')){
                    selectedTickets.push(number);
                }
            }else{
                if($(this).hasClass('checkActiveIcon')){
                    selectedTickets.push($(this).attr("data-num"));
                }

            }

        })
    }
    //显示错误信息
    var showError = function (errornode,info) {
        errornode.text(info);
        errornode.fadeIn();
        setTimeout(function () {
            errornode.fadeOut(function () {
                errornode.stop();
            });

        },2100)
    };
    //预授信点击事件
    $("#creditBtn").click(function(){
        selectedTickets = [];//每次总计点击先把数组清空

        var type = '';
        //下拉列表选项
        // getHomeItem();
        getListItem();
        type = selectedTickets.join('_')
        if(!type){
            showError($('.error_bottom'),'请选择需要分期的青鸟券');
            return false;
        }
        localStorage.setItem('type',type);
        console.log(type)
        if(NextFlag){
            NextFlag = false;
            $.ajax({
                type: "POST",
                url: "/QingNiao/creditExtension",
                data: {
                    productType:type
                },
                success: function (data) {
                    console.log(data);
                    if (data.code === 1) {
                        window.location.href='/register';
                    } else if(data.code===-1){
                        showError($('.error_bottom'),'授权失败，请退出页面，重新打开');
                    }else{
                        window.location.href='/letterResult';
                    }
                    NextFlag = true;
                    // Play with returned data in JSON format
                },
                error: function (msg) {
                    // alert('错误')
                    NextFlag = true;
                    console.error(msg);
                    TimeFlag = true;
                }
            });
        }
        console.log(selectedTickets);
    });
    return {
        init:function(){
            select();
            dropdwonMenu();
            checkItem();
            count();
            ArrContains();
            getTypeHistory();
        }
    }
}();