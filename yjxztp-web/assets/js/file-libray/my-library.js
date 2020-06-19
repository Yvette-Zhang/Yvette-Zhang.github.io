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
          "size|0-40960000": 0,
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
          // 相关联
          "link|1": ["", "asdsa/asdasd/asdasd"],
          // 收藏
          star: "@boolean",
          // 失效、正常
          "status|1": ["invalid", "normal", "normal"],
          // 标签
          "tags|0-5": ["@color"],
        },
      ],
    });
    r(data.data);
  });
}
function createIcon(icon, type) {
  if (!icon) return "";
  if (type === "class") {
    return '<i class="layui-icon layui-icon-' + icon + '"></i>';
  }
  return '<i class="layui-icon">' + icon + "</i>";
}
function Button(text, theme, size, radius, icon) {
  if (!(text || icon)) return null;
  icon = icon || "";
  var textBtnClass = !text ? "layui-btn-text" : "";
  var baseClass = "layui-btn-";
  var themeClass = theme ? baseClass + theme : "";
  var sizeClass = size ? baseClass + size : "";
  var radiusClass = radius ? baseClass + "radius" : "";
  var iconType = icon[0] === "&" ? "" : "class";
  var BtnClass =
    "layui-btn datatable-btn " +
    themeClass +
    " " +
    sizeClass +
    " " +
    radiusClass +
    " " +
    textBtnClass;
  return $(
    "<button class='" +
      BtnClass +
      "'>" +
      createIcon(icon, iconType) +
      text +
      "</button>"
  );
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
    columnDefs: [
      { orderable: false, targets: "_all" },
      {
        orderable: false,
        className: "select-checkbox",
        targets: 0,
        render() {
          return '<input type="checkbox" lay-skin="primary">';
        },
      },
    ],
    createdRow(row, data, dataIndex) {
      // 状态 class
      $(row).addClass(`datatable-status-${data.status}`);
      $(row).addClass(data.top ? "datatable-status-top" : "");
    },
    tips: true,
    select: {
      style: "multi",
      selector: "td:first-child",
    },
    columns: [
      {
        title:
          '<input lay-filter="selectall" type="checkbox" lay-skin="primary">',
        defaultContent: "",
        width: "20px",
      },
      {
        title: "文件",
        data: "name",
        width: "200px",
        render(data, type, d) {
          return `
          <div class="file-box ${d.floder ? "file-box--isfloder" : ""}">
            <img class="file-box__icon" src="https://dummyimage.com/60x70/000/fff" alt="">
            <div class="file-box__content">
              <div class="file-box__content__name">${d.name}</div>
              <div class="file-box__content__mate">
                ${
                  d.share
                    ? '<i class="layui-icon layui-icon-share"></i>已分享'
                    : '<div class="file-box__no-share"></div>'
                }
              </div>
            </div>
          </div>
          `;
        },
      },
      {
        // 操作
        title: "",
        defaultContent: "",
        className: "datatable-visibility",
        createdCell(cell, cellData, rowData, rowIndex, colIndex) {
          const historyBtn = new Button("", "primary", "sm", false, "time");
          historyBtn.on("click", function (e) {
            e.preventDefault();
            $(this).trigger(
              {
                type: "historyClick",
                cell,
                el: historyBtn,
              },
              rowData
            );
          });
          const moreBtn = new Button("", "primary", "sm", false, "more");
          moreBtn.on("click", function (e) {
            e.preventDefault();
            $(this).trigger(
              {
                type: "moreClick",
                cell,
                el: moreBtn,
              },
              rowData
            );
          });
          const startBtn = new Button("", "primary", "sm", false, "star");
          startBtn.on("click", function (e) {
            e.preventDefault();
            $(this).trigger(
              {
                type: "starClick",
                cell,
                el: startBtn,
              },
              rowData
            );
          });
          const unstartBtn = new Button(
            "",
            "primary",
            "sm",
            false,
            "star-fill"
          );
          unstartBtn.on("click", function (e) {
            e.preventDefault();
            $(this).trigger(
              {
                type: "unstarClick",
                cell,
                el: unstartBtn,
              },
              rowData
            );
          });
          const buttons = [historyBtn, moreBtn];
          if (rowData.star) {
            buttons.push(unstartBtn);
          } else {
            buttons.push(startBtn);
          }
          $(cell).append(buttons);
        },
      },
      {
        // 标签
        title: "",
        data: "tags",
        defaultContent: "",
        width: "20px",
        render: function () {
          return "";
        },
        createdCell(cell, cellData) {
          const tagsContainer = $('<div class="filetable-tag"></div>');
          cellData.forEach((item, index) => {
            tagsContainer.append(
              $(
                `<div class="filetable-tag-item" style="background: ${item};right: ${
                  (index + 1) * 5
                }px;"></div>`
              )
            );
          });
          $(cell).append(tagsContainer);
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
        type: "number",
        render(data, type) {
          if (type === "sort") {
            return data;
          }
          var fileSize = data || 0;
          if (fileSize < 1024) {
            return fileSize + "B";
          } else if (fileSize < 1024 * 1024) {
            var temp = fileSize / 1024;
            temp = temp.toFixed(2);
            return temp + "KB";
          } else if (fileSize < 1024 * 1024 * 1024) {
            var temp = fileSize / (1024 * 1024);
            temp = temp.toFixed(2);
            return temp + "MB";
          } else {
            var temp = fileSize / (1024 * 1024 * 1024);
            temp = temp.toFixed(2);
            return temp + "GB";
          }
        },
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
        // 默认隐藏
        visible: false,
      },
    ],
  });
});

layui.use(["layer", "form", "element", "laydate"], function () {
  var layer = layui.layer,
    form = layui.form,
    laydate = layui.laydate;
  var datatable = tableEl.DataTable();
  form.render();
  form.on("checkbox(selectall)", function (data) {
    var checkbox = $("#my-library-table tbody .select-checkbox input");
    if (data.elem.checked) {
      datatable.rows().select();
      $.each(checkbox, function (i, v) {
        v.checked = true;
      });
    } else {
      datatable.rows().deselect();
      $.each(checkbox, function (i, v) {
        v.checked = false;
      });
    }
    form.render();
  });
  // 获取所选项
  // datatable.rows({ selected: true });
  // 监听操作栏按钮点击
  tableEl.on("historyClick", function (e, data) {
    layer.msg("历史" + JSON.stringify(data));
  });
  tableEl.on("moreClick", function (e, data) {
    layer.msg("更多" + JSON.stringify(data));
  });
  tableEl.on("starClick", function (e, data) {
    layer.msg("收藏" + JSON.stringify(data));
  });
  tableEl.on("unstarClick", function (e, data) {
    layer.msg("取消收藏" + JSON.stringify(data));
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
  // 分享弹出层
  $("#share").on("click", function () {
    var layerDom = $("#shareLayer");
    layer.open({
      title: "分享给成员",
      type: 1,
      offset: "auto",
      content: layerDom,
      maxWidth: 596,
      shade: 0.1,
      shadeClose: true,
      closeBtn: 0,
      move: false,
    });
  });
  // 日期选择器
  laydate.render({
    elem: "#date",
  });
  (function () {
    let home = $(".share-right-select");
    let detail = $(".share-right-select-detail");
    let member = $(".share-right-select-member");
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
});
