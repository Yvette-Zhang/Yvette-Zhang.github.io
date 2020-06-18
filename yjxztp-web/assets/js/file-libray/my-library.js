// 模拟 ajax 请求数据
function MockData() {
  return new Promise((r, j) => {
    var data = Mock.mock({
      "data|10-20": [
        {
          "id|+1": 0,
          "name|1": "@ctitle(3,8)",
          "uploadtime|1": "@date",
          // 文件大小，单位 B
          "size|100-409600": 0,
          // 浏览数
          "view|1-999": 0,
          // 下载数
          "download|1-999": 0,
          // 引用数
          "quote|1-999": 0,
          // 是否分享
          share: "@boolean",
          // 是否置顶
          top: "@boolean",
          "link|1": ["", "asdsa/asdasd/asdasd"],
          // 失效、正常
          "status|1": ["invalid", "normal"],
        },
      ],
    });
    r(data.data);
  });
}
// 生成表格
var tableEl = $("#my-library-table");
MockData().then(function (data) {
  tableEl.DataTable({
    scrollY: "calc(100vh - 240px)",
    info: false,
    paging: false,
    searching: false,
    order: [],
    data: data,
    columnDefs: [{ orderable: false, targets: "_all" }],
    createdRow(row, data, dataIndex) {
      // 状态 class
      $(row).addClass(`datatable-status-${data.status}`);
    },
    tips: true,
    columns: [
      {
        title: "文件",
        data: "name",
        className: "main-column",
      },
      {
        // 操作
        title: "",
        data: function () {
          return "";
        },
      },
      {
        // 标签
        title: "",
        data: function () {
          return "";
        },
      },
      {
        title: "上传时间",
        data: "uploadtime",
        name: "uploadtime",
        orderable: true,
      },
      {
        title: "大小",
        data: "size",
        name: "size",
        orderable: true,
      },
      {
        title: "浏览次数",
        data: "view",
        name: "view",
        orderable: true,
      },
      {
        title: "下载次数",
        data: "download",
        name: "download",
        orderable: true,
      },
      {
        title: "被引用次数",
        data: "quote",
        name: "quote",
        orderable: true,
      },
      {
        title: "相关联",
        data: "link",
        name: "link",
      },
    ],
  });
});

layui.use(["layer", "form"], function () {
  var layer = layui.layer,
    form = layui.form;
  var datatable = tableEl.DataTable();
  // 监听操作栏按钮点击
  tableEl.on("restartClick", function (e, data) {
    layer.msg("重启" + JSON.stringify(data));
  });
  tableEl.on("doneClick", function (e, data) {
    layer.msg("完成" + JSON.stringify(data));
  });
  tableEl.on("addSubTaskClick", function (e, data) {
    layer.msg("+子任务" + JSON.stringify(data));
  });

  // 弹出式菜单
  $("#colsvis").on("click", function (e) {
    var layerDom = $(columnsVis);
    layer.open({
      triggerEle: $(this),
      title: "",
      type: 1,
      offset: "eb",
      content: layerDom,
      shade: 0.001,
      shadeClose: true,
      closeBtn: 0,
      move: false,
    });
  });
  // 切换列显隐
  form.on("switch", function (data) {
    var column = datatable.column($(data.elem).attr("data-column") + ":name");
    column.visible(data.elem.checked);
  });
  // 工具栏显示 tips
  var tips_index;
  $("[data-tips]").on({
    mouseover: function () {
      if (tips_index) return;
      tips_index = layer.tips($(this).attr("data-tips"), this, {
        tips: 1,
        time: 0,
        skin: "demo-test4",
      });
    },
    mouseout: function () {
      layer.close(tips_index);
      tips_index = null;
    },
  });
});
