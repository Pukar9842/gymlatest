<template>
  <DefaultLayout>
    <RouterView/>
</DefaultLayout>
  
</template>

<script lang="ts" setup>
import { nextTick, onMounted } from 'vue';
import Component from './metronic/core/index';
import Layout from './metronic/app/layouts/demo1.js';
import { RouterView } from "vue-router";
import DefaultLayout from './components/DefaultLayout.vue';

onMounted(() => {
	nextTick(() => {
		Component.init();
		Layout.init();
	});
});
</script>