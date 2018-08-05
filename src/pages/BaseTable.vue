<!-- 美食订单 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>订单列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-select v-model="typeId" placeholder="请选择订单类型">
                  <el-option
                    v-for="item in typeList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
              </el-select>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="created_at" label="订单日期" sortable width="200"></el-table-column>
                <el-table-column prop="created_ata" label="订单类型" sortable width="200"></el-table-column>
                <el-table-column prop="apm_name" label="姓名" width="120"></el-table-column>
                <el-table-column prop="apm_phone" label="手机号" width="200"></el-table-column>
                <el-table-column prop="apm_det_address" label="房间号" width="120"></el-table-column>
                <el-table-column prop="apm_id_card_no" label="身份证号码" width="200"></el-table-column>
                <el-table-column prop="apm_pre_addressa" label="菜品详情" width="200"></el-table-column>
                <el-table-column prop="apm_pre_addressa" label="备注信息" width="200"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="500px">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                typeList: [{
                    label: '美食订单',
                    id: 1
                },{
                    label: '服务订单',
                    id: 2
                }],
                typeId: 1,
                tableData: [],
                cur_page: 1,
                pageSize: 5,
                total: 0,
                select_cate: '',
                select_word: '',
                is_search: false,
                editVisible: false,
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
