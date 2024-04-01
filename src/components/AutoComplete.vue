<template>
  <div>
    <input v-model="searchText" @input="search" class="form-control" />
    <ul v-if="showOptions">
      <li v-for="(option, index) in options" :key="index">{{ option }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      options: [],
      showOptions: false
    };
  },
  mounted() {
    // Carregar os dados do autocomplete uma vez quando o componente for montado
    this.loadAutocompleteData();
  },
  methods: {
    loadAutocompleteData() {
      // Chamar a API para carregar os dados do autocomplete
      // Por exemplo:
      // fetch('sua/api/autocomplete')
      //   .then(response => response.json())
      //   .then(data => {
      //     this.options = data;
      //   })
      //   .catch(error => {
      //     console.error('Erro ao carregar dados do autocomplete:', error);
      //   });
    },
    search() {
      // Verificar se o comprimento do texto de pesquisa é maior que 2
      if (this.searchText.length >= 2) {
        // Chamar a API para buscar os dados do autocomplete com base no texto de pesquisa
        // Por exemplo:
        fetch(`http://localhost:7071/api/GetEventoCategoria/3799/${this.searchText}`)
          .then(response => response.json())
          .then(data => {
            this.options = data.map(objeto => objeto.nome);
            this.showOptions = true; // Mostrar as opções depois de obter os resultados
          })
          .catch(error => {
            console.error('Erro ao buscar dados do autocomplete:', error);
          });
      } else {
        this.showOptions = false; // Esconder as opções se o texto de pesquisa for muito curto
      }
    }
  }
};
</script>