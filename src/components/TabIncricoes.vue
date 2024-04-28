<template>
  <div class="container">
    <div class="row">
      <p>Estado: {{ classificaPorGrupo ? 'Agrupados por Clube' : 'Sem agrupamento' }}</p>
      <div class="row">
        <div class="col-md-2">
          <label class="interruptor">
            <input @click="alteraEstado" type="checkbox" v-model="classificaPorGrupo" class="interruptor-checkbox">
            <span class="interruptor-slider"></span>
          </label>
        </div>
        <div class="col-md-10"></div>
      </div>

      <div class="grid-container">

        <div class="row">
          <div v-show="!classificaPorGrupo" class="col-md-4" v-for="item in items" :key="item.id">
            <div class="item-box">
              <h5>{{ item.Clube }}</h5>
              <div class="item-internal-box">
                <h6>{{ item.ASS_Associado_Nome }}</h6>
                <div>{{ item.EVE_EventoInscricaoAtleta_PontosRanking }}</div>
                <div>{{ item.Clube }}</div>
                <div>{{ item.EVE_EventoInscricaoAtleta_PontosRating }}</div>
                <div>{{ item.Status_Inscricao }}</div>
                <div>{{ item.Categoria_Nome }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-show="classificaPorGrupo" class="item-external-box" v-for="clube in items" :key="clube.Clube">
          <h5>{{ clube.Clube }}</h5>
          <div class="item-internal-box" v-for="item in clube.AtletasPorClube" :key="item.id">
            <h6>{{ item.ASS_Associado_Nome }}</h6>
            <hr />
            <div>{{ item.EVE_EventoInscricaoAtleta_PontosRanking }}</div>
            <div>{{ item.Clube }}</div>
            <div>{{ item.EVE_EventoInscricaoAtleta_PontosRating }}</div>
            <div>{{ item.Status_Inscricao }}</div>
            <div>{{ item.Categoria_Nome }}</div>
          </div>
        </div>
      </div>
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
    window.addEventListener('autocompleteSelected', this.onAutocompleteSelected);
  },
  beforeUnmount() {
    window.removeEventListener('autocompleteSelected', this.onAutocompleteSelected);
  },
  unmonted() {
  },
  data() {
    return {
      items: null,
      classificaPorGrupo: true,
      itemSelecionado: null
    }
  },
  watch: {
    interruptor(novoValor) {
      console.log("Estado atual do interruptor:", novoValor ? "Agrupados por Clube" : "Sem agrupamento");
    }
  },
  mounted() {
    this.carregarTab(this.msg);
  },
  setup() {
    const tabRef = ref(null);

    onMounted(() => {

    });
    onBeforeUnmount(() => {
    });
    return {
      tabRef
    };
  },
  methods: {
    carregarTab(categoryId) {
      this.itemSelecionado = categoryId;
      if (this.itemSelecionado != undefined && this.itemSelecionado != null)
        this.carregarDados();
    },
    handleAutocompleteSelected(selectedItem) {
      var item = selectedItem;
      console.log('Item selecionado:', item);
      this.carregarTab(item.categoryId);
    },
    alteraEstado() {
      this.classificaPorGrupo = !this.classificaPorGrupo;
      this.carregarDados();
    },
    carregarDados() {
      const rota = this.classificaPorGrupo ? 'http://localhost:7071/api/GetAtletaEvento/3663/' + this.itemSelecionado + "/c/" + 'clube'
        : 'http://localhost:7071/api/GetAtletaEvento/3663/' + this.itemSelecionado;

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
  /* display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; */
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
  width: 100%;
  /* width: 100%; calc(24% - 20px); */
  margin-left: 1%;
  margin-bottom: 1%;
}

/* Efeito de hover 3D */
.item-box:hover {
  font-size: 12px;
  transform: translateY(-5px);
  box-shadow: 0 6px 12px #4caf50, 0 3px 6px yellow;
}

.interruptor {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.interruptor-checkbox {
  display: none;
}

.interruptor-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.interruptor-slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

.interruptor-checkbox:checked+.interruptor-slider {
  background-color: #4caf50;
}

.interruptor-checkbox:checked+.interruptor-slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>