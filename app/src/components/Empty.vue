<template>
  <div class="text-center my-3 mx-auto d-block">
    <p class="text-secondary">Oops... {{ message || "No data available" }}</p>
  </div>
</template>

<script>
export default {
  props: ["message"],
}
</script>
