export default {
    props: ["proizvodiK"],
    data() {
        return {}
    },
    methods:{
        dodaj(){
        this.$router.push('/dodajKorpu'); 
           }
       },
    template: `
    
<ul class="list-group" v-for="proizvod in proizvodiK">
    <li class="list-group-item" >Naziv: {{proizvod.naziv}}</li>
    <li class="list-group-item" >Opis: {{proizvod.opis}}</li>
    <li class="list-group-item" >Cena: {{proizvod.cena}}</li>
    <li class="list-group-item" >Dosptupno: {{proizvod.dostupno}}</li>
    <button type="submit" class="btn btn-primary" @click="dodaj()">Dodaj u korpu</button>
</ul>
    `
}