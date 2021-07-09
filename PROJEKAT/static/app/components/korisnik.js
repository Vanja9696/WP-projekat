export default {
    template: `
<form v-on:submit.prevent="update">
    <div class="mb-3">
    <label class="form-label">Korisnicko ime:</label>
    <input type="text" class="form-control" placeholder="Naziv korisnika" v-model="korisnik.korisnicko_ime" required>
    </div>
    <div class="mb-3">
    <label class="form-label">Lozinka</label>
    <input type="text" class="form-control" v-model="korisnik.lozinku" requreid>
    </div>
    <div class="mb-3">
    <label class="form-label">Tip:</label>
    <select class="form-select" v-model="korisnik.tip_id">
        <option value="1">Administrator</option>
        <option value="2">Kupac</option>
    </select>
    </div>
    <div class="mb-3">
    <input class="btn btn-primary" type="submit" value="Izmeni"> 
    </div>
</form>
    `,
    data() {
        return {
            korisnik: {}
        }
    },
    methods: {
        refresh() {
            axios.get(`api/korisnici/${this.$route.params['id']}`).then((response) => {
                this.korisnik = response.data;
            });
        },
        update() {
            axios.put(`api/korisnici/${this.$route.params['id']}`, this.korisnik).then((response) => {
                this.$router.push("/korisnici");
            });
        }
    },
    created() {
        this.refresh();
    }
}