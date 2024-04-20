<template>
  <div class="containergeral">
    <div class="row mb-3">
      <h4>{{ titulo }}</h4>
    </div>
    <div class="row mb-3">
      <div class="col-md-12">
        <input v-model="searchText" ref="autocompleteInput" @input="fetchSuggestions" class="form-control">
        <!-- <ul v-if="suggestions.length > 0" class="form-control"> -->
        <ul v-if="showSuggestions" class="form-control">
          <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectSuggestion(suggestion)">
            {{ suggestion.nome }}
          </li>
        </ul>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-12">
        <div class="tabs">
          <div v-for="(tab, index) in tabs" :key="index" class="tab" :class="{ active: activeTab === index }"
            @click="activeTab = index">
            {{ tab }}
          </div>
        </div>
        <div class="tab-content">
          <!-- Renderiza o componente correspondente à tab ativa -->
          <Tab1 ref="tabComponent" v-if="activeTab === 0" />
          <Tab2 v-if="activeTab === 1" />
          <Tab3 v-if="activeTab === 2" />
          <Tab4 v-if="activeTab === 3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import VueAutocomplete from 'vue3-autocomplete';

import { ref } from 'vue';
import Tab1 from './components/TabIncricoes.vue';
import Tab2 from './components/TabGrupos.vue';
import Tab3 from './components/TabResultados.vue';
import Tab4 from './components/TabFaseEliminatoria.vue';
// import { Alert } from 'bootstrap';

export default {
  name: 'TabsComponent',
  data() {
    return {
      activeTab: 0,
      tabs: ['Inscrições', "Grupos", "Resultados", "Fase Eliminatória"],
      activeTabIndex: null,
      hoveredTabIndex: null,
      selectedItem: null,
      titulo: null,
      autocompleteData: [],
      options: [
        { id: 1, name: 'Opção 1' },
        { id: 2, name: 'Opção 2' },
        { id: 3, name: 'Opção 3' }
      ],
      items: null
    };
  },
  setup() {
    const searchText = ref('');
    var suggestions = ref([]);
    var showSuggestions = true;

    const fetchSuggestions = async () => {
      showSuggestions = true;
      if (searchText.value != null && searchText.value != '' && searchText.value.length > 2) {
        await fetch(`http://localhost:7071/api/GetEventoCategoria/3799/${searchText.value}`)
          .then(response => response.json())
          .then(data => {
            suggestions.value = data.map(objeto => objeto);
          })
      }
    };

    // const clearSuggestions = {
    //   mounted(el, binding) {
    //     el.addEventListener('click', () => {
    //       // Lógica para limpar a lista de sugestões
    //       binding.value(); // Chama a função fornecida no argumento da diretiva
    //     });
    //   }
    // };

    // function clearSuggestions(){
    //   suggestions.value = [];
    // }

    const autocompleteInput = ref(null);

    return {
      searchText,
      suggestions,
      fetchSuggestions,
      autocompleteInput,
      showSuggestions
    };
  },
  components: {
    Tab1,
    Tab2,
    Tab3,
    Tab4
  },
  created() {
    this.fetchEventData();
  },
  mounted() {
    this.loadTitulo();
  },
  methods: {
    selectSuggestion(suggestion) {
      this.$refs.tabComponent.handleAutocompleteSelected(suggestion);
      this.suggestions = [];
      this.searchText = suggestion.nome;
    },
    onSelect(selectedItem) {
      this.selectedItem = selectedItem;
    },
    async loadTitulo() {
      const response = await fetch('http://localhost:7071/api/GetEventoTitulo/3799');
      const data = await response.json();
      this.titulo = data[0].Titulo;
    },
    fetchEventData() {
      // Lógica para carregar os dados do evento via API
    },
    fetchDropdownData() {
      // Lógica para carregar os dados da dropdown via API
    },
    loadData() {
      // Lógica para carregar os dados das abas com base no item selecionado na dropdown
    },
    async loadDataFromApi(term) {
      try {
        this.loading = true;
        // Substitua 'sua_url_da_api' pela URL real da sua API
        const response = await fetch('http://localhost:7071/api/GetEventoCategoria/3799');
        const data = await response.json();
        this.autocompleteData = data.filter(item => item.nome.toLowerCase().includes(term.toLowerCase()));
      } catch (error) {
        alert('Erro ao carregar dados da API:', error);
        // console.error('Erro ao carregar dados da API:', error);
      } finally {
        this.loading = false;
      }
    },
    submitForm() {
      // Lógica para lidar com o envio do formulário
      console.log('Formulário enviado!');
    },
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 5% !important;
  margin-right: 5% !important;
}

.containergeral {
  margin-top: 2% !important;
  margin-left: 2% !important;
  margin-right: 2% !important;
}

/* Estilo para as abas */
.nav-tabs .nav-item {
  cursor: pointer;

}

.nav-tabs .nav-link:hover {
  cursor: pointer;
  border-color: #4caf50;
  /* Verde */
  box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.25);
  /* Efeito de foco sutil verde */

}

.nav-tabs .nav-link.selected {
  font-weight: bold !important;

  /* Adicione outros estilos conforme necessário */
}

/* Estilo para bordas sutis */
.border-green {
  border-color: #4caf50;
  /* Verde */
}

.border-yellow {
  border-color: #ffeb3b;
  /* Amarelo */
}

.border-blue {
  border-color: #2196f3;
  /* Azul */
}

/* Estilo para foco/hover em controles */
input:focus,
textarea:focus,
select:focus {
  border-color: #4caf50;
  /* Verde */
  box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.25);
  /* Efeito de foco sutil verde */
}

input:hover,
textarea:hover,
select:hover {
  border-color: #ffeb3b;
  /* Amarelo */
}

/* Estilo para botões */
.btn-green {
  color: #ffffff;
  background-color: #4caf50;
  /* Verde */
  border-color: #4caf50;
  /* Verde */
}

.btn-yellow {
  color: #000000;
  background-color: #ffeb3b;
  /* Amarelo */
  border-color: #ffeb3b;
  /* Amarelo */
}

.btn-blue {
  color: #ffffff;
  background-color: #2196f3;
  /* Azul */
  border-color: #2196f3;
  /* Azul */
}

/* Estilos para a lista de sugestões */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
}


/* PRIMEIRA ABA*/
/* Estilizando as caixas */
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

.grid-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* Ajuste conforme necessário */
}

.tabs {
  display: flex;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-bottom: none;
}

.tab.active {
  background-color: #f0f0f0;
}

.tab-content {
  border: 1px solid #ccc;
  padding: 20px;
}
</style>