export default {
    template: `
    <div class="alert alert-danger" role="alert" v-if="neuspesanLogin">
    Prijava neuspesna! Pokusali ste da se prijavite kao Administrator
    <p>Pokusajte ponovo</p>
</div>
<div class="alert alert-danger" role="alert" v-if="neuspesanLoginKupac">
Prijava neuspesna! Pokusali ste da se prijavite kao Kupac
<p>Pokusajte ponovo</p>
</div>
    <form v-on:submit.prevent="login()">
  <div class="mb-3">
    <label class="form-label">Korisničko ime</label>
    <input type="text" v-model="korisnik.korisnicko_ime" class="form-control" required>
  </div>
  <div class="input-group mb-3" >
    <label class="form-label">Tip:</label>
    <select class="form-select" v-model="korisnik.tip_id">
        <option value="1">Administrator</option>
        <option value="2">Kupac</option>
    </select>
    </div>
  <button type="submit" class="btn btn-primary">Login</button>
</form>
    `,
    data: function() {
        return {
            korisnik: {
                "korisnicko_ime": "",
                "tip_id": ""
            },
            neuspesanLogin:false,
            neuspesanLoginKupac:false
        };
    },
    methods: {
        login: function() {
            if(this.korisnik.tip_id == "1"){
                axios.post(`api/login`, this.korisnik).then((response) => {
                this.$router.push("/korisnici");
            
            }, _ =>{
                this.neuspesanLogin=true;
            });
        } else if(this.korisnik.tip_id == "2"){
            axios.post(`api/login`, this.korisnik).then((response) => {
                this.$router.push("/proizvodiPI");
            
            }, _ =>{
                this.neuspesanLoginKupac=true;
            });
            
        }
    }
        
    }
}