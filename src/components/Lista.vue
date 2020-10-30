<template>
    <div class="contenedorlista">
        <div v-if="passwordaccount.length!=0">
            
        <listaItems   :items="filtrarItems" />
        </div>
        <div v-else-if="passwordaccount.length==0"> 
            No hay elementos
        </div>
        <div v-else>
            Cargando lista....
        </div>
        
    </div>
</template>

<script>
import EventBus from '../bus.js'
import PasswordServices from '../Service/services'
export default {
    data() {
        return {
            passwordaccount:[],
            searchitem: '',
            listasentido:'asc'
        }
    },
    beforeMount() {
        this.passwordServices.getAllPassword().then((response)=>{
            this.passwordaccount=response.data
        })
    },
    created() {
         EventBus.$on('add-item',(item)=>{
              this.passwordaccount.unshift(item)
         })
         EventBus.$on('search-item',(item)=>{
              this.searchitem=item.toLowerCase()
         })
         EventBus.$on('updated-item',(item)=>{
             
              let posicionItem=this.passwordaccount.findIndex(x=>x.id==item.id)
             
              this.passwordaccount.splice(posicionItem,1,item)
              
         })

         EventBus.$on('deleted-item',(item)=>{
              
              let posicionItem=this.passwordaccount.findIndex(x=>x.id==item.id)
              
              this.passwordaccount.splice(posicionItem,1)
             
         })

         EventBus.$on('ordenar-items',(item)=>{
             this.listasentido=item
            
           
            if(this.listasentido=='asc'){
                   this.passwordaccount =  this.passwordaccount.sort((a, b) => {
                   
                    if (new Date(a.created_at) > new Date(b.created_at)) {
                        return 1;
                    }
                    if (new Date(a.created_at) < new Date(b.created_at)) {
                        return -1;
                    }
                   
                    return 0;
            });
            
            }else if(this.listasentido=='des'){
                 this.passwordaccount = this.passwordaccount.sort((a, b) => {
                    
                    if (new Date(a.created_at) < new Date(b.created_at)) {
                        return 1;
                    }
                    if (new Date(a.created_at) > new Date(b.created_at)) {
                        return -1;
                    }
                    
                    return 0;
            });
            
            }
           
         })
         
         
        this.passwordServices = new PasswordServices()
    },
    computed: {
        filtrarItems(){
             return this.passwordaccount.filter((itemLista) => {
                return itemLista.account_name.toLowerCase().includes(this.searchitem)
            })
        },
       
    }, 
}
</script>

<style lang="less">
.contenedorlista{
   border: 2px solid silver;
    overflow: scroll;
    height: 495px;
    padding: 6px 10px;
    margin-top:16px
}

.activo{
    background-color:red
}
.normal{
    background-color:white
}

</style>