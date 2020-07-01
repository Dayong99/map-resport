<template>
    <div>
        <div id="cesiumContainer"></div>
        <canvas id="canvas"></canvas>
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

                fontSize: 12,

                width: 775,
                height: 295,

                scaleX: '',
                scaleY: '',

                radius: 17,

                firstParmsX: Number,
                firstParmsY: Number,
                secondParmsX: Number,
                secondParmsY: Number,
                thirdParmsX: Number,
                thirdParmsY: Number,
                fourthParmsX: Number,
                fourthParmsY: Number,
                fifthParmsX: Number,
                fifthParmsY: Number,

                img:''
            };
        },
        created() {
            this.get();
        },
        watch: {
            scaleLevelL(newVal) {
                // console.log(this.scaleLevelL);
                if(newVal === 2) {
                    this.width = 775 * 2
                    this.height = 295 * 2
                }else if(newVal === 3) {
                    this.width = 775 * 4
                    this.height = 295 * 4
                }else if(newVal === 4) {
                    this.width = 775 * 6
                    this.height = 295 * 6
                }else if(newVal === 5) {
                    this.width = 775 * 8
                    this.height = 295 * 8
                }else if(newVal === 6) {
                    this.width = 775 * 10
                    this.height = 295 * 10
                }else if(newVal === 7) {
                    this.width = 775 * 12
                    this.height = 295 * 12
                }else if(newVal === 8) {
                    this.width = 775 * 14
                    this.height = 295 * 14
                }else if(newVal === 9) {
                    this.width = 775 * 16
                    this.height = 295 * 16
                }else if(newVal === 10) {
                    this.width = 775 * 18
                    this.height = 295 * 18
                }else if(newVal === 11) {
                    this.width = 775 * 20
                    this.height = 295 * 20
                }else if(newVal === 12) {
                    this.width = 775 * 22
                    this.height = 295 * 22
                }
            }
        },
        methods: {
            async get() {
                const {data: res} = await this.axios('http://192.168.1.2:8301/'
                    + 'convection/api/autostation/show?basic='
                    + '1&encrypt=1&time=2020-01-02%2014%3A50%3A00');
                this.parmas = res.data;

                // 从getCanvas()中获取canvas的url
                let canvasUrl = this.getCanvas()
                this.img = canvasUrl.toDataURL();

                const cesiumObj = this.getCesium()
                let layers = cesiumObj.scene.imageryLayers;
                const blackMarble = layers.addImageryProvider(
                    new Cesium.IonImageryProvider({assetId: 3812}),
                );

                blackMarble.alpha = 0.5;
                blackMarble.brightness = 2.0;

                layers.addImageryProvider(
                    new Cesium.SingleTileImageryProvider({
                        url: this.img,
                        rectangle: Cesium.Rectangle.fromDegrees(115.545, 28.449, 126.587, 32.601),
                    }),
                );

                // 获取camera的高度
                // 根据camera高度近似计算当前层级
                // 监听地图移动完成事件
                cesiumObj.camera.moveStart.addEventListener(() => {
                    let height = Math.ceil(cesiumObj.camera.positionCartographic.height)
                    let A = 40487.57
                    let B = 0.00007096758
                    let C = 91610.74
                    let D = -40467.74
                    this.scaleLevelL = Math.round(D + (A - D) / (1 + Math.pow(height/C, B)))
                    console.log(this.scaleLevelL)
                })
            },

            // 获得canvas
            getCanvas() {
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

                canvas.style.width = 775 + 'px'
                canvas.style.width = 295 + 'px'

                canvas.width = this.width
                canvas.height = this.height

                ctx.font = 'normal normal 500 12px serif';

                // 放大倍数
                this.scaleX = canvas.width / (this.xMax - this.xMin) * 0.7;
                this.scaleY = canvas.height / (this.yMax - this.yMin) * 0.7;

                // 参数位置
                this.firstParmsX = this.radius * (Math.sin((0) * Math.PI / 180)).toFixed(1);
                this.firstParmsY = this.radius * (Math.cos((0) * Math.PI / 180)).toFixed(1);
                this.secondParmsX = this.radius * (Math.sin((360 / 5) * Math.PI / 180)).toFixed(1);
                this.secondParmsY = this.radius * (Math.cos((360 / 5) * Math.PI / 180)).toFixed(1);
                this.thirdParmsX = this.radius * (Math.sin((360 / 5 * 2) * Math.PI / 180)).toFixed(1);
                this.thirdParmsY = this.radius * (Math.cos((360 / 5 * 2) * Math.PI / 180)).toFixed(1);
                this.fourthParmsX = this.radius * (Math.sin((360 / 5 * 3) * Math.PI / 180)).toFixed(1);
                this.fourthParmsY = this.radius * (Math.cos((360 / 5 * 3) * Math.PI / 180)).toFixed(1);
                this.fifthParmsX = this.radius * (Math.sin((360 / 5 * 4) * Math.PI / 180)).toFixed(1);
                this.fifthParmsY = this.radius * (Math.cos((360 / 5 * 4) * Math.PI / 180)).toFixed(1);

                // 向canvas映射地点、参数
                for (let i = 0; i < this.parmas.length; i++) {
                    // 地点
                    ctx.fillStyle = '#f94b52';
                    ctx.fillRect((pxArr[i] - this.xMin) * this.scaleX + canvas.width * 0.15, (this.yMax - pyArr[i]) * this.scaleY + canvas.height * 0.15, 4, 4);

                    // 参数1
                    for (let i = 0; i < this.parmas.length; i++) {
                        ctx.fillStyle = '#a200ec';
                        ctx.fillText("" + Object.values(this.parmas[i])[2], (pxArr[i] - this.xMin) * this.scaleX + canvas.width * 0.15 + this.firstParmsX - 15,
                            (this.yMax - pyArr[i]) * this.scaleY + canvas.height * 0.15 + this.firstParmsY + 8,);
                    }

                    // 参数2
                    for (let i = 0; i < this.parmas.length; i++) {
                        ctx.fillStyle = '#289434';
                        ctx.fillText("" + Object.values(this.parmas[i])[3], (pxArr[i] - this.xMin) * this.scaleX + canvas.width * 0.15 + this.secondParmsX + 3,
                            (this.yMax - pyArr[i]) * this.scaleY + canvas.height * 0.15 + this.secondParmsY + 2);
                    }

                    // 参数3
                    for (let i = 0; i < this.parmas.length; i++) {
                        ctx.fillStyle = '#3a24ed';
                        ctx.fillText("" + Object.values(this.parmas[i])[4], (pxArr[i] - this.xMin) * this.scaleX + canvas.width * 0.15 + this.thirdParmsX,
                            (this.yMax - pyArr[i]) * this.scaleY + canvas.height * 0.15 + this.thirdParmsY);
                    }

                    // 参数4
                    for (let i = 0; i < this.parmas.length; i++) {
                        ctx.fillStyle = "#e01549"
                        ctx.fillText("" + Object.values(this.parmas[i])[5], (pxArr[i] - this.xMin) * this.scaleX + canvas.width * 0.15 + this.fourthParmsX - 4,
                            (this.yMax - pyArr[i]) * this.scaleY + canvas.height * 0.15 + this.fourthParmsY);
                    }

                    // 参数5
                    for (let i = 0; i < this.parmas.length; i++) {
                        ctx.fillStyle = "#1b5cf7"
                        ctx.fillText("" + Object.values(this.parmas[i])[6], (pxArr[i] - this.xMin) * this.scaleX + canvas.width * 0.15 + this.fifthParmsX - 20,
                            (this.yMax - pyArr[i]) * this.scaleY + canvas.height * 0.15 + this.fifthParmsY + 2);
                    }
                }
                return canvas
            },

            // 获取cesium
            getCesium() {
                Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YWQ2NGZkNC0yYjYzLTRiNzEtOWJjMi01Y2I5NGJlMzEyZGQiLCJpZCI6Mjk4NjAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTI4MTI1NTR9.-zUaIBAgYOlJ-36v2q9uy2BK4xPendbHEbX8JjKav-s';
                const viewer = new Cesium.Viewer('cesiumContainer', {
                    imageryProvider: Cesium.createWorldImagery({
                        style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
                    }),
                    baseLayerPicker: false,
                });
                return viewer
            }
        },
    };
</script>

<style scoped>
    #canvas {
        border: 1px solid #0c6f58;
    }

</style>
