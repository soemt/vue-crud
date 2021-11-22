<template>
  <v-card>
    <v-card-title>
      User list
      <v-spacer></v-spacer>
      <v-form ref="form" @submit.prevent="searchUser(search)">
        <v-row class="filter-bar">
          <v-col md="2.5">
            <v-text-field label="Search keyword" hide-details="auto" v-model="search"></v-text-field>
          </v-col>
          <v-btn
            type="submit"
            class="post-list-btn mr-4"
            color="primary"
          >Search</v-btn>
          <v-btn 
            class="post-list-btn mr-4" 
            color="primary"
            prepend-icon="event"
            @click="$router.push({name: 'create-user'})"
          ><v-icon
            left
            dark
            >mdi-plus</v-icon>NEW USER
          </v-btn>
        </v-row>
      </v-form>
    </v-card-title>
    <v-container>
      <v-data-table :headers="headers" :items="showList">
        <template v-slot:[`item.name`]="{ item }">
          <a v-if="item.name" v-bind:href="'detail/'+item.id">
            {{item.name}}
          </a>
        </template>
        <template v-slot:[`item.operation`]="{ item }">
          <v-row>
            <div class="operation-btn">
              <v-btn color="primary" class="post-list-btn" :to="{path: 'edit/' + item.id}">Edit</v-btn>
            </div>
            <div class="operation-btn">
              <v-btn color="error" class="post-list-btn" @click="deleteUser(item.id,item.name)">Delete</v-btn>
            </div>
          </v-row>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>
<script src="../../services/pages/user/user-list.js">
</script>
<style scoped src="../../assets/css/pages/post/post-list.css">
</style>