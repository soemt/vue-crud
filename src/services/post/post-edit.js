export default {
  data() {
    return {
      postId: this.$route.params.id,
      updatedTitle: "",
      updatedDesc: "",
      valid: true,
      titleRules: [
        v => !!v || "Title is required."
      ],
      descriptionRules: [
        v => !!v || "Description is required."
      ],
    }
  },
  mounted() {
    this.updatedTitle = this.$route.params.post.title;
    this.updatedDesc = this.$route.params.post.description;
  },
  methods: {
    updatePost(updatedTitle, updatedDesc) {
      var postdata = {
          id: this.postId,
          title: updatedTitle,
          description: updatedDesc,
      }
      var action = "edit";
      this.$store.commit('postData', postdata);
      this.$router.push({ name: 'post-confirm', params: {action} });
    }
  }
}