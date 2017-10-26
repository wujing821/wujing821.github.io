/**
 * Created by Administrator on 2017/5/4.
 */
var HouseTest = function () {
    var lastPage_record = "";
    var History= ['one'];
    var List = [];
    var App = null;
    var ListMessage = {
        '1a':'本地户口(含集体户口（非学生）)',
        '1b':'本地集体户口（学生）',
        '1c':'普通外地户口',
        '1d':'外地户口，但有北京工作居住证',
        '1e':'港澳台人士',
        '1f':'外籍人士',
        '2a':'已婚',
        '2b':'未婚、丧偶',
        '2c':'离异',
        '3a':'无房',
        '3b':'1套',
        '3c':'2套或以上',
        '4a':'全国无贷款记录',
        '4b':'全国有任意数量已结清贷款记录',
        '4c':'全国有1套未结清贷款记录',
        '4d':'全国有2套或2套以上未结清贷款记录',
        '5a':'60个月及以上',
        '5b':'不足60个月',
        '6a':'在境内工作',
        '6b':'在境内学习或居留',
        '6c':'未在境内工作、学习或居留',
        '7a':'一年内',
        '7b':'一年前'
    }
    //数组中包含某个元素
    Array.prototype.contains = function ( needle ) {
        for (i in this) {
            if (this[i] == needle) return true;
        }
        return false;
    };
    /*
     * 记录浏览历史，给页面的返回按钮，和手机自带的返回按钮，可以返回到上一页
     * */
    var history_record = function (e) {
        /************用于防止push 进重复页面 *****/
        if (e && e != lastPage_record) {

            //TODO:记得打开
            //history.pushState({label:e});
            lastPage_record = e;
            //alert("PUSHED:"+e);
        }
        // history.pushState({label: e}, "");
        History.push(e);
    };
    /*
     * 返回按钮
     * */
    var backwardEventHandle = function () {
        var next = ['one','two','three','four','five','six','seven'];
        var his = function () {
            console.log(History[History.length-1]);
            if(History.length<2){
                console.log('没有记录了');
                history.back()
                return
            }
            console.log('111111111111111111',History)
            var pop =    History.pop();
            List.pop();
            console.log('2222222222222222',History)
            /*  if(next.contains(pop)){
             List.pop();
             console.log(List)
             }*/
            console.log(History)
            var node = $('#'+History[History.length-1]);
            console.log('node',node)
            showPage(node,true);
        };
        $('.return').click(function () {
            his();
        });
        $('.last').click(function () {
            his();
        })
        /* window.onpopstate = function (event) {
         his();

         /!*  if (event.state) {
         //labelOutput.textContent = event.state.label;
         //alert("backward");
         //alert(JSON.stringify(event.state))
         } else {
         // alert("last Page");
         }*!/

         }*/

    };
    /**
     * 显示界面
     * */
    var showPage = function (obj,flag,house) {

        var nodeBack = $('.entitle_container')
        $('.main_page').hide();
        obj.css('display','table');
        // obj.animate({'display':'table'})
        // console.log(obj.attr('id'))
        nodeBack.removeClass();
        nodeBack.addClass('entitle_container');
        if(obj.attr('id')==='vue_container'){

            // console.log(house)
            if(house.indexOf('A')>-1){
                nodeBack.addClass('house_two');
            }else if(house.indexOf('B')>-1){
                nodeBack.addClass('house_one');
            }else{
                nodeBack.addClass('house_no');
            }
        }else{
            nodeBack.addClass('house_test');
        }
        if(!flag){
            history_record(obj.attr('id'));
        }
        // console.log(History)

    };
    /**
     * 显示点击的问题
     * */
    var showHistory = function () {
        var listArr = [];
        List.forEach(function(e){
            listArr.push({name:ListMessage[e]});
        })
        App.$data.list = listArr;
    };
    /**
     * 向上滑动一段距离
     * */
    var scrolltop = function () {
        $("body").scrollTop(60);
    };
    /**
     * 显示结果页面
     * */
    var showResult = function (info) {
        showPage($('#vue_container'),false,info);
        console.log(List+"  ",info);
        showHistory();//展示选择的问题
        // console.log(info);

        if(info==='A1'){
            scrolltop();
            App.$data.message = {
                payDown:"35%",
                reta:"4.9%",
                discount:"1倍",
                payDownNot:"40%",
                retaNot:"4.9%",
                discountNot:"1倍",
                payDownSec:"60%",
                retaSec:"5.39%",
                discountSec:" 1.1倍",
                payDownSecNot:"80%",
                retaSecNot:"5.39%",
                discountSecNot:"1.1倍",
                show:true,
                ps:false
            }
        }else if(info==='A2'){
            scrolltop();
            App.$data.message = {
                payDown:"60%",
                reta:"5.39%",
                discount:"1.1倍",
                payDownNot:"80%",
                retaNot:"5.39%",
                discountNot:"1.1倍",
                payDownSec:"60%",
                retaSec:"5.39%",
                discountSec:"1.1倍",
                payDownSecNot:"80%",
                retaSecNot:"5.39%",
                discountSecNot:"1.1倍",
                show:true,
                ps:false
            }
        }else if(info==='A3'){
            scrolltop();
            App.$data.message = {
                payDown:"60%",
                reta:"5.39%",
                discount:"1.1倍",
                payDownNot:"80%",
                retaNot:"5.39%",
                discountNot:"1.1倍",
                payDownSec:"60%",
                retaSec:"5.39%",
                discountSec:"1.1倍",
                payDownSecNot:"80%",
                retaSecNot:"5.39%",
                discountSecNot:"1.1倍",
                show:true,
                ps:true,
                buy:false
            }
        } else if(info==='B1'){
            App.$data.message = {
                payDown:"35%",
                reta:"4.9%",
                discount:"1倍",
                payDownNot:"40%",
                retaNot:"4.9%",
                discountNot:"1倍",
                payDownSec:"",
                retaSec:"",
                discountSec:"",
                payDownSecNot:"",
                retaSecNot:"",
                discountSecNot:"",
                show:false,
                buy:false,
                ps:false
            }
        }else if(info==='B2'){
            App.$data.message = {
                payDown:"60%",
                reta:"5.39%",
                discount:"1.1倍",
                payDownNot:"80%",
                retaNot:"5.39%",
                discountNot:"1.1倍",
                payDownSec:"",
                retaSec:"",
                discountSec:"",
                payDownSecNot:"",
                retaSecNot:"",
                discountSecNot:"",
                show:false,
                buy:false,
                ps:false
            }
        }else if(info==='B3'){
            App.$data.message = {
                payDown:"60%",
                reta:"5.39%",
                discount:"1.1倍",
                payDownNot:"80%",
                retaNot:"5.39%",
                discountNot:"1.1倍",
                payDownSec:"",
                retaSec:"",
                discountSec:"",
                payDownSecNot:"",
                retaSecNot:"",
                discountSecNot:"",
                show:false,
                buy:false,
                ps:true
            }
        }else if(info==='C'){
            App.$data.message = {
                payDown:"60%",
                reta:"5.39%",
                discount:"1.1倍",
                payDownNot:"80%",
                retaNot:"5.39%",
                discountNot:"1.1倍",
                payDownSec:"",
                retaSec:"",
                discountSec:"",
                payDownSecNot:"",
                retaSecNot:"",
                discountSecNot:"",
                show:false,
                buy:true,
                ps:true
            }
        }
    };
    /**
     *给评估添加事件
     */
    var repeat = function () {
        $('.repeat_assess').click(function () {
            History= ['one'];
            List=[];
            $('.check_group').removeClass('active');
            $('.check_group').find('p').css('color','');
            showPage($('#one'),true);
        })
    };

    /**
     * 给单选框添加事件
     * */
    var chice = function () {
        $('.check_group').click(function () {
            var _this = this;
            var nodeinput = $(_this).find('input');
            var nodeC = $(_this).closest('.house_container');
            var next = $(_this).data('next');
            var nextnode = $("#"+$(_this).data('next'));
            var result = $(_this).data('result');
            var result1= $(_this).data('result1');
            var result2 = $(_this).data('result2');
            var num = $(_this).data('num');
            List.push(num);
            nodeC.find('.check_group').removeClass('active');
            nodeC.find('.check_group').find('p').css('color','')
            $(_this).addClass('active');
            // console.log(List);
            $(_this).find('p').animate({color:'#444444'},100,function () {
                var len = List.length;
                if(num === '3b'){
                    if(List[len-2]==='2b'||List[len-2].indexOf('7')>-1||(List.length>3)){
                        showResult(result);
                        // console.log(result)
                    }else{
                        showPage(nextnode);
                    }
                    return ;
                }else if(num==='4a'){
                    if(List[1]==='2a'&&List[2]==='3a'){
                        showResult('A1');//结果A1
                    }else if(List[1]==='2a'&&List[2]==='3b'){
                        showResult('B1');
                    }else if(List[1]==='2b'&&List[2]==='3a'){
                        showResult('B1');
                    }else if(List[1]==='2c'&&List[2]==='7a'&&List[3]==='3a'){
                        showResult('B2');
                    }else if(List[1]==='2c'&&List[2]==='7b'&&List[3]==='3a'){
                        showResult('B1');
                    }else if(List[1]==='5a'&&(List[2]==='2a'||List[2]==='2b')&&List[3]==='3a'){
                        showResult('B1');
                    }else if(List[1]==='5a'&&List[2]==='2c'&&List[3]==='7a'&&List[4]==='3a'){
                        showResult('B2');
                    }else if(List[1]==='5a'&&List[2]==='2c'&&List[3]==='7b'&&List[4]==='3a'){
                        showResult('B1');
                    }else if((List[1]==='6a'||List[1]==='6b')&&List[2]==='2c'&&List[3]==='7a'&&List[4]==='3a'){
                        showResult('B2');
                    }else{
                        showResult('B1');
                    }
                    return
                }else if(num==='4b'){
                    if(List[1]==='2a'&&List[2]==='3a'){
                        showResult('A2');//结果A1
                    }else{
                        showResult('B2');
                    }
                    return ;
                }else if(num==='4c'){
                    if(List[1]==='2a'&&List[2]==='3a'){
                        showResult('A2');//结果A1
                    }else{
                        showResult('B2');
                    }
                    return ;
                }else if(num==='4d'){
                    if(List[1]==='2a'&&List[2]==='3a'){
                        showResult('A3');//结果A1
                    }else{
                        showResult('B3');
                    }
                    return ;
                }else if(num==='6b'){
                    if(List[0]==='1f'){
                        showResult('C');//结果A1
                        return;
                    }
                }

                if(next){
                    showPage(nextnode);
                }else if(result){
                    showResult(result);
                    // console.log(result)
                }
            })


        })
    };

    return {
        init:function () {

            App = new Vue({
                el: '#vue_container',
                data: {
                    message:{
                        show:false
                    },list:{}
                }
            });
            backwardEventHandle();
            // last();//上一步
            chice();//单选框
            repeat();
        }
    }
}();
