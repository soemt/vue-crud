export default {
  data() {
    return {
      Name: "",
      RoleId: "",
      Email: "",
      Password: "",
      Phone: "",
      Address: "",
      DOB: "",
      createdDialog: false,
      date: null,
      url: null,
      imageFile: null,
      imageName: null,
      menu: false,
      pickerDate: "",
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (
        this.$refs.picker.activePicker = 'YEAR',
        this.pickerDate = null
      ))
    },
  },
  methods: {
    getProfilePic() {
      if (this.url == null) {
        return "http://localhost:5000/get/avator/" + 1;
      }
      else {
        this.imageName = "images/avators/" + this.imageFile.name;
        return this.url;
      }
        
    },

    save (date) {
      this.$refs.menu.save(date)
      this.pickerDate = date;
      this.DOB = this.pickerDate;
      console.log(date);
    },

    createUser(Name, RoleId, Email, Password, Phone, Address, date) {
      this.$axios
        .post("/create/user/" , { "name": Name, "role_id": RoleId, "email": Email, "profile_path" : this.imageName, "password": Password, "phone": Phone,"address": Address, "dob": date })
        .then(() => {
          this.createdDialog = true;
        },
        (error) => {
          alert(error);
        }
      );
    },

    onFileChange(e) {
      this.imageFile = e.target.files[0];
      this.url = URL.createObjectURL(this.imageFile);
      console.log(this.url);
      console.log(this.imageFile.name);
    },

    saveProfilePic() {
      this.$axios
        .post("/save/profile_picture", { "profile_path": this.imageFile })
        .then((response) => {
          alert(JSON.stringify(response.data));
        },
          (error) => {
            alert(error);
          }
        );
    }
  }
}