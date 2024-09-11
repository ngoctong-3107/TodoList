<template>
  <Card class="my-3 text-sm">
    <template #content>
      <div class="flex items-center justify-between">
        <span class="max-w-[400px] overflow-hidden">{{ todo.title }}</span>
        <div class="flex gap-2 min-w-[250px] justify-between items-center">
          <div>
            <Tag
              :severity="getTagSeverity(todo.status)"
              :value="`${todo.status}`"
              rounded
              class="text-sm"
            ></Tag>
          </div>
          <div class="flex gap-2">
            <Button
              icon="pi pi-pencil"
              severity="secondary"
              outlined
              size="small"
              @click="handleEditPopup(todo.status, todo.title, id)"
            />
            <Button
              @click="handleDeletePopup(id)"
              icon="pi pi-trash"
              severity="danger"
              size="small"
              outlined
            ></Button>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import Button from "primevue/button";
import Card from "primevue/card";
import Tag from "primevue/tag";

defineProps({
  todo: Object,
  id: Number,
});

const emit = defineEmits(["deletePopup", "editPopup"]);

const handleDeletePopup = (id) => {
  emit("deletePopup", id);
};

const handleEditPopup = (status, title, id) => {
  emit("editPopup", status, title, id);
};

const getTagSeverity = (status) => {
  switch (status) {
    case "todo":
      return "secondary"; // màu xanh dương nhạt
    case "in progress":
      return "info"; // màu vàng
    case "complete":
      return "success"; // màu xanh lá cây
    default:
      return "secondary"; // màu mặc định
  }
};
</script>
