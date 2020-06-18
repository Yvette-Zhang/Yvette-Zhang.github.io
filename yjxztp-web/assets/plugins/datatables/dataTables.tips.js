/**
 * dataTables tips
 * 依赖 layui.layer.tips
 *
 */
(function (factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define(["jquery", "datatables.net"], function ($) {
      return factory($, window, document);
    });
  } else if (typeof exports === "object") {
    // CommonJS
    module.exports = function (root, $) {
      if (!root) {
        root = window;
      }

      if (!$ || !$.fn.dataTable) {
        $ = require("datatables.net")(root, $).$;
      }

      return factory($, root, root.document);
    };
  } else {
    // Browser
    factory(jQuery, window, document);
  }
})(function ($, window, document) {
  "use strict";
  var DataTable = $.fn.dataTable;
  var Tips = function (dt, init) {
    var dtSettings = new $.fn.dataTable.Api(dt).settings()[0];
    var that = this;
    layui.use("layer", function () {
      var layer = layui.layer;
      that.s = {
        dt: dtSettings,
        layer: layer,
      };
      if (!dtSettings._bInitComplete) {
        dtSettings.oApi._fnCallbackReg(
          dtSettings,
          "aoInitComplete",
          function () {
            that.fnConstruct();
          },
          "Tips"
        );
      } else {
        that.fnConstruct();
      }
    });
  };
  $.extend(Tips.prototype, {
    fnConstruct: function () {
      var rows = this.s.dt.aoData;
      var cols = this.s.dt.aoColumns;
      var layer = this.s.layer;
      var dataTable = $(this.s.dt.nTable).dataTable().api();
      var tips_index;
      function initEvent() {
        rows.forEach(function (r) {
          r.anCells.forEach(function (c, k) {
            $([c, cols[k].nTh]).on({
              mouseover: function mouseover() {
                // 判断列设置和是否溢出
                if (
                  cols[k].tips === false ||
                  this.clientWidth >= this.scrollWidth || tips_index
                ) {
                  return;
                }
                tips_index = layer.tips($(this).text(), this, {
                  tips: 1,
                  time: 0,
                  skin: "demo-test4",
                });
              },
              mouseout: function mouseout() {
                layer.close(tips_index);
                tips_index = null;
              },
            });
          });
        });
      }

      // initEvent on pagination
      dataTable.on("page", function () {
        initEvent();
      });

      // initEvent on sorting
      dataTable.on("order", function () {
        initEvent();
      });
      initEvent();
    },
  });
  DataTable.Api.register("tips()", function () {
    return this;
  });

  Tips.defaults = true;

  $(document).on("init.dt.tips", function (e, settings) {
    if (e.namespace !== "dt") {
      return;
    }

    var init = settings.oInit.tips;
    var defaults = DataTable.defaults.tips;

    if (init || defaults) {
      var opts = init || defaults;

      if (init !== false) {
        new Tips(settings, opts);
      }
    }
  });
  $.fn.dataTable.Tips = Tips;
  $.fn.DataTable.Tips = Tips;

  return Tips;
});
