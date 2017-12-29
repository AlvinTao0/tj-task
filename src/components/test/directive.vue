<template>
    <div>
        <h2>指令</h2>
        <p>{{number}}</p>
        <img src="../../assets/logo.png" alt="" v-tap="{ callback: count}" @touchstart="start" @touchend="end">
    </div>
</template>
<script>
    export default {
        data () {
            return {
                number: 0
            }
        },
        methods: {
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
        }
    }
</script>