//创建script标签请求数据
let script = $('<script src="https://dms-dataapi.meizu.com/data/jsdata.jsonp?callback=dataBack&blockIds=266"></script>')
//插入script
$('body').append(script)
//删除script
$('body>script:last-child').remove()


//渲染页面
function dataBack(res){
    console.log(res)
    let goodsList = $('.goodsList')
    let phoneData = res.block_266[0].floorAllocations
    let LiproData = res.block_266[1].floorAllocations
    let soundData = res.block_266[2].floorAllocations
    let peijianData = res.block_266[3].floorAllocations
    let goodsItem
    console.log(soundData);
    //组装字符串并渲染页面
    let str = ''
    function loadData(datas){
        str = ''
        datas.forEach(function (item){
            str += '<div data-skuid="'+item.skuid+'">\n' +
                '        <img src="'+item.img+'" alt="">\n' +
                '        <h3>'+item.name+'</h3>\n' +
                '        <p>'+item.title+'</p>\n' +
                '        <p>'+item.skuprice+'</p>\n' +
                '      </div>'
        })
        $('.goodsList>div').remove()
        goodsList.append(str)
        //点击跳转商品详情,并在地址中传递一个商品skuid
        goodsItem = $('.goodsList>div')
        goodsItem.on('click',function (){
            let address = './goodsDetail.html'
            address+='?'+'skuid='+$(this).attr('data-skuid')
            window.location.href = address
        })
        console.log(goodsItem)
    }
    //分类渲染页面
    function loadPage(dataClass){
        if (dataClass === 'phone'){
            loadData(phoneData)
            $('.list>.heart>.tittle').text('手机')
            return
        }
        if (dataClass === 'Lipro'){
            loadData(LiproData)
            $('.list>.heart>.tittle').text('Lipro')
            return
        }
        if (dataClass === 'sound'){
            loadData(soundData)
            $('.list>.heart>.tittle').text('魅族声学')
            return
        }
        if (dataClass === 'peijian'){
            loadData(peijianData)
            $('.list>.heart>.tittle').text('配件')
        }
    }
    //点击切换商品类目
    let ul = document.getElementById('ul')
    ul.onclick = function (e){
        e = e || window.event
        let target = e.target || e.srcElement
        if (target.id === 'phone'){
            loadPage('phone')
        }
        if (target.id === 'Lipro'){
            loadPage('Lipro')
        }
        if (target.id === 'sound'){
            loadPage('sound')
        }
        if (target.id === 'peijian'){
            loadPage('peijian')
        }
    }
    //页面加载时 预先默认加载手机商品列表
    window.onload = function (){
        loadPage('phone')
    }

    //价格排序
    function Pricedown(dataPriceDown){
        let arr = []
        dataPriceDown.forEach(function (item){
            arr.push(item.skuprice.replace(/[^0-9]/g,''))
        })
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] < arr[j + 1]) {
                    let tmp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = tmp
                    let tmp2 = dataPriceDown[j]
                    dataPriceDown[j] = dataPriceDown[j+1]
                    dataPriceDown[j+1] = tmp2
                }
            }
        }
        return dataPriceDown
    }
    //价格排序单击事件
    $('#price').on('click',function (){
        $('#recommend').prop('class','')
        $('#price').prop('class','active')
        // copy 深拷贝于phoneData
        let[...copy]  = phoneData
        // 渲染页面
        loadData(Pricedown(copy))
    })
    //推荐排序单击事件
    $('#recommend').on('click',function (){
        $('#price').prop('class','')
        $('#recommend').prop('class','active')
        //渲染页面
        loadData(phoneData)
    })
}