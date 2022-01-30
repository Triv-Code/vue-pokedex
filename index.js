const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello World',
    pokemon_name: '',
    pokemon_id: '',
    image: '',
    type_1: '',
    type_2: '',
    hit_points: '',
    attack: '',
    defense: '',
    speed: '',
    special_attack: '',
    special_defense: '',
    height: '',
    weight: '',
  },
  methods: {
    upperCase(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    heightAdjust(num) {        
      num = num * 0.10;
      num = num * 39.37;
      num = num / 12;
      foot = num.toString();
      foot = Math.floor(num);
      inch = num - foot;
      inch = 12 * inch;
      inch = Math.ceil(inch);
      if (inch === 12) {
          inch = 0
          foot = foot + 1
      }  
      return `${foot}'${inch}" `
    },
    weightAdjust(num) {
      num = num * 0.1;
      num = num * 2.205;
      num = Number.parseFloat(num).toPrecision(3);
      return `${num} lbs`
    },
    percentage(num) {
      num = num / 160;
      num = num * 100
      num = Math.floor(num);
      return num
    },
    userInput() {
      pokeInput = document.getElementById('userInput').value
      this.getPokemon(pokeInput.toLowerCase());
      document.getElementById('userInput').value = null;
    },
    getPokemon(input) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${input}/`)
        .then(res => res.json())
        .then(data => {
          this.pokemon_name = this.upperCase(data.name)
          this.pokemon_id = data.id
          this.image = data.sprites.other.dream_world.front_default
          this.height =  this.heightAdjust(data.height)
          this.weight = this.weightAdjust(data.weight)
          this.type_1 = data.types[0].type.name
          if (data.types[1]) {
            this.type_2 = data.types[1].type.name
          } else { 
            this.type_2 = ''
            document.querySelector('.typeHide').style = "display: none;"
          }
          this.hit_points = data.stats[0].base_stat
          this.attack = data.stats[1].base_stat
          this.defense = data.stats[2].base_stat
          this.speed = data.stats[3].base_stat
          this.special_attack = data.stats[4].base_stat
          this.special_defense= data.stats[5].base_stat
          document.getElementById('container').style = 'grid';
          setTimeout( function() {
            document.querySelector('.hp').style.width = `${this.hit_points}%"`;
            console.log("whut the fuck" + this.hit_points)
          }, 500)
        })
       .catch(() => alert(`That's not a Pokemon!`))
    }
  },
});