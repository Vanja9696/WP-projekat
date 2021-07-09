export default {
    template: `
    <div class="alert alert-danger" role="alert" v-if="ulogovan">
    <b>Morate biti prijavljeni</b>
</div>
<div>
    <h1>Proizvodi</h1>
    <tabela-proizvoda v-bind:proizvodi="proizvodi" v-on:uklanjanje="remove" v-on:izmena="setZaIzmenu"></tabela-proizvoda>
</div>
    `,
    data() {
        return {
            proizvodi: [],
            ulogovan: false
        }
    },
    methods: {
        refreshProizvodi() {
            axios.get("api/proizvodi").then((response) => {
                this.proizvodi = response.data;
            }, _ =>{
                this.ulogovan=true;
            });
        },
        remove(id)  {
            axios.delete(`api/proizvodi/${id}`).then((response) => {
                this.refreshProizvodi();
            });
        },
        setZaIzmenu(proizvod) {
            this.$router.push(`/proizvodi/${proizvod.id}`);
        }
    },
    created() {
        this.refreshProizvodi();
    }
}