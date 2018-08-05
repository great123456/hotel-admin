<!-- 美食banner -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>美食banner</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-select v-model="bannerId" placeholder="请选择">
                  <el-option
                    v-for="item in bannerList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
              </el-select>
              <el-button type="primary" plain @click="addSchool">添加banner</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="created_at" label="创建日期"></el-table-column>
                <el-table-column label="banner">
                  <template slot-scope="props">
                    <img :src="props.row.atar" alt="" style="width:100px;height:auto;">
                  </template>
                </el-table-column>
                 <el-table-column label="操作">
                   <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                 </el-table-column>
            </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="上传图片" :visible.sync="addVisible" width="500px">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bannerList: [{
                  label: '美食banner',
                  id: 1
                },{
                  label: '服务banner',
                  id:2
                }],
                bannerId:1,
                tableData: [],
                fileList: [],
                cur_page: 1,
                fileName:'',
                schoolId:'',
                addVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    atar: '',
                    position: '',
                    hospital: '',
                    department: '',
                    good_at: '',
                    introduction: '',
                    content: ''
                },
                imageUrl: '',
                deleteId: ''
            }
        },
        created() {
            this.getData();
        },
        computed: {
           token(){
             return {
               Authorization: `bearer ${localStorage.getItem('admin-token')}`
             }
           }
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
            fileChange(){                                           //选择文件
              this.fileName = document.getElementById("file").files[0].name
            },
            uploadImage(){
               const self = this
               if(this.fileName == ''){
                 self.$message.error('请先选择上传的图片文件')
                 return
               }
               var files = document.getElementById("file").files[0]
               var url = '/api/admin/upload/upload-image'
               var xhr = new XMLHttpRequest()
               var formData = new FormData()
               formData.append('img',files)
               xhr.open('POST', url, true)
               xhr.onreadystatechange = function(response){
                  if(xhr.readyState==4){
                    if(xhr.status==200){
                       let res = JSON.parse(xhr.responseText)
                       console.log('res',res);
                      if(res.code == 200){
                       self.$message.success('上传头像成功')
                       self.form.atar = res.data.url
                       console.log('url',self.form.atar)
                      }else{
                       self.$message.error(res.msg)
                      }
                    }else{
                     self.$message.error(`系统繁忙(code:${xhr.status})`)
                    }
                  }
               }
               xhr.setRequestHeader("Authorization", `bearer ${localStorage.getItem('admin-token')}`)
               xhr.send(formData)
            },
            selectChange(){
              this.getData()
            },
            getData(){
              const self = this
              this.$axios({
                method: 'get',
                url: `/api/admin/doctor/list/10?page=1`,
                headers: {
                  Authorization: `bearer ${localStorage.getItem('admin-token')}`
                }
              })
              .then((res) => {
                  self.tableData = res.data.data.list
                  self.tableData.forEach(function(item){
                    item.atar = 'https://healthapi.hxgtech.com'+item.atar
                  })
                  console.log('res-zdi',self.tableData);
              })
            },
            addSchool(){
              this.fileName = ''
              this.addVisible = true
            },
            // 保存编辑
            saveEdit() {
              const self = this
              this.$axios({
                method: 'post',
                url: `/api/admin/doctor/store`,
                headers: {
                  Authorization: `bearer ${localStorage.getItem('admin-token')}`
                },
                data: {
                  name: self.form.name,
                  atar: self.form.atar,
                  position: self.form.position,
                  hospital: self.form.hospital,
                  department: self.form.department,
                  good_at: self.form.good_at,
                  introduction: self.form.introduction,
                  content: self.form.content,
                  sort: 1,
                  is_recommend: 1
                }
              })
              .then((res) => {
                if(res.data.code == 200){
                  self.$message.success('添加成功')
                  self.addVisible = false
                  self.getData()
                }else{
                  self.$message.error('添加失败')
                }
              })
            },
            handleDelete(row){
               this.deleteId = row.id
               this.$confirm('确定删除当前banner?', '提示', {
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
        width: 200px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .file-put{
            margin-top:10px;
            margin-left: 20px;
            position: relative;
            width: 90px;
            height: 26px;
            border: 1px solid #99D3F5;
            overflow: hidden;
            color: #ffffff;
            text-decoration: none;
            text-indent: 0;
            line-height: 26px;
            background: #409EFF;
            cursor: pointer;
            text-align: center;
            input{
              position: absolute;
              font-size: 16px;
              right: 0;
              top: 0;
              opacity: 0;
              cursor: pointer;
            }
          }
          .file-name{
            text-indent:20px;
          }
</style>
