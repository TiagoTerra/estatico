<template>
  <div class="row">
    <div class="row">
      <div class="col-md-3">
        <select class="form-control" v-model="etapaSelecionada">
          <option disabled selected value="">Etapa</option>
          <option v-for="etapa in etapas" :key="etapa.EVE_EsquemaDetalheFase_Abreviada"
            :value="etapa.EVE_EsquemaDetalheFase_Abreviada">
            {{ etapa.EVE_EsquemaFaseNome }}</option>
        </select>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-3">
        <select class="form-control">
          <option disabled selected value="">Atleta</option>
          <option v-for="atleta in atletas" :key="atleta.ASS_Associado_ID" :value="atleta.ASS_Associado_ID">
            {{ atleta.ASS_Associado_Nome }}</option>
        </select>
      </div>
      <div class="col-md-5"></div>
    </div>
    <div class="grid-container">

      <div v-show="!classificaPorGrupo" class="item-box" v-for="item in items" :key="item.id">
        <div class="row">
          <div class="col-md-8">
            {{ item.Titulo }}
          </div>
          <div class="col-md-4">
            {{ item.Resultado }}
          </div>
        </div>
        <div class="row">
          <div class="col-md-8">
            {{ item.Mesa_Horario }}
          </div>
          <div class="col-md-4">
            {{ item.Data }}
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-md-4">
            {{ item.Atleta_Um_Nome }}
          </div>
          <div class="col-md-1">{{ item.EVE_Jogo_TotalSets_1 }}</div>
          <div class="col-md-1">{{ item.EVE_Jogo_Set_1_1 }}</div>
          <div class="col-md-1">{{ item.EVE_Jogo_Set_1_2 }}</div>
          <div class="col-md-1">{{ item.EVE_Jogo_Set_1_3 }}</div>
          <div class="col-md-1">{{ item.EVE_Jogo_Set_1_4 }}</div>
          <div class="col-md-1">{{ item.EVE_Jogo_Set_1_5 }}</div>
          <div class="col-md-1">{{ item.EVE_Jogo_Set_1_6 }}</div>
          <div class="col-md-1">{{ item.EVE_Jogo_Set_1_7 }}</div>
        </div>
        <div class="row">
          <div class="col-md-4">
            {{ item.Atleta_Dois_Nome }}
          </div>
          <div class="col-md-1">{{ item.EVE_Jogo_TotalSets_2 }}</div>
          <div class="col-md-1">{{ item.EVE_Jogo_Set_2_1 }}</div>
          <div class="col-md-1">{{ item.EVE_Jogo_Set_2_2 }}</div>
          <div class="col-md-1">{{ item.EVE_Jogo_Set_2_3 }}</div>
          <div class="col-md-1">{{ item.EVE_Jogo_Set_2_4 }}</div>
          <div class="col-md-1">{{ item.EVE_Jogo_Set_2_5 }}</div>
          <div class="col-md-1">{{ item.EVE_Jogo_Set_2_6 }}</div>
          <div class="col-md-1">{{ item.EVE_Jogo_Set_2_7 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      items: null,
      classificaPorGrupo: true,
      itemSelecionado: null,
      eventoId: null,
      etapaSelcionada: null,
      etapas: [],
      atletaSelecionado: null,
      atletas: []
    }
  },
  watch: {
    interruptor(novoValor) {
      console.log("Estado atual do interruptor:", novoValor ? "Agrupados por Clube" : "Sem agrupamento");
    }
  },
  mounted() {
    this.carregaEtapas();
    this.carregaAtletas();
    this.carregaResultados();
    
  },
  methods: {
    carregaResultados() {
      if (this.msg != undefined && this.msg != null) {
        const rota = 'http://localhost:7071/api/GetJogoEventoApp/3663/' + this.msg;

        fetch(rota)
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
      }
    },
    handleAutocompleteSelected(selectedItem, eventoId) {
      this.itemSelecionado = selectedItem;
      this.eventoId = eventoId;
      console.log('Item selecionado:', this.itemSelecionado);
      this.carregaEtapas();
      this.carregaAtletas()
    },
    carregaEtapas() {
      const rota = 'http://localhost:7071/api/GetEventoResultadoFase/' + this.eventoId + '/'
        + this.itemSelecionado?.categoryId;

      fetch(rota)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro na requisição');
          }
          return response.json();
        })
        .then(data => {
          // Manipule os dados JSON aqui
          this.etapas = data;
          console.log(data);
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    },
    carregaAtletas() {
      const rota = 'http://localhost:7071/api/GetAtletaEvento/' + this.eventoId + '/'
        + this.itemSelecionado?.categoryId;

      fetch(rota)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro na requisição');
          }
          return response.json();
        })
        .then(data => {
          // Manipule os dados JSON aqui
          this.atletas = data;
          console.log(data);
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    }
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

.item-internal-box {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 5px;
  /* margin-bottom: 20px; */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s;
  font-size: 12px;
  width: 90%;
  margin-left: 1%;
  margin-bottom: 1%;
  margin: 5px 0 0 !important;
}


.item-external-box {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 20px;
  /* margin-bottom: 20px; */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s;
  font-size: 12px;
  width: calc(24%);
  margin-left: 3%;
  margin-bottom: 1%;
  margin: 1px 0 0 !important;
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