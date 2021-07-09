export default {
    template: `
    <div class="alert alert-danger" role="alert" v-if="ulogovan">
    <b>Morate biti prijavljeni kao Administrator</b>
</div>
<div>
    <nov-proizvod v-on:sacuvaj="create" v-bind:tekst="'Dodaj'"></nov-proizvod>
</div>
    `,
    data() {
        return {
            proizvodi: [],
            ulogovan:false,
            korisnik: {},
            
        }
    },
    methods: {
        refresh() {
            axios.get(`api/korisnici/${this.$route.params['id']}`).then((response) => {
                this.korisnik = response.data;
            });
        },
        refreshProizvodi() {
            axios.get("api/proizvodi").then((response) => {
                this.proizvodi = response.data;
            }, _ =>{
                this.ulogovan=true;
            });
        },
        create(proizvod) {
            axios.post("api/proizvodi", proizvod).then((response) => {
                this.$router.push("/proizvodi");
                this.refresh();
            });
        }
    },
    created() {
        this.refreshProizvodi();
    }
}