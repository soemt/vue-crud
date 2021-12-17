import { required, digits, email, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      userId: this.$route.params.id,
      updatedName: "",
      email: "",
      updatedPhone: "",
      updatedAddress: "",
      updatedDOB: "",
      date: null,
      url: null,
      imageFile: null,
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
  mounted() {
    this.updatedName = this.$route.params.user.name;
    this.email = this.$route.params.user.email;
    this.imageFile = this.$route.params.user.profilepic;
    this.updatedPhone = this.$route.params.user.phone;
    this.updatedAddress = this.$route.params.user.address;
    this.updatedDOB = this.$route.params.user.dob;
    this.url = this.$route.params.user.imgurl;
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
      if (date == null) {
        date = this.$route.params.user.dob;
      }
      const userdata = {
        id: this.userId,
        name: updatedName,
        email: this.email,
        profilepic: this.imageFile,
        phone: updatedPhone,
        address: updatedAddress,
        dob: date,
        imgurl: this.url
      }
      var action = "edit";
      this.$store.commit('userData', userdata)
      this.$router.push({name: 'user-confirm', params: {action}});
    },
    onFileChange(e) {
      this.imageFile = e.target.files[0];
      this.url = URL.createObjectURL(this.imageFile);
    },
  }
}