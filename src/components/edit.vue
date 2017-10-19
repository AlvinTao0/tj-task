<template>
  <el-row type="flex" justify="center">
    <el-col :span="22">
      <el-form ref="form" :model="form" >
        <el-form-item label="任务名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="任务时间" >
          <el-col :span="24">
            <el-col :span="11" >
              <el-form-item prop="targetDate">
                <el-date-picker type="date" placeholder="选择日期"  v-model="form.targetDate" value="form.targetDateValue" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="targetTime">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.targetTime" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form-item >
        <el-form-item label="任务内容" prop="content">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
          <el-button v-if="isCreate" type="primary" @click="create">立即创建</el-button>
          <el-button v-else type="primary" @click="save">保存</el-button>
          <el-button @click="clean">清空</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  export default {
    data() {
      return {
        form: {
          title: '',
          content: '',
          targetDate: null,
          targetTime: null
        },
        isCreate: null, // true: 创建；false：编辑
        _id: null
      }
    },
    methods: {
      setCount(n) {
          this.$store.commit('setCount', n);
      },
      create() {
        var $this = this;
        console.log('submit!');
        var params = {
          title: this.form.title,
          content: this.form.content,
          targetDate: $this.form.targetDate.getTime(),
          targetTime: $this.form.targetTime.getTime()
        };
        axios.get("/task/create", {params: params})
          .then(function (res) {
            var data = res.data;
            if (data.success) {
              $this.$message({
                showClose: true,
                message: data.msg
              });
              $this.setCount(1);
              $this.$router.push('/list')
            }
          })
      },
      save() {
        var $this = this;
        var params = {
          _id: $this._id,
          title: $this.form.title,
          content: $this.form.content,
          targetDate: $this.form.targetDate.getTime(),
          targetTime: $this.form.targetTime.getTime()
        };
        axios.get("/task/save", {params: params})
          .then(function(res) {
            var data = res.data;
            if (data.success) {
              $this.$message({
                showClose: true,
                message: data.msg
              });
            }
          })
      },
      clean() {
        var $this = this;
        $this.$refs.form.resetFields();
      },
      info() {
        var $this = this;
        var params = {
          _id: $this._id
        }
        axios.get("/task/info", {params: params})
          .then(function(res) {
            var data = res.data;
            if(data.success) {
              data.data[0].targetDate = new Date(data.data[0].targetDate);
              data.data[0].targetTime = new Date(data.data[0].targetTime);
              $this.form = data.data[0];
            }
          })
      }
    },
    mounted() {
      var $this = this;
      if($this.$route.query._id) {
        $this.isCreate = false;
        $this._id = $this.$route.query._id;
        $this.info();
      } else {
        $this.isCreate = true;
      }
    }
  }
</script>

<style scoped>
.line{
  text-align: center;
}
</style>