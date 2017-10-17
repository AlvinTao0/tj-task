<template>
    <div>
        <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="a">编辑任务</el-menu-item>
            <el-menu-item index="b">任务列表</el-menu-item>
            <el-menu-item index="c">其他</el-menu-item>
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
                activeIndex: '1',
                pathList: {
                    a: "/edit",
                    b: "/list",
                    c: "/other"
                }
            }
        },
        methods: {
            handleSelect(key) {
                this.$router.push(this.pathList[key]);
            }
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