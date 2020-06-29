<template>
  <div>
    <div id="cesiumContainer"></div>
    <canvas id="canvas" width="775" height="295"></canvas>
  </div>
</template>

<script>
  // import * as Cesium from 'cesium';
  export default {
    data() {
      return {
        parmas: [],
        py: Number,
        px: Number,
        xMin: Number,
        xMax: Number,
        yMin: Number,
        yMax: Number,
        canvasUrl:''
      };
    },
    created() {
      // this.get();

    },
    mounted() {
      this.get()
    },
    methods: {
      async get() {
        const { data: res } = await this.axios('http://192.168.1.2:8301/' +
          'convection/api/autostation/show?basic=' +
          '1&encrypt=1&time=2020-01-02%2014%3A50%3A00')
        this.parmas = res.data

        let pyArr = []
        let pxArr = []
        for (let i = 0; i < this.parmas.length; i++) {
          this.px = Object.values(this.parmas[i])[2]
          pxArr.push(this.px)
          this.py = Object.values(this.parmas[i])[3]
          pyArr.push(this.py)
        }

        this.xMax = Math.max.apply(Math, pxArr)
        this.xMin = Math.min.apply(Math, pxArr)
        this.yMax = Math.max.apply(Math, pyArr)
        this.yMin = Math.min.apply(Math, pyArr)

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.font = "normal normal 500 12px serif";

        // 放大倍数
        const scaleX = canvas.width / (this.xMax - this.xMin) * 0.7
        console.log(canvas.width / (this.xMax - this.xMin)* 0.7);
        const scaleY = canvas.height / (this.yMax - this.yMin) * 0.7
        console.log(canvas.height / (this.yMax - this.yMin)* 0.7);

        // 参数位置
        const firstParmsX = 17 * (Math.sin((0) * Math.PI / 180)).toFixed(1)
        const firstParmsY = 17 * (Math.cos((0) * Math.PI / 180)).toFixed(1)
        const secondParmsX = 17 * (Math.sin((360 / 5) * Math.PI / 180)).toFixed(1)
        const secondParmsY = 17 * (Math.cos((360 / 5) * Math.PI / 180)).toFixed(1)
        const thirdParmsX = 17 * (Math.sin((360 / 5 * 2) * Math.PI / 180)).toFixed(1)
        const thirdParmsY = 17 * (Math.cos((360 / 5 * 2) * Math.PI / 180)).toFixed(1)
        const fourthParmsX = 17 * (Math.sin((360 / 5 * 3) * Math.PI / 180)).toFixed(1)
        const fourthParmsY = 17 * (Math.cos((360 / 5 * 3) * Math.PI / 180)).toFixed(1)
        const fifthParmsX = 17 * (Math.sin((360 / 5 * 4) * Math.PI / 180)).toFixed(1)
        const fifthParmsY = 17 * (Math.cos((360 / 5 * 4) * Math.PI / 180)).toFixed(1)

        // 向canvas映射地点、参数
        for (let i = 0; i < this.parmas.length; i++) {
          // 地点
          ctx.fillRect((pxArr[i] - this.xMin) * scaleX + canvas.width*0.15, (this.yMax - pyArr[i]) * scaleY + canvas.height*0.15, 4, 4)
          // 参数
          ctx.fillText(Object.values(this.parmas[i])[2], (pxArr[i] - this.xMin) * scaleX + canvas.width*0.15 + firstParmsX - 15,
            (this.yMax - pyArr[i]) * scaleY + canvas.height*0.15 + firstParmsY + 8)
          ctx.fillText(Object.values(this.parmas[i])[3], (pxArr[i] - this.xMin) * scaleX + canvas.width*0.15 + secondParmsX + 3,
            (this.yMax - pyArr[i]) * scaleY + canvas.height*0.15 + secondParmsY + 2)
          ctx.fillText(Object.values(this.parmas[i])[4], (pxArr[i] - this.xMin) * scaleX + canvas.width*0.15 + thirdParmsX,
            (this.yMax - pyArr[i]) * scaleY + canvas.height*0.15 + thirdParmsY)
          ctx.fillText(Object.values(this.parmas[i])[5], (pxArr[i] - this.xMin) * scaleX + canvas.width*0.15 + fourthParmsX - 4,
            (this.yMax - pyArr[i]) * scaleY + canvas.height*0.15 + fourthParmsY)
          ctx.fillText(Object.values(this.parmas[i])[6], (pxArr[i] - this.xMin) * scaleX + canvas.width*0.15 + fifthParmsX - 20,
            (this.yMax - pyArr[i]) * scaleY + canvas.height*0.15 + fifthParmsY + 2)
        }

        // 将canvas贴在cesium上
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YWQ2NGZkNC0yYjYzLTRiNzEtOWJjMi01Y2I5NGJlMzEyZGQiLCJpZCI6Mjk4NjAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTI4MTI1NTR9.-zUaIBAgYOlJ-36v2q9uy2BK4xPendbHEbX8JjKav-s';
        let viewer = new Cesium.Viewer('cesiumContainer',{
          imageryProvider: Cesium.createWorldImagery({
            style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
          }),
          baseLayerPicker: false,
        })

        // 获取canvas的url
        let canvasUrl = canvas.toDataURL()

        let layers = viewer.scene.imageryLayers;
        let blackMarble = layers.addImageryProvider(
          new Cesium.IonImageryProvider({ assetId: 3812 })
        );

        blackMarble.alpha = 0.5;

        blackMarble.brightness = 2.0;

        layers.addImageryProvider(
          new Cesium.SingleTileImageryProvider({
            url:canvasUrl,
            rectangle: Cesium.Rectangle.fromDegrees(110.056,30.525,132.077,33.43),
          })
        );
      }
    }
  };
</script>

<style scoped>
  #canvas{
    border:1px solid darkolivegreen;
  }

</style>
