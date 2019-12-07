/* function serializeObj(form){
    var arr = form.serializeArray();
    var obj= {};
    arr.forEach((item ) => {
        obj[item.name] = item.value;
    })
    return obj;
} */

//绑定submit事件
$('#userForm').on('submit',function() {
    var arr = $(this).serialize($(this));
    $.ajax({
        url: '/users',
        type: 'post',
        data: arr,
        success: function(data) {
            location.reload();
            
            
        },
        error: function(data) {
            alert('用户添加失败')
        }
        
    })
    return false;
});


//头二进制上传功能
$('#modifyBox').on('change','#avatar',function() {
    var formData = new FormData();
    // 将用户选择的文件追加到formData表单对象中
    console.log(this.files);
    
    formData.append('avatar',this.files[0])

    //开始发送请求
    $.ajax({
        type:'post',
        url:'/upload',
        data: formData,
        processData:false,
        contentType:false,
        success:function(res){
            console.log(res);
            
            var url = res[0].avatar;
            
            $('#preview').attr('src',url);

            //设置隐藏域
            $('#hiddenInput').val(url)
        }
    })
})

//获取用户列表

$.ajax({
    url :'/users',
    type : 'get',
    success:function(data) {
        var html = template('tpl-users',{users : data})
        $('#data-container').html(html);
    }
});


//通过事件委托的方式为编辑按钮添加点击事件
$('#data-container').on('click','.edit',function() {
    //获取被点击用户的id值
    var id = $(this).attr('data-id');
    //请求用户数据
    $.ajax({
        url:'/users/'+id,
        type:'get',
        success:function(response) {
            console.log(response);
            var html = template('tpl-modify',response);
            $('#modifyBox').html(html)
            
        }
    })
})
