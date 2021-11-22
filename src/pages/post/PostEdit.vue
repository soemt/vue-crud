<template>
    <v-card>
    <v-card-title>
      Edit post {{postId}}
      <v-spacer></v-spacer>
    </v-card-title>
    <v-container>
      <v-form ref="form" @submit.prevent="updatePost(updatedTitle, updatedDesc)" style="width: 800px">
       <v-col
          cols="12"
          sm="8"
          md="6"
        >
        <v-text-field
          v-model="updatedTitle"
          label="Title"
          outlined
        ></v-text-field>
        </v-col>
        <v-col
          cols="12"
        >
        <v-textarea
          v-model="updatedDesc"
          label="Description"
          outlined
        ></v-textarea>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="$router.push({name: 'post-list'})"
          >CANCEL</v-btn>
          <v-btn
            color="primary"
            type="submit"
          >UPDATE</v-btn>
        </v-card-actions>
      </v-form>
      <v-dialog
        v-model="updateDialog"
        width="500"
        @click:outside="$router.push({name: 'post-list'})"
      >
        <v-card>
        <v-card-title class="text-h5 pb-6">
          Successfully Edited Post.
        </v-card-title>
        <v-card-text class="px-6">
          Post has been edited successfully.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="$router.push({name: 'post-list'})"
          >
            Okay
          </v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-card>
</template>
<script src="../../services/post/post-edit.js">
</script>
<style scoped src="../../assets/css/pages/post/post-list.css">
</style>