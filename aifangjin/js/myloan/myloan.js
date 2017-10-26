/**
 * Created by Administrator on 2017/6/1.
 */
var Myloan = function () {
    var types='apply';
    // var custermId = getCookie('id');
    var custermId = '365';
    var lendRequestId = '1134';

    // var id = "812";
    //图片预加载
    var dropdownImg = '/img/myloan/dropdownMenu.png';
    var dropdownImg2 = '/img/myloan/dropdownMenu2.png';
    // var url = "";
    var url = "http://192.168.85.251:8080";
    // var url = "http://192.168.85.245:8080";
    //url地址拼接
    var urlData = null;

    /**
     * 获得cookie
     * */
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    function loadImage(url, callback) {
        var img = new Image(); //创建一个Image对象，实现图片的预下载
        img.src = url;
        if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
            callback.call(img);
            return; // 直接返回，不用再处理onload事件
        }
        img.onload = function () { //图片下载完毕时异步调用callback函数。
            callback.call(img);//将回调函数的this替换为Image对象
        };
    }
    //文字和时间分开
    var numStr = function(option){
//            console.log(option)
        var str='';
        var num = '';
        if(/[\u4E00-\u9FA5\uF900-\uFA2D]+$/gi.test(option)){
            str= option.match(/[\u4E00-\u9FA5\uF900-\uFA2D]+$/gi);
        }
        if(/^\d+/gi.test(option)){
            num  = option.match(/^\d+/gi);
        }

        var strArr=null;
//           console.log(num,str);
        console.log(option)
        if(str){
            strArr  = [num[0],str[0]];
        }else{
            strArr = [num[0],''];
        }
        console.log(strArr)
        return strArr;
    };
    var timeSecond = function (second) {
        var time  = new Date(second);
        return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
    };
    /**
     * 调用接口，展示列表
     * */
    function getItem(type){
        var products;
        // http://192.168.85.245:8080/lendRequest/queryLendRequestList?customerId=0d8f0407-c6a8-49da-8d06-d9d62bfb23cc&type=manage
        //http://192.168.85.245:8080/lendRequest/queryLendRequestList?lendRequestId=310
        // var url = "";
        // var id = "310";
        // var urlImg = 'http://192.168.85.253:8050/productPic/';
        var vm = new Vue({
            el: '.'+type,
            data: {
                items: products,
                url:'loanDetails.html?id=',
                img1:'/img/myloan/banks/',
                img:'/img/myloan/'
                // img2:'http://192.168.85.253:8050/productPic/'
            },
            methods:{
                change:function (id,custermId,bank_audit_results) {
                    localStorage.customerId=custermId;
                    localStorage.id=id;
                    localStorage.bank_audit_results = bank_audit_results;//判断有无子产品
                },
                storage:function(status,custermId,id){
                    localStorage.status=status;
                    localStorage.customerId=custermId;
                    localStorage.id=id;
                },
                backout: function(id,customerId) {
                    //点击撤销按钮弹框
                    $('#revocation-box').show();
                    $('#revocation-mask').show();
                    //点击确认撤销按钮
                    $('.revocationSure').on('click', function() {
                        $('#revocation-box').hide();
                        $('#revocation-mask').hide();
                        //发送ajax请求
                        $.ajax({
                            type: "POST",
                            url: url + '/lendRequest/requestGoBack',
                            data: {
                                customerId: custermId,
                                lendRequestId: id
                            },
                            dataType: "jsonp",
                            jsonp: 'jsonpcallback',
                            success: function(data) {
                                if(data.code === 0) {
                                    products = data.data.data;
                                    console.log(products);
                                    console.log(data)
                                    // alert('撤销成功');
                                    window.location.reload();//刷新当前页面.
                                }
                            },
                            error: function() {
                                console.log('撤销失败')
                            }
                        });
                    })
                    //点击取消撤销按钮
                    $('.revocationCancel').on('click', function() {
                        $('#revocation-box').hide();
                        $('#revocation-mask').hide();
                    })
                }
            }
        });
        $.ajax({
            type:"POST",
            url:url+'/lendRequest/queryLendRequestList',
            data:{ customerId : custermId ,type: type},
            dataType:"jsonp",
            jsonp: 'jsonpcallback',
            success:function(data) {
                if(data.code === 0){
                    products = data.data.data;
                    console.log(products)
                    console.log(data)
                    if(products){
                        if(products.length!==0){
                            $('.noRecord').hide();
                        }else{
                            $('.noRecord').show();
                        }
                    }else{
                        $('.noRecord').show();
                    }
                    //办理中有数据时显示拨打电话按钮

                    if(types === 'manage'){
                        if(products){
                            if(products.length!==0){
                                $('.loan_footer').show();
                                // $('.product_list').css('margin-bottom','110/@r');

                            }else{
                                $('.loan_footer').hide();
                                // $('.product_list').css('margin-bottom','0/@r');
                            }
                        }else{
                            $('.loan_footer').hide();
                            // $('.product_list').css('margin-bottom','0/@r');
                        }

                    }else{
                        $('.loan_footer').hide();
                        // $('.product_list').css('margin-bottom','0/@r');
                    }
                    //根据type显示背景图片
                    $('.noRecordPic').css({
                        'backgroundImage':'url("../img/myloan/'+ types +'.png")',
                        'backgroundSize':'100% 100%'
                    });
                    //已申请页面没有数据时，显示去申请按钮
                    if(types === 'apply'){

                        $('.applyBtn').css('display','block').on('click',function(){
                            window.location.href="../apply_fir.html";
                            console.log('34444')
                        });

                    }else{
                        $('.applyBtn').css('display','none');
                    }
//                        console.log(products);
                    //拆分贷款年限
                    $.each(products,function (k,v) {

                        var numArr =  numStr(v.loan_period);
                        console.log(v);
                        v.num = numArr[0] ;
                        /*console.log(numArr[0]);
                        console.log(numArr[1]);*/
                        v.str = numArr[1];
                        //根据状态值做相应展示
                        if(v.status === '6'){
                            v.state = '审批时间';
                            v.time = v.bank_adopt_time;
                            v.status = '6';//状态：审批拒绝
                        }else if(v.status === '8'){
                            v.state = '放款时间';
                            v.time = v.loanwait_time;
                            v.status = '8';//状态：已放款
                        }else if(v.status === '9'){
                            v.state = '放款时间';
                            v.time = v.loanwait_time;
                            v.status = '8';//状态：已放款
                        }else if(v.status === '5'){
                            if(v.bank_audit_results === 'Allowance'){
                                v.state = '取消时间';
                                v.time = v.update_time;
                                v.status = '9';//状态：已取消
                            }else if(v.bank_audit_results === 'AuditNotThrough'){
                                v.state = '审批时间';
                                v.time = v.bank_adopt_time;
                                v.status = '6';//状态：审批拒绝
                            }else if(v.bank_audit_results === ''){
                                v.state = '取消时间';
                                v.time = v.update_time;
                                v.status = '9';//状态：已取消
                            }else if(v.bank_audit_results === 'null'){
                                v.state = '取消时间';
                                v.time = v.update_time;
                                v.status = '9';//状态：已取消
                            }else if(v.bank_audit_results === 'Inaudit'){
                                v.state = '取消时间';
                                v.time = v.invalid_time;
                                v.status = '9';//状态：已取消
                            }
                        }
                        //如果没有产品，默认是爱房金的logo
                        //图片地址

                        /*if(!v.supplier_source){
                            v.supplier_source='bank';
                            v.product_name='快速申请'
                        }*/
                        var picPath = '/aifangjinResourse';
                        if(v.product === null || v.product === ''){
                            v.productPic = '/img/myloan/soon.png';
                            v.product_name_polish='快速申请'
                        }else{
                            v.productPic = picPath + v.icon_pic;
                            // v.productPic = 'http://192.168.85.253:8050/aifangjinResourse/productPic/qiye.png';
                        }
                        //显示状态标签
                        var status = v.status;
                        var statesStrs = v.request_product_status;
                        console.log(statesStrs)
                        var statusList = [];
                        /*if(statesStrs){
                            var statesArr = statesStrs.split('-');
                            statesArr.forEach(function(k,j){
                                console.log(k);
                                console.log(j);
                                if(status == '2'){
                                    statusList.push('待面签');
                                }
                                if(status == '4'){
                                    if(k == null || ''){
                                        statusList.push('待审批');
                                    }else if(k == 'Audited'){
                                        statusList.push('待放款');
                                    }else if(k == 'NotAudit'){
                                        statusList.push('审批拒绝');
                                    }

                                }
                                if(status == '7'){
                                    if(k == 'Audited'){
                                        statusList.push('待放款');

                                    }else if(k == 'SecuredLoan'){
                                        statusList.push('已放款');
                                        v.hideCancel = true;
                                    }
                                }
                                if(status == '10'){
                                    statusList.push('取消申请中');
                                }
                                console.log(statusList);
                                v.statusList = statusList;
                            })
                        }*/
                        if(status == '2'){
                            statusList.push('待面签');
                        }
                        if(status == '10'){
                            statusList.push('取消申请中');
                        }
                        if(statesStrs == '' && status == '4'){
                            statusList.push('待审批');
                        }
                        if(statesStrs){
                            var statesArr = statesStrs.split('-');
                            statesArr.forEach(function(k,j){
                                switch(k){
                                    case 'Create':
                                        if(status == '4'){
                                            statusList.push('待审批');
                                        }
                                        break;
                                    case 'Audited':
                                        if(status == '4' || status == '7'){
                                            statusList.push('待放款');
                                        }
                                        break;
                                    case 'NotAudit':
                                        if(status == '4'){
                                            statusList.push('审批拒绝');
                                        }
                                        break;
                                    case 'SecuredLoan':
                                        if(status == '7'){
                                            statusList.push('已放款');
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            })
                            console.log(statesArr)
                        }
                        v.statusList = statusList;
                        console.log(statusList);
                        console.log(statusList.length);
                        //打印有无子产品
                        var judgeStatus = v.bank_audit_results;
                        console.log(judgeStatus);

                    });

                    vm.$data.items = products;
                    console.log(data);
                    console.log(products)
                }
            },
            error:function(){

                //根据type显示背景图片
                $('.noRecord').css({
                    'display':'block',

                }).find('.noRecordPic').css({
                    'backgroundImage':'url("../img/myloan/'+ types +'.png")',
                    'backgroundSize':'100% 100%'
                });
                if(types === 'apply'){

                    $('.applyBtn').css('display','block').on('click',function(){
                        window.location.href="../apply_fir.html";
                        console.log('34444');

                    });

                }else{
                    $('.applyBtn').css('display','none');
                }
            }
        });
    }
    /**
     * 整理后台的时间
     * */
    function strDate(str) {
        var arr = str.split(/[- : \/]/),
            date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]),
            time = date.getFullYear() + "-" + (date.getMonth() + 1) + '-' + date.getDay();
        return time;
    }
    //调用接口,展示详情
    function getDetails() {
        //获取url查询字符串里的键值
        function getRequest(url) {
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
        //获取列表页点击的id
        var id = localStorage.id;
        var custermId = localStorage.customerId;

        //根据字段判断调用接口地址
        var judgeStatus = localStorage.bank_audit_results;
        console.log(judgeStatus);
        //代表有子产品
        if(judgeStatus == 'notNull'){
            urlData = '/lendRequest/queryLendRequestProductListForM';
        }else{
            urlData = '/lendRequest/queryLendRequestList';
        }
        var products;
        //http://192.168.85.245:8085/lendRequest/queryLendRequestList?customerId=0d8f0407-c6a8-49da-8d06-d9d62bfb23cc&type=manage

        var vm = new Vue({
            el: '#loan-content',
            data: {
                items: products,
                padd:'padd',
                options: {},
                url: '',
                img1: '/img/myloan/banks/',
                img: '/img/myloan/',
                //初始化定义qer
                qer:0
            },
            methods:{
                switchover:function(index){
                    this.qer = index;
                    $(".container").eq(index).show().siblings().hide();
                }
            }
        });
        console.log(urlData)
        $.ajax({
            type: "POST",
            url: url + urlData,
            data: {lendRequestId: id,customerId : custermId },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                if (data.code === 0) {
                    products = data.data.data;
                    console.log(products);
                    console.log(products.length);
                    if(products.length >1){
                        $('.loansList').show();
                        $('.header').addClass('more');

                    }else{
                        $('.loansList').hide();
                        $('.header').removeClass('more');
                    }
                    //当贷款子产品出现三个以上时，显示滑动条
                    if(products.length >3) {
                        $('.loansList').addClass('loanListMore');
                        var spanNum = products.length;
                        var spanNumWidth = spanNum * 30 + '%';
                        console.log(spanNum)
                        console.log(spanNumWidth)
                        $('.loanListBox').css('width', spanNumWidth);

                    }else{
                        $('.loansList').removeClass('loanListMore');
                    }
                    console.log(judgeStatus);
                    $.each(products,function (k,v) {
                        console.log(v);
                        console.log(k);
                        //代表有子产品
                        if (judgeStatus == 'notNull') {
                            v.amountMoney = v.sign_amount;
                        } else {
                            v.amountMoney = v.application_amount;
                        }

                    });

                    vm.$data.items = products;
                }
            }
        });
        /*$.ajax({
            type: "POST",
            url: url + '/lendRequest/queryLendRequestList',
            data: {lendRequestId: id, type: ''},
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                if (data.code === 0) {
                    products = data.data.data;
                    vm.$data.items = products;

                    var customerId = localStorage.customerId,id= localStorage.id;
                    // var customerId = '77b12252-a818-4b1d-822c-5a6cefb92930', id = '181';
                    console.log(products);
                    $.ajax({
                        type: "POST",
                        // url: url + '/lendRequest/queryLendOperationList',
                        url: url + '/lendRequest/queryLendRequestProductListForM',
                        // data: {customerId: customerId, lendRequestId: id},
                        data: {requestProductId: customerId, lendRequestId: id},
                        dataType: "jsonp",
                        jsonp: 'jsonpcallback',
                        success: function (data) {
                            var option = [];
                            var dataArr = [];
                            var flag = true;
                            if (data.code === 0) {
                                dataArr = data.data.data;
                                $.each(dataArr, function (k, v) {
                                    v.time = strDate(v.operation_time)
                                    if(v.operation==0||v.operation==1||v.operation==2||v.operation==3){
                                        if(flag){
                                            v.operation=1;
                                            option.push(v);
                                            flag =false;
                                        }
                                    }else if(v.operation==4){
                                        v.sign_amount = parseInt(products[0].sign_amount);
                                        option.push(v);
                                    }else if(v.operation==5||v.operation==6){
                                        vm.$data.padd='';
                                        v.remarks = products[0].remarks
                                        option.push(v);
                                    }else if(v.operation==7||v.operation==8){
                                        option.push(v);
                                    }
                                });
                                vm.$data.options = option;
                                $('.processContent').show();
                                console.log('options',option);
                            }
                        }
                    });
                }
            }
        });*/
    }


    //点击撤销按钮
    /*function revocation(){
        //点击撤销按钮弹框
        $('.revocation').on('click',function(){
            $('#revocation-box').show();
        });
        //点击确认撤销按钮
        $('.revocationSure').on('click',function(){
            $('#revocation-box').hide();
            //发送ajax请求
            $.ajax({
                type:"POST",
                url:url+'/lendRequest/requestGoBack',
                data:{ customerId : custermId ,lendRequestId: id},
                dataType:"jsonp",
                jsonp: 'jsonpcallback',
                success:function(data) {
                    if(data.code === 0){
                        products = data.data.data;
                        console.log(products)
                        console.log(data)

                    }
                },
                error:function(){

                }
            });

        })
        //点击取消撤销按钮
        $('.revocationCancel').on('click',function(){
            $('#revocation-box').hide();

        })
    }*/
