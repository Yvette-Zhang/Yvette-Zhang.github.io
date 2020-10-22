// 模拟数据
function MockData(){
  return new Promise((r,j) => {
    var data = Mock.mock({
      "data|10":[
        {
          "id|+1": 0,
          "name|1":"@ctitle(3,40)",
          "uploadtime|1": "@datetime",
          "link|1":["项目1","项目1/课题2项目1/课题2项目1/课题2项目1/课题2","项目2/课题3","项目2/课题1"],
          "summary|1":"@csentence(10,40)",
          // 收藏
          star: "@boolean",
          "publicTag|5": [
            {
              color: "@color",
              name: "@ctitle(3,5)",
            },
          ],
          // 文件类型，other 为其他文件
          "type|1": [
            "word",
            "ppt",
            "excel",
            "pdf",
            "image",
            "audio",
            "video",
            "other",
            "floder",
          ],
        }
      ]
    });
    r(data.data);
  });
}
function createIcon(icon, type) {
  if (!icon) return "";
  if (type === "class") {
    return '<i class="font_family icon-' + icon + '"></i>';
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
var tableEl = $("#search-result-table");
MockData().then(function(data){
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
      // $(row).addClass(`datatable-status-${data.status}`);
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
        width: "30px",
      },
      {
        // 操作
        title: "",
        tips: false,
        defaultContent: "",
        width: "30px",
        createdCell(cell, cellData, rowData, rowIndex, colIndex) {
          const startBtn = new Button("", "primary", "sm", false, "shoucang1");
          startBtn.attr("data-tips", "收藏");
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
          const unstartBtn = new Button("", "primary", "sm", false, "shoucang");
          unstartBtn.attr("data-tips", "取消收藏");
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
          const buttons = [];
          if (rowData.star) {
            buttons.push(unstartBtn);
          } else {
            buttons.push(startBtn);
          }
          $(cell).append(buttons);
        },
      },
      {
        title: "文件",
        data: "name",
        tips:true,
        width: "40%",
        render(data, type, d) {
          // 图标，根据 data.type 判断
          const iconList = {
            word: "W",
            ppt: "ppt",
            excel: "exl",
            pdf: "pdf",
            image: "jpg",
            audio: "yinle",
            video: "shipin",
            other: "weizhi",
            floder: "wenjianjia",
          };
          return `
          <div class="file-box ${d.floder ? "file-box--isfloder" : ""}">
            <svg class="icon file-box__icon" aria-hidden="true">
              <use xlink:href="#icon-${iconList[d.type]}"></use>
            </svg>
            </svg>
            <div class="file-box__content">
              <div class="file-box__content__name">${d.name}</div>
            </div>
          </div>
          `;
        },
      },
      {
        title: "",
        defaultContent: "",
        tips: false,
        width:"20px"
      },
      {
        title: "所属项目",
        data: "link",
        name: "link",
        tips: true,
        width:"15%"
      },
      // 公有标签
      {
        title: "公有标签",
        data: "publicTag",
        name: "publicTag",
        tips: false,
        width:"30%",
        className: "public-tag-cell",
        render: function () {
          return "";
        },
        createdCell(cell, cellData) {
          const tagsContainer = $('<div class="filetable-tag"></div>');
          cellData.forEach((item, index) => {
            tagsContainer.append(
              $(
                `<div class="filetable-tag-item filetable-tag-item--public" style="background: ${
                  item.color
                };right: ${(index + 1) * 5}px;">${item.name}</div>`
              )
            );
          });
          $(cell).append(tagsContainer);
        },
      },
      {
        title: "",
        defaultContent: "",
        tips: false,
        width:"10px"
      },
      {
        title: "上传时间",
        data: "uploadtime",
        name: "uploadtime",
        orderable: false,
        width:"200px"
      },
    ],
  })
}) 

layui.config({
  base: "../../assets/plugins/layui/layui_exts/dropDown/",
}).use(
  ["layer", "form", "element", "laydate", "dropDown", "tree", "laytpl"],
  function(){
    var layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate,
        dropDown = layui.dropDown,
        tree = layui.tree,
        laytpl = layui.laytpl;
        var datatable = tableEl.DataTable();
        // 表格复选框选
        form.render();
        form.on("checkbox(selectall)", function (data) {
          var checkbox = $("#search-result-table tbody .select-checkbox input");
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
    // 收藏
    tableEl.on("starClick", function (e, data) {
      layer.msg("收藏" + JSON.stringify(data));
    });
    tableEl.on("unstarClick", function (e, data) {
      layer.msg("取消收藏" + JSON.stringify(data));
    });
  }
)