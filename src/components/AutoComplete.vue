<!-- <template>
  <div>
    <autocomplete v-model="selectedItem" :get-suggestions="getSuggestions" @select="onSelect"
      placeholder="Digite para pesquisar"></autocomplete>
  </div>
</template>

<script>
import AutoComplete from 'vuejs-autocomplete';

export default {
  components: {
    AutoComplete
  },
  data() {
    return {
      selectedItem: null
    };
  },
  methods: {
    async getSuggestions(query) {
      // Faça uma chamada para a sua API para obter sugestões com base na consulta
      // Aqui está um exemplo fictício usando a função fetch:
      const response = await fetch(`https://api.example.com/search?q=${query}`);
      const data = await response.json();
      return data.results; // Supondo que sua API retorna um array de resultados
    },
    onSelect(selectedItem) {
      // Chamado quando um item é selecionado
      // Aqui você pode fazer o que quiser com o item selecionado
      this.selectedItem = selectedItem;
    }
  }
};
</script> -->

<!-- // Estilos opcionais para o componente autocomplete  -->
<!-- <style> -->
<!-- /*  */ -->
<!-- </style> -->