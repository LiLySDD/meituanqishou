<template>
    <div>
        <el-row>
            <el-button type="primary" @click="addCategory" style="margin-top:20px;">新增城市</el-button>
        </el-row>
        <template>
            <el-table
                    :data="list"
                    stripe
                    border
                    style="width: 680px;margin-top: 20px;text-align: center;"
                    :header-cell-style="{background:'#ccab33',color:'white'}">
                <el-table-column
                        type="index"
                        label="序号"
                        width="80"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="city_name"
                        label="城市"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="area_names"
                        label="区域"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="addCategory2(scope.row)" >添加区域</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: center;margin-top: 20px; width: 680px;">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    :total="total"
                    @current-change="changePage">
            </el-pagination>
        </div>
        </template>
        <!--弹出框-->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" style="width: 80%;margin-left: 10%;" width="30%;">
            <el-form :model="form" :rules="rules" :ref ="form">
                <el-form-item label="城市名称" :label-width="formLabelWidth" prop="name" v-show="qy">
                    <el-input v-model="form.name" style="width: 300px;" ></el-input>
                </el-form-item>
                <el-form-item label="区域名称" :label-width="formLabelWidth" prop="qy" v-show="city">
                    <el-input v-model="form.qy" style="width: 300px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm(form)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "categories",
        data() {
            let checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('城市名称不能为空'));
                } else {
                    callback();
                }
            };
            let checkQy= (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('区域名称不能为空'));
                } else {
                    callback();
                }
            };
            return {
                user: {},
                pageSize:10,
                total:1,
                page:1,
                store_id: '',
                options: [],
                title:'',
                list: [],
                form: {
                    name: '',
                    id: '',
                    qy: '',
                },
                qy: 1,
                city: 1,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                rules: {
                    name: [
                        {validator: checkName, trigger: 'blur'},
                        {required: true,message:'',trigger: 'blur'}
                    ]
                    ,qy: [
                        {validator: checkQy, trigger: 'blur'},
                        {required: true,message:'',trigger: 'blur'}
                    ]
                }
            }

        },
        created(){
            this.user = JSON.parse(sessionStorage.getItem('user'));
            // if(this.user.user_role==='admin'){
            //     this.getStoreList();
            // }
            // else{
            //     this.store_id = this.user.store_id;
                this.getList();
            // }
        },
        methods: {
           
            changePage(val){
                this.page = val;
                this.getList();
            },
            getList(){
                let _this = this;
                this.$ajax.post('city/list',{
                    pageNumber:this.page,
                    pageSize: this.pageSize,
                }).then(res=>{
                    if(res.data){
                        _this.list = res.data.list;
                        that.total = res.data.total;
                    }
                })
            },
            addCategory(){
                this.dialogFormVisible = true;
                this.title = '新增城市';
                this.form.name = '';
                this.form.qy = '';
                this.form.id = '';
                this.qy= 1;
                this.city= 0;
            },
            addCategory2(row){
                this.dialogFormVisible = true;
                this.title = '新增区域';
                this.form.id = row.city_id;
                this.form.name = '';
                this.form.qy = '';
                this.qy= 0;
                this.city= 1;
            },
            handleDelete(row) {
                let that = this;
                this.$confirm('此操作将永久删除该城市及该城市下的区域, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$ajax.post('city/remove', {
                        city_id: row.city_id
                    }).then(res => {
                        if (res.data == 1) {
                            that.$notify({
                                title: '删除成功',
                                message: '删除成功',
                                type: 'success'
                            });
                            that.getList();
                        }
                    });
                });
            },
            submitForm(form) {
                let _this = this;
                // this.$refs[form].validate((valid) => {
                    // if (valid) {
                        if(this.qy){
                            if(form.name==""){
                                alert('城市名称不能为空')
                                return;
                            }
                        }else{
                            if(form.qy==""){
                                alert('区域名称不能为空')
                                return;
                            }
                        }
                        this.dialogFormVisible = false;
                        if(this.form.id===''){
                            _this.$ajax.post('city/save',{
                                city_name: _this.form.name,
                            }).then(res=>{
                                if(res.data==1){
                                    _this.dialogFormVisible = false;
                                    _this.$notify({
                                        title: '成功',
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                    _this.getList();
                                }
                                else{
                                    _this.$notify.error({
                                        title: '错误',
                                        message: '添加失败'
                                    });
                                }
                                
                            })
                        }
                        else{
                            _this.$ajax.post('cityArea/save',{
                                city_id: _this.form.id,
                                area_name: _this.form.qy,
                            }).then(res=>{
                                if(res.data==1){
                                    _this.$notify({
                                        title: '成功',
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                    _this.getList();
                                }
                                else{
                                    _this.$notify.error({
                                        title: '错误',
                                        message: '添加失败'
                                    });
                                }
                                
                            })
                        }
                    // } else {
                    //     return false;
                    // }
                // });
            },

            
            changeName(e){
                let _this = this;
                let reg_str = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");
                let str = '';
                if(reg_str.test(e)){
                    for(let i=0;i<e.length;i++){
                        if(reg_str.test(e[i])){
                            continue
                        }
                        else{
                            str += e[i];
                        }
                    }
                    _this.form.name = str;
                    return false;
                }
            }
        }
    }
</script>

<style scoped>

</style>
