<template>
  <v-card>
    <div v-for="post in postDetail" :key="post.id" :post="post">
    <v-card-title class="align-end">
      {{postId}} {{post.title}}
      <span class="text-subtitle-2 ml-4">
        Posted by {{creatorName}}
      </span>
    </v-card-title>
    <v-container class="pt-0">
      <p class="pa-2 pt-0"> 
        {{post.description}}
      </p>
    <v-btn
      class="ma-2 mt-6"
      outlined
      color="indigo"
      @click="$router.go(-1)"
    >
      Back
    </v-btn>
    </v-container>
    </div>
  </v-card>
</template>
<script src="../../services/post/post-detail.js">
</script>
<style scoped src="../../assets/css/pages/post/post-list.css">
</style>