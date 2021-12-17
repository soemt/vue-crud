<template>
  <v-card>
    <v-card-title>
      <span> Create New User </span>
    </v-card-title> 
    <v-container class="d-flex">
      <div class="user-control d-flex flex-column">
        <img class="profile-pic mb-4" :src="getProfilePic()">
        <!--<img class="profile-pic mb-4" src="../../../mock/target/images/avators/1600261772937.png">-->
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
      <validation-observer
        ref="observer"
        v-slot="{ invalid }"
      >
        <v-form ref="form" class="user-detail ml-8 d-flex flex-column" @submit.prevent="createUser(Name, RoleId, Email, Password, Phone, Address, date)">
        <validation-provider
          v-slot="{ errors }"
          name="Name"
          rules="required|max:50"
        >  
          <v-text-field
            v-model="Name"
            label="Name"
            :error-messages="errors"
            required
            outlined
            dense
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="Role ID"
          :rules="{
            required: true,
            digits: 1,
            min_value: 1,
            max_value: 2
          }"
        >  
          <v-text-field
            v-model="RoleId"
            :counter="1"
            :error-messages="errors"
            label="Role Id"
            required
            outlined
            dense
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="Email"
          rules="required|email"
        >
          <v-text-field
            v-model="Email"
            :error-messages="errors"
            label="Email"
            required
            outlined
            dense
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="Password"
          rules="required|min:8"
        >  
          <v-text-field
            type="password"
            v-model="Password"
            :error-messages="errors"
            label="Password"
            required
            outlined
            dense
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="Phone Number"
          :rules="{
            required: true,
            digits: 11,
          }"
        >
          <v-text-field
            v-model="Phone"
            :counter="11"
            :error-messages="errors"
            label="Phone"
            required
            outlined
            dense
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="Address"
          rules="required"
        >
          <v-textarea
            v-model="Address"
            :error-messages="errors"
            label="Address"
            required
            outlined
          ></v-textarea>
        </validation-provider>
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
              :disabled="invalid"
            >Create User</v-btn>
          </v-card-actions>
        </v-form>
      </validation-observer>
    </v-container>
  </v-card>
</template>
<script src="../../services/pages/user/user-create.js">
</script>
<style scoped src="../../assets/css/pages/user/common.css">
</style>