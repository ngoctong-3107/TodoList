<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Vueform size="sm" :endpoint="createTask">
    <TextElement
      name="task"
      placeholder="Add a task"
      floating="Task name"
      rules="required"
    />

    <RadiogroupElement
      name="type"
      :items="['Business', 'Personal']"
      view="tabs"
      default="Personal"
    />

    <ButtonElement name="button" align="right" submits="">Create</ButtonElement>
  </Vueform>

  <hr class="my-3" />

  <Vueform size="sm" v-model="tasksModel" sync>
    <ListElement
      name="tasks"
      :controls="{
        add: false, // to disable adding new elements to the list
      }"
      :add-class="{
        handle: 'task-sort-handle', // for fixing top position of the handle
      }"
      sort
      @sort="syncToStorage"
      @remove="syncToStorage"
    >
      <template #default="{ index }">
        <ObjectElement
          :name="index"
          :add-class="[
            'task-container',
            tasksModel.tasks[index].type === 'Personal'
              ? 'is-personal'
              : 'is-business',
          ]"
        >
          <ButtonElement
            :label="`#${index + 1} - ${tasksModel.tasks[index].task}`"
            name="edit"
            align="right"
            :conditions="[['editing', '!=', index]]"
            :columns="{
              label: 8,
            }"
            @click="edit(index)"
          >
            Edit
          </ButtonElement>
          <TextElement
            name="task"
            :conditions="[['editing', index]]"
            :columns="6"
          />

          <!-- Task type when editing -->
          <RadiogroupElement
            name="type"
            view="tabs"
            :conditions="[['editing', index]]"
            :columns="2"
            :items="{
              Personal: 'P',
              Business: 'B',
            }"
          />

          <!-- Cancel task editing -->
          <ButtonElement
            name="cancel"
            :conditions="[['editing', index]]"
            :columns="2"
            danger
            full
            @click="cancel"
          >
            Cancel
          </ButtonElement>

          <!-- Save task -->
          <ButtonElement
            name="save"
            :conditions="[['editing', index]]"
            :columns="2"
            full
            @click="save"
          >
            Save
          </ButtonElement>
        </ObjectElement>
      </template>
    </ListElement>
    <HiddenElement name="editing" />
  </Vueform>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
const tasksModel = ref({
  tasks: [],
  editing: null,
});

const createTask = (data, form$) => {
  addToStorage(form$.data);
  syncFromStorage();

  form$.reset();
};
const addToStorage = (data) => {
  let storageData = localStorage.getItem("tasks");
  storageData = storageData ? JSON.parse(storageData) : [];

  storageData.push(data);
  localStorage.setItem("tasks", JSON.stringify(storageData));
};

const syncFromStorage = () => {
  let tasks = localStorage.getItem("tasks");
  tasksModel.value = {
    tasks: tasks ? JSON.parse(tasks) : [],
  };
};
const syncToStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasksModel.value.tasks));
};

const edit = (index) => {
  tasksModel.value.editing = index;
};

const cancel = () => {
  tasksModel.value.editing = null;
  syncFromStorage();
};

const save = () => {
  syncToStorage();
  tasksModel.value.editing = null;
};

onBeforeMount(() => {
  syncFromStorage();
});
</script>

<style scoped>
.task-container {
  background: #ffffff;
  padding: 10px;

  &.is-personal {
    border-left: 3px solid green;
  }

  &.is-business {
    border-left: 3px solid purple;
  }
}

.task-wrapper {
  display: flex;
  align-items: center;
}

.p-tabpanels {
  background: transparent;
}
</style>
