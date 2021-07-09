export default {
    props: ["proizvodi"],
    emits: ["izmena", "uklanjanje"],
    data() {
        return {}
    },
    template: `
<table class="table table-dark table-hover">
<thead>
    <tr>
        <th>ID</th>
        <th>Naziv</th>
        <th>Opis</th>
        <th>Cena</th>
        <th>Dostupno</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="proizvod in proizvodi">
        <td>{{proizvod.id}}</td>
        <td>{{proizvod.naziv}}</td>
        <td>{{proizvod.opis}}</td>
        <td>{{proizvod.cena}}</td>
        <td>{{proizvod.dostupno}}</td>
        <td><button class="btn btn-primary me-3" v-on:click="$emit('izmena', {...proizvod})">Izmeni</button><button
                v-on:click="$emit('uklanjanje', proizvod.id)" class="btn btn-danger">Ukloni</button></td>
    </tr>
</tbody>
</table>
    `
}