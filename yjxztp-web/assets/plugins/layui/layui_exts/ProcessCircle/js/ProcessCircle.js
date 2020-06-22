function circle({ el, value, color, textColor, width, background, deg }) {
  el.empty();

  el.addClass("layui-circle");

  el.css({
    width: width[0],
    height: width[0],
  });

  const $left = `<div class="layui-pie layui-pie-left">
      <div class ="layui-pie-circle layui-pie-circle-l"> </div>
    </div>`;

  const $right = `<div class="layui-pie layui-pie-right">
      <div class="layui-pie-circle layui-pie-circle-r"></div>
    </div>`;

  const $mask = `<div class="layui-mask" style='color: ${textColor}'>
	    <span>${value}</span>%  
	  </div>`;
  el.append([$left, $right, $mask]);
  const pieWidth = (width[0] - width[1]) / 2;

  var valueRotate = value * 3.6;
  if (valueRotate <= 180) {
    leftRotate = 180;
    rightRotate = -180 + valueRotate;
  } else {
    leftRotate = -360 + valueRotate;
    rightRotate = -360;
  }

  el.find(".layui-pie-shade").css({
    width: width[0] + 2 + "px",
    height: width[0] + 2 + "px",
  });

  el.find(".layui-pie").css({
    "background-color": background,
    transform: "rotate(" + deg + "deg)",
  });

  el.find(".layui-pie-left").css({
    "border-radius": width[0] + "px 0 0 " + width[0] + "px",
  });

  el.find(".layui-pie-right").css({
    "border-radius": "0 " + width[0] + "px " + width[0] + "px 0",
  });

  el.find(".layui-pie-circle-l").css({
    "background-color": color,
    transform: "rotate(" + leftRotate + "deg)",
  });

  el.find(".layui-pie-circle-r").css({
    "background-color": color,
    transform: "rotate(" + rightRotate + "deg)",
  });

  el.find(".layui-mask").css({
    width: width[1] + "px",
    height: width[1] + "px",
    "line-height": width[1] + "px",
    left: pieWidth + "px",
    top: pieWidth + "px",
  });
}
