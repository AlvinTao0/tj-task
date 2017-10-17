<template>
    <el-row>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                info: {}
            }
        },
        methods: {
            getInfo() {
                
            }
        },
        mounted() {
            var $this = this;
            $this.getInfo();
        }
    }
</script>