<template>

	<el-row class="container">
		<div class="mask" v-if="showModuleList" @click="showModuleList=false"></div>
		<el-row>
<!--			@mouseover="showModuleList = true"-->
			<!-- <el-row class="line_module" v-if="showModuleList" style="z-index: 2">
				<template v-for="(item,index) in user.user_module">
					<div :style="{ 'background-color': classBoxList[index] }" class="block" @click="changeModule(item)">{{item.module_name}}</div>
				</template>
			</el-row> -->
			<el-row :span="24" class="header">
				<el-col :span="3" :xl="3" :lg='3' class="logo" >{{sysName}}</el-col>
				<el-col :span="15" :xl="15" :lg='15' class="navbar">
					<!-- 顶部路由 -->
					<!-- <el-menu
							:default-active="selectIndex"
							class="el-menu-demo"
							mode="horizontal"
							@select="handleSelect"
							background-color="#6666CC"
							text-color="#fff"
							active-text-color="#FFFF66"
							style="margin-left: 20px;"
							
					>
						<template v-for="(item,index) in headBar">
							<el-menu-item :index="item.id+''" :disabled="item.disabled==='N'">{{item.name}}</el-menu-item>
						</template>
					</el-menu> -->
				</el-col>
				<el-col :span="6" :xl="6" :lg='6' style="color: #fff; width: 150px; float: right">
					<el-button @click="logout" size="small" style="margin-left: 20px;border: 1px solid white">退出登录</el-button>
					<!-- <el-button @click="changeModuleItem" size="small" style="margin-left: 20px;border: 1px solid white" v-if="user.user_module.length>0">模块切换</el-button> -->
				</el-col>
			</el-row>
		</el-row>
		<el-row class="main" >
			<aside>
				<el-menu
						:default-active="path"
						class="el-menu-vertical-demo"
						:unique-opened="true"
						router>
					<template v-for="(item) in sideBar" v-if="!item.hidden">
						<el-menu-item :index="item.children[0].path" v-if="item.leaf" @click="path = item.children[0].path">
							<i :class="item.icon"></i>
							<span slot="title" style="font-size: 14px;">{{item.name}}</span>
						</el-menu-item>
						<el-submenu :index="item" v-if="!item.leaf">
							<template slot="title"><i :class="item.icon"></i>{{item.name}}</template>
							<template v-for="child in item.children" v-if="!child.hidden">
								<el-menu-item :index="child.path" :key="child.path" style="font-size: 14px;" @click="path = child.path">
									{{child.name}}
								</el-menu-item>
							</template>
						</el-submenu>
					</template>
				</el-menu>
			</aside>
			<section class="content-container">
				<el-row class="title">{{$route.name}}</el-row>
				<el-row class="content-wrapper">
					<transition name="fade" mode="out-in">
						<router-view></router-view>
					</transition>
				</el-row>
			</section>
		</el-row>
	</el-row>

</template>

