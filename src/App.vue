<!-- <template>
  <div>
    <AutoComplete />
  </div>
</template>

<script>

import AutoComplete from '@/components/AutoComplete.vue'; // Certifique-se de ajustar o caminho conforme a estrutura do seu projeto

export default {
  components: {
    AutoComplete
  },
  // Restante do código da sua página Vue
};

</script> -->

<template>
  <div class="container">
    <!-- <h1>{{ eventName }}</h1> -->
    <div class="row mb-3">
      <!-- <h4>3812 - TMB Platinum Brasileiro Interclubes Olímpico – Ciclo IV - São Paulo/SP - 2023 - Equipes de Clubes.</h4> -->
      <h4>{{ titulo }}</h4>
    </div>
    <div class="row mb-3">
      <div class="col-md-12">
        <!-- <select class="form-select" v-model="selectedItem" @change="loadData" style="width: 100%;">
          <option value="" disabled selected hidden>Selecione uma Categoria</option>
          <option v-for="item in dropdownItems" :key="item.id" :value="item.id">{{ item.name }} </option>
        </select> -->
        <!-- <VueAutocomplete v-model="selectedItem" :items="options" label-key="name" @selected="onItemSelected" class="form-control border-yellow" /> -->
        <!-- <VueAutocomplete v-model="selectedItem" :data="autocompleteData" field:nome :loading="loading"
          @search="loadDataFromApi" class="form-control border-yellow" placeholder="Digite para pesquisar">
        </VueAutocomplete> -->
        <AutoComplete />
      </div>
    </div>

    <!-- <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <div class="container">
          <router-link to="/" class="nav-link" aria-current="page">INSCRIÇÕES</router-link>
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
    </ul> -->

    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li v-for="(tab, index) in tabs" :key="index" class="nav-item" role="presentation">
        <router-link :to="tab.route" class="nav-link" aria-current="page" @mouseover="hoveredTabIndex = index"
          @mouseleave="hoveredTabIndex = null"
          :class="{ 'active': activeTabIndex === index, 'hovered': hoveredTabIndex === index }"
          @click="activeTabIndex = index">{{ tab.label }}</router-link>
      </li>
    </ul>

    <div class="tab-content" id="myTabContent">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
// import VueAutocomplete from 'vue3-autocomplete';
import AutoComplete from '@/components/AutoComplete.vue';
 // Certifique-se de ajustar o caminho conforme a estrutura do seu projeto

export default {
  name: 'TabsComponent',
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
      ]
    };
  },
  components: {
    AutoComplete
  },
  created() {
    this.fetchEventData();
  },
  mounted() {
    this.loadTitulo();
  },
  methods: {
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
</style>