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
        <div class="row my-2">
          <div class="col-lg-4">Pertanyaan 1</div>
          <div class="col-lg-4">
            <select class="form-select" aria-label="Default select example">
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div class="row my-2">
          <div class="col-lg-4">Pertanyaan 2</div>
          <div class="col-lg-4">
            <select class="form-select" aria-label="Default select example">
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div class="row my-2">
          <div class="col-lg-4">Pertanyaan 3</div>
          <div class="col-lg-4">
            <select class="form-select" aria-label="Default select example">
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
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
