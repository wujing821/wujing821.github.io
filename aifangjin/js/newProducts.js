/**
 * Created by Administrator on 2017/7/18.
 */
var NewProducts = function () {
    function getItem(){
        var url = 'http://192.168.85.253:8080';
        var productName = localStorage.getItem("product_name_polish");
        console.log(productName);
        var products;
        var vm = new Vue({
            el: '#mainContentBox',
            data: {
                items: '',
                img:'./img/newProducts/',
                banner:'http://192.168.85.253:8050/productPic/'
            }
        });
        $.ajax({
            type:"POST",
            url:url+'/polish/showProductPolish',
            data:{ product_name_polish: productName},
            dataType:"jsonp",
            jsonp: 'jsonpcallback',
            success:function(data) {
                var processArr = [];
                var arrFile = [];
                var arrCondition = [];
                if(data.code === 0){
                    console.log(data.data.data);
                    products = data.data.data;
                    vm.$data.items = products[0];
                    $.each(products,function (k,v){
                        console.log(v);

                        //服务展示
                        if(v.expense_type === '1'){
                            v.expenseType = '最低费用';
                        }else{
                            v.expenseType = '最低利率';
                        }
                        //期限范围
                        if(v.loan_term_type === '1'){
                            v.timeRage = '期限范围';
                            v.loanAmount = v.loan_term_min+'-'+v.loan_term_max;

                        }else{
                            v.timeRage = '最长期限';
                            v.loanAmount = v.loan_term_highest;
                        }
                        //期限单位
                        if(v.loan_term_unit === '1'){
                            v.loanTimeUnit = '年'
                        }else{
                            v.loanTimeUnit = '月'
                        }
                        //最快放款
                        if(v.fastest_loan_unit === '1'){
                            v.lendingUnit = '天';
                        }else{
                            v.lendingUnit = '工作日';
                        }

                        //流程
                        /*v.process_1 = processToJudge(v.process_1);
                        v.process_2 = processToJudge(v.process_2);
                        v.process_3 = processToJudge(v.process_3);
                        v.process_4 = processToJudge(v.process_4);
                        v.process_5 = processToJudge(v.process_5);*/

                    });
                    $.each(products[0],function (k,v) {
                        if( k.indexOf('process') > -1){
                            var number = k.replace(/process_/, "");
                            console.log(number,v);
                            var process=v;
                            var result = {};
                            if(parseInt(number)){

                                if(process === '3' || process === '8'){
                                    result = {name:'1分钟申请',image:'applyonemunite',key:k};
                                }
                                if(process=== '4' || process === '9'){
                                    result = {name:'机构面签',image:'sign',key:k};
                                }
                                if(process === '5' || process === '10'){
                                    result={name:'机构审批',image:'approve',key:k};
                                }
                                if(process === '6' || process === '11'){
                                    result ={name:'抵押登记',image:'mortgage',key:k};
                                }
                                if(process === '7' || process === '12'){
                                    result ={name:'放款成功',image:'success',key:k};
                                }
                                if(process !== '13'){
                                    processArr[number-1] = result;
                                }
                                console.log(processArr)
                            }
                        }
                    });
                    products[0].processArr = processArr;
                    //资料

                    $.each(products[0],function (k,v) {
                        if( k.indexOf('details') > -1){
                            var number = k.replace(/details_/, "");
                            // console.log(number,v);
                            if(parseInt(number)){
                                console.log(v)
                                if(v){
                                    // console.log(6666)
                                    arrFile[number-1] = v;
                                }

                            }
                        }
                    });
                    console.log(arrFile);
                    products[0].arrFile = arrFile;

                    //条件
                    $.each(products[0],function (k,v) {
                        if( k.indexOf('condition') > -1){
                            var number = k.replace(/condition_/, "");
                            console.log(number)
                            if(parseInt(number)){
                                console.log(v)
                                if(v){
                                    arrCondition[number-1] = v;
                                }

                            }
                        }
                    });
                    console.log(arrCondition);
                    products[0].arrCondition = arrCondition;
                }

            },
            error:function(data){
                console.log(data)
            }
        });


    }
    return{
        init:function () {
            getItem();
        }
    }

}();