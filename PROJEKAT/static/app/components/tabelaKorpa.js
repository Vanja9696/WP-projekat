export default {
    props: ["korpe"],
    emits: ["izmena", "uklanjanje"],
    data() {
        return {}
    },
    template: `
<table class="table table-striped">
<thead>
    <tr>
        <th>ID</th>
        <th>ID korisnika</th>
        <th>ID proizvoda</th>
        <th>Kolicina</th>
        <th>Datum</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="korpa in korpe">
        <td>{{korpa.id}}</td>
        <td>{{korpa.korisnik_id}}</td>
        <td>{{korpa.proizvod_id}}</td>
        <td>{{korpa.kolicina}}</td>
        <td>{{korpa.datum}}</td>
        <td><button class="btn btn-primary me-3" v-on:click="$emit('izmena', {...korpa})">Izmeni</button><button
                v-on:click="$emit('uklanjanje', korpa.id)" class="btn btn-danger">Ukloni</button></td>
    </tr>
</tbody>
</table>
    `
}