export default {
  data() {
    return {
      userId: this.$route.params.id,
      updatedName: "",
      updatedPhone: "",
      updatedAddress: "",
      updatedDOB: "",
      date: null,
      url: null,
      imageFile: null,
      updateDialog: false,
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
  beforeMount() {
    if (this.userId != this.$store.getters.userId) {
      if (!this.$store.getters.isAdmin) {
        alert("No access");
        this.$router.push({ name: 'post-list' });
      } else {
        return this;
      }
    } 
  },
  methods: {
    getProfilePic() {
      if (this.url == null) {
        return "http://localhost:5000/get/avator/" + this.userId;
      }
      else {
        return this.url;
      }
        
    },

    save (date) {
      this.$refs.menu.save(date)
      this.pickerDate = date;
      this.updatedDOB = this.pickerDate;
      console.log(date);
    },

    updateUser(updatedName, updatedPhone, updatedAddress, date) {
      this.$axios
        .put("/update/user/" + this.userId , { "name": updatedName, "phone": updatedPhone,"address": updatedAddress, "dob": date })
        .then(() => {
          this.updateDialog = true;
        },
        (error) => {
          alert(error);
        }
        );
    },

    onFileChange(e) {
      this.imageFile = e.target.files[0];
      this.url = URL.createObjectURL(this.imageFile);
    },
  }
}