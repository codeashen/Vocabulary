$(function () {
    renderTable();

    // getLinks('src/conf/vocabulary.json');
    
    // hash 属性是一个可读可写的字符串，该字符串是 URL 的锚部分（从 # 号开始的部分）
    if (location.hash === '#link') {
        $('#link').removeClass('l-hidden');
        $('#l-back').removeClass('l-hidden');
    }

    // exportRaw("数据内容", "a.txt")
});

/**
 * 渲染表格
 */
function renderTable() {
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#table',
            url: 'src/conf/vocabulary.json',
            toolbar: true,
            // totalRow: true,
            cols: [
                [{
                    field: 'word',
                    title: '单词',
                    unresize: true,
                    align: 'left'
                }, {
                    field: 'meaning',
                    title: '含义',
                    unresize: true,
                    align: 'left'
                }]
            ],
            // page: true,
            response: {
                statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
            },
            parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
                return {
                    "code": 200,    //解析接口状态
                    "msg": "",      //解析提示文本
                    "count": 3,     //解析数据长度
                    "data": res     //解析数据列表
                };
            }
        });
    });
}

/**
 * 导出数据到文件
 * @param {文件内容} data 
 * @param {文件名} name 
 */
 function exportRaw(data, name) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    save_link.click();
}

/**
 * 读取JSON数据
 * @param url
 */
 let getLinks = function (url) {
    $.getJSON(
        url, {
            t: Date.parse(new Date())
        },
        function (result) {
            $.each(result, function (i, obj) {
                let line = obj.word + ' ' + obj.meaning;
                $('#list').append(line).append('</br>')
            });
        });
        
}

/**
 * 右侧猫失焦函数
 * 随机设置css的bottom数值，及相对于底边的高度
 */
 let duoMaomao = function () {
    let maomao = $('#maomao');
    // vh：1vh等于视口高度的1%。
    maomao.css('bottom', randomNum(5, 80) + 'vh');
}
// 随机数
let randomNum = function (minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
}