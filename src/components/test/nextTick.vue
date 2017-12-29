<template>
    <div>
        <h2>nextTick</h2>
        <h3>{{message}}</h3>
        <el-button @click="change">change</el-button>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                message: "没有更新"
            }
        },
        methods: {
            change () {
                this.message = "更新完成";
                console.log(this.$el.getElementsByTagName("h3")[0].textContent)
                this.$nextTick(function() {
                    console.log(this.$el.getElementsByTagName("h3")[0].textContent)
                })
            }
        }
    }
</script>