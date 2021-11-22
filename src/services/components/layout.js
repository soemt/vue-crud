import { mapGetters } from "vuex";
import constants from "../../constants";

export default {
  data() {
    return {
      title: constants.APP_TITLE,
    };
  },
  created() {
    this.$root.$refs.layout = this;
  },
  computed: {
    ...mapGetters(["isLoggedIn", "userType", "userName", "userId", "isAdmin"]),
  },
  methods: {
    /**
     * This is to log out from system.
     * @returns void
     */
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push({ name: "login" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * This is to route profile page.
     * @returns void
     */
    showProfile(id) {
      this.$router.push({ name: "user-detail", params: {id}});
    },
  },
};
