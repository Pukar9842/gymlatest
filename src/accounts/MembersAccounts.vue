<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Members List</h1>
      <ul>
        <li
          v-for="member in members"
          :key="member.id"
          class="flex items-center p-4 bg-white rounded-lg shadow mb-2 cursor-pointer hover:bg-gray-100"
          @click="selectMember(member)"
        >
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full border-2 border-gray-300"
              :src="member.profileImage"
              alt="Profile Picture"
            />
          </div>
          <div class="ml-4 flex-grow">
            <h2 class="text-lg font-semibold text-gray-800">{{ member.name }}</h2>
            <p class="text-gray-600">{{ member.phone }}</p>
            <p class="text-gray-500">{{ member.membershipType }}</p>
          </div>
        </li>
      </ul>
  
      <!-- Modal or Profile Display -->
      <div v-if="selectedMember" class="mt-6">
        <MemberProfile
          :profileImage="selectedMember.profileImage"
          :name="selectedMember.name"
          :email="selectedMember.email"
          :phone="selectedMember.phone"
        />
      </div>
    </div>
  </template>
  
  <script>
  import MembersProfile from './MembersProfile.vue';
  
  export default {
    name: 'MemberList',
    components: {
      MembersProfile
    },
    data() {
      return {
        members: [
          {
            id: 1,
            profileImage: 'https://example.com/profile1.jpg',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+123456789',
            membershipType: 'Gold'
          },
          {
            id: 2,
            profileImage: 'https://example.com/profile2.jpg',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+987654321',
            membershipType: 'Silver'
          },
          // Add more members as needed
        ],
        selectedMember: null
      };
    },
    methods: {
      selectMember(member) {
        this.selectedMember = member;
      }
    }
  }
  </script>
  
  <style scoped>
  /* You can add any additional styles here if needed */
  </style>
  