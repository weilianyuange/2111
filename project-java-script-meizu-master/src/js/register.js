let users = document.querySelector('#user');//账户
let password1 = document.querySelector('#password1');//密码
let password2 = document.querySelector('#password2');//确认密码
let submit = document.querySelector('#submit');//注册
//验证手机号
users.onblur = async function(){
    //判断没有输入用户名
    if(!users.value) return;
    if(this.parentNode.querySelector('span')){
        this.parentNode.querySelector('span').remove();
    }
    let span = document.createElement('span');
    let name = await axios.get(`http://localhost:3000/name?user=${users.value}`)
    .then(data=>{
        if(data.data.length == 0) return true;
        if(data.data.length == 1) return false;
    })
    console.log(name);
    if(/^1[3-9]\d{9}$/.test(users.value) && !name) {
        span.innerHTML = '手机号已经被注册';
        span.style.color = 'red';
    }else if(/^1[3-9]\d{9}$/.test(users.value) && name){
        span.innerHTML = '手机号可用';
        span.style.color = 'yellowgreen';
    }else if(!/^1[3-9]\d{9}$/.test(users.value) && name){
        span.innerHTML = '手机号输入错误';
        span.style.color = 'red';
    }
    this.parentNode.insertBefore(span,password1)
}
//第一次密码验证
password1.onblur = function(){
    if(!password1.value) return;
    if(this.parentNode.querySelector('span')){
        this.parentNode.querySelector('span').remove();
    }
    let span = document.createElement('span');
    if(/^[a-zA-Z0-9]{6,16}$/g.test(password1.value)){
        span.innerHTML = '密码可用';
        span.style.color = 'yellowgreen';
    }else{
        span.innerHTML = '密码不可用';
        span.style.color = 'red';
    }
    this.parentNode.insertBefore(span,password2)
}
password2.onblur = function(){
    if(!password2.value) return;
    if(this.parentNode.querySelector('span')){
        this.parentNode.querySelector('span').remove();
    }
    let span = document.createElement('span');
    if(password1.value && password2){
        span.innerHTML = '密码可用';
        span.style.color = 'yellowgreen';
    }else{
        span.innerHTML = '密码不一样';
        span.style.color = 'red';
    }
    this.parentNode.insertBefore(span,submit)
}
submit.onclick = function(){
    if(/^1[3-9]\d{9}$/.test(users.value) && password1.value == password2.value){
        axios({
            method:"post",
            url:"http://localhost:3000/name",
            data:{
                "user":users.value,
                "password":password1.value
            }
        }).then((data)=>{
            console.log(data)
        });
        alert('注册成功，请点击登录')
    }else{
        alert('请输入正确的注册信息')
    }
}   