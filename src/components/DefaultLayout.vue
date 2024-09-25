<template>
  <div class="flex grow">
    <AdminSidebar />
    <div class="wrapper flex grow flex-col">
      <Header />
      <main class="grow content pt-5" id="content" role="content">
        <div class="container-fixed">
          <slot> </slot>
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>
<script lang="ts" setup>
import AdminSidebar from "../components/AdminSidebar.vue";
import DBody from "../components/body/DBody.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { nextTick, onMounted } from "vue";
import Component from "../metronic/core/index";
import Layout from "../metronic/app/layouts/demo1.js";

onMounted(() => {
  nextTick(() => {
    Component.init();
    Layout.init();
  });
});
</script>
