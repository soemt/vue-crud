import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userId: this.$route.params.id,
      userList: [],
      userDetail: [],
      profilePic: "",
    }
  },
  computed: {
    ...mapGetters(["userId"]),
    currentUser() {
      return this.$store.getters.userId;
    }
  },
  beforeMount() {
    if (this.userId != this.$store.getters.userId) {
      if (!this.$store.getters.isAdmin) {
        alert("No access");
        this.$router.push({ name: 'post-list' });
      } else {
        this.getUserDetail();
      }
    } else {
      this.getUserDetail();
    }
  },
  methods: {
    getUserDetail() {
      this.$axios
      .get("/user/list")
      .then((response) => {
        this.userList = response.data.user_list;
        this.userDetail = this.userList.filter(user => {
          return user.id === parseInt(this.userId);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    },
    getProfilePic() {
        return "http://localhost:5000/get/avator/" + this.userId;
    },

    deleteUser() {
      if (this.userId == this.$store.getters.userId) {
        if (confirm("You are currently logged in as this user, you will be logged out if you delete.")) {
          this.$axios.delete("/delete/user/" + this.userId)
            .then(() => {
              alert("You are logged out.");
              this.$root.$refs.layout.logout();
            })
            .catch((err) => {
              console.log(err);
            });
        } 
      } else {
        if (confirm("Do you want to delete this user?")) {
          this.$axios.delete("/delete/user/" + this.userId)
          .then(() => {
            alert("Successfully deleted user.");
            this.$router.push({ name: 'user-list' });
          })
          .catch((err) => {
            console.log(err);
          });
        }
      }
    },
  }
}