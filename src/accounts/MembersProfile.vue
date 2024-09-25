<template>
    <div class="flex items-center p-6 bg-gray-100 rounded-lg shadow-lg">
      <div class="flex-shrink-0">
        <img
          class="h-32 w-32 rounded-full border-2 border-gray-300"
          :src="profileImage"
          alt="Profile Picture"
        />
      </div>
      <div class="ml-6">
        <h2 class="text-xl font-bold text-gray-800">{{ name }}</h2>
        <p class="text-gray-600 mt-1">{{ email }}</p>
        <p class="text-gray-600 mt-1">{{ phone }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MembersProfile',
    props: {
      profileImage: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  /* You can add any additional styles here if needed */
  </style>
  