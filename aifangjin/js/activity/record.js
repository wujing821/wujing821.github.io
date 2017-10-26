/**
 * Created by Administrator on 2017/5/12.
 */
(function () {
    var page = $('body').data('page');
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var source = getQueryString('source')
    if(source){
        ajaxRecord('page_h5animate',source);
    }else{
        ajaxRecord(page);
    }

    /**
     * 调用ajax记录页面或者按钮
     * */
     function ajaxRecord (name,source) {
         console.log(name)

       source = source || '';
        $.ajax({
            type: "POST",
            url: '192.168.85.245:8080/activity/savePageOrBtnCount',
            data: {
                pageOrBtn:name,
                source:source
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                // Play with returned data in JSON format
            },
            error: function (msg) {
            }
        });
    };

    $('a').on('click',function (e) {
        var name =$(this).data('name');
        ajaxRecord(name);
    })
})();
