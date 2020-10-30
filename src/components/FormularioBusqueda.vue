<template>
            <div style="width: 28%;">
             <b-form  inline>
            <label for="find">Buscar:</label>
            <b-form-input @input="onBuscar()"  placeholder="Buscar..." name="find" v-model="passwordFind"/>
            
            <b-button variant="success" @click.prevent="onNuevo()"><b-icon icon="plus" style="color: white;"></b-icon></b-button>
            <br>
            <br>
            <label for="Ordenar">Ordenar:</label>
            
            <b-form-select @change="onOrdenar()"  v-model="lista"
      
      class="mb-2 mr-sm-2 mb-sm-0"
      :options="[{ text: 'Seleccione', value: 'Seleccione' }, { text: 'Ascendente', value: 'asc' }, { text: 'Descendente', value: 'des' }]"
    ></b-form-select>
    <br>
              
        </b-form>  

            </div>
</template>

<script>
import PasswordServices from '../Service/services'
import EventBus from '../bus.js'
export default {
    data() {
        return {
            passwordFind:"",
            lista:"Seleccione"
        }
    },
    created() {
        this.passwordServices = new PasswordServices()
    },
    methods: {
        onBuscar(){
             EventBus.$emit('search-item',this.passwordFind)
         },
         onOrdenar(){
             EventBus.$emit('ordenar-items',this.lista)
         },
         onNuevo(){
            this.$router.push({ path: `/formulario` })
         }
    },
}
</script>