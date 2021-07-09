export default {
    props: ["proizvod", "tekst"],
    emits: ["sacuvaj"],
    data() {
        return {
            noviproizvod: this.proizvod ? {...this.proizvod} : {}
        }
    },
    watch: {
         proizvod: function(newValue, oldValue) {
             this.noviproizvod = {...this.proizvod};
         }
    },
    template: `
    <form v-on:submit.prevent="$emit('sacuvaj', {...noviproizvod})">
        <div class="mb-3">
            <label class="form-label">Naziv: <input type="text" class="form-control" v-model="noviproizvod.naziv" required></label>
        </div>
        <div class="mb-3">
            <label class="form-label">Opis:</label>
            <textarea class="form-control" v-model="noviproizvod.opis" requreid></textarea>
        </div>
        <div class="mb-3">
        <label class="form-label">Cena:</label>
        <input type="number" class="form-control" v-model="noviproizvod.cena" required>
        </div>
        <div class="mb-3">
        <label class="form-label">Dostupno:</label>
        <select class="form-select" v-model="noviproizvod.dostupno">
            <option value="1">Da</option>
            <option value="0">Ne</option>
        </select>
        </div>
        <div class="mb-3">
            <input class="btn btn-primary" type="submit" v-bind:value="tekst"> 
        </div>
    </form>
    `
}