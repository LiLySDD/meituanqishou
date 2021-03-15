<template>
    <div>
        <el-row>
            <el-button type="primary" @click="showModel" style="margin-top:20px;">新增</el-button>
        </el-row>
        <template>
            <el-table
                    :data="tableData"
                    stripe
                    border
                    style="width: 970px;margin-top: 20px;text-align: center;"
                    :header-cell-style="{background:'#ccab33',color:'white'}">
                <el-table-column
                        type="index"
                        label="序号"
                        width="80"
                        align="center" >
                </el-table-column>
                <el-table-column
                        prop="account"
                        label="用户名"
                        align="center"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="password"
                        label="密码"
                        align="center"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="city_name"
                        label="城市"
                        align="center"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="area_names"
                        label="区域"
                        align="center"
                        width="250">
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        width="160">
                    <template slot-scope="scope">
                        <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: center;margin-top: 20px; width: 970px;">
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
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="40%;">
            <el-form :model="form" :rules="rules" :ref="form">
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name" >
                    <el-input v-model="form.name" autocomplete="off" style="width: 300px;" onkeyup="this.value=this.value.replace(/\s+/g,'')" />
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="password" autocomplete="off" >
                    <el-input v-model="form.password" :type="type" onfocus="this.type='password'" style="width: 300px;" onkeyup="this.value=this.value.replace(/\s+/g,'')" />
                </el-form-item>
                <el-form-item label="区域" :label-width="formLabelWidth" prop="position" >
                    <el-select v-model="form.position" placeholder="请选择城市" @change="chang">
                        <el-option v-for="item of positon" :label="item.label" :value="item" :key="item.index" :disabled="item.disabled" />
                    </el-select>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth" prop="qy2">
                    <el-checkbox-group v-model="form.qy2">
                        <el-checkbox v-for="item of qy" :label="item.value" :key="item.index" name="type">{{item.label}}</el-checkbox>
                    </el-checkbox-group>
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
        name: "zhanghao",
        data() {
            var checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('姓名不能为空'));
                } else {
                    callback();
                }
            };
            var selectPosition = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请选择城市'));
                } else {
                    callback();
                }
            };
            var checkQy = (rule, value, callback) => {
                if (value.length==0) {
                    return callback(new Error('区域不能为空'));
                } else {
                    callback();
                }
            };
            var checkPassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('密码不能为空'));
                } else {
                    callback();
                }
            };
            return {
                title: '',
                tableData: [],
                form: {
                    name: '',
                    position: {},
                    qy2: [],
                    password: '',
                },
                dialogFormVisible: false,
                formLabelWidth: '120px',
                rules: {
                    name: [
                        {validator: checkName, trigger: 'blur'},
                        {required: true,message:'',trigger: 'blur'}
                    ],
                    position: [
                        {validator: selectPosition, trigger: 'change'},
                        {required: true,message:'',trigger: 'change'}
                    ],
                    qy2: [
                        {validator: checkQy, trigger: 'change'},
                        {type:'array',required: true,message:'',trigger: 'change'}
                    ],
                    password: [
                        {validator: checkPassword, trigger: 'blur'},
                        {required: true,message:'',trigger: 'blur'}
                    ],
                },
                positon: [],
                qy: [],
                type: 'text',
                city_id: 0,
                pageSize:10,
                total:1,
                page:1,
            }

        },
        created: function () {
                this.getPositionList();
                this.getList();
        },
        methods: {
            changePage(val){
                this.page = val;
                this.getList();
            },
            chang(e){
                console.log(e)
                this.qy = []
                this.city_id = e.value
                this.getQy()
            },
            getQy(){
                let _this = this;
                this.$ajax.post('cityArea/list',{
                    city_id: this.city_id,
                }).then(res=>{
                    if(res.data){
                        for(let item of res.data){
                            let obj = {};
                            obj.value = item.area_id;
                            obj.label = item.area_name;
                            _this.qy.push(obj);
                            console.log('1111',_this.qy)
                        }
                    }
                })
            },
            getPositionList(){
                let that = this;
                this.$ajax.post('city/list', {
                    pageNumber: 1,
                    pageSize: 100
                }).then(res => {
                    if (res.data) {
                        for (let i of res.data.list) {
                            let obj = {};
                            obj.label = i.city_name;
                            obj.value = i.city_id;
                            that.positon.push(obj);
                        }
                    }
                });
            },
            submitForm(form) {
                let that = this;
                 console.log('error submit!!',this.qy3);
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.dialogFormVisible = false;
                        this.$ajax.post('account/save', {
                            account: form.name,
                            city_name: form.position.label,
                            city_id: form.position.value,
                            area_id: form.qy2.toString(),
                            area_name: '',
                            password: form.password,
                        }).then(res => {
                            if (res.data == '1') {
                                that.$notify({
                                        title: '添加成功',
                                        message: '您成功添加了一位名为' + form.name + '的账号',
                                        type: 'success'
                                    });
                                    that.form = {
                                        name: '',
                                        position: '',
                                        qy: '',
                                        password: '',
                                    };
                                    that.type = 'text';
                                    that.getList();
                                    
                                }else{
                                    that.$notify({
                                        title: '添加失败',
                                        message: '添加失败',
                                        type: 'fail'
                                    });
                                }
                            
                        });
                    } else {
                        console.log('error submit!!');
                    }
                });
            },
            
            handleDelete(row) {
                let that = this;
                this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$ajax.post('account/remove', {
                        account_id: row.account_id
                    }).then(res => {
                        if (res.data == 1) {
                            that.$notify({
                                title: '删除成功',
                                message: '您成功删除了一位名为' + row.staff_name + '的账号',
                                type: 'success'
                            });
                            that.getList();
                        }
                    });
                });
                
            },
            showModel() {
                this.dialogFormVisible = true;
                this.title = '新增员工';
                this.form = {
                    name: '',
                    position: '',
                    qy2:[],
                    password: '',
                };
            },
            getList() {
                let that = this;
                this.$ajax.post('account/list', {
                    pageNumber:this.page,
                    pageSize: this.pageSize,
                }).then(res => {
                    if (res.data) {
                        that.tableData = res.data.list;
                        that.total = res.data.total;
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .title {
        background: #4db3ff;
    }
</style>
