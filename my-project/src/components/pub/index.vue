<template>
	<div class="btn">
		<navigator url="../publish/main" class="circle">
			+
		</navigator>
	</div>
</template>

<script>



export default {
  data () {
    return {
      
    }
  }
};
</script>

<style scoped>
	.btn{
		position: fixed;
		bottom: 50px;
		right: 15px;
		z-index:2;
	}
	.circle{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		font-size: 35px;
		color: rgb(244, 247, 247);
		line-height: 45px;
		text-align: center;
		background-color: rgba(238, 250, 11, 0.911);
		box-shadow: 0 0 5px #c2c0c0;
	}
</style>