//请求数据
const script = $('<script src="https://dms-dataapi.meizu.com/data/jsdata.jsonp?callback=dataBack&blockIds=266"></script>')
//插入script
$('body').append(script)
//删除script
$('body>script:last-child').remove()
let datas1
let informationData = []
//读取localstorage的购物车数据，存入二维数组informationData中
function setInformationData(){
    for(let i = 0;i < localStorage.length;i++){
        informationData[i] = []
    }
    if (localStorage.length){
        for(let n = 0;n < localStorage.length; n++){
            let keys = localStorage.key(n)
            // console.log(keys);
            informationData[n][0] = keys//skuid
            informationData[n][1] = parseInt(window.localStorage.getItem(keys))//数量
        }
    }
    //使用datas1数据中对应的索引替换information中的每一个skuid
    datas1.forEach(function (item1,index1){
        informationData.forEach(function (item2){
            if (item1.skuid === item2[0]){
                item2[0] = index1
            }
        })
    })
}
//使用二维数组中的数据渲染页面
function loadPage(informationData){
    let str =
        '<div class="select">\n' +
        '      <label>\n' +
        '        全选\n' +
        '        <input type="checkbox">\n' +
        '      </label>\n' +
        '    </div>'
    let item
    for (let i = 0 ; i < informationData.length ; i++){
        item = datas1[informationData[i][0]]
        let priceAll = item.skuprice.match(/[0-9]+$/g)[0] * informationData[i][1]//总价
        str +=
            '<div class="box">\n' +
            '      <label>\n' +
            '        <input class="item" type="checkbox">\n' +
            '      </label>\n' +
            '      <img src="'+item.img+'" alt="">\n' +
            '      <div class="information">\n' +
            '        <p>'+item.name+'</p>\n' +
            '        <p>'+item.title+'</p>\n' +
            '      </div>\n' +
            '      <p class="price">'+item.skuprice+'</p>\n' +
            '      <div class="number">\n' +
            '        <span class="less">-</span>\n' +
            '        <span>'+informationData[i][1]+'</span>\n' +
            '        <span class="more">+</span>\n' +
            '      </div>\n' +
            '      <p class="price-all">￥'+priceAll+'</p>\n' +
            '      <button class="delete" data-skuid="'+item.skuid+'">删除</button>\n' +
            '    </div>'
    }
    str +=
        '<div class="box">\n' +
        '      <button>结算</button>\n' +
        '    </div>'
    let list = document.getElementById('list')
    list.innerHTML = str
    //删除功能
    $('.delete').on('click',()=>{
        let a = $('.delete').attr('data-skuid')
        console.log(a)
        window.localStorage.removeItem(a)
        location.reload()
    })
    //全选功能
    selectAll()
    function selectAll(){
        let num = 0
        let allBtn = $('.item').on('change',function (){
            let length = allBtn.length
            console.log($(this).prop('checked'))
            if ($(this).prop('checked') === true) num++
            if (num === length) quanxuan.prop('checked',true)
            if ($(this).prop('checked') === false){
                num--
                quanxuan.prop('checked',false)
            }
        })
        let quanxuan = $('.select input')
        quanxuan.on('click',()=>{
            if (quanxuan.prop('checked'))
                allBtn.prop('checked',true)
            else{
                allBtn.prop('checked',false)
                num = 0
            }

        })
    }
    //加减商品数量
    itemNum()
    function itemNum(){
        $('.more').on('click',function(){
            let num = window.localStorage.getItem($(this).parent().next().next().attr('data-skuid'))
            num++
            window.localStorage.setItem($(this).parent().next().next().attr('data-skuid'),num)
            location.reload()
        })
        $('.less').on('click',function(){
            let num = window.localStorage.getItem($(this).parent().next().next().attr('data-skuid'))
            if (num == 1){
                window.localStorage.removeItem($(this).parent().next().next().attr('data-skuid'))
            }else{
                num--
                window.localStorage.setItem($(this).parent().next().next().attr('data-skuid'),num)
            }
            location.reload()
        })
    }
}
function dataBack(res){
    let datas2 = res.block_266[0].floorAllocations
    datas1 = datas2.concat(res.block_266[1].floorAllocations,res.block_266[2].floorAllocations,res.block_266[3].floorAllocations)
    //读取localstorage的购物车数据，存入二维数组informationData中
    setInformationData()
    //使用二维数组中的数据渲染页面
    loadPage(informationData)

}
//验证登录状态
window.onload = function (){
    if (!window.sessionStorage.getItem('login')){
        window.location.href = './login.html'
    }
}

