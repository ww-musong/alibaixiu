//随机推荐数据
$.ajax({
	type: 'get',
	url: '/posts/random',
	success: function (response) {
        console.log(response);
        
		var randomTpl = `
			{{each data}}
			<li>
			  <a href="detail.html?id={{$value._id}}">
			    <p class="title">{{$value.title}}</p>
			    <p class="reading">阅读({{$value.meta.views}})</p>
			    <div class="pic">
			      <img src="{{$value.thumbnail}}" alt="">
			    </div>
			  </a>
			</li>
			{{/each}}
		`;
		var html = template.render(randomTpl, {data: response});
		$('#randomBox').html(html)
	}
})

//最新评论数据
$.ajax({
	type: 'get',
	url: '/comments/lasted',
	success: function (response) {
        console.log(response);
        
		var commentTpl = `
			{{each data}}
			<li>
			  <a href="javascript:;">
			    <div class="avatar">
			      <img src="{{$value.author.avatar}}" alt="">
			    </div>
			    <div class="txt">
			      <p>
			        <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
			      </p>
			      <p>{{$value.content}}</p>
			    </div>
			  </a>
			</li>
			{{/each}}
		`;
		var html = template.render(commentTpl, {data: response});
		$('#commentBox').html(html);
	}
});



//显示文章分类
$.ajax({
    url:'/categories',
    type:'get',
    success: function (response) {
        console.log(response);     
		var navTpl = `
			{{each data}}
			<li>
				<a href="/list.html?categoryId={{$value._id}}">
					<i class="fa {{$value.className}}"></i>{{$value.title}}
				</a>
			</li>
			{{/each}}
		`;
        var html = template.render(navTpl, {data: response});
        //侧边显示
        $('#navBox').html(html)
        //顶部导航显示
		$('#topNavBox').html(html)
	}
})




// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
	var paramsAry = location.search.substr(1).split('&');
	// 循环数据
	for (var i = 0; i < paramsAry.length; i++) {
		var tmp = paramsAry[i].split('=');
		if (tmp[0] == name) {
			return tmp[1];
		}
	}
	return -1;
}