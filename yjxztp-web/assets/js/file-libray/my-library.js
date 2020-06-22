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
          "tags|0-3": ["@color"],
          "publicTag|0-3": ["@ctitle(3,5)"],
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
        },
      ],
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
        width: "30px",
      },
      {
        title: "文件",
        data: "name",
        width: "200px",
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
        tips: false,
        defaultContent: "",
        width: "100px",
        className: "datatable-visibility",
        createdCell(cell, cellData, rowData, rowIndex, colIndex) {
          const historyBtn = new Button(
            "",
            "primary",
            "sm",
            false,
            "lishibanben"
          );
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
          const moreBtn = new Button("", "primary", "sm", false, "gengduo");
          moreBtn.attr("data-dropdown", "more" + rowData.id);
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
          const startBtn = new Button("", "primary", "sm", false, "shoucang1");
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
        tips: false,
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
        title: "公有标签",
        data: "publicTag",
        name: "publicTag",
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

layui
  .config({
    base: "../../assets/plugins/layui/layui_exts/dropDown/",
  })
  .use(
    ["layer", "form", "element", "laydate", "dropDown", "tree", "laytpl"],
    function () {
      var layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate,
        dropDown = layui.dropDown,
        tree = layui.tree,
        laytpl = layui.laytpl;
      var datatable = tableEl.DataTable();
      // 文件夹数据
      var floderTreeData = [
        {
          title: "usr",
          id: 1,
          spread: true,
          children: [
            {
              title: "二级1-1",
              id: 3,
              href: "https://www.layui.com/doc/",
              children: [
                {
                  title: "三级1-1-3",
                  id: 23,
                  children: [
                    {
                      title: "四级1-1-3-1",
                      id: 24,
                      children: [
                        {
                          title: "五级1-1-3-1-1",
                          id: 30,
                        },
                        {
                          title: "五级1-1-3-1-2",
                          id: 31,
                        },
                      ],
                    },
                  ],
                },
                {
                  title: "三级1-1-1",
                  id: 7,
                  checked: true,
                  children: [
                    {
                      title: "四级1-1-1-1",
                      id: 15,
                      //,checked: true
                      href:
                        "https://www.layui.com/doc/base/infrastructure.html",
                    },
                  ],
                },
                {
                  title: "三级1-1-2",
                  id: 8,
                  children: [
                    {
                      title: "四级1-1-2-1",
                      id: 32,
                    },
                  ],
                },
              ],
            },
            {
              title: "二级1-2",
              id: 4,
              spread: true,
              children: [
                {
                  title: "三级1-2-1",
                  id: 9,
                  checked: true,
                  disabled: true,
                },
                {
                  title: "三级1-2-2",
                  id: 10,
                },
              ],
            },
            {
              title: "二级1-3",
              id: 20,
              children: [
                {
                  title: "三级1-3-1",
                  id: 21,
                },
                {
                  title: "三级1-3-2",
                  id: 22,
                },
              ],
            },
          ],
        },
        {
          title: "var",
          id: 2,
          children: [
            {
              title: "db",
              id: 5,
              spread: true,
              children: [
                {
                  title: "dyld",
                  id: 11,
                },
                {
                  title: "efw_cache",
                  id: 12,
                },
              ],
            },
            {
              title: "log",
              id: 6,
              children: [
                {
                  title: "Bluetooth",
                  id: 13,
                },
                {
                  title: "apache2",
                  id: 14,
                },
              ],
            },
          ],
        },
        {
          title: "home",
          id: 16,
          children: [
            {
              title: "root",
              id: 17,
              fixed: true,
              disabled: true,
              children: [
                {
                  title: "desktop",
                  id: 18,
                },
                {
                  title: ".ssh",
                  id: 19,
                },
              ],
            },
            {
              title: "kejun",
              id: 27,
              children: [
                {
                  title: "desktop",
                  id: 28,
                },
                {
                  title: ".ssh",
                  id: 29,
                },
              ],
            },
          ],
        },
      ];
      // 表格复选框选
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
      // 分享成员
      var shareUser = [
        { name: "张三", stortName: "张三" },
        { name: "张三", stortName: "张三" },
        { name: "张三", stortName: "张三" },
        { name: "张三", stortName: "张三" },
        { name: "张三", stortName: "张三" },
        { name: "张三", stortName: "张三" },
        { name: "张三", stortName: "张三" },
        { name: "张三", stortName: "张三" },
        { name: "张三", stortName: "张三" },
        { name: "张三", stortName: "张三" },
        { name: "张三", stortName: "张三" },
        { name: "张三", stortName: "张三" },
        { name: "张三", stortName: "张三" },
      ];
      var userTpl = userList.innerHTML,
        userDom = document.getElementById("user—list");
      laytpl(userTpl).render(shareUser, function (html) {
        userDom.innerHTML = html;
      });
      // 表格下拉菜单
      var dropDownData = [
        {
          type: 1,
          title: "置顶",
          icon: "zhiding",
        },
        { type: 2, title: "取消置顶", icon: "quxiaozhiding" },
        { type: 3, title: "删除", icon: "shanchu" },
        { type: 4, title: "导出", icon: "xiazai" },
        { type: 5, title: "评论", icon: "pinglun", arrow: true },
        {
          type: 6,
          title: "查看评论",
          icon: "pinglun",
          arrow: true,
        },
        {
          type: 7,
          title: "查看分享成员",
          icon: "chakanfenxiangchengyuan",
        },
        { type: 8, title: "重命名", icon: "bianji" },
        { type: 9, title: "移动到", icon: "yidongdao" },
      ];
      tableEl.on("moreClick", function (e, data) {
        var ele = $(e.el);
        var dropDownEle = dropDown.render({
          ele: ele,
          position: "bottom",
          className: "my-drop",
          showIcon: true,
          iconType: "font_family icon",
          zIndex: 1999,
          clickClose: true,
          mouseleaveClose: false,
          data: dropDownData,
          clickClose: false,
          // bodyClose: false,
          choose: function (dropData) {
            // 查看分享成员
            if (dropData.type === 7) {
              var layerDom = $("#userInfo");
              var item = dropData.el || ele;
              layer.open({
                triggerEle: item,
                title: false,
                type: 1,
                offset: "er",
                content: layerDom,
                shade: 0.001,
                area: "270px",
                shadeClose: true,
                skin: "user-layer",
                closeBtn: 0,
                resize: false,
                move: false,
                success: function () {
                  var el = $(this.content).parent().parent();
                  el.on("click", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                  });
                },
                end() {
                  dropDownEle.destroy();
                },
              });
            }
            // 移动到弹出框
            else if (dropData.type === 9) {
              var layerDom = $("#addTo");
              var item = dropData.el || ele;
              layer.open({
                title: "将'某某文件.exe'添加到...",
                triggerEle: item,
                type: 1,
                offset: "er",
                content: layerDom,
                maxWidth: 400,
                shade: 0.001,
                shadeClose: true,
                closeBtn: 0,
                move: false,
                resize: false,
                success() {
                  var el = $(this.content).parent().parent();
                  // 选中的节点
                  var selectNode = null;
                  el.on("click", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                  });
                  tree.render({
                    elem: "#addToTree",
                    data: floderTreeData,
                    id: "demoId1",
                    parentIcon: true,
                    iconPrefix: "layui-icon font_family icon-",
                    iconMap: {
                      add: "xinjianwenjianjialanicon",
                      del: "shanchu",
                      update: "bianji",
                      file: "wenjianjia",
                    },
                    edit: ["add", "update", "del"],
                    click: function (obj) {
                      var baseClass = "layui-tree-entry--select";
                      var currNode = $(obj.elem).find(
                        ".layui-tree-entry:first"
                      );
                      var allNode = $("#addToTree")
                        .find(".layui-tree-entry")
                        .not(currNode);
                      allNode.removeClass(baseClass);
                      currNode.toggleClass(baseClass);
                      if (currNode.hasClass(baseClass)) {
                        // 设置选中节点
                        selectNode = obj;
                      } else {
                        // 取消选中
                        selectNode = null;
                      }
                    },
                  });
                  // 设置按钮事件
                  $("#addToSubmit")[0].onclick = function () {
                    console.log(selectNode);
                  };
                },
                end() {
                  dropDownEle.destroy();
                  $("#addToSubmit")[0].onclick = null;
                },
              });
            } else if (dropData.type === 5 || dropData.type === 6) {
              var layerDom = $("#comment");
              var title;
              if (dropData.type === 5) {
                layerDom.find(".comment-form").show();
                title = "评论";
              } else {
                layerDom.find(".comment-form").hide();
                title = "查看评论";
              }
              var item = dropData.el || ele;
              layer.open({
                title: title,
                triggerEle: item,
                type: 1,
                offset: "er",
                content: layerDom,
                maxWidth: 400,
                shade: 0.001,
                shadeClose: true,
                closeBtn: 0,
                move: false,
                resize: false,
                success: function () {
                  var el = $(this.content).parent().parent();
                  el.on("click", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                  });
                },
              });
            } else {
              dropDownEle.destroy();
            }
          },
        });
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
          resize: false,
        });
      });
      // 切换列显隐
      form.on("switch", function (data) {
        var column = datatable.column(
          $(data.elem).attr("data-column") + ":name"
        );
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
          closeBtn: 1,
        });
      });
      // 日期选择器
      laydate.render({
        elem: "#date",
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
      // 上传文件弹出层
      $("#uploadBtn").on("click", function () {
        var layerDom = $("#addTo");
        layer.open({
          title: "上传文件",
          type: 1,
          offset: "auto",
          content: layerDom,
          maxWidth: 400,
          shade: 0.1,
          shadeClose: true,
          move: false,
          closeBtn: 1,
          success() {
            //数据源
            var selectNode = null;

            tree.render({
              elem: "#addToTree",
              data: floderTreeData,
              id: "demoId1",
              parentIcon: true,
              iconPrefix: "layui-icon font_family icon-",
              iconMap: {
                add: "xinjianwenjianjialanicon",
                del: "shanchu",
                update: "bianji",
                file: "wenjianjia",
              },
              edit: ["add", "update", "del"],
              click: function (obj) {
                var baseClass = "layui-tree-entry--select";
                var currNode = $(obj.elem).find(".layui-tree-entry:first");
                var allNode = $("#addToTree")
                  .find(".layui-tree-entry")
                  .not(currNode);
                allNode.removeClass(baseClass);
                currNode.toggleClass(baseClass);
                if (currNode.hasClass(baseClass)) {
                  // 设置选中节点
                  selectNode = obj;
                } else {
                  // 取消选中
                  selectNode = null;
                }
                console.log(selectNode);
              },
            });
            // 设置按钮事件
            $("#addToSubmit")[0].onclick = function () {
              var $input = $("#uploadFileInput");
              $input.click();
              $input.on("change", function (e) {
                console.log(e);
              });
            };
          },
          end() {
            // 取消按钮事件
            $("#addToSubmit")[0].onclick = null;
          },
        });
      });
      // 添加至文件夹
      $("#addToFloderBtn").on("click", function () {
        var layerDom = $("#addTo");
        layer.open({
          title: "将'某某文件.exe'添加到...",
          type: 1,
          content: layerDom,
          maxWidth: 400,
          shade: 0.1,
          shadeClose: true,
          move: false,
          closeBtn: 1,
          resize: false,
          success() {
            var el = $(this.content).parent().parent();
            // 选中的节点
            var selectNode = null;
            el.on("click", function (e) {
              e.stopPropagation();
              e.preventDefault();
            });
            tree.render({
              elem: "#addToTree",
              data: floderTreeData,
              id: "demoId1",
              parentIcon: true,
              iconPrefix: "layui-icon font_family icon-",
              iconMap: {
                add: "xinjianwenjianjialanicon",
                del: "shanchu",
                update: "bianji",
                file: "wenjianjia",
              },
              edit: ["add", "update", "del"],
              click: function (obj) {
                var baseClass = "layui-tree-entry--select";
                var currNode = $(obj.elem).find(".layui-tree-entry:first");
                var allNode = $("#addToTree")
                  .find(".layui-tree-entry")
                  .not(currNode);
                allNode.removeClass(baseClass);
                currNode.toggleClass(baseClass);
                if (currNode.hasClass(baseClass)) {
                  // 设置选中节点
                  selectNode = obj;
                } else {
                  // 取消选中
                  selectNode = null;
                }
              },
            });
            // 设置按钮事件
            $("#addToSubmit")[0].onclick = function () {
              console.log(selectNode);
            };
          },
          end() {
            $("#addToSubmit")[0].onclick = null;
          },
        });
      });
    }
  );
