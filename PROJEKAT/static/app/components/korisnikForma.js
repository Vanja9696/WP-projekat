export default {
    props: ["korisnik", "tekst"],
    emits: ["sacuvaj"],
    data() {
        return {
            novikorisnik: this.korisnik ? {...this.korisnik} : {}
        }
    },
    watch: {
         korisnik: function(newValue, oldValue) {
             this.novikorisnik = {...this.korisnik};
         }
    },
    template: 
    `
    <form v-on:submit.prevent="$emit('sacuvaj', {...novikorisnik})">
        <div class="mb-3">
            <label class="form-label">Korisničko ime: <input type="text" class="form-control" v-model="novikorisnik.korisnicko_ime" required></label>
        </div>
        <div class="mb-3">
            <label class="form-label">Lozinka: <input type="password" class="form-control" v-model="novikorisnik.lozinku" required></label>
        </div>
        <div>
        <label class="form-label">Tip:</label>
            <select class="form-select" v-model="novikorisnik.tip_id">
            <option value="1">Administrator</option>
            <option value="2">Kupac</option>
            </select>
        </div>
        <div class="mb-3">
            <input type="submit" class="btn btn-primary" v-bind:value="tekst">
        </div>
    </form>
    `
}