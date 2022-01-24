<template>
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
        </div>
			</div>
		</div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

export default {
	data: function() {
    return {
      width: null,
		}
	},
	mounted() {
		$('.dropify').dropify()
		this.width = $(document).width();
	}
}
</script>

<style scoped>

</style>