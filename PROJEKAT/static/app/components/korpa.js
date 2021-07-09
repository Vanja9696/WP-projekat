export default {
    template: `
    <div class="alert alert-danger" role="alert" v-if="ulogovan">
    <b>Morate biti prijavljeni</b>
</div>
<div>
    <h1>Pregled korpe</h1>
    <tabela-korpe v-bind:korpe="korpe" v-on:uklanjanje="remove" v-on:izmena="setZaIzmenu"></tabela-korpe>
</div>
    `,
    data() {
        return {
            korpe: [],
            ulogovan: false
        }
    },
    methods: {
        refreshkorpe() {
            axios.get("api/korpa").then((response) => {
                this.korpe = response.data;
            }
            , _ =>{
                this.ulogovan=true;
            });
        },
        remove(id)  {
            axios.delete(`api/korpa/${id}`).then((response) => {
                this.refreshkorpe();
            });
        },
        setZaIzmenu(korpa) {
            this.$router.push(`/korpa/${korpa.id}`);
        }
    },
    created() {
        this.refreshkorpe();
    }
}