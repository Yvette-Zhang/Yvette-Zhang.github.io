// 模拟 ajax 请求数据
function MockData() {
  return new Promise((r, j) => {
    var data = Mock.mock({
      "data|10-20": [{
        "id|+1": 0,
        "num|+1": 1,
        "name|1": "@ctitle(3,8)",
        "executor|1": "@cname",
        "project|1": ["项目1", "项目2"],
        "type|1": ["科研类", "创业类"],
        "endtime|1": "@date",
        "starttime|1": "@date",
        "status|1": ["invalid", "normal", "done"],
      },],
    });
    r(data.data);
  });
};

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
var tableEl = $("#allview-table");
MockData().then(function (data) {
  tableEl.DataTable({
    scrollY: "calc(100vh - 235px)",
    info: false,
    paging: false,
    searching: false,
    order: [],
    data: data,
    columnDefs: [{
      orderable: false,
      targets: "_all"
    }],
    tips: true,
    createdRow(row, data, dataIndex) {
      // 状态 class
      $(row).addClass(`datatable-status-${data.status}`);
    },
    columns: [{
      title: "序号",
      data: "num",
      width: "30px",
      tips: false
    },
    {
      title: "任务名称",
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
      orderable: true,
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
      title: "创建时间",
      data: "starttime",
      name: "starttime",
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
            $(this).trigger({
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
            $(this).trigger({
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
            $(this).trigger({
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

layui.use(["layer", "form", "element", "laytpl"], function () {
  var layer = layui.layer,
    form = layui.form,
    element = layui.element,
    laytpl = layui.laytpl;

  //项目人员信息
  $("#uesr-btn").on("click", function () {
    var $this = $(this);
    var layerDom = $("#userInfo");
    layer.open({
      triggerEle: $this,
      title: "项目",
      type: 1,
      offset: "eb",
      content: layerDom,
      shade: 0.001,
      area: '320px',
      shadeClose: true,
      skin: 'user-layer',
      closeBtn: 1,
      resize: false,
      move: false,
    });
  });

  var userData = [{
    name: '张三',
    stortName: '张三',
    value: 1,
    role: '项目负责人'
  },
  {
    name: '张三',
    stortName: '张三',
    value: 2,
    role: '课题1负责人'
  },
  {
    name: '张三',
    stortName: '张三',
    value: 3,
    role: '课题2负责人'
  },
  {
    name: '张三',
    stortName: '张三',
    value: 4,
    role: ''
  },
  {
    name: '张三',
    stortName: '张三',
    value: 5,
    role: ''
  },
  {
    name: '张三',
    stortName: '张三',
    value: 6,
    role: ''
  },
  {
    name: '张三',
    stortName: '张三',
    value: 7,
    role: ''
  },
  {
    name: '张三',
    stortName: '张三',
    value: 8,
    role: ''
  }, {
    name: '张三',
    stortName: '张三',
    value: 9,
    role: ''
  }, {
    name: '张三',
    stortName: '张三',
    value: 10,
    role: ''
  }
  ];

  var userTpl = userList.innerHTML,
    userDom = document.getElementById('user—list');
  laytpl(userTpl).render(userData, function (html) {
    userDom.innerHTML = html;
  });

  $("#user—list").on("click", ".user-tool i", function () {
    var $this = $(this);
    var layerDom = $("#userPermission");
    layer.open({
      triggerEle: $this,
      title: "权限",
      type: 1,
      offset: "el",
      content: layerDom,
      shade: 0.001,
      area: '180px',
      shadeClose: true,
      skin: 'permission-layer',
      closeBtn: 1,
      resize: false,
      move: false,
    });
  });

  // 添加成员
  $("#addUser").on("click", function () {
    var layerDom = $("#shareLayer");
    layer.open({
      title: "选择联系人",
      type: 1,
      offset: "auto",
      content: layerDom,
      maxWidth: 596,
      maxHeight : 450,
      shade: 0.1,
      resize: false,
      shadeClose: true,
      closeBtn: 1,
      move: false,
    });
  });

  // 分享弹出层右侧层进
  (function () {
    var home = $(".share-right-select");
    var detail = $(".share-right-select-detail");
    var member = $(".share-right-select-member");
    home.on("click", ".share-right-select__list-item", function () {
      home.css("display", "none");
      detail.css("display", "block");
      member.css("display", "none");
    });
    detail.on("click", ".layui-icon-right", function () {
      home.css("display", "none");
      detail.css("display", "none");
      member.css("display", "block");
    });
    detail.on("click", ".layui-icon-left", function () {
      home.css("display", "block");
      detail.css("display", "none");
      member.css("display", "none");
    });
    member.on("click", ".layui-icon-left", function () {
      home.css("display", "none");
      detail.css("display", "block");
      member.css("display", "none");
    });
  })();
  // 分享弹出层搜索
  $("#shareSearch").on("click", function () {
    var $input = $(this).prev();
    var $icon = $(this);
    $input.show();
    $(this).hide();
    $input.focus();
    $input.blur(function () {
      $input.hide();
      $icon.show();
    });
  });

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
  $("#colsvis").on("click", function (e) {
    var layerDom = $(columnsVis);
    layer.open({
      triggerEle: $(this),
      title: "",
      type: 1,
      offset: "eb",
      content: layerDom,
      shade: 0.001,
      resize: false,
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
  // 外部按列降序
  $("#sortByEndtime").on("click", function () {
    var column = datatable.column("endtime:name");
    column.order('desc').draw();
  });

  // 项目资料操作
  $('.project-tool').on('click', function () {
    var $this = $(this);
    var layerDom = $("#projectDataTool");
    layer.open({
      triggerEle: $this,
      title: "",
      type: 1,
      offset: "eb",
      content: layerDom,
      shade: 0.001,
      resize: false,
      shadeClose: true,
      closeBtn: 0,
      move: false,
    });
  });

  //是否允许下载
  form.on("switch(switch-allow)", function (data) {
    console.log(data.elem.checked)
  });


});