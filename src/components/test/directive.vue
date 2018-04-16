<template>
    <div>
        <h2>指令</h2>
        <p>{{number}}</p>
        <p v-if="number" v-once>{{number}}</p>
        <el-button @click="show = true">打开</el-button>
        
        <img 
            src="../../assets/logo.png" 
            v-tap="{ callback: count}" 
            @touchstart="start" 
            @touchend="end"
        >
        <todo-item 
            :number="number" 
            v-on:delete="deleteNumber"
        ></todo-item>
        <span v-pre>{{ this will not be compiled }}</span>
        <transition-group name="fade">
            <div :key="1" v-if="show" class="fixed" >
                <el-button :key="0" @click="show = false">关闭</el-button>
            </div>
        </transition-group>
        <div class="mask" v-if="show"></div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                number: 0,
                show: true
            }
        },
        methods: {
            deleteNumber () {
                this.number = 0
            },
            count () {
                this.number ++
            },
            start () {
                console.log("v-on-start")
            },
            end () {
                console.log("v-on-end")
            }
        },
        directives: {
            "tap": {
                inserted: function(el, binding) {
                    var started = false;
                    var startTime,endTime;
                    console.log(el)
                    el.addEventListener('touchstart', function() {
                        event.preventDefault()
                        console.log("v-tap-start")
                        started = true;
                        startTime = new Date().getTime();
                    })
                    el.addEventListener('touchend', function() {
                        console.log("v-tap-end")
                        if (started) {
                            endTime = new Date().getTime();
                            if (endTime - startTime <= 200) {
                                console.log("tap is true");
                                binding.value.callback();
                            }
                            started = false
                        }
                    })
                }
            }
        },
        components: {
            "TodoItem": {
                props: {
                    number: {
                        type: Number,
                        required: true
                    }
                },
                watch: {
                    number(data) {
                        console.log(data, "watch")
                    }
                },
                template: `
                    <span>
                        {{ number }}
                        <button @click="$emit('delete')">
                            X
                        </button>
                    </span>
                `
            }
        },
        mounted () {
            this.number = 999999;
            if (isIphoneX()) {
                alert("是 iphoneX")
            } else {
                alert("不是 iphoneX")
            }
            function isIphoneX(){
                alert(navigator.userAgent);
                return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
            }
        }
    }
</script>
<style>
.fixed{
    position: fixed;
    width: 100%;
    height: 200px;
    bottom: 0;
    left: 0;
    background: pink;
    z-index: 2;
}
.mask{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 1;

}
.fade-enter-active, .fade-leave-active {
    transform: translateY(0);
  transition: .3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  transform: translateY(100%)
}
</style>