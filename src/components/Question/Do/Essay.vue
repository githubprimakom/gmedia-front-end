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
        <VueEditor />
      </div>
    </div>
  </form>
</template>

<script>
/* eslint-env jquery */
import { VueEditor } from "vue2-editor";

export default {
  data: function() {
    return {
      width: null,
    };
  },
  components: {
    VueEditor,
  },
  mounted() {
    this.width = $(document).width();
    $(() => {
      //
    });
  },
};
</script>

<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";
</style>
