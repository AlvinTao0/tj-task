<template>
    <div>
        <h1>keyCodes</h1>
        <input type="text" @keyup="keyUp" placeholder="请输入内容">
        <input type="text" @keyup.media-play-pause="keyUp2" placeholder="请输入内容2">
    </div>
</template>
<script>
/*
    * main.js Vue.config.keyCodes = {} 全局设置了 “media-play-pause” 的自定义键位别名
*/
    export default {
        data () {
            return {

            }
        },
        methods: {
            keyUp (e) {
                console.log(e.keyCode)
            },
            keyUp2 (e) {
                console.log(e.keyCode)
            }
        }
    }
</script>