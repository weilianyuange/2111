//首页导航栏点击跳转
let lisObj = document.querySelectorAll('header>div>ul>li');
lisObj = Array.from(lisObj);
lisObj.forEach(ele => {
    ele.onclick =function(){
    window.location.href = './goodsList.html';
    }
        
});