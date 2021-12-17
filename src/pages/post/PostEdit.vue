<template>
    <v-card>
    <v-card-title>
      Edit post {{postId}}
      <v-spacer></v-spacer>
    </v-card-title>
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="updatePost(updatedTitle, updatedDesc)" style="width: 800px">
       <v-col
          cols="12"
          sm="8"
          md="6"
        >
        <v-text-field
          v-model="updatedTitle"
          label="Title"
          :rules="titleRules"
          required
          outlined
        ></v-text-field>
        </v-col>
        <v-col
          cols="12"
        >
        <v-textarea
          v-model="updatedDesc"
          label="Description"
          :rules="titleRules"
          required
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
            :disabled="!valid"
          >UPDATE</v-btn>
        </v-card-actions>
      </v-form>
    </v-container>
  </v-card>
</template>
<script src="../../services/post/post-edit.js">
</script>
<style scoped src="../../assets/css/pages/post/post-list.css">
</style>