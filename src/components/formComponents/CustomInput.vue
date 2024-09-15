<template>
  <label-component :text="label" />
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
import LabelComponent from "./LabelComponent.vue";
defineProps({
  todo: String,
  placeholder: {
    type: String,
    default: "Add a task",
  },
  label: {
    type: [String, Boolean],
    default: false,
    require: false,
  },
});
</script>
