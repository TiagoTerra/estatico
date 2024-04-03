<!-- <template>
  <div>
    <input v-model="searchText" @input="search" class="form-control" @blur="onBlur" />
    <ul v-if="showOptions" class="form-control">
      <li v-for="(option, index) in options" :key="index" @click="selectItem(option)">{{ option }}</li>
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
    },
    selectItem(item) {
      alert(item);
      this.searchText = item;
      alert(this.searchText);
      this.showOptions = false;
    },
    onBlur() {
      // Ocultar a lista quando o input perde foco
      this.showOptions = false;
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
<style scoped>
/* Estilize a lista de acordo com a form-control do Bootstrap */
ul {
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
}

li {
  cursor: pointer;
}

/* Adicione qualquer outro estilo necessário */
</style> -->