//提交表单事件 ,将表单内容提交到服务器
$('#userForm').on('submit', function () {
    var formData = $(this).serialize();
    console.log(formData);

    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function () {
            location.reload();
        },
        error: function () {
            alert('添加失败')

        }
    })
    return false;
});

//头像上传事件
$('#modifyBox').on('change', '#avatar', function () {
    var formData = new FormData();
    console.log(this.files[0]);

    formData.append('avatar', this.files[0])
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response);
            //服务端返回的是数组,数组里面是对象,对象里面avatar属性下,包含图片地址信息         
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar)
        }

    })
})


//发送请求,显示列表
$.ajax({
    url: '/users',
    type: 'get',
    success: function (response) {
        //服务端返回的数据
        console.log(response);
        var html = template('userTpl', { data: response });
        $('#userBox').html(html)

    }
})


//点击编辑按钮,将此条内容渲染到添加信息的位置
$('#userBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        url: '/users/' + id,
        type: 'get',
        success: function (response) {
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    })

})

// 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (response) {
            location.reload()
        }
    })

    // 阻止表单默认提交
    return false;
});

//删除功能
$('#userBox').on('click', '.delete', function () {
    var isConfirm = confirm('你确定要删除吗?')
    if (isConfirm) {
        var id = $(this).attr('data-id');
        $.ajax({
            url: '/users/' + id,
            type: 'delete',
            success: function () {
                location.reload();
            }
        })
    }
})

//批量删除
// 获取全选按钮
var selectAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany');

// 当全选按钮的状态发生改变时
selectAll.on('change', function () {
	// 获取到全选按钮当前的状态
	var status = $(this).prop('checked');

	if (status) {
		// 显示批量删除按钮
		deleteMany.show();
	}else {
		// 隐藏批量删除按钮
		deleteMany.hide();
	}

	// 获取到所有的用户并将用户的状态和全选按钮保持一致
	$('#userBox').find('input').prop('checked', status);
});

// 当用户前面的复选框状态发生改变时
$('#userBox').on('change', '.userStatus', function () {
	var inputs = $('#userBox').find('input');

	if (inputs.length == inputs.filter(':checked').length) {
		// alert('所有用户都是选中的')
		selectAll.prop('checked', true)
	}else {
		selectAll.prop('checked', false)
	}

	// 如果选中的复选框的数量大于0 就说明有选中的复选框
	if (inputs.filter(':checked').length > 0) {
		deleteMany.show();
	}else {
		deleteMany.hide();
	}
});


// 为批量删除按钮添加点击事件
deleteMany.on('click', function () {
	var ids = [];
	// 获取选中的用户
	var checkedUser = $('#userBox').find('input').filter(':checked');
	// 循环复选框 从复选框元素的身上获取data-id属性的值
	checkedUser.each(function (index, element) {
		ids.push($(element).attr('data-id'));
	});

	if (confirm('您真要确定要进行批量删除操作吗')) {
		$.ajax({
			type: 'delete',
			url: '/users/' + ids.join('-'),
			success: function () {
				location.reload();
			}
		})
	}
});

