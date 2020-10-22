<template>
  <v-container>
    <div class="hello" ref="chartdiv"></div>
    <div id="info"></div>
  </v-container>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
let colorSet = new am4core.ColorSet();

export default {
  name: "HelloWorld",
  data() {
    return {
      mapchartdata: [
        {
          title: "北京",
          latitude: 39.9056,
          longitude: 116.3958,
          color: colorSet.next(),
        },
        {
          title: "上海",
          latitude: 31.235564,
          longitude: 121.478512,
          color: colorSet.next(),
        },
        {
          title: "天津",
          latitude: 39.091132,
          longitude: 117.209363,
          color: colorSet.next(),
        },
        {
          title: "湖南-怀化",
          latitude: 27.575467,
          longitude: 110.008978,
          color: colorSet.next(),
        },
        {
          title: "湖南-长沙",
          latitude: 28.234226,
          longitude: 112.949932,
          color: colorSet.next(),
        },
        {
          title: "湖南-常德",
          latitude: 29.03747,
          longitude: 111.704994,
          color: colorSet.next(),
        },
        {
          title: "湖南-张家界",
          latitude: 29.122351,
          longitude: 110.485212,
          color: colorSet.next(),
        },
        {
          title: "湖南-吉首",
          latitude: 28.321182,
          longitude: 109.746415,
          color: colorSet.next(),
        },
        {
          title: "广东-广州",
          latitude: 23.137169,
          longitude: 113.271943,
          color: colorSet.next(),
        },
        {
          title: "广东-深圳",
          latitude: 22.547714,
          longitude: 114.063812,
          color: colorSet.next(),
        },
        {
          title: "安徽-合肥",
          latitude: 31.826625,
          longitude: 117.233722,
          color: colorSet.next(),
        },
        {
          title: "安徽-蚌埠",
          latitude: 32.921766,
          longitude: 117.394939,
          color: colorSet.next(),
        },
        {
          title: "江苏-南京",
          latitude: 32.063511,
          longitude: 118.801166,
          color: colorSet.next(),
        },
        {
          title: "江苏-苏州",
          latitude: 31.303825,
          longitude: 120.595362,
          color: colorSet.next(),
        },
        {
          title: "浙江-杭州",
          latitude: 30.251362,
          longitude: 120.216885,
          color: colorSet.next(),
        },
        {
          title: "浙江-乌镇",
          latitude: 30.75546,
          longitude: 120.498038,
          color: colorSet.next(),
        },
        {
          title: "吉林-长春",
          latitude: 43.821988,
          longitude: 125.330745,
          color: colorSet.next(),
        },
        {
          title: "辽宁-大连",
          latitude: 38.91957,
          longitude: 121.62829,
          color: colorSet.next(),
        },
        {
          title: "河北-秦皇岛",
          latitude: 39.894996,
          longitude: 119.52857,
          color: colorSet.next(),
        },
        {
          title: "河北-霸州",
          latitude: 39.100686,
          longitude: 116.358726,
          color: colorSet.next(),
        },
        {
          title: "新疆-乌鲁木齐",
          latitude: 43.830517,
          longitude: 87.623889,
          color: colorSet.next(),
        },
        {
          title: "新疆-吐鲁番",
          latitude: 42.954661,
          longitude: 89.197874,
          color: colorSet.next(),
        },
        {
          title: "江西-井冈山",
          latitude: 26.637772,
          longitude: 114.146082,
          color: colorSet.next(),
        },
        {
          title: "香港",
          latitude: 22.281547,
          longitude: 114.175777,
          color: colorSet.next(),
        },
        {
          title: "马尔代夫",
          latitude: 3.18284,
          longitude: 73.504113,
          color: colorSet.next(),
        },
        {
          title: "伊朗-德黑兰",
          latitude: 35.697406,
          longitude: 51.388399,
          color: colorSet.next(),
        },
        {
          title: "土耳其-伊斯坦布尔",
          latitude: 41.015859,
          longitude: 28.972035,
          color: colorSet.next(),
        },
        {
          title: "土耳其-艾瓦勒克",
          latitude: 39.656631,
          longitude: 27.891492,
          color: colorSet.next(),
        },
        {
          title: "土耳其-库萨达斯",
          latitude: 39.9056,
          longitude: 116.3958,
          color: colorSet.next(),
        },
        {
          title: "土耳其-帕姆卡莱（棉花堡）",
          latitude: 39.9056,
          longitude: 116.3958,
          color: colorSet.next(),
        },
        {
          title: "土耳其-卡帕多奇亚",
          latitude: 39.9056,
          longitude: 116.3958,
          color: colorSet.next(),
        },
        {
          title: "土耳其-安卡拉",
          latitude: 39.9439,
          longitude: 32.856,
          color: colorSet.next(),
        },
      ],
    };
  },
  mounted() {
    // 背景色：#010205   地球背景色：#00172b  陆地着色：#00acc4
    let chart = am4core.create(this.$refs.chartdiv, am4maps.MapChart);
    chart.geodata = am4geodata_worldLow;
    // Set projection
    chart.projection = new am4maps.projections.Miller();
    chart.background.fill = am4core.color("#aadaff");
    chart.background.fillOpacity = 1;

    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Exclude Antartica
    polygonSeries.exclude = ["AQ"];

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.polygon.fillOpacity = 0.6;

    // Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(0);

    // Add image series
    let imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.mapImages.template.propertyFields.longitude = "longitude";
    imageSeries.mapImages.template.propertyFields.latitude = "latitude";
    imageSeries.mapImages.template.tooltipText = "{title}";
    imageSeries.mapImages.template.propertyFields.url = "url";
    imageSeries.data = this.mapchartdata;

    imageSeries.mapImages.template.events.on("hit", function(ev) {
      var data = ev.target.dataItem.dataContext;
      var info = document.getElementById("info");
      info.innerHTML = "<h3>" + data.title + " (" + data.latitude + ")</h3>";
      if (data.description) {
        info.innerHTML += data.description;
      } else {
        info.innerHTML += "<i>No description provided.</i>";
      }
    });

    let circle = imageSeries.mapImages.template.createChild(am4core.Circle);
    circle.radius = 3;
    circle.propertyFields.fill = "color";

    let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
    circle2.radius = 3;
    circle2.propertyFields.fill = "color";

    let that = this;
    circle2.events.on("inited", function(event) {
      that.animateBullet(event.target);
    });
  },
  methods: {
    animateBullet(circle) {
      let that = this;
      let animation = circle.animate(
        [
          { property: "scale", from: 1, to: 5 },
          { property: "opacity", from: 1, to: 0 },
        ],
        1000,
        am4core.ease.circleOut
      );
      animation.events.on("animationended", function(event) {
        that.animateBullet(event.target.object);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
}
.hello {
  width: 100%;
  height: 70vh;
}
</style>
