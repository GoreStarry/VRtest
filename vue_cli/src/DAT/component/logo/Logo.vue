<template>
	<div>
		{{logo_test}}
	</div>
	<div>
		123321
	</div>
</template>

<script>
export default{
	data(){
		return {
			logo_test: 'lala',
		}
	},
	ready(){
		alert('logo_done');
	}
}
</script>