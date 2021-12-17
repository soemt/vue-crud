<template>
  <v-card>
    <v-card-title>
      Confirmation
    </v-card-title>
    <v-container class="d-flex">
      <div class="user-control d-flex flex-column" style="max-width: 225px">
        <img class="profile-pic mb-4" :src="getProfilePic(userdata)">
        <v-btn
          color="primary"
          elevation="2"
          plain
          class="mb-2"
          v-if="action == 'edit'"
          @click="updateUser(userdata)"
        > Update
        </v-btn>
        <v-btn
          color="primary"
          elevation="2"
          plain
          class="mb-2"
          v-if="action == 'create'"
          @click="createUser(userdata)"
        > Create User
        </v-btn>
        <v-btn
          class="mt-4"
          outlined
          color="error"
          v-if="action == 'edit'"
          @click="cancel(userdata)"
        >Back
        </v-btn>
        <v-btn
          class="mt-4"
          outlined
          color="error"
          v-if="action == 'create'"
          @click="cancel(userdata)"
        >Back
        </v-btn>
      </div>
      <div class="user-detail ml-8">
        <div class="detail-list px-2 py-2" v-if="this.UserId = '' ">
          <span class="detail-text"> ID : </span>
          <span class="detail-value"> {{this.UserId}} </span>
        </div>
        <div class="detail-list px-2 py-2">
          <span class="detail-text"> Name : </span>
          <span class="detail-value"> {{this.Name}} </span>
        </div>
        <div class="detail-list px-2 py-2">
          <span class="detail-text"> Email : </span>
          <span class="detail-value"> {{this.Email}} </span>
        </div>
        <div class="detail-list px-2 py-2">
          <span class="detail-text"> Phone : </span>
          <span class="detail-value"> {{this.Phone}} </span>
        </div>
        <div class="detail-list px-2 py-2">
          <span class="detail-text"> Address : </span>
          <span class="detail-value"> {{this.Address}} </span>
        </div>
        <div class="detail-list px-2 py-2">
          <span class="detail-text"> Dob : </span>
          <span class="detail-value"> {{this.dob}} </span>
        </div>
      </div>
      <v-dialog
        v-model="updatedDialog"
        width="500"
        @click:outside="$router.push({name: 'user-list'})"
      >
        <v-card>
        <v-card-title class="text-h5 pb-6">
          Successfully Updated User.
        </v-card-title>
        <v-card-text class="px-6">
          User has been updated successfully.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="$router.push({name: 'user-list'})"
          >
            Okay
          </v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="createdDialog"
          width="500"
          @click:outside="$router.push({name: 'user-list'})"
        >
          <v-card>
          <v-card-title class="text-h5 pb-6">
            Success!
          </v-card-title>
          <v-card-text class="px-6">
            You have created new user.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="$router.push({name: 'user-list'})"
            >
              Okay
            </v-btn>
          </v-card-actions>
          </v-card>
        </v-dialog>
    </v-container>
  </v-card>
</template>
<script src="../../services/pages/user/user-confirm.js">
</script>