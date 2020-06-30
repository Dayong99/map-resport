<template>
    <div>
        <div id="cesiumContainer"></div>
        <canvas id="canvas" width="775" height="295"></canvas>
    </div>
</template>

<script>
    import * as Cesium from "cesium";

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
                canvasUrl: '',
                scaleLevelL: '',
            };
        },
        created() {
            this.get();
        },
        mounted() {

        },
        methods: {
            async get() {
                const {data: res} = await this.axios('http://192.168.1.2:8301/'
                    + 'convection/api/autostation/show?basic='
                    + '1&encrypt=1&time=2020-01-02%2014%3A50%3A00');
                this.parmas = res.data;

                const pyArr = [];
                const pxArr = [];
                for (let i = 0; i < this.parmas.length; i++) {
                    this.px = Object.values(this.parmas[i])[2];
                    pxArr.push(this.px);
                    this.py = Object.values(this.parmas[i])[3];
                    pyArr.push(this.py);
                }

                this.xMax = Math.max.apply(Math, pxArr);
                this.xMin = Math.min.apply(Math, pxArr);
                this.yMax = Math.max.apply(Math, pyArr);
                this.yMin = Math.min.apply(Math, pyArr);

                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 775
                canvas.height = 295

                canvas.style.width = this.scaleLevelL * 775

                ctx.font = 'normal normal 500 12px serif';

                // 放大倍数
                const scaleX = canvas.width / (this.xMax - this.xMin) * 0.7;
                console.log(canvas.width / (this.xMax - this.xMin) * 0.7);
                const scaleY = canvas.height / (this.yMax - this.yMin) * 0.7;
                console.log(canvas.height / (this.yMax - this.yMin) * 0.7);

                // 参数位置
                const firstParmsX = 17 * (Math.sin((0) * Math.PI / 180)).toFixed(1);
                const firstParmsY = 17 * (Math.cos((0) * Math.PI / 180)).toFixed(1);
                const secondParmsX = 17 * (Math.sin((360 / 5) * Math.PI / 180)).toFixed(1);
                const secondParmsY = 17 * (Math.cos((360 / 5) * Math.PI / 180)).toFixed(1);
                const thirdParmsX = 17 * (Math.sin((360 / 5 * 2) * Math.PI / 180)).toFixed(1);
                const thirdParmsY = 17 * (Math.cos((360 / 5 * 2) * Math.PI / 180)).toFixed(1);
                const fourthParmsX = 17 * (Math.sin((360 / 5 * 3) * Math.PI / 180)).toFixed(1);
                const fourthParmsY = 17 * (Math.cos((360 / 5 * 3) * Math.PI / 180)).toFixed(1);
                const fifthParmsX = 17 * (Math.sin((360 / 5 * 4) * Math.PI / 180)).toFixed(1);
                const fifthParmsY = 17 * (Math.cos((360 / 5 * 4) * Math.PI / 180)).toFixed(1);

                // 向canvas映射地点、参数
                for (let i = 0; i < this.parmas.length; i++) {
                    // 地点
                    ctx.fillStyle = '#f94b52';
                    ctx.fillRect((pxArr[i] - this.xMin) * scaleX + canvas.width * 0.15, (this.yMax - pyArr[i]) * scaleY + canvas.height * 0.15, 4, 4);

                    // 参数1
                    for (let i = 0; i < this.parmas.length; i++) {
                        ctx.fillStyle = '#a200ec';
                        ctx.fillText("" + Object.values(this.parmas[i])[2], (pxArr[i] - this.xMin) * scaleX + canvas.width * 0.15 + firstParmsX - 15,
                            (this.yMax - pyArr[i]) * scaleY + canvas.height * 0.15 + firstParmsY + 8);
                    }

                    // 参数2
                    for (let i = 0; i < this.parmas.length; i++) {
                        ctx.fillStyle = '#289434';
                        ctx.fillText("" + Object.values(this.parmas[i])[3], (pxArr[i] - this.xMin) * scaleX + canvas.width * 0.15 + secondParmsX + 3,
                            (this.yMax - pyArr[i]) * scaleY + canvas.height * 0.15 + secondParmsY + 2);
                    }

                    // 参数3
                    for (let i = 0; i < this.parmas.length; i++) {
                        ctx.fillStyle = '#3a24ed';
                        ctx.fillText("" + Object.values(this.parmas[i])[4], (pxArr[i] - this.xMin) * scaleX + canvas.width * 0.15 + thirdParmsX,
                            (this.yMax - pyArr[i]) * scaleY + canvas.height * 0.15 + thirdParmsY);
                    }

                    // 参数4
                    for (let i = 0; i < this.parmas.length; i++) {
                        ctx.fillStyle = "#e01549"
                        ctx.fillText("" + Object.values(this.parmas[i])[5], (pxArr[i] - this.xMin) * scaleX + canvas.width * 0.15 + fourthParmsX - 4,
                            (this.yMax - pyArr[i]) * scaleY + canvas.height * 0.15 + fourthParmsY);
                    }

                    // 参数5
                    for (let i = 0; i < this.parmas.length; i++) {
                        ctx.fillStyle = "#1b5cf7"
                        ctx.fillText("" + Object.values(this.parmas[i])[6], (pxArr[i] - this.xMin) * scaleX + canvas.width * 0.15 + fifthParmsX - 20,
                            (this.yMax - pyArr[i]) * scaleY + canvas.height * 0.15 + fifthParmsY + 2);
                    }
                }

                // 获取cesium
                Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YWQ2NGZkNC0yYjYzLTRiNzEtOWJjMi01Y2I5NGJlMzEyZGQiLCJpZCI6Mjk4NjAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTI4MTI1NTR9.-zUaIBAgYOlJ-36v2q9uy2BK4xPendbHEbX8JjKav-s';
                const viewer = new Cesium.Viewer('cesiumContainer', {
                    imageryProvider: Cesium.createWorldImagery({
                        style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
                    }),
                    baseLayerPicker: false,
                });

                // 获取camera的高度
                // 根据camera高度近似计算当前层级
                // 监听地图移动完成事件
                viewer.camera.moveStart.addEventListener(function () {
                    let height = Math.ceil(viewer.camera.positionCartographic.height)
                    let A = 40487.57
                    let B = 0.00007096758
                    let C = 91610.74
                    let D = -40467.74
                    window.scaleLevelL = Math.round(D + (A - D) / (1 + Math.pow(height/ C, B)))
                    console.log(scaleLevelL)
                })

                // 获取canvas的url
                const canvasUrl = canvas.toDataURL();

                // 将canvas贴在cesium上
                const layers = viewer.scene.imageryLayers;
                const blackMarble = layers.addImageryProvider(
                    new Cesium.IonImageryProvider({assetId: 3812}),
                );

                blackMarble.alpha = 0.5;

                blackMarble.brightness = 2.0;

                layers.addImageryProvider(
                    new Cesium.SingleTileImageryProvider({
                        url: canvasUrl,
                        rectangle: Cesium.Rectangle.fromDegrees(115.545, 28.449, 126.587, 32.601),
                    }),
                );
            },
        },
    };
</script>

<style scoped>
    #canvas {
        border: 1px solid #0c6f58;
    }

</style>
