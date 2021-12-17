import { mapGetters } from "vuex";
import { required, digits, email, max, min, max_value, min_value } from 'vee-validate/dist/rules'
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

  extend('min', {
    ...min,
    message: '{_field_} should have more than {length} characters',
  })

  extend('max_value', {
    ...max_value,
    message: '{_field_} must be between 1 and 2.',
  })

  extend('min_value', {
    ...min_value,
    message: '{_field_} must be between 1 and 2.',
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
      Name: "",
      RoleId: "",
      Email: "",
      Password: "",
      Phone: "",
      Address: "",
      dob: "",
      date: null,
      url: null,
      imageFile: null,
      menu: false,
      pickerDate: "",
      profilepic: null,
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
  computed: {
    ...mapGetters(["userdata"])
  },
  created() {
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
    if (this.$route.params.user) {
      this.Name = this.$route.params.user.name;
      this.RoleId = this.$route.params.user.role_id;
      this.Email = this.$route.params.user.email;
      this.Password = this.$route.params.user.password;
      this.Phone = this.$route.params.user.phone;
      this.Address = this.$route.params.user.address;
      this.date = this.$route.params.user.dob;
      this.url = this.$route.params.user.imgurl;
    }
  },
  methods: {
    getProfilePic() {
      console.log('get url', this.url)
      if (this.url == null) {
        return "http://localhost:5000/get/avator/" + 1;
      }
      else {
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
      const userdata = {
        name: Name,
        role_id: RoleId,
        email: Email,
        profilepic: this.imageFile,
        password: Password,
        phone: Phone,
        address: Address,
        dob: date,
        imgurl: this.url
      }
      var action = "create";
      this.$store.commit('userData', userdata)
      this.$router.push({ name: 'user-confirm', params: { action } });
      console.log('userdata pp',this.imageFile);
      console.log('og pp', this.profilepic)
    },
    onFileChange(e) {
      this.imageFile = e.target.files[0];
      this.url = URL.createObjectURL(this.imageFile);
    },
  }
}