<template>
  <div class="text-center">
    <input type="file" class="file" />
    <v-btn class="ma-2" tile color="indigo" dark @click="readFile"
      >更新图标</v-btn
    >
    <div>
      <v-row justify="center">
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              选择图标
            </v-btn>
          </template>
          <v-card>
            <v-card-title>选择图标</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
              <v-row dense>
                <v-col
                  v-for="l in icons"
                  :key="l"
                  class="title grey--text font-weight-regular text--darken-2"
                >
                  <i :class="l" :title="l"></i>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="dialog = false"
                >取消</v-btn
              >
              <v-btn color="blue darken-1" text @click="dialog = false"
                >保存</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransCss",
  data() {
    return {
      icons: [],
      dialogm1: "",
      dialog: false,
    };
  },
  watch: {
    icons(icon) {
      this.icons = icon;
    },
  },
  methods: {
    readFile() {
      let that = this;
      let fileselect = document.querySelector("input[type=file]").files[0];
      //找到文件上传的元素
      let reader = new FileReader();
      if (typeof FileReader === "undefined") {
        alert("您的浏览器不支持FileReader接口");
      }
      reader.readAsText(fileselect, "gb2312");
      //注意读取中文的是用这个编码，不是utf-8
      reader.onload = function() {
        let iconCss = reader.result;
        let iconList = [];
        var reg = /(icon-.*):before/g;
        //筛选icon-开头:before结尾的字符串 其中/(icon\-.*)代表icon-加任意字符的分组
        let resultS;
        while ((resultS = reg.exec(iconCss)) != null) {
          //遍历出分组的数据是我们需要的
          iconList.push("iconfont " + resultS[1]);
          //我们需要的格式
        }
        that.icons = iconList;
      };
    },
  },
};
</script>
