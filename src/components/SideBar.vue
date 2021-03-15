<template>
    <div>
        <el-menu
                :default-active="path"
                class="el-menu-vertical-demo"
                unique-opened
                router
                @open="handleOpen"
                @close="handleClose">
            <template v-for="(item) in sideBar" v-if="!item.hidden">
                <el-menu-item :index="item.children[0].path" v-if="item.leaf" @click="path = item.children[0].path">
                    <i :class="item.icon"></i>
                    <span slot="title" style="font-size: 14px;">{{item.name}}</span>
                </el-menu-item>
                <el-submenu :index="item.path" v-if="!item.leaf">
                    <template slot="title"><i :class="item.icon"></i>{{item.name}}</template>
                    <template v-for="child in item.children" v-if="!child.hidden">
                        <el-menu-item :index="child.path" :key="child.path" style="font-size: 14px;" @click="path = child.path">
                            <i :class="child.icon"></i>{{child.name}}
                        </el-menu-item>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "SideBar",
        props: {
            selectIndex: String,
            required: true
        },
        data(){
            return{
                user: {},
                sideBar: [],
                path: '',
            }
        },
        created() {
            let _this = this;
            this.user = JSON.parse(sessionStorage.getItem('user'));
            let role = this.user.user_role;
            this.sideBar = [];
            for(let item of this.$router.options.routes){
                if(item.meta && item.meta.role.indexOf(role)>-1 && item.meta.status===_this.selectIndex){
                    _this.sideBar.push(item);
                }
            }
            this.path = this.$route.path;
        },
        methods:{
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>

</style>