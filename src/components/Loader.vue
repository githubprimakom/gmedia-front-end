<template>
  <div
    class="loader d-flex flex-column align-items-center justify-content-center"
  >
    <div class="frame-loader">
      <div class="center">
        <div class="dot-1"></div>
        <div class="dot-2"></div>
        <div class="dot-3"></div>
      </div>
    </div>
    <div class="loader-text">Mohon menunggu!</div>
    <div class="loader-subtext">{{ $attrs.text }}</div>
  </div>
</template>
