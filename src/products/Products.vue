<template>
<div class="flex-1 bg-white shadow-md p-4 rounded-lg">
        <h2 class="text-lg font-semibold mb-4">Out of Stock Items</h2>
        <ul class="list-disc pl-5">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
</div>
</template>
<script setup>
import {ref} from 'vue';
const products= ref([
    {prodCode:1, prodName:'Tshirt', prodQuantity:10, prodPrice:3000 }

])


</script>