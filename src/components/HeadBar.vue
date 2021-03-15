<template>
    <div>
        <el-row :span="24" class="header">
            <el-col :span="3" :xl="3" :lg='3' style="width: 230px" class="logo" >
                {{sysName}}
            </el-col>
            <el-col :span="15" :xl="15" :lg='15'>
                <!-- 顶部路由 -->
                <el-menu :default-active="selectIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="headBar.length>0" background-color="#6666CC" text-color="#fff" active-text-color="#FFFF66" style="margin-left: 20px;">
                    <template v-for="(item,index) in headBar">
                        <el-menu-item :index="index+''" :disabled="item.disabled">{{item.name}}</el-menu-item>
                    </template>
                </el-menu>
            </el-col>
            <el-col :span="4" :xl="4" :lg='4' style="color: #fff; width: 230px; float: right">
                {{sysUserName}}
                <el-button @click="logout" size="small" style="margin-left: 20px;border: 1px solid white">退出登录</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "HeadBar",
        props:{
            selectIndex: String,
            require: true
        },
        data(){
            return{
                user: {},
                sysName: '',//模块名称
                sysUserName: '',
                headBar: [],
                show: false,
            }
        },
        created() {
            this.user = JSON.parse(sessionStorage.getItem('user'));
            console.log(this.user);
            let index = Number(sessionStorage.getItem('moduleSelectIndex'));
            this.sysName = this.user.user_module[index].module_name;
            this.sysUserName = this.user.user_name;
            this.headBar = this.user.user_module[index].navBar;
            // this.selectIndex = this.headBar[0].id+'';
            console.log(this.headBar);
        },
        methods:{
            //退出登录
            logout: function () {
                let _this = this;
                this.$confirm('确认退出吗?', '提示', {

                }).then(() => {
                    sessionStorage.removeItem('user');
                    _this.$router.push('/login');
                }).catch(() => {

                });
            },
            handleSelect(key, keyPath) {
                let _this = this;
                this.selectIndex = key;
                let status = Number(this.headBar[Number(key)].id);
                console.log('selectIndex='+key);
                console.log('status='+status);
                let role = this.user.user_role;
                console.log('role='+role);
                this.headBar = [];
                for(let item of this.$router.options.routes){
                    if(item.meta && item.meta.role.indexOf(role)>-1 && status === item.meta.status){
                        console.log("path=>"+item.children[0].path)
                        _this.$router.push(item.children[0].path);
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        height: 60px;
        line-height: 60px;
        background: #6666CC;
        color: #fff;
    }
    .logo {
        width:230px;
        height:60px;
        font-size: 22px;
        padding-left:20px;
        padding-right:20px;
        border-color: rgba(238,241,146,0.3);
        border-right-width: 1px;
        border-right-style: solid;

        .txt {
            color:#fff;
        }
    }
</style>
<style>
    .el-menu.el-menu--horizontal {
        border-bottom: none;
    }
</style>