<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        {{ titulo }}
      </div>
    </div>
    <div class="row">
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
    <div class="row">
      <div class="col-md-12">
        <div class="tabs">
          <div v-for="(tab, index) in tabs" :key="index" class="tab" :class="{ active: activeTab === index }"
            @click="activeTab = index">
            {{ tab }}
          </div>
        </div>
        <div class="tab-content">
          <!-- Renderiza o componente correspondente à tab ativa -->
          <Tab1 ref="tabComponent" v-if="activeTab === 0" :msg="categoriaId" />
          <Tab2 ref="tabGrupos" v-if="activeTab === 1" :msg="categoriaId" />
          <Tab3 ref="tabResultados" v-if="activeTab === 2" :msg="categoriaId" />
          <Tab4 v-if="activeTab === 3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Tab1 from './components/TabIncricoes.vue';
import Tab2 from './components/TabGrupos.vue';
import Tab3 from './components/TabResultados.vue';
import Tab4 from './components/TabFaseEliminatoria.vue';

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
      items: null,
      itemSelecionado: null,
      tabSelecionada: null,
      categoriaId: null
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
    carregaAbaCorrente(index) {
      if (index == 0) {
        this.$refs.tabComponent?.handleAutocompleteSelected(this.itemSelecionado);
      }
      else if (index == 1) {
        this.$refs.tabGrupos?.handleAutocompleteSelected(this.itemSelecionado, '3799');
      }
      else if (index == 2) {
        this.$refs.tabResultados?.handleAutocompleteSelected(this.itemSelecionado, '3799');
      }
    },
    selectSuggestion(suggestion) {
      this.itemSelecionado = suggestion;
      this.categoriaId = this.itemSelecionado.categoryId;

      this.carregaAbaCorrente(this.activeTab);

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
  }
};
</script>

<style scoped>
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
.tabs {
  display: flex;
}
.tab {
  /* padding: 5px 10px; */
  cursor: pointer;
  border: 0px solid #ccc;
  border-bottom: none;
  width: 100%;
}
.tab.active {
  background-color: #f0f0f0;
}
.tab-content {
  border: 1px solid #ccc;
  /* padding: 10px; */
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


/* Estilos para a lista de sugestões */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
}
</style>