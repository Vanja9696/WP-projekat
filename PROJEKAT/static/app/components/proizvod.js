export default {
    template: `
<form v-on:submit.prevent="update">
    <div class="mb-3">
    <label class="form-label">Naziv:</label>
    <input type="text" class="form-control" placeholder="Naziv proizvoda" v-model="proizvod.naziv" required>
    </div>
    <div class="mb-3">
    <label class="form-label">Opis:</label>
    <textarea class="form-control" v-model="proizvod.opis" requreid></textarea>
    </div>
    <div class="mb-3">
    <label class="form-label">Cena:</label>
    <input type="number" class="form-control" v-model="proizvod.cena" required>
    </div>
    <div class="mb-3">
    <label class="form-label">Dostupno:</label>
    <select class="form-select" v-model="proizvod.dostupno">
        <option value="1">Da</option>
        <option value="0">Ne</option>
    </select>
    </div>
    <div class="mb-3">
    <input class="btn btn-primary" type="submit" value="Izmeni"> 
    </div>
</form>
    `,
    data() {
        return {
            proizvod: {}
        }
    },
    methods: {
        refresh() {
            axios.get(`api/proizvodi/${this.$route.params['id']}`).then((response) => {
                this.proizvod = response.data;
            });
        },
        create(proizvod) {
            axios.post("api/proizvodi", proizvod).then((response) => {
                this.$router.push("/proizvodi");
                this.refresh();
            });
        },
        update() {
            axios.put(`api/proizvodi/${this.$route.params['id']}`, this.proizvod).then((response) => {
                this.$router.push("/proizvodi");
            });
        }
    },
    created() {
        this.refresh();
    }
}