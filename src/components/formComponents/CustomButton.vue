<template>
  <Button
    :icon="icon"
    @click="handleClick"
    size="small"
    type="button"
    :label="label"
    :severity="severity"
  />
</template>

<script setup>
import Button from "primevue/button";

defineProps({
  icon: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  severity: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["handleClick"]);
const handleClick = () => {
  emit("handleClick");
};
</script>
