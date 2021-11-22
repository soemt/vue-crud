export default {
  data() {
    return {
      postId: this.$route.params.id,
      postDetail: [],
      postList: [],
      showList: [],
      userList: [],
      creatorName: "", ///// dont need to be reactive 
    }
  },
  computed: {

  },
  beforeMount() {
    this.$axios
      .get("/post/list")
      .then((response) => {
        this.postList = response.data.post_list;
        this.postDetail = this.postList.filter(post => {
          return post.id === parseInt(this.postId);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    
    this.fetchUserName();
  },
  methods: {
    fetchUserName() {
      this.$axios
        .get("/user/list")
        .then((response) => {
          this.userList = response.data.user_list;
          const postCreatorId = this.postDetail.map(post => post.created_user_id);
          console.log('PostCreatorId', postCreatorId);
          this.postCreator = this.userList.find(user => user.id === parseInt(postCreatorId));
          this.creatorName = this.postCreator.name;
        });
    }
  }
}
