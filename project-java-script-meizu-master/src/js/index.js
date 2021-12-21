//页面登录相关功能
let hello = document.getElementById('hello')
let register = document.getElementById('register')
let exit = document.getElementById('exit')
function exit1(){
    window.sessionStorage.removeItem('login')
    hello.innerHTML
    TML = '<a href="./login.html">立即登录</a>'
    register.innerHTML = '<a href="./register.html">立即注册</a>'
    exit.style.display = 'none'
}
function changeText(){
    hello.innerText = '你好'
    register.innerText = window.sessionStorage.getItem('login')
    exit.style.display = 'block'
}
window.onload = function(){
    if(window.sessionStorage.getItem('login')){
        alert('欢迎登录'+window.sessionStorage.getItem('login'))
        changeText()
    }
}
//二级菜单样式变化
let headerUl = $('header>div>ul')
let userIcon1 = $('header>div>div>img')
let userIcon2 = $('header>div>div:last-child>img')
headerUl.on('mouseover',function (){
    $('header').css({'background-color':'#fff','color':'black'})
    userIcon1.attr('src','./img/icon/user.png')
    userIcon2.attr('src','./img/icon/shoppingcar.png')
})
headerUl.on('mouseout',function (){
    $('header').css({'background-color':'RGBA(0,0,0,0)','color':'white'})
    userIcon1.attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABGdBTUEAALGPC/xhBQAAA4tJREFUaAXtmc9LVUEUx32GIeS2yBCSSCRoIRRItM1cuMnAhbh061po07KFuPM/aBNuKtyIkJtalu1CJQncRNSiSCLRzD5fm4njy3fv3Pfufe8+nANfz9yZ8+N7zhvHuc+OjiixA7EDsQOxA+XtQKUZ1A4PD7vIc8/hJvqSy/sR/QY8FyqVyr6bb19FseNgC6SJbMbbtlLId4K5tCpPWJdPZ9sVfkKx35l7CIZAj4PGmtOalbm2Khjm2sZWVnm4XKsIrQHZWGmP7Q3jLmB/Z1VI6uEoG2CLVgwdduUWSE4AL9qqNT/Z6kpkC+z2nqi2afS5iMNBf368zPOnZts/pGlnO2/sbCwzXaIhn9Am8DKUlRqOOsi8bGb1b7o9THc8W3RPVgLyMf47Wf3T7IvY0mk5W7peRMGfTEX+CmmmUofWx8ZKdQwxKKLgDZP4lhmHDq2PjRXqn2hXRMGrJuOYGYcOrY+NFerfXDsOnAHw2x08e2i7RRPJyBbIR6IYA4kOZVmE6IoYO1kI5YX9gndCr4T6tdwOsqOG+C/GegdOFNkA2XoZTXQo2yKslzxz9Da4UIuj1pwN6kiWatmWdh7a/eDbX/5HP9/x8797teaA1rzIp7+0hSURg/gI2PeVoL+CB+C6g8aa8yLbkaSYpV+jgEmw6ytK0LKZLH1BIQQpZBi8TyhWa8MhsRq1SX0xbzSB96egM4z1Cd4H19z8OvopeMKr4YGbiyp2IHYgdiB2wHcg11Oak/gKge84XEXrOnkenAUhsofRF/AZbIEXAif4B3Q5hCL1ffIYeAWKEsVWjlw/oMwdhMAgeA2aJco1mJloHg4kngY/qirV9fAZmAE3gF7og/97IFvnI1/FUKzqa6lyTudRQ3AMRwb1T34yegQuBgcJNFRMF1s5rMwEhmjMjIxTwH+FIwJrwF8VGwue4K0c4C3wIg5TCS6NL5GgF9h33Jc8n2s8clgE5QLK6UVcesO867Ai+KLPhF4Hmf+zUEfaYy7KCTaAl8VjBnk9EL0PHLgs2k6384qdNY5yA/9rJU59WWOk2hN0FnhZTnUo2AAiy54MejY0XZYv4u+aoI/NuFVDy8FyS+STpWD7BdxaYtTmLFoOlls+2dk29gLQnU/U+qPAp9ts6d3QSMF3UwX3QbnMB/t5nyJ0PZyybOkiODc95qkruOkdjgljB2IHYgdiB2IHYgdiB05NB/4ACa0OHk/GEbwAAAAASUVORK5CYII=')
    userIcon2.attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABGdBTUEAALGPC/xhBQAAA2JJREFUaAXtmT2LFEEQhnc9PeEUxchE5Q40UcQTXEFBIwUDA0W9xNw/IAYaGBidBuofMNBE8ECRAw3USFBEBcH4/GYxEAW/QPRcn4LupRymZ3dmumd277qgqJrumbfeqq7pnZltNKLECsQKxArECsQKxArUXoFOp3MK/YFmydnaifoiQJZfszI1cy98xasLZ4kKfE/5LncbiU+4JodhvGlJksgI/g50hR1T9hb+KnN8stlsXlRzC8+lGNdNS4t5uPAyTGREklMq4Xn8tYlThuaw29JZjElwJfOf0OXmvNNYafNBkg5k2txu372QIulZtcqD6v6F2E10vStpvUu7zrHjg7ailpe20rGH0bskPaYnrJ8n4Tv2oiGwW+B4LI3n0rTBtDHujY9U7SVzW838FewgPXnJ6t5Adxt+27FXjd81fSdsrpCHE5twiyK0u0g1OyyGJLxB0SjPDdADqBXZIAbm5wkuuywxY+UhqpwANIb+UsDHyyH6uxpOlxSvVy7kPJtWgxb+CdAjBbZf+bW5JCrtfFQRmFF+ORfwM6qSH8qh+bkaPv7b2VIDvKUSFneznavLwqGvdhZ+uVraJPQc+9n4Ympta5IN1842SYLMoFZm7XgdFhLh2tkmRJATNlvsN3SZnavaElu38+sg8QkygWrZEyRQD1AINNH3isiFHpcUnybInAp0rjhS8SuJn7udi2xalqH+BlbXxjVlyWDf8JzwTB37danuEbXCf/BX+42QjUa86tpZqBBwDSqfe6zIe2hlQtBkO7f6CV64pWmfLwTQLVR1Wyfb+WnQhA24vo8PUnX51BtciCM/g/oF39+zcxZ7Ak+iWs5zULhrsmLZOfBH0Ms6KP6kne9l5bGslBBMVnmfApFXM/lLZl6N+XLlg4V8yRhXgLe5vQ6p40zXR8ISXD7Or8uMFGbyHbB7SfhtGHgHKqu8CX2AVin3CTbuoOQcLr3CGhkC8gFtJ7oRlfbzLb8BnEMfs6pPfINHvFiBWIFFVAE2rFF0Gm0bFX/UVwkECw2Gn5unIYP5T6ZzAzkuAFWSTYo3fEdY9zBMZGWTUv7vDhMSYC/4QZ973eWpb8ZnwtdS0kgbSzmtr6E0rLSxvsBKn0TLBd1UQuOXLkAEiBWIFYgViBWIFYgViBVY9BX4BxVsJ5lt9HBwAAAAAElFTkSuQmCC')
})
//首页导航栏点击跳转
let lisObj = document.querySelectorAll('header>div>ul>li');
lisObj = Array.from(lisObj);
lisObj.forEach(ele => {
    ele.onclick =function(){
    window.location.href = './goodsList.html';
    }
});