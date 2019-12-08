$.ajax({
	type: 'get',
	url: '/posts/recommend',
	success: function (response) {
        //公共模板
		var recommendTpl = `
			{{each data}}
			<li>
			  <a href="detail.html?id={{$value._id}}">
			    <img src="{{$value.thumbnail}}" alt="">
			    <span>{{$value.title}}</span>
			  </a>
			</li>
			{{/each}}
		`;
		var html = template.render(recommendTpl, {data: response});
		$('#recommendBox').html(html);
	}
})