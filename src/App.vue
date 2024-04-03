<template>
  <div class="container">
    <div class="row mb-3">
      <h4>{{ titulo }}</h4>
    </div>
    <div class="row mb-3">
      <div class="col-md-12">
        <input v-model="searchText" @input="fetchSuggestions" class="form-control">
        <ul v-if="suggestions.length > 0" class="form-control">
          <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectSuggestion(suggestion)">
            {{ suggestion }}
          </li>
        </ul>
      </div>
    </div>

    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <div class="container">
          <!-- <router-link to="/" class="nav-link" aria-current="page">INSCRIÇÕES</router-link> -->
          <div class="item-box" v-for="item in items" :key="item.id">
            <h2>{{ item.ASS_Associado_Nome }}</h2>
            <p>{{ item.EVE_EventoInscricaoAtleta_PontosRanking }}</p>
            <div>{{ item.Clube }}</div>
            <div>{{ item.EVE_EventoInscricaoAtleta_PontosRating }}</div>
            <div>{{ item.Status_Inscricao }}</div>
            <div>{{ item.Categoria_Nome }}</div>
          </div>
        </div>
      </li>
      <li class="nav-item" role="presentation">
        <router-link to="/profile" class="nav-link">GRUPOS</router-link>
      </li>
      <li class="nav-item" role="presentation">
        <router-link to="/contact" class="nav-link">RESULTADOS</router-link>
      </li>
      <li class="nav-item" role="presentation">
        <router-link to="/contact" class="nav-link">FASE ELIMNATÓRIA</router-link>
      </li>
    </ul>

    <!-- <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li v-for="(tab, index) in tabs" :key="index" class="nav-item" role="presentation">
        <router-link :to="tab.route" class="nav-link" aria-current="page" @mouseover="hoveredTabIndex = index"
          @mouseleave="hoveredTabIndex = null"
          :class="{ 'active': activeTabIndex === index, 'hovered': hoveredTabIndex === index }"
          @click="activeTabIndex = index">{{ tab.label }}</router-link>
      </li>
    </ul> -->

    <div class="tab-content" id="myTabContent">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
// import VueAutocomplete from 'vue3-autocomplete';
import { ref } from 'vue';
// Certifique-se de ajustar o caminho conforme a estrutura do seu projeto
export default {
  name: 'TabsComponent',
  setup() {
    const searchText = ref('');
    const suggestions = ref([]);

    const fetchSuggestions = async () => {
      if (searchText.value != null && searchText.value != '' && searchText.value.length > 2) {
        await fetch(`http://localhost:7071/api/GetEventoCategoria/3799/${searchText.value}`)
          .then(response => response.json())
          .then(data => {
            suggestions.value = data.map(objeto => objeto.nome);
          })
      }
    };

    const selectSuggestion = (suggestion) => {
      searchText.value = suggestion;
      suggestions.value = [];
    };

    return {
      searchText,
      suggestions,
      fetchSuggestions,
      selectSuggestion
    };
  },
  data() {
    return {
      tabs: [
        { label: 'INCRIÇÕES', route: '/' },
        { label: 'GRUPOS', route: '/profile' },
        { label: 'RESULTADOS', route: '/contact' },
        { label: 'FASE ELIMINATÓRIA', route: '/AAA' }
      ],

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
  created() {
    this.fetchEventData();
  },
  mounted() {
    this.loadTitulo();
    this.loadAtletaEvento();
  },
  methods: {
    onSelect(selectedItem) {
      // Chamado quando um item é selecionado
      // Aqui você pode fazer o que quiser com o item selecionado
      this.selectedItem = selectedItem;
    },
    async loadTitulo() {

      const response = await fetch('http://localhost:7071/api/GetEventoTitulo/3799');
      const data = await response.json();
      this.titulo = data[0].Titulo;
    },
    async loadAtletaEvento(){
      const response = await fetch('http://localhost:7071/api/GetAtletaEvento/3663/88888888/');
      this.items = await response.json();
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
        // const data = await response.json();


        // const mapped = data.split('\n').map((item, index) => ({
        //   id: index + 1,
        //   name: item.nome.trim() // Use o texto retornado como nome
        // }));

        const data = await response.json();
        this.autocompleteData = data.filter(item => item.nome.toLowerCase().includes(term.toLowerCase()));

        // this.autocompleteData = response.json();

        alert('sucesso');
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

.container {
  margin-top: 1% !important;
  margin-left: 5% !important;
  margin-right: 5% !important;
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
      margin-bottom: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s;
      font-size: 19px;
    }
    /* Efeito de hover 3D */
    .item-box:hover {
      font-size: 19px;
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);
    }

</style>