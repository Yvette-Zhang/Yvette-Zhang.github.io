// 模拟 ajax 请求数据
function MockData() {
  return new Promise((r, j) => {
    var data = [
      {
        id: 1,
        num: "1",
        name: "从何基可从何基可从何基可从何基可从何基可从何基可",
        executor: "阎平",
        project: "项目1",
        type: "创业类",
        endtime: "2010-05-05",
        starttime: "2002-09-22",
        status: "normal",
        children: [
          {
            id: 20,
            pid: 1,
            num: "1.1",
            name: "人算适",
            executor: "崔杰",
            project: "项目2",
            type: "科研类",
            endtime: "2001-03-27",
            starttime: "1996-07-06",
            status: "normal",
            children: [
              {
                id: 30,
                pid: 20,
                num: "1.1.1",
                name: "我爱你我爱你我爱你我爱你",
                executor: "崔克",
                project: "项目1",
                type: "科研类",
                endtime: "1991-03-27",
                starttime: "1990-07-06",
                status: "invalid",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        num: "2",
        name: "一已例量七除长",
        executor: "魏军",
        project: "项目2",
        type: "科研类",
        endtime: "2003-12-27",
        starttime: "2019-09-21",
        status: "done",
        children: [
          {
            id: 21,
            pid: 2,
            num: "2.1",
            name: "而外名走次团天",
            executor: "王伟",
            project: "项目1",
            type: "科研类",
            endtime: "2004-01-10",
            starttime: "2017-11-23",
            status: "normal",
          },
        ],
      },
      {
        id: 3,
        num: "3",
        name: "少名将叫备叫",
        executor: "贺杰",
        project: "项目1",
        type: "科研类",
        endtime: "1987-05-03",
        starttime: "2005-01-25",
        status: "done",
        children: [],
      },
      {
        id: 4,
        num: "4",
        name: "直命青知或做出",
        executor: "蔡洋",
        project: "项目2",
        type: "创业类",
        endtime: "1985-07-26",
        starttime: "2002-05-28",
        status: "invalid",
        children: [
          {
            id: 22,
            pid: 4,
            num: "4.1",
            name: "些史我民和候",
            executor: "丁桂英",
            project: "项目1",
            type: "科研类",
            endtime: "2004-06-20",
            starttime: "1998-11-21",
            status: "invalid",
          },
        ],
      },
    ];
    r(data);
  });
}
function createIcon(icon) {
  if (!icon) return "";
  return '<i class="layui-icon">' + icon + "</i>";
}
function Button(text, theme, size, radius, icon) {
  if (!text) return null;
  var baseClass = "layui-btn-";
  var themeClass = theme ? baseClass + theme : "";
  var sizeClass = size ? baseClass + size : "";
  var radiusClass = radius ? baseClass + "radius" : "";
  var BtnClass =
    "layui-btn datatable-btn " +
    themeClass +
    " " +
    sizeClass +
    " " +
    radiusClass;
  return $(
    "<button class='" + BtnClass + "'>" + createIcon(icon) + text + "</button>"
  );
}

// 生成表格
var tableEl = $("#all-task-table");
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
      $(row).attr("item-id", data.id);
      if (+data.pid) {
        $(row).attr("item-pid", data.pid);
      }
    },
    treeGrid: {
      left: 10,
      expandIcon:
        "<span><i class='layui-icon layui-icon-triangle-r'></i></span>",
      collapseIcon:
        "<span><i class='layui-icon layui-icon-triangle-d'></i></span>",
      trDataIdName: "item-id",
      trDataPidName: "item-pid",
    },
    tips: true,
    columns: [
      {
        title: "",
        tips: false,
        className: "treegrid-control",
        width: "5%",
        data: function (item) {
          if (item.children && item.children.length) {
            return "<span><i class='layui-icon layui-icon-triangle-r'></i></span>";
          }
          return "";
        },
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
      },
      {
        title: "操作",
        data: null,
        defaultContent: "",
        width: "140px",
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
  /**
   * 展开节点
   * @param {number} level 展开级别，默认为全部
   */
  function expandTree(level = 0) {
    if (level === 0) {
      tableEl.find(".treegrid-control").click();
      var subControl = tableEl.find("td.treegrid-control").not(":empty");
      if (subControl.length) {
        expandTree();
      }
    } else {
      for (var i = 0; i < level; i++) {
        tableEl.find(".treegrid-control").click();
      }
    }
  }
  expandTree();
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
