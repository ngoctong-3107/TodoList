<template>
  <div>
    <div class="flex gap-2 mb-4">
      <custom-input v-model:todo="todo" />
      <custom-button @handle-click="handleAdd" icon="pi pi-plus" />
    </div>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <CardContent
      v-for="(t, index) in paginatedTodos"
      :key="t"
      :todo="t"
      :id="index"
      @delete-popup="confirmDelete"
      @edit-popup="openDialogUpdate"
    />

    <Paginator
      :rows="rowsPerPage"
      :totalRecords="todos.length"
      :rowsPerPageOptions="[3, 5]"
      @page="onPageChange"
    ></Paginator>

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
        <custom-input
          v-model:todo="editTodo"
          placeholder="Update your todo"
          label="Todo"
        />
      </div>

      <div class="flex flex-wrap gap-4">
        <select-component
          label="Status"
          :values="['todo', 'in progress', 'complete']"
          name="status"
          v-model="status"
        />
      </div>
      <div class="flex justify-end gap-2 my-4">
        <custom-button
          @handle-click="editVisible = false"
          label="Cancel"
          severity="secondary"
        />
        <custom-button @handle-click="handleUpdate" label="Save" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import ConfirmDialog from "primevue/confirmdialog";
import Dialog from "primevue/dialog";
import Paginator from "primevue/paginator";
import Toast from "primevue/toast";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { computed, onBeforeMount, ref } from "vue";
import CardContent from "./CardContent.vue";
import CustomButton from "./formComponents/CustomButton.vue";
import CustomInput from "./formComponents/CustomInput.vue";
import SelectComponent from "./formComponents/SelectComponent.vue";
const confirm = useConfirm();
const toast = useToast();

const todo = ref("");
const todos = ref([]);
const editVisible = ref(false);
const editTodo = ref("");
const status = ref("");
const editId = ref();

const currentPage = ref(0);
const rowsPerPage = ref(3);

const paginatedTodos = computed(() => {
  const start = currentPage.value * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return todos.value.slice(start, end);
});

const onPageChange = (event) => {
  currentPage.value = event.page;
  rowsPerPage.value = event.rows;
};

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
  editId.value = currentPage.value * rowsPerPage.value + id;
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
  const actualIdx = currentPage.value * rowsPerPage.value + index;
  todos.value.splice(actualIdx, 1);
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

onBeforeMount(() => {
  getFromStorage();
});
</script>

<style>
.p-card-body {
  padding: 6px !important;
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

.p-paginator {
  font-size: 16px !important;
  padding: 2px !important;
}
</style>
