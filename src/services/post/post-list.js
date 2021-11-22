import { mapGetters } from "vuex";

export default {
  data() {
    return {
      postInfo: null,
      dialogTitle: "",
      createDialog: false,
      submitDialog: false,
      confirmDialog: false,
      headerList: [
        {
          text: "ID",
          align: "start",
          value: "id",
        },
        {
          text: "Post Title",
          value: "title",
        },
        {
          text: "Post Desciption",
          value: "description",
        },
        {
          text: "Posted User",
          value: "created_user_id",
        },
        {
          text: "Operation",
          value: "operation",
        }
      ],
      postList: [],
      showList: [],
      deleted_user_id: "deleted_user_id",
      search: " ",
      newTitle: " ",
      newDesc: " ",
      post_id: null,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    headers() {
      if (!this.isLoggedIn) {
        return this.headerList.slice(0, this.headerList.length - 1);
      } else {
        return this.headerList;
      }
    },
  },
  beforeMount() {
    this.getListData();
  },
  methods: {
    /**
     * This is to filter posts of datatable.
     * @returns void
     */
    filterPosts() {
      this.showList = this.postList.filter((post) => {
        return (
          post.title.includes(this.keyword) ||
          post.description.includes(this.keyword) ||
          post.created_user.includes(this.keyword)
        );
      });
    },
    getListData() {
      this.$axios
      .get("/post/list")
      .then((response) => {
        this.postList = response.data.post_list;
        this.showList = this.postList.filter(post => !post.deleted_user_id);
      })
      .catch((err) => {
        console.log(err);
      });
    },
    createPost(newTitle, newDesc) {
      this.$axios.post("/create/post", { "title": newTitle, "description": newDesc })
        .then(() => {
          this.createDialog = false;
          this.submitDialog = true;
          this.getListData();
        },
        (error) => {
          alert(error);
        });
    },
    deletePost(postId) {
      this.confirmDialog = true;
      this.post_id = postId;
    },
    confirmation() {
      console.log(this.post_id);
      this.$axios.delete("/delete/post/" + this.post_id)
      .then(() => {
        this.confirmDialog = false;
        this.getListData();
      });
      alert("Deleted post " + this.post_id);
    },
    searchPost(search) {
      this.showList = this.postList.filter(post => {
        return (post.title + post.description).toLowerCase().includes(search.toLowerCase());
      })
    },
  },
};
