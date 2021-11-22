export default {
  data() {
    return {
      postId: this.$route.params.id,
      updatedTitle: "",
      updatedDesc: "",
      updateDialog: false,
    }
  },
  methods: {
    updatePost(updatedTitle, updatedDesc) {
      this.$axios
        .put("/update/post/" + this.postId , { "title": updatedTitle, "description": updatedDesc })
        .then(() => {
          this.updateDialog = true;
        },
        (error) => {
          alert(error);
        }
      );
      
    }
  }
}