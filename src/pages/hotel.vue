<!-- 酒店主页 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>酒店主页设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-button type="primary" plain @click="addSchool">添加客房</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="apm_det_address" label="客房名称"></el-table-column>
                <el-table-column prop="apm_id_card_noa" label="客房主图"></el-table-column>
                <el-table-column prop="apm_id_card_noa" label="客房详情"></el-table-column>
                <el-table-column label="操作">
                   <template slot-scope="scope">
                      <el-button
                         size="mini"
                         type="primary"
                         @click="handleEdit(scope.$index, scope.row)">编辑详情</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="添加客房" :visible.sync="editVisible" width="500px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="客房名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">上传主图</el-button>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

         <!-- 编辑弹出框 -->
        <el-dialog title="添加客房" :visible.sync="editRoomVisible" width="500px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editRoomVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                fileList: [],
                tableData: [],
                cur_page: 1,
                pageSize: 5,
                total: 0,
                select_cate: '',
                select_word: '',
                is_search: false,
                editVisible: false,
                editRoomVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                }
            }
        },
        created() {
            this.getData();
        },
        computed: {

        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
              this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
              return this.$confirm(`确定移除 ${ file.name }？`);
            },
            getData() {
                const self = this
                this.$axios({
                  method: 'get',
                  url: `/api/admin/order/apm/${self.pageSize}?page=${self.cur_page}`,
                  headers: {
                    Authorization: `bearer ${localStorage.getItem('admin-token')}`
                  }
                })
                .then((res) => {
                    console.log('res',res.data)
                    self.tableData = res.data.data.list
                    self.total = res.data.data.total
                })
            },
            editorPage(){
              this.$router.push({
                path: '/editor'
              })
            },
            handleEdit(){
              this.$router.push({
                path: '/editor'
              })
            },
            handleDelete(){
              this.$confirm('确定删除当前客房?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                        this.$message({
                          type: 'success',
                          message: '删除成功!'
                        });
                      }).catch(() => {
                        this.$message({
                          type: 'info',
                          message: '已取消删除'
                        });          
                      })
            },
            addSchool(){
              this.editVisible = true
            },
            search() {
                this.is_search = true;
            },
            // 保存编辑
            saveEdit() {

            },
            // 确定删除
            deleteRow(){

            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
<style>
  .el-upload--text{
     border:none !important;
     text-align: left;
     margin-left: 10px;
     height:50px;
    }  
</style>