<script>
    // import HeadBar from "../components/HeadBar";
    // import SideBar from "../components/SideBar";

    export default {
        // components: {SideBar, HeadBar},
        data() {
            return {
				selectIndex: '',
				sysName: '美团骑手',
				// sysUserName: '',
				path: '',
				user: {},
				// headBar:[],
				sideBar:[],
				changModule: false,
				showModuleList: false,
				classBoxList: ['#DB7093', '#6495ED', '#3CB371', '#FFA07A', '#CD5C5C', '#C0C0C0', '#C71585',]
            }
        },
		created() {
        	let _this = this;
			this.path = this.$route.path;
			console.log('path===>'+this.path);
			this.user = JSON.parse(sessionStorage.getItem('user'));
            let role = this.user.qx;
            // let status = null;
			// console.log('user===>'+JSON.stringify(this.user));
			// console.log('role===>'+role);
			// console.log('user===>'+this.user);
			// let length = this.user.user_module.length;
			// if(length>0){
			// 	this.changModule = true;
			// }
			// this.sysUserName = this.user.user_name;
			if(this.path==='/renyuan'){
				// this.headBar = this.user.user_module[0].navBar;
				// console.log('headbar==>'+JSON.stringify(this.headBar));
				// this.selectIndex = this.headBar[0].id + '';
				// status = Number(this.selectIndex);
				this.sideBar = [];
				for(let item of this.$router.options.routes){
				    if(item.meta){
                        if(item.meta.role.indexOf(role)>-1 ){
                            _this.sideBar.push(item);
                        }
					}
					else{
					    continue
					}
				}
			// console.log("this.sidebar => ", this.sideBar)
			}
			else{
				// let module = null;
				// for(let item of this.$router.options.routes){
				// 	console.log("item",item)
				// 	if(item.meta && item.children.length>0){
				// 		for(let iii of item.children){
				// 			if(iii.path === _this.path){
				// 				// status = item.meta.status;
				// 				break
				// 			}
				// 		}
				// 	}
				// }
				// console.log("刷新 status="+status)
				// this.user.user_module.forEach((item_bar,index)=>{
				// 	for(let item of item_bar.navBar){
				// 		if(item.id === status.toString()){
				// 			module = item_bar.module_id;
				// 			_this.headBar = item_bar.navBar;
				// 			_this.sysName = _this.user.user_module[index].module_name;
				// 			break;
				// 		}
				// 	}
				// });
				// console.log("刷新 headBar==>"+JSON.stringify(_this.headBar))
				// this.selectIndex = status.toString() ;
				for(let item of this.$router.options.routes){
					// if(item.meta&&item.meta.status+''===_this.selectIndex&&item.meta.role.indexOf(_this.user.qx)>-1){
					if(item.meta&&item.meta.role.indexOf(_this.user.qx)>-1){
						_this.sideBar.push(item);
					}
				}
			}

		},

        methods: {
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
			changeModuleItem(){
				this.showModuleList = true;
			},
			handleSelect(key) {
				// console.log('key',key)
				let _this = this;
				let role = this.user.qx;

				this.sideBar = [];
				// console.log('this.$router.options.routes',this.$router.options.routes)
				for(let item of this.$router.options.routes){
									// console.log('item.meta',item.meta)

                    if(item.meta){
                        // if(item.meta.role.indexOf(role)>-1 && item.meta.status===Number(key)){
                        if(item.meta.role.indexOf(role)>-1 ){

							_this.sideBar.push(item);
							
                        }
                    }
                    else {
						
                        // continue
                    }
				}

				if(_this.sideBar){
                    _this.$router.push(_this.sideBar[0].children[0].path);
				}
				console.log("_this.sideBar: ", _this.sideBar)

			},
			//模块切换
			changeModule(item){
				console.log('模块切换的item',JSON.stringify(item))
				this.headBar = item.navBar;
				console.log("chang==>headBar==>"+JSON.stringify(this.headBar));
				this.selectIndex = this.headBar[0].id;
				this.handleSelect(this.headBar[0].id);
				this.showModuleList = false;
				this.sysName = item.module_name;


			}
        },

    }

</script>

<style lang="scss" scoped>
	.container {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		.line_module{
			width: 100%;
			height: 120px;
			position: fixed;
			top: 0;
			left: 0;
			background-color: #6666CC;
			border-bottom: 1px solid #f2f2f2;
			z-index: 100;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.block{
			width: 200px;
			height: 60px;
			border-radius: 5px;
			color: #fff;
			display: inline-flex;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
			justify-content: center;
			line-height: 60px;
			letter-spacing: 1px;
			cursor: pointer;
		}
		.header {
			height: 60px;
			line-height: 60px;
			background: #ccab33;
			/*background: #e6a746;*/
			color: #fff;

			.logo {
				width: 230px;
				height: 60px;
				font-size: 22px;
				text-align: center;
				border-color: rgba(238, 241, 146, 0.3);
				border-right-width: 1px;
				border-right-style: solid;
				.txt {
					color: #fff;
				}
			}
			.navbar{
				height: 60px;
			}
		}

		.main {
			display: flex;
			position: absolute;
			top: 61px;
			bottom: 0;
			overflow: hidden;
			left: 0;
			right: 0;
			aside {
				flex: 0 0 230px;
				width: 230px;
				background-color: #f2f2f2;
				color: #333;
				text-align: center;
				line-height: 200px;
				height: calc(100vh - 61px);
				overflow-y: scroll;
				display: inline-block;

				.el-menu {
					height: 100%;
				}

			}
			::-webkit-scrollbar {
				display: none; /* Chrome Safari */
			}

			.content-container {
				flex: 1;
				overflow-y: scroll;
				padding: 20px;
				width: calc(100vw - 270px);
				.title{
					width: 81vw;
					height: 40px;
					position: relative;
					top: 0;
					left: 0;
					line-height: 40px;
					text-align: right;
					font-size: 14px;
					font-weight: bold;
				}


				.content-wrapper{
					width: calc(100vw - 290px);
					height: calc(100vh - 120px);
					margin: 0 20px 20px 20px;
				}
			}
		}
	}




</style>
<style>
	.el-menu.el-menu--horizontal {
		border-bottom: none;
	}
	.mask {
 background-color: #000;
 opacity: 0.0;
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 z-index: 1
}
</style>
