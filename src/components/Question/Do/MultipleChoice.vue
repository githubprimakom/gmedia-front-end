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
        <div class="d-flex align-items-center mb-3">
          <div class="me-3">
            <label
              :class="`btn btn-primary mb-0 text-uppercase text-center label`"
              style="border-radius: 100px !important; min-width: 38px; max-width: 38px;"
              >A</label
            >
            <input type="radio" class="d-none" />
          </div>
          Jawaban A
        </div>
        <div class="d-flex align-items-center mb-3">
          <div class="me-3">
            <label
              :class="
                `btn btn-outline-primary mb-0 text-uppercase text-center label`
              "
              style="border-radius: 100px !important; min-width: 38px; max-width: 38px;"
              >B</label
            >
            <input type="radio" class="d-none" />
          </div>
          Jawaban B
        </div>
        <div class="d-flex align-items-center mb-3">
          <div class="me-3">
            <label
              :class="
                `btn btn-outline-primary mb-0 text-uppercase text-center label`
              "
              style="border-radius: 100px !important; min-width: 38px; max-width: 38px;"
              >C</label
            >
            <input type="radio" class="d-none" />
          </div>
          Jawaban C
        </div>
        <div class="d-flex align-items-center mb-3">
          <div class="me-3">
            <label
              :class="
                `btn btn-outline-primary mb-0 text-uppercase text-center label`
              "
              style="border-radius: 100px !important; min-width: 38px; max-width: 38px;"
              >D</label
            >
            <input type="radio" class="d-none" />
          </div>
          Jawaban D
        </div>
        <div class="d-flex align-items-center mb-3">
          <div class="me-3">
            <label
              :class="
                `btn btn-outline-primary mb-0 text-uppercase text-center label`
              "
              style="border-radius: 100px !important; min-width: 38px; max-width: 38px;"
              >E</label
            >
            <input type="radio" class="d-none" />
          </div>
          Jawaban E
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
      $(".label").on("click", (e) => {
        $(".label").each((index, val) => {
          $(val).removeClass("btn-primary");
          $(val).removeClass("btn-outline-primary");
          $(val).removeClass("text-white");
          $(val).addClass("btn-outline-primary");
          $(val).addClass("text-primary");
        });
        $(e.target).addClass("btn-primary");
        $(e.target).addClass("text-white");
      });
    });
  },
};
</script>
