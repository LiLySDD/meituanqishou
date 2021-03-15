<template>
  <div id="app">
    <transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
body {
	margin: 0;
	padding: 0;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}


.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.toolbar {
	background: #f2f2f2;
	padding: 10px;
	//border:1px solid #dfe6ec;
	margin: 10px 0px;
	.el-form-item {
		margin-bottom: 10px;
	}
}


#app {
  position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;


  .fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
  .el-row {
      text-align: left;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #ccab33;
    color: #fff;
}
.el-button--primary {
    color: #fff;
    background-color: #ccab33;
    border-color: #ccab33;
}
}
</style>
