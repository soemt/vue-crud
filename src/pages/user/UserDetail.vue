<template>
  <v-card>
    <v-card-title>
      User Profile
    </v-card-title>
    <v-container class="d-flex">
      <div class="user-control d-flex flex-column">
        <img class="profile-pic mb-4" :src="getProfilePic()">
        <v-btn 
          color="primary"
          elevation="2"
          plain
          class="mb-2"
          v-for="user in userDetail" :key="user.id"
          @click="editUser(user)"
        > Edit Profile
        </v-btn>
        <v-btn
          color="error"
          elevation="2"
          plain
          @click="deleteUser()"
        > Delete
        </v-btn>
        <v-btn
          class="mt-8"
          outlined
          color="indigo"
          @click="$router.push({name: 'user-list'})"
        >Back
        </v-btn>
      </div>
      <div class="user-detail ml-8" v-for="user in userDetail" :key="user.id">
        <div class="detail-list px-2 py-2">
          <span class="detail-text"> ID : </span>
          <span class="detail-value"> {{user.id}} </span>
        </div>
        <div class="detail-list px-2 py-2">
          <span class="detail-text"> Name : </span>
          <span class="detail-value"> {{user.name}} </span>
        </div>
        <div class="detail-list px-2 py-2">
          <span class="detail-text"> Email : </span>
          <span class="detail-value"> {{user.email}} </span>
        </div>
        <div class="detail-list px-2 py-2">
          <span class="detail-text"> Phone : </span>
          <span class="detail-value"> {{user.phone}} </span>
        </div>
        <div class="detail-list px-2 py-2">
          <span class="detail-text"> Address : </span>
          <span class="detail-value"> {{user.address}} </span>
        </div>
        <div class="detail-list px-2 py-2">
          <span class="detail-text"> Dob : </span>
          <span class="detail-value"> {{user.dob}} </span>
        </div>
      </div>
    </v-container>
  </v-card>
</template>
<script src="../../services/pages/user/user-detail.js">
</script>
<style scoped src="../../assets/css/pages/user/common.css">
</style>