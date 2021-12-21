//请求数据
const script = $('<script src="https://dms-dataapi.meizu.com/data/jsdata.jsonp?callback=dataBack&blockIds=266"></script>')
//插入script
$('body').append(script)
//删除script
$('body>script:last-child').remove()


//通过地址传递过来的skuid从数据列表中找到要渲染的数据
let href = window.location.href
console.log(href)
let skuid = href.match(/[0-9]+$/g)[0]
console.log(skuid);
let dataIndex
function dataBack(res){
    let datas2 = res.block_266[0].floorAllocations
    let datas1 = datas2.concat(res.block_266[1].floorAllocations,res.block_266[2].floorAllocations,res.block_266[3].floorAllocations)
    console.log(datas1)
    datas1.forEach(function (item,index){
        if (skuid === item.skuid){
            // console.log(index)
            dataIndex = index
        }
    })
    //渲染页面
    let str = ''
    let item = datas1[dataIndex]
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
    const e = new Enlarge('#box')
    //加入购物车功能，使用浏览器本地存储实现
    const jg = document.getElementById('jg')
    let id = jg.getAttribute('data-skuid')
    jg.onclick = ()=>{
        if (!window.localStorage.getItem(id))
            window.localStorage.setItem(id,'1')
        else {
            const num2 = parseInt(window.localStorage.getItem(id))+1
            window.localStorage.setItem(id,num2)
        }
        alert('加入购物车成功')
    }
}


