<script setup>
import Tab from "primevue/tab";
import TabList from "primevue/tablist";
import TabPanel from "primevue/tabpanel";
import TabPanels from "primevue/tabpanels";
import Tabs from "primevue/tabs";
import TodoList1 from "./components/TodoList1.vue";
import TodoList2 from "./components/TodoList2.vue";
</script>

<template>
  <section class="bg-[#edf6ff] w-full min-h-[100vh] pt-5">
    <div class="max-w-[800px] mx-auto px-5">
      <div class="">
        <Tabs value="0">
          <TabList>
            <Tab value="0">Todo list 1</Tab>
            <Tab value="1">Todo list 2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <TodoList2 />
            </TabPanel>
            <TabPanel value="1">
              <TodoList1 />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  </section>
</template>

<style scoped>
.p-tabpanels {
  background: transparent;
}
</style>
