export default {
    template: `
<form v-on:submit.prevent="update">
    <div class="mb-3">
    <label class="form-label">ID korisnika:</label>
    <input type="number" class="form-control" v-model="korpa.korisnik_id" required>
    </div>
    <div class="mb-3">
    <label class="form-label">ID proizvoda</label>
    <input type="number" class="form-control" v-model="korpa.proizvod_id" requreid>
    </div>
    <div class="mb-3">
    <label class="form-label">Kolicina</label>
    <input type="number" class="form-control" v-model="korpa.kolicina" requreid>
    </div>
    <div class="mb-3">
    <label class="form-label">Datum</label>
    <input type="datetime-local" class="form-control" v-model="korpa.datum" requreid>
    </div>
    <div class="mb-3">
    <input class="btn btn-primary" type="submit" value="Izmeni"> 
    </div>
</form>
    `,
    data() {
        return {
            korpa: {}
        }
    },
    methods: {
        refresh() {
            axios.get(`api/korpa/${this.$route.params['id']}`).then((response) => {
                this.korpa = response.data;
            });
        },
        update() {
            axios.put(`api/korpa/${this.$route.params['id']}`, this.korpa).then((response) => {
                this.$router.push("/korpa");
            });
        }
    },
    created() {
        this.refresh();
    }
}