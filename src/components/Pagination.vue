<template>
  <div
    class="table-pagination d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 pb-2"
    v-if="$attrs.data"
  >
    <div style="opacity: .7; font-weight: 300;">
      {{ $attrs.data.from }}-{{ $attrs.data.to }} {{$attrs.ammount ? $attrs.ammount : 'data'}} dari total
      {{ $attrs.data.total }} {{$attrs.ammount ? $attrs.ammount : 'data'}}
    </div>
    <div class="d-flex align-items-center mt-2 mt-md-0">
      <div v-for="(item, id) in $attrs.data.links" :key="id">
        <div
          :class="
            `pagination-arrow ${
              $attrs.data.prev_page_url
                ? 'bg-primary cursor-pointer'
                : 'bg-secondary'
            } me-1 d-flex align-items-center justify-content-center`
          "
          @click="navigationUrl($attrs.data.prev_page_url)"
          v-if="item.label == 'pagination.previous'"
        >
          <i class="fas fa-chevron-left text-white"></i>
        </div>
        <div
          class="d-flex align-items-center"
          v-if="
            item.label !== 'pagination.previous' &&
              item.label !== 'pagination.next'
          "
        >
          <div
            :class="`pagination-number ${item.active ? 'text-primary' : ''}`"
            @click="navigationUrl(item.url)"
          >
            {{ item.label }}
          </div>
        </div>
        <div
          :class="
            `pagination-arrow ${
              $attrs.data.next_page_url
                ? 'bg-primary cursor-pointer'
                : 'bg-secondary'
            } ms-1 d-flex align-items-center justify-content-center`
          "
          v-if="item.label == 'pagination.next'"
          @click="navigationUrl($attrs.data.next_page_url)"
        >
          <i class="fas fa-chevron-right text-white"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigationUrl(url) {
      this.$attrs.function(url)
    },
  },
};
</script>
