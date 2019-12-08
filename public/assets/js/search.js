
function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  }

// 获取到浏览器地址栏中的搜索关键字
var key = getUrlParams('key');
// 根据搜索关键字调用搜索接口 获取搜索结果
$.ajax({
	type: 'get',
	url: '/posts/search/' + key,
	success: function (response) {
		var html = template('searchTpl', {data: response});
		$('#listBox').html(html);
	}
})