<template>
  <v-card>
    <v-card-title>
      <span> Create New User </span>
    </v-card-title> 
    <v-container class="d-flex">
      <div class="user-control d-flex flex-column">
        <img class="profile-pic mb-4" :src="getProfilePic()">
        <input type="file" name="file-browse-btn" id="file-browse-btn" class="file-upload" accept="image/*" @change="onFileChange"/>
        <label for="file-browse-btn">
          <span>Browse Profile Pic</span>
        </label>
        <v-btn
          class="mt-8"
          outlined
          color="error"
          @click="$router.push({name: 'user-list'})"
        >Back
        </v-btn>
      </div>
      <v-form ref="form" class="user-detail ml-8 d-flex flex-column" @submit.prevent="createUser(Name, RoleId, Email, Password, Phone, Address, date)">
        <v-text-field
          v-model="Name"
          label="Name"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="RoleId"
          label="Role Id"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="Email"
          label="Email"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="Password"
          label="Password"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="Phone"
          label="Phone"
          outlined
          dense
        ></v-text-field>
        <v-textarea
          v-model="Address"
          label="Address"
          outlined
        ></v-textarea>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Date of Birth"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            v-model="date"
            :day-format="date => new Date(date).getDate()"
            :picker-date="pickerDate"
            min="1950-01-01"
            max="2022-01-01"
            @change="save"
          ></v-date-picker>
        </v-menu>
        <v-card-actions>
          <v-btn
            color="primary"
            type="submit"
            style="width: 100%"
          >Create User</v-btn>
        </v-card-actions>
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
      </v-form>
    </v-container>
  </v-card>
</template>
<script src="../../services/pages/user/user-create.js">
</script>
<style scoped src="../../assets/css/pages/user/common.css">
</style>