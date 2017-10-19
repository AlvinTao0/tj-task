<template>
    <div>
        <el-menu theme="dark" :default-active="index" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="0">编辑任务</el-menu-item>
            <el-menu-item index="1">任务列表</el-menu-item>
            <el-menu-item index="2">其他</el-menu-item>
        </el-menu>
        <div class="dividend"></div>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                pathList: ["/edit","/list","/other"]
            }
        },
        computed: {
            index() {
                return this.$store.state.count.toString()
            }
        },
        methods: {
            handleSelect(key) {
                this.$router.push(this.pathList[key]);
            },
            setCount(n) {
                this.$store.commit('setCount', n);
            }
        },
        created() {
            console.log(this.index)
        }
    }
</script>
<style scoped>
.dividend{
    height: 30px;
}
.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>