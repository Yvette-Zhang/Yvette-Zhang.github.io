layui.define([
  'jquery'
], function (exports) {
  'use strict';
  var $ = layui.jquery,
    dropId = '',
    dropDown = {
      config: {},
      //设置全局项
      set: function (options) {
        var that = this;
        that.config = $.extend({}, that.config, options);
        return that;
      }
    },
    //操作当前实例
    thisDropDown = function () {
      var that = this
        , options = that.config;

      return {
        config: options,
        destroy: that.destroy
      }
    },
    //构造器
    Class = function (options) {

      var that = this;
      that.config = $.extend({}, that.config, dropDown.config, options);

      that.render();
    };

  //默认配置
  Class.prototype.config = {
    iconType: 'layui-icon',
    position: 'bottom',
    className: '',
    showIcon: false,
    zIndex: 999,
    clickClose: true,
    mouseleaveClose: true,
    bodyClose: true
  };

  // 下拉渲染
  Class.prototype.render = function () {
    var that = this,
      options = that.config;

    if (dropId == options.ele.attr('data-dropdown') && $('.layui-dropdown').length) {
      return
    } else {
      dropId = options.ele.attr('data-dropdown') || '';
    }
    that.destroy();

    var xx = options.ele.offset().left, //点击元素x坐标
      yy = options.ele.offset().top, //点击元素y坐标
      hh = options.ele.outerHeight(),//点击元素高度
      ww = options.ele.outerWidth(); //点击元素宽度

    var temp = '<div class="layui-dropdown ' + options.className + '">';
    var buildEle = that.bulid(options);
    temp += buildEle
    temp += '</div>';
    $('body').append(temp);
    var dEle = $('.layui-dropdown'), //下拉菜单
      dHH = dEle.outerHeight(), //下拉菜单高度
      dWW = dEle.outerWidth(); //下拉菜单宽度
    var dW = document.documentElement['clientWidth'],
      margin = 10, computeLeft, computeTop,
      wH = document.documentElement['clientHeight'];

    if (options.position == 'top') {
      if (xx + ww + dHH > dW) {
        computeLeft = dW - dWW - margin;
      }
      if (yy - $(document).scrollTop() < dHH + margin) {
        computeTop = yy + hh + 5;
      }
      $('.layui-dropdown').css({
        'left': computeLeft || xx,
        'top': computeTop || yy - dHH - 5,
        'z-index': options.zIndex
      })
    } else if (options.position == 'left') {
      if (xx - dWW < margin) {
        computeLeft = margin;
        computeTop = yy + hh + 5;
      }
      $('.layui-dropdown').css({
        'left': computeLeft || xx - dWW - 5,
        'top': computeTop || yy,
        'z-index': options.zIndex
      })
    } else if (options.position == 'right') {
      if (xx + ww + dHH > dW) {
        computeLeft = dW - dWW - margin;
        computeTop = yy + hh + 5;
      }
      $('.layui-dropdown').css({
        'left': computeLeft || xx + ww + 5,
        'top': computeTop || yy,
        'z-index': options.zIndex
      })
    } else {
      if (xx + ww + dHH > dW) {
        computeLeft = dW - dWW - margin;
      }
      if (yy - $(document).scrollTop() + hh + dHH > wH) {
        computeTop = yy - dHH - 5;
      }
      $('.layui-dropdown').css({
        'left': computeLeft || xx,
        'top': computeTop || yy + hh + 5,
        'z-index': options.zIndex
      })
    }
    that.events();

  };

  Class.prototype.bulid = function (options) {
    var data = options.data,
      l = data.length,
      eleArr = '';
    eleArr += '<ul class="layui-dropdown-menu">';

    if (options.showIcon) {
      for (var i = 0; i < l; i++) {
        var d = data[i],
          arrowStr = '';
        if (d.arrow) {
          arrowStr = '<span class="layui-dropdown-menu-submenu-arrow"><i class="layui-icon layui-icon-right"></i></span>'
        }
        var iconArr = '<i class="' + options.iconType + ' ' + options.iconType + '-' + d.icon + '"></i>';
        if (d.children && d.children.length) {
          var subD = d.children,
            sL = subD.length;
          if (d.disabled) {
            eleArr += '<li class="layui-dropdown-menu-submenu">';
            eleArr += '<div class="layui-dropdown-menu-submenu-title">' + iconArr + d.title + '<span class="layui-dropdown-menu-submenu-arrow"><i class="layui-icon layui-icon-right"></i></span></div>';
          } else {
            eleArr += '<li class="layui-dropdown-menu-submenu layui-dropdown-menu-submenu-disabled">';
            eleArr += '<div class="layui-dropdown-menu-submenu-title">' + iconArr + d.title + '<span class="layui-dropdown-menu-submenu-arrow"><i class="layui-icon layui-icon-right"></i></span></div>'
          }
          eleArr += '<div class="layui-dropdown-menu-submenu-popup">'
          eleArr += '<ul class="layui-dropdown-menu layui-dropdown-menu-submenu-con">'
          for (var x = 0; x < sL; x++) {
            var sD = subD[x];
            var sIconArr = '<i class="' + options.iconType + ' ' + options.iconType + '-' + sD.icon + '"></i>';
            if (sD.disabled) {
              eleArr += '<li class="layui-dropdown-menu-item layui-dropdown-menu-item-disabled">' + sIconArr + sD.title + '</li>'
            } else if (d.href) {
              eleArr += '<li class="layui-dropdown-menu-item"><a href="' + sD.href + '" target="' + (d.target ? sD.target : '') + '">' + sIconArr + sD.title + '</a></li>'
            } else {
              eleArr += '<li class="layui-dropdown-menu-item"><a href="javascript:;">' + sIconArr + sD.title + '</a></li>'
            }
          }
          eleArr += '</div></li>'
        } else {
          if (d.disabled) {
            eleArr += '<li class="layui-dropdown-menu-item layui-dropdown-menu-item-disabled">' + iconArr + d.title + '</li>'
          } else if (d.href) {
            eleArr += '<li class="layui-dropdown-menu-item"><a href="' + d.href + '" target="' + (d.target ? d.target : '') + '">' + iconArr + d.title + arrowStr + '</a></li>'
          } else {
            eleArr += '<li class="layui-dropdown-menu-item"><a href="javascript:;">' + iconArr + d.title + arrowStr + '</a></li>'
          }
        }

      }
    } else {
      for (var i = 0; i < l; i++) {
        var d = data[i];
        if (d.children && d.children.length) {
          var subD = d.children,
            sL = subD.length;

          if (d.disabled) {
            eleArr += '<li class="layui-dropdown-menu-submenu">';
            eleArr += '<div class="layui-dropdown-menu-submenu-title">' + d.title + '<span class="layui-dropdown-menu-submenu-arrow"><i class="layui-icon layui-icon-right"></i></span></div>';
          } else {
            eleArr += '<li class="layui-dropdown-menu-submenu layui-dropdown-menu-submenu-disabled">';
            eleArr += '<div class="layui-dropdown-menu-submenu-title">' + d.title + '<span class="layui-dropdown-menu-submenu-arrow"><i class="layui-icon layui-icon-right"></i></span></div>'
          }
          eleArr += '<div class="layui-dropdown-menu-submenu-popup">'
          eleArr += '<ul class="layui-dropdown-menu layui-dropdown-menu-submenu-con">'
          for (var x = 0; x < sL; x++) {
            var sD = subD[x];
            if (sD.disabled) {
              eleArr += '<li class="layui-dropdown-menu-item layui-dropdown-menu-item-disabled">' + sD.title + '</li>'
            } else if (sD.href) {
              eleArr += '<li class="layui-dropdown-menu-item"><a href="' + sD.href + '" target="' + (sD.target ? sD.target : '') + '">' + sD.title + '</a></li>'
            } else {
              eleArr += '<li class="layui-dropdown-menu-item"><a href="javascript:;">' + sD.title + '</a></li>'
            }
          }
          eleArr += '</div></li>'
        } else {
          if (d.disabled) {
            eleArr += '<li class="layui-dropdown-menu-item layui-dropdown-menu-item-disabled">' + d.title + '</li>'
          } else if (d.href) {
            eleArr += '<li class="layui-dropdown-menu-item"><a href="' + d.href + '" target="' + (d.target ? d.target : '') + '">' + d.title + arrowStr + '</a></li>'
          } else {
            eleArr += '<li class="layui-dropdown-menu-item"><a href="javascript:;">' + d.title + arrowStr + '</a></li>'
          }
        }
      }
    }
    eleArr += '</ul>'
    return eleArr
  };

  //事件处理
  Class.prototype.events = function () {
    var that = this,
      options = that.config,
      data = options.data;
    $('.layui-dropdown').fadeIn(300);
    $('.layui-dropdown-menu-submenu').on('mouseenter', function () {
      var $that = $(this),
        eleWidth = $that.width();
      $that.find('.layui-dropdown-menu-submenu-popup').css('left', eleWidth).fadeIn(300);
    });
    $('.layui-dropdown-menu-submenu').on('mouseleave', function () {
      $(this).find('.layui-dropdown-menu-submenu-popup').fadeOut(300);
    });

    $('.layui-dropdown').on('mouseleave', function () {
      if (options.mouseleaveClose) {
        hideDropDown();
      }
    })

    $('.layui-dropdown .layui-dropdown-menu-item').on('click', function () {
      var $this = $(this),
        $index = $this.index(),
        d = data[$index];
      if ($(this).parents('.layui-dropdown-menu-submenu').length) {
        var $pIndex = $(this).parents('.layui-dropdown-menu-submenu').index();
        d = data[$pIndex].children[$index];
      }

      d.el = $this;

      options.choose(d);
      if (options.clickClose) {
        hideDropDown();
      }
    });
    if (options.bodyClose) {
      setTimeout(() => {
        $('body').on('click', function (e) {
          if ($(e.target).attr('data-dropdown') || $(e.target).parents().attr('data-dropdown')) {
            return
          };
          if ($(e.target).hasClass('layui-dropdown') || $(e.target).parents().hasClass('layui-dropdown')) {
            return
          };
          if (!$('.layui-dropdown').length) {
            return
          }
          hideDropDown();
        });
      }, 0);
    }


    function hideDropDown() {
      $('.layui-dropdown').fadeOut(300);
      setTimeout(function () {
        $('.layui-dropdown').remove();
      }, 300)
    }
  };

  // 销毁
  Class.prototype.destroy = function () {
    $('.layui-dropdown').remove();
  }


  //核心入口
  dropDown.render = function (options) {
    var inst = new Class(options);

    return thisDropDown.call(inst);
  };

  exports('dropDown', dropDown);
});