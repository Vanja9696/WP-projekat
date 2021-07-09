export default {
    props: ["korisnici","tipovi"],
    emits: ["izmenaK", "uklanjanjeK",],
    data() {
        return {}
    },
    template: `
<table class="table table-dark table-hover">
<thead>
    <tr>
        <th>ID</th>
        <th>Korisnicko ime</th>
        <th>Lozinka</th>
        <th>Tip</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="korisnik in korisnici">
        <td>{{korisnik.id}}</td>
        <td>{{korisnik.korisnicko_ime}}</td>
        <td>{{korisnik.lozinku}}</td>
        <td>{{korisnik.tip_id }}</td>
        <td><button class="btn btn-primary me-3" v-on:click="$emit('izmenaK', {...korisnik})">Izmeni</button><button
                v-on:click="$emit('uklanjanjeK', korisnik.id)" class="btn btn-danger">Ukloni</button></td>
    </tr>
</tbody>
</table>
<table class="table table-dark table-hover">
<thead>
    <tr>
        <th>ID</th>
        <th>Naziv uloge</th>
    </tr>
</thead>
<tbody>
    <tr v-for="tip in tipovi">
        <td>{{tip.id}}</td>
        <td>{{tip.naziv}}</td>
    </tr>
    </tbody>
</table>
    `
}