layui.use("element", function () {
  var element = layui.element;
});

$("[data-href]").on("click", function () {
  var url = $(this).data("href");
  if (!url) return;
  $("[data-href]").removeClass("index-menus-item--active");
  $(this).addClass("index-menus-item--active");
  $("#homeSubPage").attr("src", url);
});

function setPageUrl(url) {
  if (!url) return;
  $("#homeSubPage").attr("src", url);
}
