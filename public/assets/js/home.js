function initBannners() {
    //
    var swiper = Swipe(document.querySelector('.swipe'), {
        auto: 3000,
        transitionEnd: function (index) {
            // index++;

            $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
        }
    });

    // 上/下一张
    $('.swipe .arrow').on('click', function () {
        var _this = $(this);

        if (_this.is('.prev')) {
            swiper.prev();
        } else if (_this.is('.next')) {
            swiper.next();
        }
    })
}
//需求一:展示轮播图
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        console.log(response)
        var html = template('slidesTpl', { data: response });  
        $('#slidesBox').html(html)
        initBannners();
    }

    
})


// 向服务器端发送请求 索要最新发布数据
$.ajax({
	type: 'get',
	url: '/posts/lasted',
	success: function (response) {
		console.log(response)
		var html = template('lastedTpl', {data: response});
		$('#lastedBox').html(html);
	}
})