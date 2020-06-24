/**
 * Created by cuihongquan on 2015/6/5.
 * depends on summer.ele.css
 *            plugin uploadify
 */
(function ($) {
    var defaults = {
        url: '',    //请求的地址
        data: [],    //请求的数据
        id: null,     //容器的ID
        type: '',    //生成类型text类型，button类型，toolbar类型
        permit: [],  //需要的权限按钮
        display: 3,  //显示几个
        disabled: '', //不可用
        size: '', // 大小：默认， small
        layFilter: '', //layui表单提交标识
        iconClass: ''
    };
    //方法初始化
    var methods = {
        init: function () {
            var options = arguments[0],
                settings = $.extend({}, defaults, options);
            //数据的加载
            loadData(settings);
            //构造工具条
            return createToolbar(settings);
        }
    };
    //数据的加载
    var loadData = function (settings) {
        var data = settings.data,
            url = settings.url;
        if (!data.length) {
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (data.result == 'success') {
                        //复制数组
                        settings.data = data.data.concat();
                    }
                }
            });
        }
    };
    //数据的过滤 权限字段的过滤
    var filter = function (data, permit) {
        var temp = [];
        $.each(permit, function (i, p) {
            $.each(data, function (j, d) {
                if(p === d.permit){
                    temp.push(d);
                }
            });
        });
        return temp;
    };
    //构建toolbar工具条
    var createToolbar = function (settings) {
        if (settings.id) {
            staticToolbar(settings);   //构建面包屑中按钮
        } else {
            return tableToolbar(settings);     //构建表格中操作按钮
        }
    };
    //静态工具条
    var staticToolbar = function (settings) {
        var arr = filter(settings.data, settings.permit),
            ul = [];
        ul.push('<ul class="funcbar-static">');
        
        //遍历数组的长度
        for (var i = 0; i < arr.length; i++) {
            switch (arr[i].mark) {
                //如果mark字段为create，将加载蓝色的按钮
                case 'create':
                	ul.push('<li class="funcbar-static-item"><a href="javascript:;"  class="layui-btn" data-id=' + arr[i].id +
                            ' data-url=' + arr[i].url + ' data-mark=' + arr[i].mark + ' data-permit=' + arr[i].permit + '>' + arr[i].sName + '</a></li>');
                    break;
                //如果mark字段为delete，将加载红色的按钮
                case 'delete':
                    ul.push('<li class="funcbar-static-item"><a href="javascript:;"' +
                        ' class="layui-btn layui-btn-danger" data-id=' + arr[i].id + ' data-url=' + arr[i].url + ' data-permit=' + arr[i].permit +
                        ' data-mark=' + arr[i].mark + '>' + arr[i].sName + '</a></li>');
                    break;
                //如果mark字段为view，将加载绿色的按钮
                case 'view':
                    ul.push('<li class="funcbar-static-item"><a id=" href="javascript:;"' +
                        ' class="layui-btn layui-btn-normal" data-id=' + arr[i].id + ' data-url=' + arr[i].url + ' data-permit=' + arr[i].permit +
                        ' data-mark=' + arr[i].mark + '>' + arr[i].sName + '</a></li>');
                    break;
                //否则加载蓝色按钮
                default:
                    ul.push('<li class="funcbar-static-item"><a href="javascript:;" class="layui-btn" data-id=' + arr[i].id + ' data-permit=' + arr[i].permit +
                        ' data-url=' + arr[i].url + ' data-mark=' + arr[i].mark + '>' + arr[i].sName + '</a></li>');
            }
        }
        ul.push('</ul>');
        //通过id，直接绑定到页面上
        $('#' + settings.id).append(ul.join(' ')).css('overflow', 'auto');
    };

    //动态工具条
    var tableToolbar = function (settings) {
        var arr = filter(settings.data, settings.permit),
            html = [],
            sizeClass= "",
            count = arr.length;
        if(settings.size == 'small') {
        	sizeClass = 'layui-btn-xs';
        };
        
        //如果其类型为icon类型
        if (settings.type == 'icon') {
            html.push('<ul class="funcbar-dynamic">');
            for (var i = 0; i < count; i++) {
                if (typeof settings.disabled === 'string' && settings.disabled.match(arr[i].permit)) {
                    html.push('<li class="funcbar-dynamic-item disabled"><a href="javascript:;" onclick="return false;"');
                } else {
                    html.push('<li class="funcbar-dynamic-item"><a href="javascript:;"');
                }
                html.push('data-permit=' + arr[i].permit + ' data-id="' + arr[i].id + '" data-url="' + arr[i].url + '" data-mark="' + arr[i].mark + '" title="' + arr[i].sName + '">');
                html.push('<i class="icon ' +  + ' ' +
                    settings.iconClass + '"></i></a></li>');
            }
            
            html.push('</ul>');
            //如果是button类型
        } else if (settings.type == 'button') {
        	if(settings.layFilter) {
        		for (var j = 0; j < arr.length; j++) {
                    switch (arr[j].mark) {
                        case 'create':
                            html.push('<a href="javascript:;" lay-submit="" lay-filter="'+ settings.layFilter +'" class="layui-btn ' + sizeClass + '" data-id=' + arr[j].id +
                                ' data-url=' + arr[j].url + ' data-mark=' + arr[j].mark + ' data-permit=' + arr[j].permit + ' id="'+(arr[j].permit.split(":"))[1]+'">' + arr[j].sName + '</a>');
                            break;
                        case 'delete':
                            html.push('<a href="javascript:;" lay-submit="" lay-filter="'+ settings.layFilter +'" class="layui-btn layui-btn-danger ' + sizeClass + '" data-id=' + arr[j].id +
                                ' data-url=' + arr[j].url + ' data-mark=' + arr[j].mark + ' data-permit=' + arr[j].permit + ' id="'+(arr[j].permit.split(":"))[1]+'">' + arr[j].sName + '</a>');
                            break;
                        case 'view':
                            html.push('<a href="javascript:;" lay-submit="" lay-filter="'+ settings.layFilter +'" class="layui-btn layui-btn-normal ' + sizeClass + '" data-id=' + arr[j].id +
                                ' data-url=' + arr[j].url + ' data-mark=' + arr[j].mark + ' data-permit=' + arr[j].permit + ' id="'+(arr[j].permit.split(":"))[1]+'">' + arr[j].sName + '</a>');
                            break;
                        default:
                            html.push('<a href="javascript:;" lay-submit="" lay-filter="'+ settings.layFilter +'" class="layui-btn ' + sizeClass + '" data-id=' + arr[j].id + ' data-permit=' + arr[j].permit +
                                ' data-url=' + arr[j].url + ' data-mark=' + arr[j].mark + ' id="'+(arr[j].permit.split(":"))[1]+'">' + arr[j].sName + '</a>');
                    }
                }
        	} else {
        		for (var j = 0; j < arr.length; j++) {
                    switch (arr[j].mark) {
                        case 'create':
                            html.push('<a href="javascript:;" class="layui-btn ' + sizeClass + '" data-id=' + arr[j].id +
                                ' data-url=' + arr[j].url + ' data-mark=' + arr[j].mark + ' data-permit=' + arr[j].permit + ' id="'+(arr[j].permit.split(":"))[1]+'">' + arr[j].sName + '</a>');
                            break;
                        case 'delete':
                            html.push('<a href="javascript:;" class="layui-btn layui-btn-danger ' + sizeClass + '" data-id=' + arr[j].id +
                                ' data-url=' + arr[j].url + ' data-mark=' + arr[j].mark + ' data-permit=' + arr[j].permit + ' id="'+(arr[j].permit.split(":"))[1]+'">' + arr[j].sName + '</a>');
                            break;
                        case 'view':
                            html.push('<a href="javascript:;" class="layui-btn layui-btn-normal ' + sizeClass + '" data-id=' + arr[j].id +
                                ' data-url=' + arr[j].url + ' data-mark=' + arr[j].mark + ' data-permit=' + arr[j].permit + ' id="'+(arr[j].permit.split(":"))[1]+'">' + arr[j].sName + '</a>');
                            break;
                        default:
                            html.push('<a href="javascript:;" class="layui-btn ' + sizeClass + '" data-id=' + arr[j].id + ' data-permit=' + arr[j].permit +
                                ' data-url=' + arr[j].url + ' data-mark=' + arr[j].mark + ' id="'+(arr[j].permit.split(":"))[1]+'">' + arr[j].sName + '</a>');
                    }
                }
        	}
            
            //如果是带图标的button类型
        }else {
            //如果是其它的类型
            
            for (var i = 0; i < count; i++) {
                if (typeof settings.disabled === 'string' && settings.disabled.match(arr[i].permit)) {
                    html.push('<a href="javascript:;" class="link" onclick="return false;"');
                } else {
                    switch (arr[i].mark) {
                        //如果mark字段为delete，将加载红色的按钮
                        case 'delete':
                            html.push('<a href="javascript:;" class="lay-link lay-link-danger"');
                            break;
                        default:
                            html.push('<a href="javascript:;" class="lay-link"');
                    }
                }
                html.push('data-permit=' + arr[i].permit + ' data-id="' + arr[i].id + '" data-url="' + arr[i].url + '" data-mark="' + arr[i].mark + '">');
                html.push(arr[i].sName + '</a>');
            }
            
        }
        //最后返回其拼装的字符串
        return html.join(' ');
    };
    $.funcbar = function () {
        var method = arguments[0];
        if (methods[method]) {
            method = methods[method];
            //noinspection JSValidateTypes
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof method === 'object' || !method) {
            method = methods.init;
        } else {
            $.error('data is error')
        }
        return method.apply(this.funcbar, arguments);
    };
})(jQuery);