/*    //多个贷款产品切换
    function showLoan(){
        // alert(8888)
        // $(".container").hide();
        // $(".loanItem:first").addClass("active");
        // $(".container:first").show();

        $(".loanItem").click(function(){
            var index = $(this).index();
            // console.log(index)
            $(this).addClass("active").siblings().removeClass("active");
            $(".container").eq(index).show().siblings().hide();
        })
    }*/

    return {
        init: function () {

            /*tab栏切换*/
            //Default Action
            $(".tab_content").hide();
            // $("ul.tabs li:first").addClass("active").show();
            // $(".tab_content:first").show();

            //On Click Event
            $("ul.tabs li").click(function () {
                //获取点击的li种类
                types = $(this).data('type');
//            console.log(types);
//                 $("ul.tabs li").removeClass("active");
                $(this).addClass("active").siblings().removeClass("active");
                $(".tab_content").hide();
                // var activeTab = $(this).find("a").attr("href");
                $("#"+types).fadeIn();
                //点击的时候记录
                var selectedNum ;
                console.log(selectedNum);
                selectedNum = $(this).data('num');
                console.log(selectedNum);
                localStorage.setItem('selectedNum',selectedNum);
                getItem(types);

            });
//页面初始化
//        getItem('apply');
            //图片预加载
            loadImage(dropdownImg, function () {
            });
            loadImage(dropdownImg2, function () {
            });
        },
        loanDetails:function () {
            loadImage(dropdownImg, function () {
            });
            loadImage(dropdownImg2, function () {
            });
            getDetails();
        }
    }
}();