<template>
  
    <!-- Right column: Ending Subscription Table -->
    <div class="flex-1 bg-white shadow-md p-4 rounded-lg">
        <h2 class="text-lg font-semibold mb-4">Ending Subscription List</h2>
        <table class="min-w-full bg-white">
          <thead>
            <tr class="border-b">
              <th class="text-left p-2">S.N</th>
              <th class="text-left p-2">Name</th>
              <th class="text-left p-2">Subscription</th>
              <th class="text-left p-2">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.sn" class="border-b">

              <td class="p-2">{{ user.sn }}</td>
              <td class="p-2">{{ user.name }}</td>
              <td class="p-2">{{ user.subscription }}</td>
              <td class="p-2">{{ user.expiryDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    
</template>


<script setup>
 import { ref } from 'vue';
const users = ref([
  { sn: 1, name: 'Alice Johnson', subscription: 'Premium', expiryDate: '2024-12-31' },
]);
  </script>