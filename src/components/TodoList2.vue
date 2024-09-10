<template>
  <div>
    <div class="flex gap-2 mb-4">
      <InputText
        id="non-fluid"
        v-model="todo"
        type="text"
        size="small"
        placeholder="Add a task"
        fluid
      />
      <Button icon="pi pi-plus" @click="handleAdd" size="small" />
    </div>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <Card v-for="(t, index) in todos" :key="t" class="my-3 text-sm">
      <template #content>
        <div class="flex items-center justify-between">
          <p class="max-w-[400px] overflow-hidden">{{ t.title }}</p>
          <div class="flex gap-2 min-w-[250px] justify-between items-center">
            <div>
              <Tag
                :severity="getTagSeverity(t.status)"
                :value="`${t.status}`"
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
                @click="openDialogUpdate(t.status, t.title, index)"
              />
              <Button
                @click="confirmDelete(index)"
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
    <Dialog
      v-model:visible="editVisible"
      header="Edit Todo"
      :style="{ width: '40rem' }"
      position="center"
      :modal="true"
      :draggable="false"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Update your todo.</span
      >
      <div class="flex items-center gap-4 mb-4">
        <label for="todo" class="font-semibold w-24">Todo</label>
        <InputText
          id="todo"
          class="flex-auto"
          autocomplete="off"
          v-model="editTodo"
        />
      </div>

      <div class="flex flex-wrap gap-4">
        <label class="font-semibold w-24">Status</label>
        <div class="flex items-center">
          <RadioButton
            v-model="status"
            inputId="ingredient1"
            name="status"
            value="todo"
          />
          <label for="ingredient1" class="ml-2">Todo</label>
        </div>
        <div class="flex items-center">
          <RadioButton
            v-model="status"
            inputId="ingredient2"
            name="status"
            value="in progress"
          />
          <label for="ingredient2" class="ml-2">In progress</label>
        </div>
        <div class="flex items-center">
          <RadioButton
            v-model="status"
            inputId="ingredient3"
            name="status"
            value="complete"
          />
          <label for="ingredient3" class="ml-2">Complete</label>
        </div>
      </div>
      <div class="flex justify-end gap-2 my-4">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="editVisible = false"
        ></Button>
        <Button type="button" label="Save" @click="handleUpdate"></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import Button from "primevue/button";
import Card from "primevue/card";
import ConfirmDialog from "primevue/confirmdialog";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import RadioButton from "primevue/radiobutton";
import Tag from "primevue/tag";
import Toast from "primevue/toast";
import { useConfirm } from "primevue/useconfirm";

import { useToast } from "primevue/usetoast";
import { onBeforeMount, ref } from "vue";

const confirm = useConfirm();
const toast = useToast();

const todo = ref("");
const todos = ref([]);
const editVisible = ref(false);
const editTodo = ref("");
const status = ref("");
const editId = ref();

const handleAdd = () => {
  if (todo.value.trim() !== "") {
    const newTodo = {
      title: todo.value.trim(),
      status: "todo",
    };
    todos.value.unshift(newTodo);
    saveToStorage();
    todo.value = "";
  }
};

const openDialogUpdate = (currentStatus, currentTitle, id) => {
  editVisible.value = true;
  status.value = currentStatus;
  editTodo.value = currentTitle;
  editId.value = id;
};

const handleUpdate = () => {
  if (editTodo.value.trim() !== "") {
    todos.value[editId.value].title = editTodo.value.trim();
    todos.value[editId.value].status = status.value;

    saveToStorage();
    editVisible.value = false;
    editTodo.value = "";
    status.value = "";
  }
};

const saveToStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos.value));
};

const getFromStorage = () => {
  let todoList = localStorage.getItem("todos");
  todos.value = todoList ? JSON.parse(todoList) : [];
};
const handleDelete = (index) => {
  todos.value.splice(index, 1);
  saveToStorage();
};

const confirmDelete = (index) => {
  confirm.require({
    message: "Do you want to delete?",
    header: "Danger Zone",
    icon: "pi pi-info-circle",
    rejectLabel: "Cancel",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Delete",
      severity: "danger",
    },
    accept: () => {
      handleDelete(index);
      toast.add({
        severity: "success",
        summary: "Deleted",
        detail: "Successfully",
        life: 3000,
      });
    },
    reject: () => {},
  });
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

onBeforeMount(() => {
  getFromStorage();
});
</script>

<style>
.p-card-body {
  padding: 10px !important;
  display: unset !important;
}

.p-toast {
  max-width: 300px;
}
.p-tag {
  font-size: 14px !important;
}
.p-dialog-title,
.p-icon,
.p-confirmdialog-icon,
.p-confirmdialog-message {
  font-size: 16px !important;
}

.p-confirmdialog-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.p-dialog-content,
.p-dialog-header {
  padding: 0 15px 0px !important;
}
.p-dialog-footer {
  padding: 20px 15px 20px !important;
}

.p-button {
  padding: 10px 20px !important;
  font-size: 14px !important;
}
</style>
