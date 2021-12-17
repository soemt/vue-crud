<template>
  <v-card>
    <v-container fluid style="max-width: 800px; margin-left: 0px;">
      <h2>Confirmation</h2>
      <v-col
      cols="12"
      sm="8"
      md="6"
      >
        <v-text-field
          v-model="title"
          label="Title"
          outlined
          disabled
        ></v-text-field>
      </v-col>
      <v-col
      cols="12"
      >
        <v-textarea
          v-model="description"
          label="Description"
          outlined
          disabled
        ></v-textarea>
      </v-col>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="cancel(postdata)"
        >CANCEL</v-btn>
        <v-btn
          color="primary"
          type="submit"
          v-if="action == 'edit'"
          @click="updatePost(postdata)"
        >UPDATE</v-btn>
        <v-btn
          color="primary"
          type="submit"
          v-if="action == 'create'"
          @click="createPost(postdata)"
        >CREATE</v-btn>
      </v-card-actions>
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
<script src="../../services/post/post-confirm.js">
</script>
