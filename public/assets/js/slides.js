// 当管理员选择文件的时候
$('#file').on('change', function () {
	// 用户选择到的文件
	var file = this.files[0];
	var formData = new FormData();
	// 将管理员选择到的文件添加到formData对象中
	formData.append('image', file);
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		processData: false,
		contentType: false,
		success: function (response) {
            //出错预防,防止服务器端返回错误
            if(response && response.length> 0) {
                console.log(response[0].image)
            //显示在隐藏域中
			$('#image').val(response[0].image)
            }else{
                alert('文件上传出错')
            }
		}
	})
});

//功能二: 新增轮播图
$('#slidesForm').on('submit', function () {
    var formData = $(this).serialize();
    console.log(formData);
    
	// 向服务器端发送请求 添加轮播图数据
	$.ajax({
		type: 'post',
		url: '/slides',
		data: formData,
		success: function () {
			location.reload();
		}
	})
	return false;
})


//展示到页面上
$.ajax({
	type: 'get',
	url: '/slides',
	success: function (response) {
		console.log(response)
		var html = template('slidesTpl', {data: response});
		$('#slidesBox').html(html);
	}
})

//删除功能
$('#slidesBox').on('click', '.delete', function () {
	if (confirm('您真的要进行删除操作吗')) {
		var id = $(this).attr('data-id');
		$.ajax({
			type: 'delete',
			url: '/slides/' + id,
			success: function () {
				location.reload();
			}
		})
	}
});

