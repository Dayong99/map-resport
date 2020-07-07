<template>
    <div>
        <div id="cesiumContainer"></div>
        <!--        <canvas id="canvas"></canvas>-->
        <!--        <canvas id="canvas" :width="getWidth" :height="getHeight"></canvas>-->
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
                getWidth: 0,
                getHeight: 0,
                scaleX: '',
                scaleY: '',
                radius: 7,
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
                img: '',

                arr: []
            };
        },
        created() {
            this.get();
        },
        watch: {
            scaleLevelL(newVal) {
                // console.log(this.scaleLevelL)
                // if (newVal === 1) {
                //     this.removeLayer()
                //     this.getWidth = 0
                //     this.getHeight = 0
                //     this.getLayer()
                // } else if (newVal === 2) {
                //     this.removeLayer()
                //     this.getWidth = 0
                //     this.getHeight = 0
                //     this.getLayer()
                // } else if (newVal === 3) {
                //     this.removeLayer()
                //     this.getWidth = 775 / 0.55
                //     this.getHeight = 295 / 0.55
                //     this.getLayer()
                // } else if (newVal === 4) {
                //     this.removeLayer()
                //     this.getWidth = 775 / 0.32
                //     this.getHeight = 295 / 0.32
                //     this.getLayer()
                // } else if (newVal === 5) {
                //     this.removeLayer()
                //     this.getWidth = 775 / 0.17
                //     this.getHeight = 295 / 0.17
                //     this.getLayer()
                // } else if (newVal === 6) {
                //     this.removeLayer()
                //     this.getWidth = 775 / 0.1
                //     this.getHeight = 295 / 0.1
                //     this.getLayer()
                // } else if (newVal === 7) {
                //     this.removeLayer()
                //     this.getWidth = 775 / 0.065
                //     this.getHeight = 295 / 0.065
                //     this.getLayer()
                // } else if (newVal === 8) {
                //     this.removeLayer()
                //     this.getWidth = 775 / 0.0477
                //     this.getHeight = 295 / 0.0477
                //     this.getLayer()
                // } else if (newVal === 9) {
                //     this.removeLayer()
                //     this.getWidth = 0
                //     this.getHeight = 0
                //     this.getLayer()
                // }
                console.log(this.scaleLevelL)
                if (newVal === 1) {
                    this.removeLayer()
                    this.getWidth = 0
                    this.getHeight = 0
                    this.getLayer()
                } else if (newVal === 2) {
                    this.removeLayer()
                    this.getWidth = 0
                    this.getHeight = 0
                    this.getLayer()
                } else if (newVal === 3) {
                    this.removeLayer()
                    this.getWidth = 78 * 2.5
                    this.getHeight = 30 * 2.5
                    this.getLayer()
                } else if (newVal === 4) {
                    this.removeLayer()
                    this.getWidth = 78*3.5
                    this.getHeight = 30*3.5
                    this.getLayer()
                } else if (newVal === 5) {
                    this.removeLayer()
                    this.getWidth = 78*6.5
                    this.getHeight = 30*6.5
                    this.getLayer()
                } else if (newVal === 6) {
                    this.removeLayer()
                    this.getWidth = 78*13
                    this.getHeight = 30*13
                    this.getLayer()
                } else if (newVal === 7) {
                    this.removeLayer()
                    this.getWidth = 78*25
                    this.getHeight = 30*25
                    this.getLayer()
                } else if (newVal === 8) {
                    this.removeLayer()
                    this.getWidth = 78*50
                    this.getHeight = 30*50
                    this.getLayer()
                } else if (newVal === 9) {
                    this.removeLayer()
                    this.getWidth = 78*120
                    this.getHeight = 30*120
                    this.getLayer()
                } else if (newVal === 10) {
                    this.removeLayer()
                    this.getWidth = 78*209
                    this.getHeight = 30*209
                    this.getLayer()
                } else if (newVal === 11) {
                    this.removeLayer()
                    this.getWidth = 78*209
                    this.getHeight = 30*209
                    this.getLayer()
                } else if (newVal === 12) {
                    this.removeLayer()
                    this.getWidth = 78 * 209
                    this.getHeight = 30 * 209
                    this.getLayer()
                } else if (newVal === 13) {
                    this.removeLayer()
                    this.getWidth = 78*210
                    this.getHeight = 30*210
                    this.getLayer()
                }
            }
        },
        methods: {
            // 获取cesium
            getCesium() {
                Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(90, -20, 110, 90);
                Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YWQ2NGZkNC0yYjYzLTRiNzEtOWJjMi01Y2I5NGJlMzEyZGQiLCJpZCI6Mjk4NjAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTI4MTI1NTR9.-zUaIBAgYOlJ-36v2q9uy2BK4xPendbHEbX8JjKav-s';
                window.earth = new Cesium.Viewer('cesiumContainer', {
                    imageryProvider: Cesium.createWorldImagery({
                        style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
                    }),
                    baseLayerPicker: false,
                });
            },

            // 获取数据
            async get() {
                const {data: res} = await this.axios('http://192.168.1.2:8301/'
                    + 'convection/api/autostation/show?basic='
                    + '1&encrypt=1&time=2020-01-02%2014%3A50%3A00');
                this.parmas = res.data;

                this.getCesium()

                // 获取camera的高度
                // 根据camera高度近似计算当前层级
                // 监听地图移动完成事件
                window.earth.camera.moveStart.addEventListener(() => {
                    let height = Math.ceil(window.earth.camera.positionCartographic.height)
                    let A = 40487.57
                    let B = 0.00007096758
                    let C = 91610.74
                    let D = -40467.74
                    this.scaleLevelL = Math.round(D + (A - D) / (1 + Math.pow(height / C, B)))
                    // console.log(this.scaleLevelL)
                },)
            }
            ,

            // 获得canvas
            getCanvas() {
                const pyArr = []
                const pxArr = []
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
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                canvas.width = this.getWidth
                canvas.height = this.getHeight
                // ctx.font = 'normal small-caps 550 14px serif'
                // ctx.font = 'normal normal 510 17px Arial'
                // ctx.font = 'normal normal 550 17px Monospace'
                // 放大倍数
                // ctx.font = 'normal small-caps 550 14px serif'
                // let scale = 0.08
                ctx.font = 'normal small-caps 550 12px serif'
                let scale = 0.5
                this.scaleX = canvas.width / (this.xMax - this.xMin) * scale
                this.scaleY = canvas.height / (this.yMax - this.yMin) * scale
                // 矩形范围
                let west = this.xMin + (this.xMax - this.xMin) / 2 - (this.xMax - this.xMin) / scale / 2
                let south = this.yMin + (this.yMax - this.yMin) / 2 - (this.yMax - this.yMin) / scale / 2
                let east = this.xMin + (this.xMax - this.xMin) / 2 + (this.xMax - this.xMin) / scale / 2
                let north = this.yMin + (this.yMax - this.yMin) / 2 + (this.yMax - this.yMin) / scale / 2
                // 参数位置
                this.firstParmsX = this.radius * (Math.sin((0) * Math.PI / 180)).toFixed(1)
                this.firstParmsY = this.radius * (Math.cos((0) * Math.PI / 180)).toFixed(1)
                this.secondParmsX = this.radius * (Math.sin((360 / 5) * Math.PI / 180)).toFixed(1)
                this.secondParmsY = this.radius * (Math.cos((360 / 5) * Math.PI / 180)).toFixed(1)
                this.thirdParmsX = this.radius * (Math.sin((360 / 5 * 2) * Math.PI / 180)).toFixed(1)
                this.thirdParmsY = this.radius * (Math.cos((360 / 5 * 2) * Math.PI / 180)).toFixed(1)
                this.fourthParmsX = this.radius * (Math.sin((360 / 5 * 3) * Math.PI / 180)).toFixed(1)
                this.fourthParmsY = this.radius * (Math.cos((360 / 5 * 3) * Math.PI / 180)).toFixed(1)
                this.fifthParmsX = this.radius * (Math.sin((360 / 5 * 4) * Math.PI / 180)).toFixed(1)
                this.fifthParmsY = this.radius * (Math.cos((360 / 5 * 4) * Math.PI / 180)).toFixed(1)
                // 向canvas映射地点、参数
                for (let i = 0; i < this.parmas.length; i++) {
                    // 地点
                    ctx.fillStyle = '#f94b52'
                    ctx.fillRect((pxArr[i] - this.xMin) * this.scaleX + canvas.width * (1 - scale) / 2, (this.yMax - pyArr[i]) * this.scaleY + canvas.height * (1 - scale) / 2, 4, 4)
                    // 参数1
                    for (let i = 0; i < this.parmas.length; i++) {
                        ctx.fillStyle = '#a200ec'
                        ctx.fillText('' + Object.values(this.parmas[i])[2], (pxArr[i] - this.xMin) * this.scaleX + canvas.width * (1 - scale) / 2 + this.firstParmsX - 17,
                            (this.yMax - pyArr[i]) * this.scaleY + canvas.height * (1 - scale) / 2 + this.firstParmsY + 7,)
                    }
                    // 参数2
                    for (let i = 0; i < this.parmas.length; i++) {
                        ctx.fillStyle = '#289434'
                        ctx.fillText('' + Object.values(this.parmas[i])[3], (pxArr[i] - this.xMin) * this.scaleX + canvas.width * (1 - scale) / 2 + this.secondParmsX + 8,
                            (this.yMax - pyArr[i]) * this.scaleY + canvas.height * (1 - scale) / 2 + this.secondParmsY + 2)
                    }
                    // 参数3
                    for (let i = 0; i < this.parmas.length; i++) {
                        ctx.fillStyle = '#3a24ed'
                        ctx.fillText('' + Object.values(this.parmas[i])[4], (pxArr[i] - this.xMin) * this.scaleX + canvas.width * (1 - scale) / 2 + this.thirdParmsX,
                            (this.yMax - pyArr[i]) * this.scaleY + canvas.height * (1 - scale) / 2 + this.thirdParmsY)
                    }
                    // 参数4
                    for (let i = 0; i < this.parmas.length; i++) {
                        ctx.fillStyle = '#e01549'
                        ctx.fillText('' + Object.values(this.parmas[i])[5], (pxArr[i] - this.xMin) * this.scaleX + canvas.width * (1 - scale) / 2 + this.fourthParmsX - 10,
                            (this.yMax - pyArr[i]) * this.scaleY + canvas.height * (1 - scale) / 2 + this.fourthParmsY)
                    }
                    // 参数5
                    for (let i = 0; i < this.parmas.length; i++) {
                        ctx.fillStyle = '#1b5cf7'
                        ctx.fillText('' + Object.values(this.parmas[i])[6], (pxArr[i] - this.xMin) * this.scaleX + canvas.width * (1 - scale) / 2 + this.fifthParmsX - 25,
                            (this.yMax - pyArr[i]) * this.scaleY + canvas.height * (1 - scale) / 2 + this.fifthParmsY + 2)
                    }
                }
                // canvas.toBlob(function (blob) {
                //     var a = document.createElement('a')
                //     var body = document.getElementsByTagName('body')
                //     document.body.appendChild(a)
                //     a.download = 'img' + '.jpg'
                //     a.href = window.URL.createObjectURL(blob)
                //
                //     a.click()
                //     document.body.removeChild('a')
                // })
                return {
                    canvas: canvas,
                    west: west,
                    south: south,
                    east: east,
                    north: north,
                }
            }
            ,

            // 清除图层
            removeLayer() {
                // let oneLayer = this.getLayer()
                // window.earth.imageryLayers.remove(oneLayer)
                this.arr.forEach(item => {
                    window.earth.imageryLayers.remove(item)
                })
                this.arr = []
            }
            ,

            // 获得图层，将canvas画到cesium上
            getLayer() {
                // 从getCanvas()中获取canvas的url
                // 从getCanvas()中获取canvas的四角
                let obj = {

                }
                obj = this.getCanvas()
                // let west = this.getCanvas().west
                // let south = this.getCanvas().south
                // let east = this.getCanvas().east
                // let north = this.getCanvas().north

                // 解决cesium锯齿和页面模糊问题:1.改变地图灰度系数
                let layer0 = window.earth.scene.imageryLayers.get(0);
                layer0.gamma = 0.8;

                // 解决cesium锯齿和页面模糊问题:2.关闭抗锯齿
                window.earth.scene.fxaa = false
                window.earth.scene.postProcessStages.fxaa.enabled = false;

                // 解决cesium锯齿和页面模糊问题: 3.使viewer.resolutionScale的值等于window.devicePixelRatio值
                if(Cesium.FeatureDetection.supportsImageRenderingPixelated()){//判断是否支持图像渲染像素化处理
                    window.earth.resolutionScale = window.devicePixelRatio;
                }

                let layers = window.earth.scene.imageryLayers
                const layerLoad = layers.addImageryProvider(
                    new Cesium.SingleTileImageryProvider({
                        url: obj.canvas.toDataURL(),
                        rectangle: Cesium.Rectangle.fromDegrees(obj.west, obj.south, obj.east, obj.north),
                    }),
                )
                // window.earth.imageryLayers.remove(layerLoad)
                // return layerLoad
                this.arr.push(layerLoad)
            }
            ,

            // 清除canvas
            removeCanvas() {
                // document.getElementById("canvas").clearCanvas()

                // let c = document.getElementById("canvas");
                // let cxt = c.getContext("2d");
                // c.height = c.height;

                // this.getCanvas().setAttribute('height', '2')

                // this.getCanvas().getContext("2d").clear()

                // this.getCanvas().width = this.getCanvas().width

                // let oneCanvas = document.getElementById("canvas");
                // let ctx = oneCanvas.getContext("2d");
                // // oneCanvas = ''
                // // ctx = ''
                // oneCanvas.style.width = 0 + 'px'
                // oneCanvas.style.width = 0 + 'px'
                // ctx.font = '';
                //
                //     let oneCanvas = this.getCanvas()
                //     oneCanvas = ''
            },
        },
    }
</script>

<style scoped>
    #canvas {
        border: 1px solid #0c6f58;
    }
</style>
