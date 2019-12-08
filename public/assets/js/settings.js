



//选择图片文件的时候
$('#logo').on('change', function () {
	var aaaa = this.files[0];
	var formData = new FormData();
	formData.append('logo', aaaa);
	// 向服务器端发送请求 实现文件上传
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		processData: false,
		contentType: false,
		success: function (response) {
			console.log(response)
			$('#hiddenLogo').val(response[0].logo)
			// 将logo图片显示在页面中
			$('#preview').attr('src', response[0].logo)
        },
        error:function() {
            console.log('图片上传错误');
            
        }
	})
});


 $('#settingsForm').on('submit', function () {
    var formData = $(this).serialize();
    
    
	$.ajax({
		type: 'post',
		url: '/settings',
		data: formData,
		success: function () {
			location.reload();
		}
	})
	return false;
}); 

//需求三: 回显用户设置


$.ajax({
	type: 'get',
	url: '/settings',
	success: function (response) {
		console.log(response)
		if (response ) {
			
			$('#hiddenLogo').val(response.logo)
			$('#preview').attr('src', response.logo)
			$('#site_title').val(response.title);
			$('#site_description').val(response.description);
			$('#site_keywords').val(response.keywords);
			$('#comment_status').prop('checked', response.comment)
			$('#comment_reviewed').prop('checked', response.review)
		}
	}
})