<template>
  <form>
    <div class="row">
      <div class="col-lg-12 mb-2">
        <label class="form-label">
          <img
            src="https://kabelkusutblog.com/wp-content/uploads/2021/04/Topologi-Star-1.jpg"
            alt=""
            class="img-fluid"
          />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut commodi
          laboriosam sit aliquid voluptate distinctio, rem totam minus ea
          pariatur blanditiis consequatur mollitia optio sequi nesciunt odit.
          In, consectetur doloribus?
        </label>
        <label class="form-label">
          Jawaban :
        </label>
        <input type="text" class="form-control" />
      </div>
    </div>
  </form>
</template>

<script>
/* eslint-env jquery */

export default {
  data: function() {
    return {
      width: null,
    };
  },
  mounted() {
    this.width = $(document).width();
    $(() => {
      //
    });
  },
};
</script>
