import { mapGetters } from "vuex";

export default {
  data() {
    return {
      title: "",
      description: "",
      action: this.$route.params.action,
      updateDialog: false,
      submitDialog: false
    }
  },
  computed: {
    ...mapGetters(["postdata"])
  },
  mounted() {
    this.title = this.$store.state.postdata.title;
    this.description = this.$store.state.postdata.description;
  },
  methods: {
    updatePost(postdata) {
        this.$axios
        .put("/update/post/" + postdata.id , postdata)
        .then(() => {
          this.updateDialog = true;
        },
        (error) => {
          alert(error);
        }
      );
    },
    createPost(postdata) {
      this.$axios.post("/create/post", postdata)
      .then(() => {
        this.submitDialog = true;
      },
      (error) => {
        alert(error);
      });
    },
    cancel(postdata) {
      if (this.action == "edit") {
        var id = postdata.id;
        this.$router.push({ name: 'post-edit', params: { post: postdata, id } });
      } else if (this.action == "create") {
        this.$router.push({ name: 'post-list', params: { post: postdata } });
      }
      console.log(postdata)
    }
  }
}