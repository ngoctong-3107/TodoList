<template>
  <label v-if="text" :for="props.for" class="font-semibold w-24">{{
    text
  }}</label>
</template>

<script setup>
const props = defineProps({
  for: String,
  text: [String, Boolean],
});
</script>
