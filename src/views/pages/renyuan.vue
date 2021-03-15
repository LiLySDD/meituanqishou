<template>
    <div style="margin-top: 5px">
        <template>
            <el-table
                    :data="tableList"
                    stripe
                    style="width: 1380px;"
                    :header-cell-style="{background:'#ccab33',color: '#fff'}"
                    border>
                <el-table-column
                        label="序号"
                        type="index"
                        align="center"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="user_name"
                        label="姓名"
                        align="center"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="user_contact_number"
                        label="电话"
                        align="center"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="age"
                        label="年龄"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="native_place"
                        label="籍贯"
                        align="center"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="sy_date"
                        label="意向地区"
                        align="center"
                        width="200">
                        <template slot-scope="scope">
                            <span>{{scope.city_name}},{{scope.area_name}}</span>
                        </template>
                </el-table-column>
                <el-table-column
                        prop="user_status_name"
                        label="状态"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="action"
                        label="操作"
                        align="center"
                        width="320">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" v-show="scope.row.user_status<1" @click="toDetail(scope.row)">已联系{{scope.user_status}}</el-button>
                        <el-button size="mini" type="danger" v-show="scope.row.user_status<2" @click="toAddForm(scope.row)">不合适{{scope.user_status}}</el-button>
                        <el-button size="mini" type="success" v-show="scope.row.user_status<3" @click="cancelAdd(scope.row)">入职</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <div style="display: flex;justify-content: center;margin-top: 20px; width: 1380px;">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    :total="total"
                    @current-change="changePage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "renyuan",
        data(){
            return{
                tableList:[],
                pageSize:10,
                total:1,
                page:1,
                account: '',
            }
        },
        created(){
            this.user = JSON.parse(sessionStorage.getItem('user'));
            this.account = this.user.account
            console.log(this.user)
            this.getList();
        },
        methods:{
            changePage(val){
                this.page = val;
                this.getList();
            },
            getList(){
                let that = this;
                this.$ajax.post('user/list',{
                    pageNumber:this.page,
                    pageSize: this.pageSize,
                    account :this.account,
                }).then(res=>{
                    that.tableList = res.data.list;
                    that.total = res.data.total;
                });
            },
            //查看详情user_status 用户状态  0-新增  1-已联系  2-不合适  3-入职
            toDetail(row){
                let sta = '1'
                this.geng(sta,row.user_id);
            },
            toAddForm(row){
               let sta = '2'
                this.geng(sta,row.user_id);
            },
            cancelAdd(row){
                let sta = '3'
                this.geng(sta,row.user_id);
            },
            geng(sta,user_id){
                let that = this;
                this.$ajax.post('user/status',{
                    user_id: user_id,
                    user_status: sta
                }).then(res=>{
                    that.getList();
                });
            }
        }
    }
</script>

<style scoped>

</style>
