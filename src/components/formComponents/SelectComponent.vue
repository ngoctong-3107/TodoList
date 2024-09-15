<template>
  <div>
    <label-component :text="label" />
    <div v-for="(val, i) in values" :key="i" class="flex items-center">
      <input
        :name="name"
        :value="val"
        :id="val + i"
        :checked="modelValue === val"
        @change="$emit('update:modelValue', val)"
        :type="inputType"
      />
      <label :for="val + i" class="ml-2">{{ val }}</label>
    </div>
  </div>
</template>

<script setup>
import LabelComponent from "./LabelComponent.vue";
defineProps({
  label: {
    type: [String, Boolean],
    default: false,
    require: false,
  },
  values: {
    type: Array,
    required: true,
  },
  name: {
    //status
    type: String,
    require: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  inputType: {
    type: String,
    default: "radio",
  },
});
</script>
