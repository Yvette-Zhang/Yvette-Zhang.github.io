layui.config({
  base: '../../assets/plugins/layui/layui_exts/dropDown/'
}).use(['dropDown', 'layer', 'tree', 'colorpicker'], function () {
  var dropDown = layui.dropDown,
    layer = layui.layer,
    colorpicker = layui.colorpicker,
    tree = layui.tree;
  // 更多下拉菜单
  var dropDownData = [
    { type: 1, title: "讨论", icon: "taolun1", arrow: true },
    { type: 2, title: "讨论记录", icon: "taolun", arrow: true },
    { type: 3, title: "评论", icon: "pinglun", arrow: true },
    { type: 4, title: "任务", icon: "xiazai", arrow: true },
    { type: 5, title: "成员", icon: "chakanfenxiangchengyuan", arrow: true },
    { type: 6, title: "版本记录", icon: "lishibanben", arrow: true, },
    { type: 7, title: "导出", icon: "xiazai", },
    { type: 8, title: "一键排版", icon: "yijianpaiban" },
  ];

  $("#more").on("click", function () {
    var ele = $(this);
    var dropDownEle = dropDown.render({
      ele: ele, // 绑定下拉菜单的元素 （jq对象）
      position: 'bottom', // 下拉菜单定位 默认 bottom 类型：top、left、right、bottom
      className: 'more-drop', //自定义class 可根据此class自定义样式 默认为 空
      showIcon: true, //是否显示图标 默认false
      iconType: 'font_family icon', //icon图标类型 layui-icon layui自带图标；默认为 layui-icon，也可以是其他图标库的前缀
      zIndex: 1999, // 下拉层级 默认值999
      clickClose: true, //点击下拉菜单选项是否关闭下拉菜单 默认true
      mouseleaveClose: false, // 鼠标离开下拉菜单下拉菜单是否隐藏 默认true
      data: dropDownData, // 下拉菜单的数据
      choose: function (data) { // 点击回调
        if (data.type === 1) {
          var taolunEle = $("#taolun");
          layer.open({
            title: '讨论组',
            type: 1,
            anim: -1,
            shadeClose: true,
            offset: 'r',
            shade: 0.001,
            skin: 'taolun-layer layui-anim layui-anim-rl layui-layer-openRight',
            area: '400px',
            zIndex: '99',
            content: taolunEle,
            move: false,
            success: function (layero) {
              // layer.setTop(layero);
              var content = $(".taolun-layer");
              var userObj = [
                { id: 1, name: '老大1', sName: '老大' },
                { id: 2, name: '老大2', sName: '老大' },
                { id: 3, name: '老大3', sName: '老大' },
                { id: 4, name: '老大4', sName: '老大' },
                { id: 5, name: '老大', sName: '老大' },
                { id: 6, name: '老大', sName: '老大' },
                { id: 7, name: '老大', sName: '老大' },
                { id: 8, name: '老大', sName: '老大' },
                { id: 9, name: '老大', sName: '老大' },
                { id: 10, name: '老大', sName: '老大' }
              ];
              var at_config = {
                at: "@", //触发字符
                data: userObj, //数据 json格式
                headerTpl: '', // 弹出菜单的标题
                insertTpl: '<span data-userId=${id}>@${name}</span>', // 选中菜单显示的内容
                displayTpl: '<li><span class="layui-avatar layui-avatar-sm"><span class="layui-avatar-text">${sName}</span></span>${name}</li>',  // 这个是显示的弹出菜单里面的内容
                searchKey: 'name', // 搜索键匹配的值
                startWithSpace: true, // 是否匹配at之前的空格 默认为true
                limit: 200, // 弹出菜单显示的条目数
                callbacks: {
                  beforeReposition: function (offset) { // 调整菜单的偏移量
                    offset.left += 15;
                    offset.top -= 55;
                  }
                }

              };
              $inputor = content.find('#commentCon').atwho(at_config);
              $inputor.blur(function () {
                if ($(this).text().trim()) {
                  content.find('.comment-input-placeholder').hide();
                } else {
                  content.find('.comment-input-placeholder').show();
                };
              });
            }
          });
        } else if (data.type === 2) {
          var ele = $("#taolunjilu");
          layer.open({
            title: '讨论记录',
            type: 1,
            anim: -1,
            shadeClose: true,
            offset: 'r',
            shade: 0.001,
            skin: 'taolunjilu-layer layui-anim layui-anim-rl layui-layer-openRight',
            area: '400px',
            zIndex: '99',
            content: ele,
            move: false,
            success: function (layero) {
              // layer.setTop(layero);
              console.log(layero)
            }
          });
        } if (data.type === 3) {
          var ele = $(".pinglun");
          layer.open({
            title: '评论',
            type: 1,
            anim: -1,
            shadeClose: true,
            offset: 'r',
            shade: 0.001,
            skin: 'pinglun-layer layui-anim layui-anim-rl layui-layer-openRight',
            area: '400px',
            zIndex: '99',
            content: ele,
            move: false,
            success: function (layero) {
              // layer.setTop(layero);
              var content = $(".pinglun-layer");
              var userObj = [
                { id: 1, name: '老大1', sName: '老大' },
                { id: 2, name: '老大2', sName: '老大' },
                { id: 3, name: '老大3', sName: '老大' },
                { id: 4, name: '老大4', sName: '老大' },
                { id: 5, name: '老大5', sName: '老大' },
                { id: 6, name: '老大6', sName: '老大' },
                { id: 7, name: '老大7', sName: '老大' },
                { id: 8, name: '老大8', sName: '老大' },
                { id: 9, name: '老大9', sName: '老大' },
                { id: 10, name: '老大10', sName: '老大' }
              ];
              var at_config = {
                at: "@", //触发字符
                data: userObj, //数据 json格式
                headerTpl: '', // 弹出菜单的标题
                insertTpl: '<span data-userId=${id}>@${name}</span>', // 选中菜单显示的内容
                displayTpl: '<li><span class="layui-avatar layui-avatar-sm"><span class="layui-avatar-text">${sName}</span></span>${name}</li>',  // 这个是显示的弹出菜单里面的内容
                searchKey: 'name', // 搜索键匹配的值
                startWithSpace: true, // 是否匹配at之前的空格 默认为true
                limit: 200, // 弹出菜单显示的条目数
                callbacks: {
                  beforeReposition: function (offset) { // 调整菜单的偏移量
                    offset.left += 15;
                    offset.top -= 55;
                  }
                }
              };
              $inputorT = content.find('#pinglunCon').atwho(at_config);
              $inputorT.blur(function () {
                if ($(this).text().trim()) {
                  content.find('.comment-input-placeholder').hide();
                } else {
                  content.find('.comment-input-placeholder').show();
                };
              });
            }
          });
        } else if (data.type === 4) {
          var taskLayer = $("#taskLayer");
          layer.open({
            title: '相关任务',
            type: 1,
            anim: -1,
            shadeClose: true,
            offset: 'r',
            shade: 0.001,
            skin: 'member-layer layui-anim layui-anim-rl layui-layer-openRight',
            area: '400px',
            zIndex: '99',
            content: taskLayer,
            move: false,
            success: function (layero) {

            }
          });
        } else if (data.type === 5) {
          var memberLayer = $("#memberLayer");
          layer.open({
            title: '成员',
            type: 1,
            anim: -1,
            shadeClose: true,
            offset: 'r',
            shade: 0.001,
            skin: 'member-layer layui-anim layui-anim-rl layui-layer-openRight',
            area: '400px',
            zIndex: '99',
            content: memberLayer,
            move: false,
            success: function (layero) {
              var memberDropData = [
                { type: 1, title: "可编辑", icon: "bianji" },
                { type: 2, title: "仅查看", icon: "kechakan" },
                { type: 3, title: "删除", icon: "shanchu" }
              ];
              $('.member-list .member-authority').on('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
                var $this = $(this);
                var memberDropDown = dropDown.render({
                  ele: $this, // 绑定下拉菜单的元素 （jq对象）
                  position: 'bottom', // 下拉菜单定位 默认 bottom 类型：top、left、right、bottom
                  className: 'member-drop', //自定义class 可根据此class自定义样式 默认为 空
                  showIcon: true, //是否显示图标 默认false
                  iconType: 'font_family icon', //icon图标类型 layui-icon layui自带图标；默认为 layui-icon，也可以是其他图标库的前缀
                  zIndex: 1999, // 下拉层级 默认值999
                  data: memberDropData, // 下拉菜单的数据
                  choose: function (data) { // 点击回调
                    if (data.type == 3) {
                      return
                    }
                    $this.children('span').text(data.title)
                  }
                });
              })
            }
          });
        } else if (data.type === 6) {
          var memberLayer = $("#versionHistory");
          layer.open({
            title: '版本记录',
            type: 1,
            anim: -1,
            shadeClose: true,
            offset: 'r',
            shade: 0.001,
            skin: 'version-layer layui-anim layui-anim-rl layui-layer-openRight',
            area: '400px',
            zIndex: '99',
            content: memberLayer,
            move: false,
            success: function (layero) {
              $('.version-list li').on('click', function () {
                var $this = $(this),
                  layerTitle = $this.attr('data-version');
                var versionMain = $('#versionMain');
                layer.open({
                  title: layerTitle,
                  type: 1,
                  anim: -1,
                  shadeClose: true,
                  offset: 'auto',
                  shade: 0.35,
                  skin: 'version-con-layer',
                  area: ['800px', '620px'],
                  zIndex: '100',
                  content: versionMain,
                  move: false,
                  success: function (layero) {
                    // $('.version-list li').on('click', function () {
                    //   var $this = $(this),
                    //     layerTitle = $this.attr('data-version');

                    // })
                  }
                });
              })
            }
          });
        } else if (data.type === 8) {
          var ele = $("#paiban");
          layer.open({
            title: '一键排版',
            type: 1,
            anim: -1,
            shadeClose: true,
            offset: 'r',
            shade: 0.001,
            skin: 'paiban-layer layui-anim layui-anim-rl layui-layer-openRight',
            area: '400px',
            zIndex: '99',
            content: ele,
            move: false,
            success: function (layero) {
              // layer.setTop(layero);
              console.log(layero)
            }
          });
        }
      }
    });
  });

  var treeData = [
    {
      id: 1, title: '1.项目摘要', locking: false, level: 1, spread: true, children: [
        { id: 2, title: '1.1收入规划', locking: false, level: 2 },
        { id: 2, title: '1.2在绿色煤炭开发', locking: false, level: 2 },
        { id: 2, title: '1.3无论如何都要', locking: false, level: 2, disabled: true }
      ]
    },
    {
      id: 1, title: '2.这个项目的主要内容是', locking: true, level: 1, spread: true, children: [
        { id: 2, title: '1.项目摘要', locking: true, level: 2, }
      ]
    }
  ];
  // 编辑页面树
  var reportTree = tree.render({
    elem: '#reportTree'
    , data: treeData
    , showLine: false  //是否开启链接线
    , accordion: 0   //是否开启手风琴模式
    , onlyIconControl: true //是否仅允许节点左侧图标控制展开收缩
    , edit: ['update']  //操作节点图标
    // , delNoneLevel: 1 //设置第几级节点不允许删除操作(根据数据中的level)
    // , updateNoneLevel: 1 //设置第几级节点不允许编辑操作(根据数据中的level)
    , locking: true // 是否开启节点的锁定功能
    , lockingIcon: ['font_family icon-mimaffffffpx', 'font_family icon-bianji1'] //锁定图标的class
    , title: true //是否显示树标题的title
    , textOverflow: true //是否开启固定宽显示省略号
    , customOperate: true  //是否开启自定义节点操作
    , click: function (obj) { // 点击节点回调
      console.log(obj);
      $('.layui-tree .layui-tree-entry').removeClass('layui-tree-active');
      obj.elem.children('.layui-tree-entry').addClass('layui-tree-active');
    }
    , operate: function (obj) { //自定义节点操作
      console.log(obj);
    }
    , lockClick: function (obj) { //锁定图标点击回调
      console.log(obj);
      //模拟切换锁定图标，实际可根据业务判断是否切换
      if (obj.el.hasClass('layui-tree-locking-true')) {
        obj.el.removeClass('layui-tree-locking-true').removeClass('icon-mimaffffffpx').addClass('layui-tree-locking-false').addClass('icon-bianji1');
      } else {
        obj.el.removeClass('layui-tree-locking-false').removeClass('icon-bianji1').addClass('layui-tree-locking-true').addClass('icon-mimaffffffpx');
      }

    }
  });

  // 查看页面树
  // var reportTree = tree.render({
  //   elem: '#reportTree'
  //   , data: treeData
  //   , showLine: false  //是否开启链接线
  //   , accordion: 0   //是否开启手风琴模式
  //   , onlyIconControl: true //是否仅允许节点左侧图标控制展开收缩

  //   , title: true //是否显示树标题的title
  //   , textOverflow: true //是否开启固定宽显示省略号
  //   , customOperate: true  //是否开启自定义节点操作
  //   , click: function (obj) { // 点击节点回调
  //     console.log(obj);
  //     $('.layui-tree .layui-tree-entry').removeClass('layui-tree-active');
  //     obj.elem.children('.layui-tree-entry').addClass('layui-tree-active');
  //   }
  // });
  //字体颜色选择器
  colorpicker.render({
    elem: '.tag1',
    predefine: true,
    color: '#000',
    change: function (color) {
    }
  });
  colorpicker.render({
    elem: '.tag2',
    predefine: true,
    color: '#000',
    change: function (color) {
    }
  });
  colorpicker.render({
    elem: '.tag3',
    predefine: true,
    color: '#000',
    change: function (color) {
    }
  });
  colorpicker.render({
    elem: '.tag4',
    predefine: true,
    color: '#000',
    change: function (color) {
    }
  }); colorpicker.render({
    elem: '.tag5',
    predefine: true,
    color: '#000',
    change: function (color) {
    }
  }); colorpicker.render({
    elem: '.tag6',
    predefine: true,
    color: '#000',
    change: function (color) {
    }
  }); colorpicker.render({
    elem: '.tag7',
    predefine: true,
    color: '#000',
    change: function (color) {
    }
  })

})

