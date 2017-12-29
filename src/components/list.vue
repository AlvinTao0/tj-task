<template>
  <el-table
      v-if="tableData"
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="名称">
            <span>{{ props.row.title }}</span>
          </el-form-item>
          <el-form-item label="日期">
            <span>{{ props.row.targetDate }}</span>
          </el-form-item>
          <el-form-item label="时间">
            <span>{{ props.row.targetTime }}</span>
          </el-form-item>
          <el-form-item label="详情">
            <span>{{ props.row.content }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      prop="title"
      label="任务名称"
      min-width="100">
    </el-table-column>
    <el-table-column
      prop="targetDate"
      label="日期"
      min-width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      min-width="140">
      <template scope="scope" v-if="tableData.length > 0">
        <el-button @click="del(scope)" type="danger" size="small">删除</el-button>
        <el-button @click="edit(scope)" type="primary" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  import axios from 'axios'
  import moment from 'moment'
  export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      setCount(n) {
          this.$store.commit('setCount', n);
      },
      del(scope) {
        var $this = this;
        console.log(scope)
        var params = {
          _id: scope.row._id
        }
        axios.get('/task/delete', {params: params})
          .then(function(res) {
            var data = res.data;
            if (data.success) {
              $this.$message({
                showClose: true,
                message: data.msg
              });
              $this.tableData.splice(scope.$index, 1)
            }
          })
      },
      edit(scope) {
        var $this = this;
        $this.setCount(0);
        $this.$router.push("/edit?_id=" + scope.row._id);
      },
      getList() {
        var $this = this;
        axios.get("/task/list")
          .then(function(res) {
              var data = res.data;
              if (data.success) {
                var list = res.data.data;
                list.forEach(function(item) {
                  item.targetDate = moment(item.targetDate).format('YYYY-MM-DD');
                  item.targetTime = moment(item.targetTime).format('HH:mm:ss');
                })
                $this.tableData = res.data.data;
              }
          })
      }
    },
    mounted() {
        var $this = this;
        $this.getList();
    }
  }
</script>

<style scoped>
.line{
  text-align: center;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.demo-table-expand .el-form-item:last-of-type {
  width: 100%;
}
</style>