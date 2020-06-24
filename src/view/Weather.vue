<template>
  <div>
    <canvas class="canvas">{{parmas}}</canvas>
    <div class="canvas">{{parmas}}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        parmas: [],
        lon: [],
        lat: [],
        xMin: Number,
        yMax: Number,
      };
    },
    created() {
      this.get();
    },
    methods: {
      async get() {
        const { data : res } = await this.axios('http://192.168.1.2:8301/' +
          'convection/api/autostation/show?basic=' +
          '1&encrypt=1&time=2020-01-02%2014%3A50%3A00')
        this.parmas = res.data
        for(let i in this.parmas){
          this.lon = Object.values(this.parmas[i])[2]
          console.log(this.lon);
          this.lat = Object.values(this.parmas[i])[3]
        }
        // this.xMin = Math.min.apply(Math,this.lat)
        // this.yMax = Math.max.apply(Math,this.lon)
      }
    }
  };
</script>

<style scoped>
  .canvas {
    background-color: #f0f3ff;
  }

</style>
