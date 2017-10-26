/**
 * Created by Administrator on 2017/7/25.
 */
var NewProductsList = function () {
    function getItem() {
        var url = 'http://192.168.85.253:8080';

        // var productName = localStorage.getItem("product_name_polish");
        // console.log(productName);
        var products;
        var productsName;
        var vm = new Vue({
            el: '#productsList',
            data: {
                items: products
            }
           /* methods:{
                change:function (productsName) {
                    localStorage.product_name_polish = productsName;
                    // console.log(localStorage);
                    window.location.href ='newProducts.html?name='+productsName;
                }
            }*/
        });
        //192.168.85.253:8080/polish/showProductPolish
        //http://192.168.85.253:8080/polish/showProductPolishList
        $.ajax({
            type: "POST",
            url: url + '/polish/showProductPolishList',
            data: {},
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                if(data.code === 0) {
                    products = data.data.data;
                    vm.$data.items = products;
                    console.log(products)
                    //数据
                    /*$.each(products, function (k, v) {
                        console.log(k);
                        console.log(v);
                        //条件

                            if( k.indexOf('product_advantage') > -1){
                                var number = k.replace(/product_advantage_/, "");
                                console.log(number)
                                if(parseInt(number)){
                                    console.log(v)
                                    if(v){
                                        arrCondition[number-1] = v;
                                    }

                                }
                            }

                        console.log(arrCondition);
                        products.arrCondition = arrCondition;

                        //数据固定写法
                        productsName = v.product_name_polish;
                        console.log(productsName);
                        switch(productsName)
                        {
                            case '购车贷款':
                                v.infoList = ['零首付买车','无需抵押'];
                                break;
                            case '留学贷款':
                                v.infoList = ['见通知书极速放款','万元日息低至0.9元'];
                                break;
                            case '结婚贷款':
                                v.infoList = ['放款快','手续简单','可覆盖多场景'];
                                break;
                            case '装修贷款':
                                v.infoList = ['租购合同皆可','利率极低'];
                                break;
                            case '旅游贷款':
                                v.infoList = ['放款快','利率低','说走就走'];
                                break;
                            case '短期贷款':
                                v.infoList = ['周期灵活','额度高','随借随还'];
                                break;
                            case '企业贷款':
                                v.infoList = ['额度最高1500万','资金不等贷'];
                                break;
                            default:
                                v.infoList = ['放款快','手续简单'];
                        }
                    })*/
                }
            }
        });
    }
    return{
        init:function () {
            getItem();
        }
    }
}();