$('#showAll').on('click', function () {
  $(this).hide();
  $(".other-btn").show();
})
$('#goback').on('click', function () {
  $(".other-btn").hide();
  $('#showAll').show();
})
// 讨论详情弹窗
$('.jilu-list').on('click','.jilu-item i', function () {
  // var $this = $(this);
  var layerDom = $(".taolun-info");
  layer.open({
    title: '讨论详情',
    type: 1,
    content: layerDom,
    shade: 0.001,
    area: ['494px', '473px'],
    shadeClose: true,
    closeBtn: 1,
    offset: 'auto',
    resize: false,
    move: false,
    success: function () {
      var el = $(this.content).parent().parent();
      el.on("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
      });
    }
  })
})

// 一键排版--字体下拉
var selectFont1 = xmSelect.render({
  el: '#level1 .xm-select-font',
  language: 'zn',
  radio: true,
  clickClose: true,
  tips: '黑体',
  model: {
    label: {
      type: 'text',
      text: {
        //左边拼接的字符
        left: '',
        //右边拼接的字符
        right: '',
        //中间的分隔符
        separator: ', ',
      },
    }
  },
  data: [
    { name: '黑体', value: 'heiti' },
    { name: '宋体', value: 'songti' },
    { name: '微软雅黑', value: 'weiruanyahei' },
    { name: '微软雅黑', value: 4 },
    { name: '微软雅黑', value: 5 },
    { name: '微软雅黑', value: 6 },
    { name: '微软雅黑', value: 7 }
  ],
  //监听字体下拉选中的值
  on :function(data){
    var arr = data.arr;
    var change = data.change;
    alert(change[0].name+','+change[0].value)
  }
});
var selectFont2 = xmSelect.render({
  el: '#level2 .xm-select-font',
  language: 'zn',
  radio: true,
  clickClose: true,
  tips: '黑体',
  model: {
    label: {
      type: 'text',
      text: {
        //左边拼接的字符
        left: '',
        //右边拼接的字符
        right: '',
        //中间的分隔符
        separator: ', ',
      },
    }
  },
  data: [
    { name: '黑体', value: 1 },
    { name: '宋体', value: 2 },
    { name: '微软雅黑', value: 3 },
  ]
});
var selectFont3 = xmSelect.render({
  el: '#level3 .xm-select-font',
  language: 'zn',
  radio: true,
  clickClose: true,
  tips: '黑体',
  model: {
    label: {
      type: 'text',
      text: {
        //左边拼接的字符
        left: '',
        //右边拼接的字符
        right: '',
        //中间的分隔符
        separator: ', ',
      },
    }
  },
  data: [
    { name: '黑体', value: 1 },
    { name: '宋体', value: 2 },
    { name: '微软雅黑', value: 3 },
  ]
});
var selectFont4 = xmSelect.render({
  el: '#level4 .xm-select-font',
  language: 'zn',
  radio: true,
  clickClose: true,
  tips: '黑体',
  model: {
    label: {
      type: 'text',
      text: {
        //左边拼接的字符
        left: '',
        //右边拼接的字符
        right: '',
        //中间的分隔符
        separator: ', ',
      },
    }
  },
  data: [
    { name: '黑体', value: 1 },
    { name: '宋体', value: 2 },
    { name: '微软雅黑', value: 3 },
  ]
});
var selectFont5 = xmSelect.render({
  el: '#level5 .xm-select-font',
  language: 'zn',
  radio: true,
  clickClose: true,
  tips: '黑体',
  model: {
    label: {
      type: 'text',
      text: {
        //左边拼接的字符
        left: '',
        //右边拼接的字符
        right: '',
        //中间的分隔符
        separator: ', ',
      },
    }
  },
  data: [
    { name: '黑体', value: 1 },
    { name: '宋体', value: 2 },
    { name: '微软雅黑', value: 3 },
  ]
});
var selectFont6 = xmSelect.render({
  el: '#level6 .xm-select-font',
  language: 'zn',
  radio: true,
  clickClose: true,
  tips: '黑体',
  model: {
    label: {
      type: 'text',
      text: {
        //左边拼接的字符
        left: '',
        //右边拼接的字符
        right: '',
        //中间的分隔符
        separator: ', ',
      },
    }
  },
  data: [
    { name: '黑体', value: 1 },
    { name: '宋体', value: 2 },
    { name: '微软雅黑', value: 3 },
  ]
});
var selectFont7 = xmSelect.render({
  el: '#level7 .xm-select-font',
  language: 'zn',
  radio: true,
  clickClose: true,
  tips: '黑体',
  model: {
    label: {
      type: 'text',
      text: {
        //左边拼接的字符
        left: '',
        //右边拼接的字符
        right: '',
        //中间的分隔符
        separator: ', ',
      },
    }
  },
  data: [
    { name: '黑体', value: 'heiti' },
    { name: '宋体', value: 'songti' },
    { name: '微软雅黑', value: 3 },
  ],

});
//获取下拉选中的值
// selectFont1.getValue();


