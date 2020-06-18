function circle({ el, value, background, color, width, deg }) {
	var left1 =
		(width[0].substring(0, width[0].length - 2) -
			width[1].substring(0, width[1].length - 2)) /
		2
	var b = String(left1)
	var abc = b + 'px'
	// console.log(abc)
	el.addClass('layui-circle')
	var aa = document.getElementById('circle')
	aa.style.cssText =
		'background:' + color + ';width:' + width[0] + ';height:' + width[0]
	console.log(aa)
	const $right = `<div class="layui-pieRight" style='width:${width[0]};height:${width[0]}'>
      <div style='background: ${background};width:${width[0]};height:${width[0]}' class="layui-right"></div>
      <div style='background: ${background};width:${width[0]};height:${width[0]}' class="layui-right rightwhite"></div>
    </div>`
	const $left = `<div class="layui-pieLeft" style='width:${width[0]};height:${width[0]}'>
      <div style='background: ${background};width:${width[0]};height:${width[0]}' class="layui-left"></div> 
    </div>`
	const $mask = `<div class="layui-mask" style='width:${width[1]};height:${width[1]};line-height:${width[1]};left:${abc};top:${abc}'>
      <span>${value}</span>%  
    </div>`
	$(el).append([$right, $left, $mask])
	const right = $(el).find('.layui-right'),
		left = $(el).find('.layui-left'),
		mask = $(el).find('.layui-mask span'),
		rightwhite = $(el).find('.rightwhite'),
		little = $(el).find('layui-little')
	ProcessCircle(right, left, value, rightwhite, little, deg)
	return {
		left,
		right,
		mask,
		rightwhite,
		little,
		deg,
		setValue(num) {
			ProcessCircle(right, left, num, rightwhite, little, deg)
			mask.text(num)
		},
	}
}

function ProcessCircle(right, left, value, rightwhite, little, deg) {
	var num = value * 3.6
	if (num + deg <= 180) {
		right.css('transform', 'rotate(' + (deg - 180) + 'deg)')
    rightwhite.css('transform', 'rotate(' + (num + deg) + 'deg)')
    
	} else {
		right.css('transform', 'rotate(' + (deg - 180) + 'deg)')
		left.css('transform', 'rotate(' + (num + deg - 180) + 'deg)')
	}
}
