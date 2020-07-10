// 模拟 ajax 请求数据
function MockData() {
  return new Promise((r, j) => {
    var data = Mock.mock({
      "data|10-20": [
        {
          "id|+1": 0,
          "num|+1": 1,
          "name|1": "@ctitle(3,8)",
          "executor|1": "@cname",
          "project|1": ["项目1", "项目2"],
          "type|1": ["科研类", "创业类"],
          "endtime|1": "@date",
          "status|1": ["invalid", "normal", "done"],
        },
      ],
    });
    r(data.data);
  });
}

function createIcon(icon) {
  if (!icon) return "";
  return `<i class="layui-icon">${icon}</i>`;
}
function Button(text, theme, size, radius, icon) {
  if (!text) return null;
  var baseClass = "layui-btn-";
  var themeClass = theme ? baseClass + theme : "";
  var sizeClass = size ? baseClass + size : "";
  var radiusClass = radius ? baseClass + "radius" : "";
  var BtnClass = `layui-btn datatable-btn ${themeClass} ${sizeClass} ${radiusClass}`;
  return $(`<button class="${BtnClass}">${createIcon(icon)}${text}</button>`);
}

// 生成表格
var tableEl = $("#template");
MockData().then(function (data) {
  tableEl.DataTable({
    info: false,
    paging: false,
    searching: false,
    order: [],
    data: data,
    columnDefs: [{ orderable: false, targets: "_all" }],
    createdRow(row, data, dataIndex) {
      $(row).addClass(`datatable-status-${data.status}`)
    },
    fixedHeader: true,
    columns: [
      {
        title: "序号",
        data: "num",
        width: "30px",
      },
      {
        title: "项目名称",
        data: "name",
      },
      {
        title: "执行人",
        data: "executor",
        name: "executor",
      },
      {
        title: "项目",
        data: "project",
        name: "project",
      },
      {
        title: "任务分类",
        data: "type",
        name: "type",
      },
      {
        title: "截止时间",
        data: "endtime",
        name: "endtime",
        orderable: true,
      },
      {
        title: "操作",
        data: null,
        defaultContent: "",
        createdCell(cell, cellData, rowData, rowIndex, colIndex) {
          if (rowData.status === "done" || rowData.status === "invalid") {
            var restartBtn = new Button("重启", "", "sm");
            restartBtn.on("click", function () {
              $(this).trigger(
                {
                  type: "restartClick",
                  cell,
                },
                rowData
              );
            });
          }
          if (rowData.status === "normal") {
            var doneBtn = new Button("完成", "", "sm");
            doneBtn.on("click", function () {
              $(this).trigger(
                {
                  type: "doneClick",
                  cell,
                },
                rowData
              );
            });
          }
          if (rowData.status !== "invalid") {
            var subTaskBtn = new Button("+子任务", "", "sm");
            subTaskBtn.on("click", function () {
              $(this).trigger(
                {
                  type: "addSubTaskClick",
                  cell,
                },
                rowData
              );
            });
          }
          $(cell).append([restartBtn, doneBtn, subTaskBtn]);
        },
      },
    ],
  });
});

layui.use(["layer", "form"], function () {
  var layer = layui.layer,
    form = layui.form;
  var datatable = tableEl.DataTable();
  var $search = $("#search");
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
  // 更新数据
  $search.on("keyup", function (e) {
    if (e.keyCode == 13) {
      MockData().then(function (data) {
        datatable.clear();
        datatable.rows.add(data);
        datatable.draw();
      });
    }
  });
  // 弹出式菜单
  $("[data-layer*='toolbox-']").on("click", function (e) {
    var layerDom = $(`#${$(this)[0].dataset["layer"].replace("toolbox-", "")}`);
    layer.open({
      triggerEle: $(this),
      title: $(this)[0].dataset["title"],
      type: 1,
      offset: "eb",
      content: layerDom,
      shade: 0.001,
      shadeClose: true,
      closeBtn: 0,
      move: false,
    });
  });
  form.on("switch", function (data) {
    var column = datatable.column($(data.elem).attr("data-column") + ":name");
    column.visible(data.elem.checked);
  });
});
