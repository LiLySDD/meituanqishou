<!-- 汽车系统 登录页面 -->
<template>
    <div>
        <el-row :style="{ width:w }" class="demo-ruleForm login-container1 block" >
            <el-row class="title_login"><b>美团骑手系统登录中心</b></el-row>
            <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-position="left" label-width="0px" style="text-align: center;margin-top: 20px;">
                <el-form-item prop="account">
                    <el-input placeholder="请输入用户名" v-model="ruleForm2.account" onfocus="this.select()">
                        <template slot="prepend"><i class="fa fa-user" ></i></template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" v-model="ruleForm2.password" type="password" onfocus="this.select()">
                        <template slot="prepend"><i class="fa fa-lock"></i></template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :size="screenWidth>600?'':'mini'" @click="submitForm('ruleForm2')" style="width: 100%">登 录</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                ruleForm2: {
                    account: '',
                    password: ''
                },
                rules: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ]
                },
                class1:'',
                screenWidth: '',
                w: '',
            };
        },
        // VUE 声明周期函数，初始化渲染
        created(){
            let _this = this;
            _this.screenWidth = document.documentElement.clientWidth;
            if(_this.screenWidth>500){
                _this.class1 = 'login-container1';
                _this.w = '500px';
            }
            else{
                _this.class1 = 'login-container2';
                _this.w = '70%';
            }
            window.onresize = function temp() {
                _this.screenWidth = document.documentElement.clientWidth;
                if(_this.screenWidth>500){
                    _this.class1 = 'login-container1';
                    _this.w = '500px';
                }
                else{
                    _this.class1 = 'login-container2';
                    _this.w = '70%';
                }
            };

        },
        methods: {
            submitForm(ev) {
                let _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        _this.$ajax.post('account/login',{
                            account: _this.ruleForm2.account,
                            password: _this.ruleForm2.password,
                        }).then(res=>{
                            console.log('login',res)
                            if(res.status !== 200){
                                alert('登录失败，账户或密码不正确')
                                this.$router.go(0)
                            }
                            if(res.data.return_code&&res.data.return_code=='SUCCESS'){
                                // let imte1 = res.data.responseData;
                                // let permission = JSON.parse(imte1.permissionInfo);
                                // let user_module = [];
                                // for(let item of permission){
                                //     let obj = {};
                                //     obj.module_id = item.moudleID;
                                //     obj.module_name = item.moduleName;
                                //     obj.navBar = [];
                                //     for(let i of item.navBar){
                                //         let o = {};
                                //         o.id = i.navBarID;
                                //         o.name = i.navBarName;
                                //         o.disabled = i.isClicked;
                                //         obj.navBar.push(o);
                                //     }
                                //     user_module.push(obj);
                                // }
                                let user = {
                                    account: res.data.result.account,
                                    qx: res.data.result.qx_status
                                };
                                sessionStorage.setItem('user',JSON.stringify(user));
                                _this.$router.replace('/renyuan')
                            }
                        });
                    }
                });
            },
        },
    }

</script>

<style scoped>
    .block{
        position: absolute;
        left: 50%;
        top: 25%;
        transform: translate(-50%,-50%);
        padding: 20px 40px 0 40px;
    }
    .title_login{
        font-size: 24px;color: #ccab33;text-align: center!important;height: 60px;line-height: 60px;
    }
    .headCla {
        text-align: center;
        border-radius: 5px 5px 0 0;
        border-bottom: 1px solid #1c6ca1;
    }

    .cla {
        display: inline-block;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
        font-size: 15px;
        margin: 10px 0 0 0;
    }

    .active {
        border: 1px solid #1c6ca1;
        color: #333;
        border-radius: 5px 5px 0 0;
    }
    .login-container1 {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        /*background-color: #1c6ca1;*/
        background-clip: padding-box;
        margin: 0 auto;
        width: 400px;
        border-right: none;
        box-shadow: 0 0 25px #cac6c6;
        padding-bottom: 15px;
        margin-top: 10%;
    }
    .login-container2 {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        /*background-color: #1c6ca1;*/
        background-clip: padding-box;
        margin: 30% 10% 0 10%;
        width: 80%;
        border-right: none;
        box-shadow: 0 0 25px #cac6c6;
        padding-bottom: 15px;
    }

    .el-checkbox__inner {
        border-radius: 2px;
    }

    .el-checkbox__input.is-focus .el-checkbox__inner {
        border-color: #fff;
        border-radius: 2px;
    }

    .el-checkbox__inner:hover {
        border-color: #fff;
        border-radius: 2px;
    }

    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #1c6ca1;
        border-color: #fff;
        border-radius: 2px;
    }
</style>
