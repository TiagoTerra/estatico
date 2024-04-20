<template>
  <div class="grid-container">
    <div class="item-box" v-for="item in items" :key="item.id">
      <h4>{{ item.ASS_Associado_Nome }}</h4>
      <div>{{ item.EVE_EventoInscricaoAtleta_PontosRanking }}</div>
      <div>{{ item.Clube }}</div>
      <div>{{ item.EVE_EventoInscricaoAtleta_PontosRating }}</div>
      <div>{{ item.Status_Inscricao }}</div>
      <div>{{ item.Categoria_Nome }}</div>
    </div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created() {
    // this.$parent.$on('autocomplete-item-selected', this.onAutocompleteItemSelectedInTabs);
    window.addEventListener('autocompleteSelected', this.onAutocompleteSelected);
  },
  beforeUnmount() {
    // Remove o ouvinte de evento ao destruir o componente
    window.removeEventListener('autocompleteSelected', this.onAutocompleteSelected);
  },
  unmonted() {
  },
  data() {
    return {
      items: null
    }
  },
  mounted() {
    // this.loadAtletaEvento('88888888')
    // alert('mounted');
  },
  setup() {
    // const onAutocompleteSelected = (event) => {
    //   alert('1.1');
    //   const selectedItem = event.detail.selectedItem;
    //   alert(selectedItem);

    //   // carregarTab(selectedItem);
    // };

    // alert('só setup');

    // const carregarTab = (selectedItem) => {
    //   console.log('Item selecionado:', selectedItem);
    //   // Implemente a lógica para carregar a tab com base no item selecionado
    // };
    // const onAutocompleteSelected = (event) => {
    //   // Obtém os detalhes do evento para obter o item selecionado
    //   const selectedItem = event.detail.selectedItem;
    //   alert(selectedItem);
    //   alert('selecionou');
    //   // Carrega a tab com base no item selecionado
    //   // this.carregarTab(selectedItem);
    // }

    const tabRef = ref(null);

    onMounted(() => {
      // window.addEventListener('autocomplete-selected', onAutocompleteSelected);
    });

    onBeforeUnmount(() => {
      // window.removeEventListener('autocomplete-selected', onAutocompleteSelected);
    });
    return {
      tabRef
    };
  },
  // mounted:() {
  //   this.loadAtletaEvento();
  // },
  methods: {
    carregarTab(selectedItem) {
      // const response = fetch('http://localhost:7071/api/GetAtletaEvento/3663/' + selectedItem.eventoId);
      fetch('http://localhost:7071/api/GetAtletaEvento/3663/' + selectedItem)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro na requisição');
          }
          return response.json();
        })
        .then(data => {
          // Manipule os dados JSON aqui
          this.items = data;
          console.log(data);
        })
        .catch(error => {
          console.error('Erro:', error);
        });


      // this.items = response.json();
      // console.log('Item selecionado:', selectedItem);
    },
    handleAutocompleteSelected(selectedItem) {
      var item = selectedItem;
      console.log('Item selecionado:', item);
      this.carregarTab(item.categoryId);
    }
    // async loadAtletaEvento(eventoId) {
    //   const response = await fetch('http://localhost:7071/api/GetAtletaEvento/3663/' + eventoId);
    //   this.items = await response.json();
    // },
    // onAutocompleteItemSelectedInTabs(eventoId) {
    //   alert('z')
    //   this.loadAtletaEvento(eventoId);
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.grid-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.item-box {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 20px;
  /* margin-bottom: 20px; */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s;
  font-size: 12px;
  width: calc(24% - 20px);
  margin-left: 1%;
  margin-bottom: 1%;
}

/* Efeito de hover 3D */
.item-box:hover {
  font-size: 12px;
  transform: translateY(-5px);
  box-shadow: 0 6px 12px #4caf50, 0 3px 6px yellow;
}
</style>