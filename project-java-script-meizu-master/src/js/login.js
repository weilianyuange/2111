//获取元素
let submit = document.getElementById('submit');//登录
let user = document.getElementById('user');//用户名
let password = document.getElementById('password');//密码
let hb1 = document.getElementById('helpBlock1');
let hb2 = document.getElementById('helpBlock2');
let xmlHttp = new XMLHttpRequest();
let jsonObj = null;
xmlHttp.onload = function(){
    if(xmlHttp.readyState == 4){
        if(xmlHttp.status == 200){
            txt = xmlHttp.responseText;
            jsonObj = JSON.parse(txt);
            console.info(jsonObj);
        }else{
            console.info('数据返回失败！状态代码：'+xmlHttp.status+'状态信息：'+xmlHttp.statusText);
        }
    }

}
xmlHttp.open('GET','http://localhost:3000/usermanager',true);
xmlHttp.send();
user.onblur = function(){
    if(!user.value){
        hb1.style.display = 'block';
    }else{
        hb1.style.display = 'none';
    }
}
password.onblur = function(){
    if(!password.value){
        hb2.style.display = 'block';
    }else{
        hb2.style.display = 'none';
    }
}
submit.onclick = function(){
    let uname = user.value;
    let pwd = password.value;
    if(!uname){
    }else if(!pwd){
    }else{
        for(let i = 0; i < jsonObj.length; i++){
            if(uname==jsonObj[i]['name']&&pwd==jsonObj[i]['psw']){
                console.log(jsonObj[i]);
            }
        }
    }
}