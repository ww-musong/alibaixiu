



// 处理日期时间格式
function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  }
  
  // 向服务器端发送请求 索要登录用户信息
  $.ajax({
	type: 'get',
	url: '/users/'+userId,
	success: function (response) {
		console.log("返回的数据=>"+response);
		
	  $('.avatar').attr('src', response.avatar)
	  $('.profile .name').html(response.nickName)
	}
  })