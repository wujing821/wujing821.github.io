/**
 * Created by Administrator on 2017/7/18.
 */
var Loancalculate = function () {
    var Options = {
        no:{
            money:'',
            month:'',
            monthname:'预计月还款额',
            moneyRange:'(1~100万元)',
            monthRange:'(1~120个月)',
            formula:function (money,month,rate) {

                return {month:'',total:''}
            }
        },
        //装修、购车、留学贷款
        rule1:{
            money:30,
            month:36,
            monthname:'预计月还款额',
            moneyRange:'(1~100万元)',
            monthRange:'(1~120个月)',
            formula:function (money,month,rate) {
                rate = rate||0.0637;
                money = money||300000;
                month = month||36;
                var mothRate,monthMoney,totalMoney;
                if(money>300000||month>60){
                    mothRate = rate/12;
                    monthMoney = (money*mothRate*Math.pow((1+mothRate),month))/(Math.pow((1+mothRate),month)-1)
                    totalMoney = month*monthMoney-money;
                }else{
                    monthMoney = money/month+money*(0.06)/12;
                    totalMoney = money*0.06*month;
                }

                return {month:monthMoney.toFixed(2),total:totalMoney.toFixed(2)}
            }
        },
        //结婚、旅游
        rule2:{
            money:20,
            month:36,
            monthname:'预计月还款额',
            moneyRange:'(1~30万元)',
            monthRange:'(1~120个月)',
            formula:function (money,month,rate) {
                var mothRate,monthMoney,totalMoney;
                rate = rate||0.0637;
                mothRate = rate/12;
                monthMoney = (money*mothRate*Math.pow((1+mothRate),month))/(Math.pow((1+mothRate),month)-1)
                totalMoney = month*monthMoney-money;

                return {month:monthMoney.toFixed(2),total:totalMoney.toFixed(2)}
            }
        },
        //企业贷款
        rule3:{
            money:200,
            month:300,
            monthname:'预计月还款额',
            moneyRange:'(1~1500万元)',
            monthRange:'(1~300个月)',
            formula:function (money,month,rate) {
                var mothRate,monthMoney,totalMoney;
                monthMoney = money/month+money*(0.06)/12;
                totalMoney = money*0.06*month;

                return {month:monthMoney.toFixed(2),total:totalMoney.toFixed(2)}
            }
        },
        //短期贷款
        rule4:{
            money:200,
            month:36,
            monthname:'预计月息',
            moneyRange:'(1~3000万元)',
            monthRange:'(1~12个月)',
            formula:function (money,month,rate) {
                var mothRate,monthMoney,totalMoney;
                monthMoney = money*0.013;
                totalMoney = monthMoney*month;

                return {month:monthMoney.toFixed(2),total:totalMoney.toFixed(2)}
            }
        }
    };
    return{
         init:function () {
             var loan = sessionStorage.getItem('loan');
             var type = Options[loan]?loan:'no';
             new Vue({
                 el: "#vueid",

                 data: {
                     moneyRange:Options[type].moneyRange,
                     monthRange:Options[type].monthRange,
                     monthname:Options[type].monthname,
                     money:Options[type].money,
                     month:Options[type].month
                 },
                 computed: {
                     // 仅读取，值只须为函数
                     result: function () {
                         var result = Options[type].formula(this.money*10000,this.month);
                         console.log(result)
                         return  result;
                     }
                 }

             })
         }
    }
}();