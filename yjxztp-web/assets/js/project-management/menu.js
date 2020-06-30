/*var topicList = [{
	title:'课题1课题1课题1课题1'
},{
	title:'课题2222'
},{
	title:'课题3'
}];
renderTopic();
function renderTopic(){
	var topicStr = '';
	for(var i = 0; i<topicList.length;i++){
		topicStr += `<li class="topic-submenu"><span title="${topicList[i].title}" data-href="./project-topic.html">${topicList[i].title}</span><i class="font_family icon-gengduo" data-dropdown="${i}"></i></li>`;
	}
	$('.menu-list').append(topicStr)
}*/


layui.config({
		base: '../../assets/plugins/layui/layui_exts/dropDown/'
}).use(['dropDown','layer','form'], function () {
		var dropDown = layui.dropDown,
				layer = layui.layer,
				form = layui.form;
		// 左导航菜单--下拉菜单
		var dropDownData = [
				{ 'type': 1, 'title': '编辑', 'icon': 'bianji' },
				{ 'type': 2, 'title': '删除', 'icon': 'shanchu' }
		];
		$('.menu-list').on('click','.topic-submenu i',function(e){
				var ele = $(this);
				var dropDownEle = dropDown.render({
						ele: ele, // 绑定下拉菜单的元素 （jq对象）
						position: 'right', // 下拉菜单定位 默认 bottom 类型：top、left、right、bottom
						className: 'my-drop', //自定义class 可根据此class自定义样式 默认为 空
						showIcon: true, //是否显示图标 默认false
						iconType: 'font_family icon', //icon图标类型 layui-icon layui自带图标；默认为 layui-icon，也可以是其他图标库的前缀
						zIndex: 1999, // 下拉层级 默认值999
						clickClose: true, //点击下拉菜单选项是否关闭下拉菜单 默认true
						mouseleaveClose: false, // 鼠标离开下拉菜单下拉菜单是否隐藏 默认true
						data: dropDownData, // 下拉菜单的数据
						choose: function (data) { // 点击回调
								console.log(data)
						}
				});
		});
		//创建课题弹窗
		var active2 = {
				offset: function (othis) {
						var type = othis.data('type')
								, text = othis.text();
						layer.open({
								triggerEle: othis // 触发弹窗的元素 jq对象
								, type: 1
								, offset: type //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
								, id: 'layerDemo' + type //防止重复弹出
								// , content: '<div style="padding: 20px">' + text + '</div>'
								, content: $('#createTopicForm')
								, btn: '创建'
								, title:'创建课题'
								, fixed: false
								, skin: 'layui-layer-radius'
								, resize: false
								, move: false // 禁止拖动
								, btnAlign: 'c' //按钮居中
								, shade: 0 //0不显示遮罩,
								, shadeClose: true
								, yes: function () {
										var data = form.val('createTopic');
										var topicName = data.topicName;
										var topicDom = `<li class="topic-submenu" data-href="./project-topic.html"><span title="${topicName}">${topicName}</span><i class="font_family icon-gengduo" data-dropdown="3"></i></li>`
										$('.menu-list').append(topicDom)
										layer.closeAll();
								},
						});
				}
		};

		$('.create-topic').on('click', function () {
				var othis = $(this),
						method = othis.data('method');
				active2[method] ? active2[method].call(this, othis) : '';
		});
});

$(".menu-item").on("click", function() {
		var title = document.title.split("-");
		title[1] = $(this).text();
		document.title = title.join("-");
		$("#iframe").attr("src", $(this).attr("data-href"));
		$(".menu-item").removeClass("active");
		$(".topic-submenu").removeClass("active");
		$(this).addClass("active");
});

$('.menu-list').on("click",'.topic-submenu',function() {
		var title = document.title.split("-");
		console.log(title)
		title[1] = $(this).text();
		document.title = title.join("-");
		$("#iframe").attr("src", $(this).attr("data-href"));
		$(".topic-submenu").removeClass("active");
		$(this).addClass("active");
		$(".menu-item").removeClass("active");
		$('.nosubpage').addClass("active");
});

