//获取元素
let submit = document.getElementById('submit');//登录
let users = document.getElementById('user');//用户名
let password = document.getElementById('password');//密码
users.onblur = async function(){
    if (!users.value) return
    if (this.parentNode.querySelector('span')) {
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
        span.innerHTML = '手机号可用';
        span.style.color = 'yellowgreen';
        console.log('手机号正确');
    }else if(/^1[3-9]\d{9}$/.test(users.value) && name){
        span.innerHTML = '手机号未注册';
        span.style.color = 'red';
    }else if(!/^1[3-9]\d{9}$/.test(users.value) && name){
        span.innerHTML = '手机号输入错误';
        span.style.color = 'red';
    }
    this.parentNode.insertBefore(span,password)
}
password.onblur = async function(){
    if (!password.value) return
    let name = await axios.get(`http://localhost:3000/name?password=${password.value}`)
    .then(data=>{
        if(data.data.length == 0) return true;
        if(data.data.length == 1) return false;
    })
    if(/^[a-zA-Z0-9]{6,16}$/g.test(password.value) && !name){
        console.log('密码正确');
    }else{
        console.log('密码错误');
    }
}
submit.onclick = async function(){
    let name = await axios.get(`http://localhost:3000/name?user=${users.value}`)
    .then(data=>{
        if(data.data.length == 0) return true;
        if(data.data.length == 1) return false;
    })
    let name1 = await axios.get(`http://localhost:3000/name?password=${password.value}`)
    .then(data=>{
        if(data.data.length == 0) return true;
        if(data.data.length == 1) return false;
    })
    if((/^1[3-9]\d{9}$/.test(users.value) && !name)&&(/^[a-zA-Z0-9]{6,16}$/g.test(password.value) && !name1)){
        window.sessionStorage.setItem('login',users.value)
        window.open('index.html')
    }else{
        alert('用户名或密码错误')
    }
}         