// 一键排版--字体大小下拉
var selectSize1 = xmSelect.render({
  el: '#level1 .xm-select-size',
  language: 'zn',
  radio: true,
  clickClose: true,
  tips: '12',
  model: {
    label: {
      type: 'text',
      text: {
        //左边拼接的字符
        left: '',
        //右边拼接的字符
        right: '',
        //中间的分隔符
        separator: ', ',
      },
    }
  },
  data: [
    { name: '12', value: 1 },
    { name: '14', value: 2 },
    { name: '16', value: 3 },
    { name: '18', value: 3 },
    { name: '20', value: 4 },
  ]
});
var selectSize2 = xmSelect.render({
  el: '#level2 .xm-select-size',
  language: 'zn',
  radio: true,
  clickClose: true,
  tips: '12',
  model: {
    label: {
      type: 'text',
      text: {
        //左边拼接的字符
        left: '',
        //右边拼接的字符
        right: '',
        //中间的分隔符
        separator: ', ',
      },
    }
  },
  data: [
    { name: '12', value: 1 },
    { name: '14', value: 2 },
    { name: '16', value: 3 },
    { name: '18', value: 3 },
    { name: '20', value: 4 },
  ]
});
var selectSize3 = xmSelect.render({
  el: '#level3 .xm-select-size',
  language: 'zn',
  radio: true,
  clickClose: true,
  tips: '12',
  model: {
    label: {
      type: 'text',
      text: {
        //左边拼接的字符
        left: '',
        //右边拼接的字符
        right: '',
        //中间的分隔符
        separator: ', ',
      },
    }
  },
  data: [
    { name: '12', value: 1 },
    { name: '14', value: 2 },
    { name: '16', value: 3 },
    { name: '18', value: 3 },
    { name: '20', value: 4 },
  ]
});
var selectSize4 = xmSelect.render({
  el: '#level4 .xm-select-size',
  language: 'zn',
  radio: true,
  clickClose: true,
  tips: '12',
  model: {
    label: {
      type: 'text',
      text: {
        //左边拼接的字符
        left: '',
        //右边拼接的字符
        right: '',
        //中间的分隔符
        separator: ', ',
      },
    }
  },
  data: [
    { name: '12', value: 1 },
    { name: '14', value: 2 },
    { name: '16', value: 3 },
    { name: '18', value: 3 },
    { name: '20', value: 4 },
  ]
});
var selectSize5 = xmSelect.render({
  el: '#level5 .xm-select-size',
  language: 'zn',
  radio: true,
  clickClose: true,
  tips: '12',
  model: {
    label: {
      type: 'text',
      text: {
        //左边拼接的字符
        left: '',
        //右边拼接的字符
        right: '',
        //中间的分隔符
        separator: ', ',
      },
    }
  },
  data: [
    { name: '12', value: 1 },
    { name: '14', value: 2 },
    { name: '16', value: 3 },
    { name: '18', value: 3 },
    { name: '20', value: 4 },
  ]
});
var selectSize6 = xmSelect.render({
  el: '#level6 .xm-select-size',
  language: 'zn',
  radio: true,
  clickClose: true,
  tips: '12',
  model: {
    label: {
      type: 'text',
      text: {
        //左边拼接的字符
        left: '',
        //右边拼接的字符
        right: '',
        //中间的分隔符
        separator: ', ',
      },
    }
  },
  data: [
    { name: '12', value: 1 },
    { name: '14', value: 2 },
    { name: '16', value: 3 },
    { name: '18', value: 3 },
    { name: '20', value: 4 },
  ]
});
var selectSize7 = xmSelect.render({
  el: '#level7 .xm-select-size',
  language: 'zn',
  radio: true,
  clickClose: true,
  tips: '12',
  model: {
    label: {
      type: 'text',
      text: {
        //左边拼接的字符
        left: '',
        //右边拼接的字符
        right: '',
        //中间的分隔符
        separator: ', ',
      },
    }
  },
  data: [
    { name: '12', value: 1 },
    { name: '14', value: 2 },
    { name: '16', value: 3 },
    { name: '18', value: 3 },
    { name: '20', value: 4 },
  ]
});
// 字体样式动态添加样式
$('.font-style-box:not(.color-picker)').on('click', function () {
  $(this).toggleClass('active')
})

