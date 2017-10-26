var AboutUs = function(){
	var anchorClick = function(){
        $(".nav li").click(function() {
            $(this).addClass("active").siblings().removeClass("active");
            scroll();
            var position = $("a", this).attr("data-anchor");
            console.log($(position).offset().top);
            setTimeout(function() {
                $("html, body").animate({

                    scrollTop: $(position).offset().top - 50
                }, {
                    speed: 100
                    // easing: "swing"
                });
            }, 0)
        });
        var h = 405;
        $(window).scroll(function(){
            scroll()
        });
        function scroll() {
            if ($(this).scrollTop() > h) {
                $("#navBoxCont").addClass('navTop');
                $(".main").css("padding-top", "50px");
            }else{
                $("#navBoxCont").removeClass('navTop');
                $(".main").css("padding-top", "0px");
            }
        }
	};
	return {
		init:function(){
            anchorClick();
		}
	}

}();


