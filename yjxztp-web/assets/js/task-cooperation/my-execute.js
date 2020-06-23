// 分组
var groups = ["已逾期", "今日到期", "以后或未安排", "已完成", "已失效"];
// 模拟 ajax 请求数据
function MockData() {
  return new Promise((r, j) => {
    var data = Mock.mock({
      "data|10-20": [
        {
          "group|1": groups,
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
  return `<i class="font_family">${icon}</i>`;
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

// 自定义排序规则，控制组不动
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
  "group-pre": function (s) {
    const all = groups;
    return all.indexOf(s);
  },
  "group-asc": function (a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  },
  "group-desc": function (a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  },
});
// 生成表格
var tableEl = $("#my-execute-table");
MockData().then(function (data) {
  tableEl.DataTable({
    scrollY: "calc(100vh - 128px)",
    info: false,
    paging: false,
    searching: false,
    order: [],
    orderFixed: [0, "asc"],
    data: data,
    columnDefs: [{ orderable: false, targets: "_all" }],
    rowGroup: {
      dataSrc: "group",
      startRender: function (rows, group) {
        // 组颜色
        const colors = ["#ff0000", "#46C5B2", "#0000ff", "#ffa500", "#808080"];
        // 组图标 layui
        const icons = [
          "&#xe654;",
          "&#xe652;",
          "&#xe653;",
          "&#xe665;",
          "&#xe664;",
        ];
        const index = groups.indexOf(group);
        const color = `color: ${colors[index]};`;
        const background = `background:${colors[index]}1c;`;
        return `
            <div style="${color}${background}" class='datatable-group-icon'>${createIcon(
          icons[index]
        )}</div>
            <span style="${color}">${group} (${rows.count()})</span>
        `;
      },
    },
    createdRow(row, data, dataIndex) {
      // 状态 class
      $(row).addClass(`datatable-status-${data.status}`);
    },
    tips: true,
    columns: [
      {
        data: "group",
        visible: false,
        // 固定组（使用自定义组排序规则）
        type: "group",
      },
      {
        title: "序号",
        data: "num",
        width: "30px",
        tips: false,
      },
      {
        title: "任务名称",
        data: "name",
        className: "main-column datatable-has-action",
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
        width: "180px",
        tips: false,
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
      resize: false,
    });
  });
  // 切换列显隐
  form.on("switch", function (data) {
    var column = datatable.column($(data.elem).attr("data-column") + ":name");
    column.visible(data.elem.checked);
  });
  // 点击任务名称
  $(".datatable-has-action").on("click", function () {
    var rowData = datatable.row(this).data();
    console.log(rowData);
  });
});
