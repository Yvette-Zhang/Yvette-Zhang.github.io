<template>
  <div class="home">
    <div class="cont" id="time-line-box">
      <v-app>
        <v-timeline align-top dense>
          <v-timeline-item fill-dot color="orange" large>
            <v-row class="pt-1">
              <v-col cols="6">
                <v-badge color="pink" content="6">
                  <strong>2015</strong>
                </v-badge>
              </v-col>
            </v-row>
          </v-timeline-item>
          <v-timeline-item color="pink" small>
            <v-row class="pt-1" justify="space-between">
              <v-col cols="3">
                <strong>2015-06</strong>
              </v-col>
              <v-col>
                <strong>New Icon</strong>
                <div class="caption">Mobile App</div>
              </v-col>
            </v-row>
          </v-timeline-item>

          <v-timeline-item color="teal lighten-3" small>
            <v-row class="pt-1">
              <v-col cols="3">
                <strong>3-4pm</strong>
              </v-col>
              <v-col>
                <strong>Design Stand Up</strong>
                <div class="caption mb-2">Hangouts</div>
                <v-avatar>
                  <v-img
                    src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
                  ></v-img>
                </v-avatar>
                <v-avatar>
                  <v-img
                    src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"
                  ></v-img>
                </v-avatar>
                <v-avatar>
                  <v-img
                    src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
                  ></v-img>
                </v-avatar>
              </v-col>
            </v-row>
          </v-timeline-item>

          <v-timeline-item color="pink" small>
            <v-row class="pt-1">
              <v-col cols="3">
                <strong>12pm</strong>
              </v-col>
              <v-col>
                <strong>Lunch break</strong>
              </v-col>
            </v-row>
          </v-timeline-item>

          <v-timeline-item color="teal lighten-3" small>
            <v-row class="pt-1">
              <v-col cols="3">
                <strong>9-11am</strong>
              </v-col>
              <v-col>
                <strong>Finish Home Screen</strong>
                <div class="caption">Web App</div>
              </v-col>
            </v-row>
          </v-timeline-item>
        </v-timeline>
      </v-app>
    </div>
    <div class="cont" id="map-box">
      <div><HelloWorld msg="Welcome to Your Vue.js App" /></div>
      <div><trans-css></trans-css></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import TransCss from "@/components/TransCSS";

export default {
  name: "Home",
  components: {
    HelloWorld,
    TransCss,
  },
  data() {
    return {
      footPrintData: [
        {
          year: 2015,
          footData: [
            {
              date: "2015-06",
              address: "乌镇",
              iconType: "singleQueen",
            },
            {
              date: "2015-04",
              address: "上海",
              iconType: "sweetHeats",
            },
          ],
        },
        {
          year: 2014,
          footData: [
            {
              date: "2014-10",
              address: "乌镇",
              iconType: "singleQueen",
            },
            {
              date: "2014-08",
              address: "上海",
              iconType: "sweetHeats",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  background: rgb(1, 9, 20);
  display: flex;
  .cont {
    flex-basis: 100%;
  }
  #time-line-box {
    background: grey;
    flex-shrink: 2;
    height: auto;
  }
  #map-box {
    background: rgb(231, 226, 226);
  }
}
</style>
