import { mapGetters } from "vuex";
export default {
  data() {
    return {
      Name: "",
      RoleId: "",
      Email: "",
      Password: "",
      Phone: "",
      Address: "",
      dob: "",
      createdDialog: false,
      updatedDialog: false,
      imageFile: null,
      action: this.$route.params.action
    }
  },
  computed: {
    ...mapGetters(["userdata"])
  },
  mounted() {
    this.Name = this.$store.state.userdata.name;
    this.Email = this.$store.state.userdata.email;
    this.profilepic = this.$store.state.userdata.profilepic;
    this.Phone = this.$store.state.userdata.phone;
    this.Address = this.$store.state.userdata.address;
    this.dob = this.$store.state.userdata.dob;
  },
  methods: {
    getProfilePic(userdata) {
      if (userdata.imgurl == null) {
        return "http://localhost:5000/get/avator/" + 1;
      } else {
        return userdata.imgurl;
      }
      
    },
    updateUser(userdata) {
      if (userdata.profilepic == null) {
        this.$axios
        .put("/update/user/" + userdata.id, userdata)
        .then(() => {
          this.updatedDialog = true;
        },
        (error) => {
          alert(error);
        }
        );
      } else {
        this.$axios
        .post("/save/profile_picture", userdata.profilepic)
        .then((response) => {
          userdata.profile_path = response.data.profile_path;
          this.$axios
            .put("/update/user/" + userdata.id, userdata)
            .then(() => {
              this.updatedDialog = true;
            },
              (error) => {
                alert(error);
              }
            );
        })
        .catch((error) => {
          alert(error);
        });
      }
    },
    createUser(userdata) {
      if (userdata.profilepic == null) {
        userdata.profile_path = "images/avators/1600261772937.png";
        this.$axios
        .post("/create/user/", userdata)
        .then(() => {
          this.createdDialog = true;
          },
          (error) => {
            alert(error);
          }
        )
      } else {
        this.$axios
        .post("/save/profile_picture", userdata.profilepic)
        .then((response) => {
          userdata.profile_path = response.data.profile_path;
          this.$axios
          .post("/create/user/", userdata)
          .then(() => {
            this.createdDialog = true;
            },
            (error) => {
              alert(error);
            }
          )
        })
        .catch((error) => {
          alert(error);
        });
      }
    },
    cancel(userdata) {
      var id = userdata.id;
      if (this.action == "edit") {
        this.$router.push({ name: "user-edit", params: { user: userdata, id } });
      } else if (this.action == "create") {
        this.$router.push({ name: "create-user", params: { user: userdata, id } });
      }
    }
  }
}