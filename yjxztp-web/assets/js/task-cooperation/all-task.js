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
    "<button class='" + BtnClass + "'>" + createIcon(icon) + text + "</button>",
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
                rowData,
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
                rowData,
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
                rowData,
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

layui
  .config({
    base: "../../assets/plugins/layui/layui_exts/dropDown/",
  })
  .use(["layer", "form", "laydate", "dropDown"], function () {
    var layer = layui.layer,
      form = layui.form,
      laydate = layui.laydate,
      dropDown = layui.dropDown;
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

    laydate.render({
      elem: "#startTime",
    });
    laydate.render({
      elem: "#endTime",
    });

    //创建任务

    var creatTasklayerDom = $("#creatTaskWin");

    var creatTasklayer;
    $("#creatTask").on("click", function (e) {
      e.stopPropagation();

      creatTasklayer = layer.open({
        title: "创建任务",
        type: 1,
        anim: 0,
        shadeClose: true,
        shade: 0.1,
        offset: "50px",
        area: "680px",
        zIndex: "99",
        content: creatTasklayerDom,
        move: false,
        success: function (layero) {
          //layer.setTop(layero);
        },
      });
    });

    ClassicEditor.create(document.querySelector("#editor"), {
      toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "numberedList",
        "bulletedList",
        "imageUpload",
      ],
      language: "zh-cn",
    })
      .then((editor) => {
        window.editor2 = editor;
      })
      .catch((err) => {
        console.error(err.stack);
      });

    //展开
    $("#creatTaskWin").on("click", "#moreBtn", function () {
      $(this).hide();
      $("#creatTaskWin .layui-form-hide").show();
      $("#packUpBtn").show();
      $(".add-subtasks").show();

      changeCreatTasklayer();
    });

    // 重新计算弹出窗口的高度
    function changeCreatTasklayer(type) {
      var bodyH = document.body.clientHeight;
      var layerH = $("#layui-layer" + creatTasklayer).height();
      if (type == "up") {
        $("#layui-layer" + creatTasklayer)
          .find(".layui-layer-content")
          .css("height", "auto");
        return;
      }
      if (layerH > bodyH - 100) {
        var layerConH = bodyH - 100 - 52;
        $("#layui-layer" + creatTasklayer)
          .find(".layui-layer-content")
          .height(layerConH);
      }
    }

    //收起
    $("#packUpBtn").on("click", function () {
      $(this).hide();
      $("#creatTaskWin .layui-form-hide").hide();
      $("#moreBtn").show();
      $(".add-subtasks").hide();
      changeCreatTasklayer("up");
    });

    //切换任务状态
    $("#taskType").on("click", function (e) {
      e.stopPropagation();
      var dropdownData = [
        {
          type: 1,
          title: "未完成",
        },
        {
          type: 2,
          title: "已完成",
        },
      ];
      var $this = $(this);
      dropDown.render({
        ele: $this, // 绑定下拉菜单的元素 （jq对象）
        position: "bottom", // 下拉菜单定位 默认 bottom 类型：top、left、right、bottom
        className: "notice-drop", //自定义class 可根据此class自定义样式 默认为 空
        zIndex: 1999, // 下拉层级 默认值999
        data: dropdownData, // 下拉菜单的数据
        template: function (data) {
          var ele = "";
          if (data.title == "未完成") {
            ele = `<label class="task-type-icon un-done"></label>${data.title}`;
          } else {
            ele = `<label class="task-type-icon done"></label>${data.title}`;
          }

          return ele;
        },
        choose: function (data) {
          // 点击回调
          var str;
          if (data.title == "未完成") {
            str = `<label class="task-type-icon un-done"></label>${data.title}`;
            $this.children("span").html(str);
          } else {
            str = `<label class="task-type-icon done"></label>${data.title}`;
            $this.children("span").html(str);
          }
        },
      });
    });

    //切换
    $("#priorityType").on("click", function (e) {
      e.stopPropagation();
      var dropdownData = [
        {
          type: 1,
          bgColor: "#616874",
          title: "较低",
        },
        {
          type: 2,
          bgColor: "#46C5B2",
          title: "普通",
        },
        {
          type: 3,
          bgColor: "#F5AE44",
          title: "紧急",
        },
        {
          type: 4,
          bgColor: "#FB3C35",
          title: "非常紧急",
        },
      ];
      var $this = $(this);
      dropDown.render({
        ele: $this, // 绑定下拉菜单的元素 （jq对象）
        position: "bottom", // 下拉菜单定位 默认 bottom 类型：top、left、right、bottom
        className: "priority-drop", //自定义class 可根据此class自定义样式 默认为 空
        zIndex: 1999, // 下拉层级 默认值999
        data: dropdownData, // 下拉菜单的数据
        template: function (data) {
          var ele = `<label class="priority-type" style="background-color: ${data.bgColor}">${data.title}</label>`;
          return ele;
        },
        choose: function (data) {
          // 点击回调

          var str = `<label class="priority-type" style="background-color: ${data.bgColor}">${data.title}</label>`;

          $this.children("span").html(str);
        },
      });
    });

    //设置子任务的可编辑状态
    function subtasksEdit() {
      $(".subtasks-item")
        .find(".subtasks-title-text")
        .attr("contenteditable", "false");
      $(".subtasks-item.subtasks-item-edit")
        .find(".subtasks-title-text")
        .attr("contenteditable", "true");
    }
    subtasksEdit();

    $(".subtasksBox").on("focus", ".subtasks-title-text", function () {
      $(this).next().hide();
    });
    $(".subtasksBox").on("blur", ".subtasks-title-text", function () {
      if (!$(this).text()) {
        $(this).next().show();
      }
    });

    //添加子任务
    $("#createAddSubtasksBtn").on("click", function () {
      $("#creatTaskWin .subtasksBox").show();
    });

    //关联任务
    $("#createAddTasksBtn").on("click", function () {
      $("#creatTaskWin .associated-files-box").show();
    });

    //初始化判断是否显示Placeholder
    function isPlaceholder() {
      $(".subtasksBox .subtasks-title-text").each(function () {
        if ($(this).text()) {
          $(this).next().hide();
        }
      });
    }
    isPlaceholder();

    //选择日期
    $(".subtasks-date-btn").each(function () {
      var $this = $(this),
        id = $this.attr("id");
      laydate.render({
        elem: "#" + id,
        format: "yyyy年MM月dd日 HH:mm",
        type: "datetime",
        trigger: "click",

        done: function (value) {
          if (!value) {
            $this.next().show();
          } else {
            $this.next().hide();
          }
        },
      });
    });

    //设置焦点位置
    function keepLastIndex(obj) {
      if (window.getSelection) {
        //ie11 10 9 ff safari
        obj.focus(); //解决ff不获取焦点无法定位问题
        var range = window.getSelection(); //创建range
        range.selectAllChildren(obj); //range 选择obj下所有子内容
        range.collapseToEnd(); //光标移至最后
      } else if (document.selection) {
        //ie10 9 8 7 6 5
        var range = document.selection.createRange(); //创建选择对象
        //var range = document.body.createTextRange();
        range.moveToElementText(obj); //range定位到obj
        range.collapse(false); //光标移至最后
        range.select();
      }
    }

    //子任务下拉菜单
    var oldText = "";

    $(".subtasksBox").on("click", ".subtasks-drop-menu", function () {
      var $this = $(this);
      var dropdownData = [
        {
          type: 1,
          icon: "bianji",
          title: "编辑",
        },
        {
          type: 2,
          icon: "shanchu",
          title: "删除",
        },
      ];

      dropDown.render({
        ele: $this,
        position: "bottom",
        className: "subtasks-drop-menu",
        zIndex: 1999,
        showIcon: true,
        iconType: "font_family icon",
        data: dropdownData,

        choose: function (data) {
          var parentsEle = $this.parents(".subtasks-item");
          if (data.title == "编辑") {
            parentsEle.addClass("subtasks-item-edit");
            subtasksEdit();
            oldText = parentsEle.find(".subtasks-title-text").text();
            parentsEle.find(".subtasks-title-text").focus();

            keepLastIndex(parentsEle.find(".subtasks-title-text").get(0));
          }
        },
      });
    });

    //子任务保存
    $(".subtasksBox").on("click", ".subtasks-add", function () {
      var $this = $(this),
        parentEle = $this.parents(".subtasks-item"),
        subtasksLength = $this.parents(".subtasksBox").find(" .subtasks-item")
          .length;
      if (parentEle.find(".subtasks-title-text").text()) {
        parentEle.removeClass("subtasks-item-edit");
      }

      if (
        parentEle.find(".subtasks-title-text").text() &&
        subtasksLength == parentEle.index() + 1
      ) {
        var eleStr = `<div class="subtasks-item subtasks-item-edit">
            <div class="subtasks-check">
              <input type="checkbox" lay-skin="primary">
            </div>

            <div class="subtasks-title">
              <div class="subtasks-title-warp">
                <p class="subtasks-title-text"></p>
                <span class="subtasks-title-placeholder">输入子任务内容...</span>
              </div>

              <div class="subtasks-operat">
                <a class="layui-btn layui-btn-sm layui-btn-primary subtasks-cancel">取消</a>
                <a class="layui-btn layui-btn-sm layui-btn-shadow subtasks-add">保存</a>
              </div>
            </div>

            <div class="subtasks-date">
              <div class="subtasks-date-btn" id="subtasksData1"></div>
              <div class="subtasks-date-icon">
                <i class="font_family icon-rili"></i>
              </div>
            </div>
            <div class="avatar-box">
              <span class="layui-avatar layui-avatar-sm">
                <span class="layui-avatar-text">王二</span>
              </span>
            </div>
            <div class="subtasks-drop">
              <a class="layui-btn layui-btn-text layui-btn-primary subtasks-drop-menu"
                data-dropdown="subtasks-drop-menu1">
                <i class="font_family icon-xia"></i>
              </a>
            </div>
          </div>`;
        $(".subtasksBox").append(eleStr);
        form.render();
        subtasksEdit();
        $(".subtasksBox")
          .children(".subtasks-item.subtasks-item-edit:last-child")
          .find(".subtasks-title-text")
          .focus();
        return;
      }
      subtasksEdit();
    });

    //子任务取消
    $(".subtasksBox").on("click", ".subtasks-cancel", function () {
      var $this = $(this),
        parentEle = $this.parents(".subtasks-item"),
        subtasksLength = $this.parents(".subtasksBox").find(".subtasks-item")
          .length;
      var text = parentEle.find(".subtasks-title-text").text();
      if (oldText) {
        parentEle.removeClass("subtasks-item-edit");
        parentEle.find(".subtasks-title-text").text(oldText);
      }
      if (!oldText && subtasksLength == parentEle.index() + 1) {
        parentEle.remove();
      }
      subtasksEdit();
    });

    // 查看任务
    ClassicEditor.create(document.querySelector("#editor2"), {
      toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "numberedList",
        "bulletedList",
        "imageUpload",
      ],
      language: "zh-cn",
    })
      .then((editor) => {
        window.editor2 = editor;
      })
      .catch((err) => {
        console.error(err.stack);
      });
    var showTasklayer;
    var showTaskDom = $("#showTaskWin");
    $("#showTask").on("click", function (e) {
      //alert(1);
      e.stopPropagation();

      showTasklayer = layer.open({
        title: "",
        type: 1,
        anim: 0,
        shadeClose: true,
        shade: 0.1,
        offset: "50px",
        area: "1200px",
        skin: "layer-showTask",
        zIndex: "99",
        content: showTaskDom,
        closeBtn: 0,
        move: false,
        resize: false,
        success: function (layero) {
          var userObj = [
            { id: 1, name: "老大", sName: "老大" },
            { id: 2, name: "老大", sName: "老大" },
            { id: 3, name: "老大", sName: "老大" },
            { id: 4, name: "老大", sName: "老大" },
            { id: 5, name: "老大", sName: "老大" },
            { id: 6, name: "老大", sName: "老大" },
            { id: 7, name: "老大", sName: "老大" },
            { id: 8, name: "老大", sName: "老大" },
            { id: 9, name: "老大", sName: "老大" },
            { id: 10, name: "老大", sName: "老大" },
          ];

          var at_config = {
            at: "@", //触发字符
            data: userObj, //数据 json格式
            headerTpl: "", // 弹出菜单的标题
            insertTpl: "<span data-userId=${id}>@${name}&nbsp;</span>", // 选中菜单显示的内容
            displayTpl:
              '<li><span class="layui-avatar layui-avatar-sm"><span class="layui-avatar-text">${sName}</span></span>${name}</li>', // 这个是显示的弹出菜单里面的内容
            searchKey: "name", // 搜索键匹配的值
            startWithSpace: false, // 是否匹配at之前的空格 默认为true
            limit: 200, // 弹出菜单显示的条目数
            callbacks: {},
          };

          var ifr = low$("#taskIframeEdit")[0],
            doc = ifr.contentDocument || iframe.contentWindow.document,
            ifrBody;
          if ((ifrBody = doc.body) == null) {
            doc.write("<body></body>");
            ifrBody = doc.body;
          }
          ifrBody.contentEditable = true;
          ifrBody.id = "ifrBody";
          ifrBody.style.cssText =
            "padding: 3px 10px; margin: 0;box-sizing: border-box;font-size: 14px;color: #212832";
          ifrBody.innerHTML = "";

          low$(ifrBody).atwho("setIframe", ifr).atwho(at_config);
          $(ifrBody).blur(function () {
            if ($(this).text().trim()) {
              $(".comment-input-placeholder").hide();
            } else {
              $(".comment-input-placeholder").show();
            }
          });
          $(ifrBody).focus(function () {
            $(".comment-input-placeholder").hide();
          });
        },
      });
    });

    //按钮tips提示
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
