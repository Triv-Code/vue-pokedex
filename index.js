const app = new Vue({
  el: '#app',
  data: {
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
      num = num * 0.10 * 39.37 / 12;
      foot = Math.floor(num);
      inch = Math.ceil((num - foot) * 12);
      if (inch === 12) {
          inch = 0
          foot += 1;
      }  
      return `${foot}'${inch}" `
    },
    weightAdjust(num) {
      num = Number.parseFloat((num * 0.1) * 2.205).toPrecision(3);
      return `${num} lbs`
    },
    percentage(num) {
      return Math.floor((num / 160) * 100)
    },
    userInput() {
      this.getPokemon((document.getElementById('userInput').value).toLowerCase());
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
            document.querySelector('.typeHide').style = "display: block;"
          } else { 
            this.type_2 = ''
            document.querySelector('.typeHide').style = "display: none;"
          }
          this.hit_points =  `width: ${this.percentage(data.stats[0].base_stat)}%`
          this.attack = `width: ${this.percentage(data.stats[1].base_stat)}%`
          this.defense = `width: ${this.percentage(data.stats[2].base_stat)}%`
          this.speed = `width: ${this.percentage(data.stats[3].base_stat)}%`
          this.special_attack = `width: ${this.percentage(data.stats[4].base_stat)}%`
          this.special_defense= `width: ${this.percentage(data.stats[5].base_stat)}%`
          document.getElementById('container').style = 'grid';
          setTimeout( function() {
            document.querySelector('.hp').style.width = `${this.hit_points}%"`;
          }, 500)
        })
       .catch(() => alert(`That's not a Pokemon!`))
    },
  },
});