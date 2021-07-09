export default {
    template: `<button class="btn btn-info btn-lg" v-on:click="logOut()">Log out</button>`,
    methods: {
        logOut() {
            axios.get(`api/logout`).then((response) => {
                this.$router.push("/");
            }, _ => {
                this.neuspesanLogin = true;
            });
        }
    }
}