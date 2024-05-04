<template>
  <div class="container">
    <div class="grid-container">
      <div class="row">
        <div class="col-md-4" v-for="item in items" :key="item.id">
          <div class="item-box">
            <h5 style="text-align: center;">{{ item.Titulo }}</h5>
            <div class="row">
              <div class="col-md-1">
                #
              </div>
              <div class="col-md-3" style="text-align: center;">
                JOGADORES</div>
              <div class="col-md-3" style="text-align: center;">
                PT. RAK</div>
              <div class="col-md-3" style="text-align: center;">
                PT. RAT</div>
            </div>
            <div class="item-internal-box">
              <div class="row">
                <div class="col-md-1">
                  {{ item.Classificacao_1 }}
                </div>
                <div class="col-md-3" style="text-align: center;">
                  {{ item.Nome_1 }}
                </div>
                <div class="col-md-3" style="text-align: center;">
                  {{ item.PontosRanking_1 }}</div>
                <div class="col-md-3" style="text-align: center;">
                  {{ item.PontosRating_1 }}</div>
              </div>
              <hr />
              <div class="row">
                <div class="col-md-1">
                  {{ item.Classificacao_2 }}
                </div>
                <div class="col-md-3" style="text-align: center;">
                  {{ item.Nome_2 }}
                </div>
                <div class="col-md-3" style="text-align: center;">
                  {{ item.PontosRanking_2 }}</div>
                <div class="col-md-3" style="text-align: center;">
                  {{ item.PontosRating_2 }}</div>
              </div>
              <hr />
              <div class="row">
                <div class="col-md-3">
                  {{ item.Classificacao_3 }}
                </div>
                <div class="col-md-3" style="text-align: center;">
                  {{ item.Nome_3 }}
                </div>
                <div class="col-md-3" style="text-align: center;">
                  {{ item.PontosRanking_3 }}</div>
                <div class="col-md-3" style="text-align: center;">
                  {{ item.PontosRating_3 }}</div>
              </div>
              <hr />
              <div class="row" v-show="item.Classificacao_4 != null">
                <div class="col-md-1">
                  {{ item.Classificacao_4 }}
                </div>
                <div class="col-md-3" style="text-align: center;">
                  {{ item.Nome_4 }}
                </div>
                <div class="col-md-3" style="text-align: center;">
                  {{ item.PontosRanking_4 }}</div>
                <div class="col-md-3" style="text-align: center;">
                  {{ item.PontosRating_4 }}</div>
              </div>
              <hr />
              <div class="row" v-show="item.Classificacao_5 != null">
                <div class="col-md-3">
                  {{ item.Classificacao_5 }}
                </div>
                <div class="col-md-3" style="text-align: center;">
                  {{ item.Nome_5 }}
                </div>
                <div class="col-md-3" style="text-align: center;">
                  {{ item.PontosRanking_5 }}</div>
                <div class="col-md-3" style="text-align: center;">
                  {{ item.PontosRating_5 }}</div>
              </div>
              <hr />
            </div>
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
    carregarTab(categoriaId) {
      this.itemSelecionado = categoriaId;
      if (this.itemSelecionado != undefined && this.itemSelecionado != null)
        this.carregarDados();
    },
    handleAutocompleteSelected(selectedItem) {
      var item = selectedItem;
      console.log('Item selecionado:', item);
      this.carregarTab(item.categoriaId);
    },
    carregarDados() {
      const rota = this.classificaPorGrupo ? 'http://localhost:7071/api/GetEventoGrupo/3663/' + this.itemSelecionado + "/c/" + 'clube'
        : 'http://localhost:7071/api/GetEventoGrupo/3663/' + this.itemSelecionado;

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
</style>