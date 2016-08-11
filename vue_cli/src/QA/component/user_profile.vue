<template>
	<div class="box__prfile" v-show="profileSwitch">
		<div class="box__info_block left mugshot__info_block">
			<div class="box__mugshot">
				<img class="img__mugshot" :src="playersData[nowIndex].mugshot" alt="">
			</div>
		</div>
		<div class="box__info_block right name_age__info_block">
			<span class="box__name">{{playersData[nowIndex].name}},</span>
			<span class="box__age">{{playersData[nowIndex].age}}</span>
		</div>
		<div class="box__info_block left location__info_block">
			<span>{{playersData[nowIndex].lacation}}</span>
		</div>
		<div class="box__info_block right intro__info_block">
			<span>{{playersData[nowIndex].about_me}}</span>
		</div>

		<!-- <div class="btn__say_hi">say hi</div> -->
		<!-- <div class="btn__close_profile" @click="profileClose()">Close</div> -->
	</div>
</template>

<script>
export default {
  name: 'user-profile',
  props:{
  	'players-data': Array,
  	'now-index': Number,
  	'profile-switch': Boolean,
  	'profile-close': Function,
  },
  data () {
    return {
		a: 'a',
    };
  },
  methods:{
  	closeProfile(){
		
  	},
  }
};
</script>

<style lang="sass" scoped>
	@import './user_profile.scss';
</style>