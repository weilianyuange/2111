//请求数据
let script = $('<script src="https://dms-dataapi.meizu.com/data/jsdata.jsonp?callback=dataBack&blockIds=266"></script>')
//插入script
$('body').append(script)
//删除script
$('body>script:last-child').remove()


//通过地址传递过来的skuid从数据列表中找到要渲染的数据
let href = window.location.href
console.log(href)
let skuid = href.match(/[0-9]+$/g)[0]//在href里面找到与这个正则匹配的内容
console.log(skuid)
let dataIndex
//数据包
function dataBack(res){
    let datas2 = res.block_266[0].floorAllocations
    let datas1 = datas2.concat(res.block_266[1].floorAllocations,res.block_266[2].floorAllocations,res.block_266[3].floorAllocations)//连接所有数据
    datas1.forEach(function (item,index){
        if (skuid === item.skuid){
            // console.log(index)
            dataIndex = index
        }
    })
    //渲染页面
    let str = ''
    let item = datas1[dataIndex]
    console.log(item);
    str +=
        '  <div class=\'detail-img\' id="box">\n' +
        '    <div class="imgBox">\n' +
        '      <img src="'+item.img+'" alt="">\n' +
        '      <div class="mask"></div>\n' +
        '    </div>\n' +
        '    <div class="enlarge">\n' +
        '      <img src="'+item.img+'" alt="">\n' +
        '    </div>\n' +
        '  </div>\n' +
        '  <div class=\'detail-text\'>\n' +
        '    <h1>'+item.name+'</h1>\n' +
        '    <p>'+item.title+'</p>\n' +
        '    <p>'+item.skuprice+'</p>\n' +
        '    <div>立即购买</div>\n' +
        '    <div id="jg" data-skuid="'+item.skuid+'">加入购物车</div>\n' +
        '  </div>\n'
    $('.detail>div').remove()
    $('.detail').append(str)
    let e = new Enlarge('#box')
    //加入购物车功能，使用浏览器本地存储实现
    let jg = document.getElementById('jg')
    let id = jg.getAttribute('data-skuid')
    jg.onclick = ()=>{
        if (!window.localStorage.getItem(id))
            window.localStorage.setItem(id,'1')
        else {
            let num2 = parseInt(window.localStorage.getItem(id))+1
            window.localStorage.setItem(id,num2)
        }
        alert('加入购物车成功')
        window.open('shoppingCar.html')
    }
}
class Enlarge {
    constructor (select) {
        this.ele = document.querySelector(select)
        this.show = this.ele.querySelector('.imgBox')
        this.mask = this.ele.querySelector('.mask')
        this.enlarge = this.ele.querySelector('.enlarge')
        this.bg = this.enlarge.firstElementChild

        this.show_w = this.show.clientWidth
        this.show_h = this.show.clientHeight

        this.mask_w = parseInt(window.getComputedStyle(this.mask).width)
        this.mask_h = parseInt(window.getComputedStyle(this.mask).height)
        this.bg_w = parseInt(window.getComputedStyle(this.bg).width)
        this.bg_h = parseInt(window.getComputedStyle(this.bg).height)

        this.setScale()
        this.overOut()
        this.move()
    }


    setScale () {
        // 1. 计算数值
        this.enlarge_w = this.mask_w * this.bg_w / this.show_w
        this.enlarge_h = this.mask_h * this.bg_h / this.show_h

        // 2. 给 this.enlarge 赋值
        this.enlarge.style.width = this.enlarge_w + 'px'
        this.enlarge.style.height = this.enlarge_h + 'px'
    }


    overOut () {
        this.show.addEventListener('mouseover', () => {
            this.mask.style.display = 'block'
            this.enlarge.style.display = 'block'
        })

        this.show.addEventListener('mouseout', () => {
            this.mask.style.display = 'none'
            this.enlarge.style.display = 'none'
        })
    }



    move () {
        // 1. 绑定事件
        this.show.addEventListener('mousemove', e => {
            // 处理事件对象兼容
            e = e || window.event

            let x = e.offsetX - this.mask_w / 2
            let y = e.offsetY - this.mask_h / 2

            // 3. 边界值判断
            if (x <= 0) x = 0
            if (y <= 0) y = 0
            if (x >= this.show_w - this.mask_w) x = this.show_w - this.mask_w
            if (y >= this.show_h - this.mask_h) y = this.show_h - this.mask_h

            // 4. 赋值
            this.mask.style.left = x + 'px'
            this.mask.style.top = y + 'px'


            const bg_x = x * this.enlarge_w / this.mask_w * -1
            const bg_y = y * this.enlarge_h / this.mask_h * -1

            // 6. 给 this.bg 进行赋值
            this.bg.style.left = bg_x + 'px'
            this.bg.style.top = bg_y + 'px'
        })
    }
}


