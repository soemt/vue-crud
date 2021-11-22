<template>
  <v-card>
    <v-card-title>
      Post list
      <v-spacer></v-spacer>
      <v-form ref="form" @submit.prevent="searchPost(search)">
        <v-row class="filter-bar">
          <v-col md="2.5">
            <v-text-field label="Search keyword" hide-details="auto" v-model="search"></v-text-field>
          </v-col>
          <v-btn
            type="submit"
            class="post-list-btn mr-4"
            color="primary"
          >Filter</v-btn>
        <v-dialog
        id="postModal"
        v-model="createDialog"
        width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="post-list-btn mr-4"
              color="primary"
              v-bind="attrs"
              v-on="on"
            >Create</v-btn>
          </template>
          <v-form @submit.prevent="createPost(newTitle,newDesc)">
          <v-card>
            <v-card-title>
              <span>CREATE NEW POST</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-col
              cols="12"
              sm="8"
              md="6"
            >
              <v-text-field
                v-model="newTitle"
                label="Title"
                outlined
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="newDesc"
                label="Description"
                outlined
              ></v-text-field>
            </v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="createDialog = false"
              >CANCEL</v-btn>
              <v-btn
                color="primary"
                type="submit"
                
              >CREATE</v-btn>
            </v-card-actions>
          </v-card>
          </v-form>
        </v-dialog>
          <v-btn class="post-list-btn mr-4" color="primary">Upload</v-btn>
          <v-btn class="post-list-btn mr-4" color="primary">Download</v-btn>
        </v-row>
      </v-form>
    </v-card-title>
    <v-container>
      <v-dialog
        v-model="submitDialog"
        width="500"
      >
        <v-card>
        <v-card-title class="text-h5 pb-6">
          Successfully Created Post.
        </v-card-title>
        <v-card-text class="px-6">
          New post has been created successfully.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="submitDialog = false"
          >
            Okay
          </v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="confirmDialog"
          width="500"
        >
        <v-card>
        <v-card-title class="text-h5 pb-6">
          Do you want to delete the post ?
        </v-card-title>
        <v-card-text class="px-6">
          Post will be deleted.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="confirmDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="error"
            @click="confirmation()"
          >
            DELETE
          </v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table :headers="headers" :items="showList">
        <template v-slot:[`item.title`]="{ item }">
          <a v-if="item.title" v-bind:href="'detail/'+item.id">
            {{item.title}}
          </a>
        </template>
        <template v-slot:[`item.operation`]="{ item }">
          <v-row>
            <div class="operation-btn">
              <v-btn color="primary" class="post-list-btn" @click="$router.push({ path: 'edit/'+ item.id})">Edit</v-btn>
            </div>
            <div class="operation-btn">
              <v-btn color="error" class="post-list-btn" @click="deletePost(item.id)">Delete</v-btn>
            </div>
          </v-row>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>
<script src="../../services/post/post-list.js">
</script>
<style scoped src="../../assets/css/pages/post/post-list.css">
</style>