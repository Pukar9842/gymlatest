<template>
  <div class="flex flex-col min-h-screen p-6 bg-gray-100">
    <!-- Container for positioning -->
    <div class="flex-grow flex flex-col">
      
      <!-- Main content section with two columns -->
      <div class="flex flex-grow gap-4">
        <!-- Left column: Out of Stock Items -->
        <Products/>
        
         <!-- Right column: Ending Subscription Table -->
         <SubscriptionExpiring :users="users"/>
      </div>
      
      <!-- Main content section: Table and Chart -->
      <div class="flex-grow flex flex-col mt-4 gap-4">
        <!-- Table aligned to the right -->
        
        
        <!-- Bottom section: Chart -->
        <div class="mt-4">
          <h2 class="text-lg font-semibold">Total Sales This Month</h2>
          <div class="bg-white shadow-md p-4 rounded-lg">
            <!-- Chart placeholder -->
            <div class="h-40 bg-gray-200">Chart goes here</div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

  
  <script setup >
  // Import your existing table component
 
  import SubscriptionExpiring from '../tables/SubscriptionExpiring.vue';
  import Products from '../../products/Products.vue';
  
  const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});
  
  </script>