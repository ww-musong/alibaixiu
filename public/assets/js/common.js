



// 处理日期时间格式
function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  }
  
  // 向服务器端发送请求 索要登录用户信息
  $.ajax({
	type: 'get',
	url: '/users/',
	success: function (response) {
	  $('.avatar').attr('src', response.avatar)
	  $('.profile .name').html(response.nickName)
	}
  })