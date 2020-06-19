layui.config({
  base: "../../../assets/plugins/layui/layui_exts/dropDown/"
}).use(["element", "layer", "dropDown"], function () {
  var element = layui.element,
    layer = layui.layer,
    dropDown = layui.dropDown;

  $(".index-notice").on("click", function () {
    var noticeEle = $("#noticeCon")
    layer.open({
      title: '全部通知',
      type: 1,
      anim: -1,
      shadeClose: true,
      offset: 'r',
      shade: 0.001,
      shadeClose: true,
      skin: 'notice-layer layui-anim layui-anim-rl layui-layer-openRight',
      area: '440px',
      zIndex: '99',
      content: noticeEle,
      success: function (layero) {
        layer.setTop(layero);
      }
    });
  });

  // 信息类型切换
  $(".notice-type").on("click", function () {
    var $this = $(this),
      dataType = $this.attr("data-type"),
      dropdownData;
    if (dataType == "read-drop") {
      dropdownData = [{
          'type': 1,
          'title': '已读消息'
        },
        {
          'type': 2,
          'title': '未读消息'
        },
      ]
    } else {
      dropdownData = [{
          'type': 1,
          'title': '类型一'
        },
        {
          'type': 2,
          'title': '类型二'
        },
      ]
    };

    var dropDownEle = dropDown.render({
      ele: $this, // 绑定下拉菜单的元素 （jq对象）
      position: 'bottom', // 下拉菜单定位 默认 bottom 类型：top、left、right、bottom
      className: 'notice-drop', //自定义class 可根据此class自定义样式 默认为 空
      zIndex: 1999, // 下拉层级 默认值999
      data: dropdownData, // 下拉菜单的数据
      choose: function (data) { // 点击回调
        $this.children('span').text(data.title)
      }
    });
  });

  var indexWin;
  // 模拟弹出
  setTimeout(function () {
    indexWin = layer.open({
      title: '讨论通知',
      type: 1,
      anim: -1,
      shade: 0,
      shadeClose: true,
      offset: 'rb',
      skin: 'indexWin-layer',
      area: '320px',
      btn: '参与讨论',
      content: "您好，王文静在测试文档报告中发起了讨论，邀 请您参与！",
      success: function (layero) {
        layer.setTop(layero);
      }
    });
  }, 1000);
  setTimeout(function () {
    layer.close(indexWin);
  }, 4000)
});

$("[data-href]").on("click", function () {
  var url = $(this).data("href");
  if (!url) return;
  $("[data-href]").removeClass("index-menus-item--active");
  $(this).addClass("index-menus-item--active");
  $("#homeSubPage").attr("src", url);
});

function setPageUrl(url) {
  if (!url) return;
  $("#homeSubPage").attr("src", url);
}