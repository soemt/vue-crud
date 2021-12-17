import { mapGetters } from "vuex";
export default {
  data() {
    return {
      postInfo: null,
      dialogTitle: "",
      dialog: false,
      isDeleteDialog: false,
      headerList: [
        {
          text: "ID",
          align: "start",
          value: "id",
        },
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Phone",
          value: "phone",
        },
        {
          text: "Address",
          value: "address",
        },
        {
          text: "Operation",
          value: "operation",
        }
      ],
      userList: [],
      showList: [],
      search: "",
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "userId"]),
    headers() {
      if (!this.isLoggedIn) {
        return this.headerList.slice(0, this.headerList.length - 1);
      } else {
        return this.headerList;
      }
    },
    currentUser() {
      console.log("Getter id", this.$store.getters.userId);
      return this.$store.getters.userId;
    }
  },
  beforeMount() {
    this.getListData();
  },
  methods: {
    getListData() {
      this.$axios
      .get("/user/list")
      .then((response) => {
        this.userList = response.data.user_list;
        this.showList = this.userList.filter(user => !user.deleted_user_id);
      })
      .catch((err) => {
        console.log(err);
      });
    },
    getProfilePhoto() {
      return "images/avators/" + this.photo;
    },
    deleteUser(userId, userName) {
      if (confirm("Do you want to delete the user '" + userName + "' ?")) {
        this.$axios.delete("/delete/user/" + userId)
        .then(() => {
          if (userId == this.$store.getters.userId) {
            alert("This user is currently logged in, you will be logged out");
            this.$root.$refs.layout.logout();
          } else {
            this.getListData();
            console.log("not logout");
          }
        });
        alert("Deleted user" , userId);
      }
    },
    searchUser(search) {
      this.showList = this.userList.filter(user => {
        return (user.name).toLowerCase().includes(search.toLowerCase()) && !user.deleted_user_id;
      })
    },
    editUser(item) {
      var id = item.id;
      this.$router.push({ name: "user-edit", params: { user: item, id } });
    }
  },
};
