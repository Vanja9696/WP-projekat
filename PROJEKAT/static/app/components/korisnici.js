export default {
    template: `
    <div class="alert alert-danger" role="alert" v-if="ulogovan">
    <b>Morate biti prijavljeni</b>
</div>
<div>
    <h1>Korisnici</h1>
    <tabela-korisnika v-bind:tipovi="tipovi" v-bind:korisnici="korisnici" v-on:uklanjanjeK="remove" v-on:izmenaK="setZaIzmenu"></tabela-korisnika>
</div>
    `,
    data() {
        return {
            korisnici: [],
            tipovi:[],
            ulogovan: false
            
        }
    },
    methods: {
        refreshTip() {
            axios.get("api/tip").then((response) => {
                this.tipovi = response.data;
            });
        },
        refreshkorisnici() {
            axios.get("api/korisnici").then((response) => {
                this.korisnici = response.data;
            }, _ =>{
                this.ulogovan=true;
            });
        },
        remove(id)  {
            axios.delete(`api/korisnici/${id}`).then((response) => {
                this.refreshkorisnici();
            });
        },
        setZaIzmenu(korisnik) {
            this.$router.push(`/korisnici/${korisnik.id}`);
        }
    },
    created() {
        this.refreshkorisnici();
        this.refreshTip();
    }
}