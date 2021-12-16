2//获取大盒子
let banner = document.querySelector('.banner')
//获取ul
let imgBox = document.querySelector('.imgBox')
let pic = imgBox.children
//获取切换小圆圈的盒子
let pointBox = document.querySelector('.pointBox')

function setBtn(){
    for(let i = 0; i < pic.length; i++){
        let li = document.createElement('li')
        pointBox.appendChild(li)
    }
    pointBox.children[0].className = 'active'
    var first = pic[0].cloneNode(true)
    imgBox.appendChild(first)
}
setBtn()
//自动轮播
picSwitching()
function picSwitching(){
    for(let i = 0; i< pointBox.children.length; i++){
        //设置自定义属性
        pointBox.children[i].setAttribute('index',i)
        //表示ol标记下的所有li标记
        pointBox.children[i].onclick = function(){
            //获取自定义属性
            let index = this.getAttribute('index')
            //让下标进行关联操作
            num = index
            circle = index
            //让按钮背景颜色改变，做排他
            for(var j = 0; j < pointBox.children.length; j++){
                 pointBox.children[j].className = ''
            }
            this.className = 'active'
            //设置负值，元素向左移动
            animation(imgBox, -pic[0].offsetWidth*index,'left')
           
        }
    }
}

function animation(ele, target, attr, callback) {
    clearInterval(ele.timer)
    ele.timer = setInterval(function () {
        //开始位置  width:200px  200px + 10px  210px + 10px
        var begin = parseFloat(getStyle(ele, attr))
        //步长
        var step = (target - begin) / 10
        //判断
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        //赋值结果
        var res = begin + step
        //给元素进行赋值操作
        ele.style[attr] = res + 'px'
        //清除下定时器
        if (res == target) {
            clearInterval(ele.timer)
            //如果咱们传递了这个函数，那就执行，如果没有就不执行
            if (callback) {
                callback()
            }
        }
    }, 30)
}
//获取属性封装
function getStyle(ele, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(ele, null)[attr]
    } else {
        return ele.currentStyle[attr]
    }
}
let num = 0
let circle = 0
let flag = true
//自动轮播
auto()
function auto(){
    timer = setInterval(function(){
        if(flag){
            flag = false
            num++
            animation(imgBox, -pic[0].offsetWidth*num,'left',function(){
                if(num == pic.length - 1){
                    num = 0
                    imgBox.style.left = 0
                }
                flag = true
            })
            circle++
            if(circle > pointBox.children.length - 1){
                circle = 0
            }
            for(let j = 0; j < pointBox.children.length; j++){
                pointBox.children[j].className = ''
            }
            pointBox.children[circle].className = 'active'
        }
    },4000)
}
imgBox.parentNode.onmouseover = function(){
    clearInterval(timer)
}
imgBox.parentNode.onmouseout = function(){
    auto()
}
