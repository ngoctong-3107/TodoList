<template>
  <InputText
    id="non-fluid"
    type="text"
    size="small"
    :placeholder="placeholder"
    fluid
    :value="todo"
    @input="$emit('update:todo', $event.target.value)"
  />
</template>

<script setup>
import InputText from "primevue/inputtext";

defineProps({
  todo: String,
  placeholder: {
    type: String,
    default: "Add a task",
  },
});
</script>
