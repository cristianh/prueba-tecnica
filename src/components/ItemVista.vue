<template>
    <div>
      
        <div v-if="passworinfo==null">
            Cargando informacion.
        </div>
        <div v-else>
           
            
    <b-container fluid="xl" >
         <b-media>
      <template v-slot:aside>
        <b-avatar  v-b-modal.modal-prevent-closing class="avatar-item" size="72px" :text="passworinfo.logo_url!='' && passworinfo.logo_url!=null?passworinfo.account_name.substring(0,1).toUpperCase():''" rounded="sm" :src="passworinfo.logo_url!=''&& passworinfo.logo_url!=null?passworinfo.logo_url:''"></b-avatar>
        <h5 class="item">{{passworinfo.account_name}}</h5>
      </template>
    </b-media>
    <br>
        <b-list-group style="width: 96% !important;">
            
            <b-list-group-item><b>User Name:</b>{{passworinfo.username}}</b-list-group-item>
            <b-list-group-item><b>Password:</b>{{passworinfo.password}}</b-list-group-item>
            <b-list-group-item><b>Site url:</b>{{passworinfo.site_url}}</b-list-group-item>
            <b-list-group-item><b>Created at:</b>{{passworinfo.created_at}}</b-list-group-item>
            
        </b-list-group>
            <b-button variant="info" v-b-modal.modal-prevent-form @click.prevent="onCargarInfo()"> Editar </b-button>
            <b-button variant="danger" @click.prevent="onEliminar()"> Eliminar </b-button>
            
    </b-container>
            
        </div>
      
          <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Nuevo logo"
      ok-title-html="Actualizar"
      @ok="onActualizarLogoUrl()"
      
      
    >
        
      <form ref="form" >
        <label for="logo_url">Logo url</label>
            <b-form-input  name="logo_url" v-model="form_data.logo_url"/>
      </form>
    </b-modal>
          <b-modal
      id="modal-prevent-form"
      ref="modal"
      title="Actualizar"
      ok-title-html="Actualizar"
      size="lg"
      @ok="onActualizar()"
      
    >
    <b-container fluid>
        <b-form>
            <label for="account_name">Account Name</label>
            <b-form-input name="account_name" v-model="form_data.account_name"/>

            <label for="username">User Name</label>
            <b-form-input name="username" v-model="form_data.username"/>

            <label for="password">Password</label>
            <b-form-input :type="typeinput" name="password" v-model="form_data.password"/>
           
            <b-button @click="onGenerarClave()">Generar clave</b-button>
            <b-button variant="success" @click="onVer()"><b-icon :icon="iconpassword" style="color: white;" ></b-icon></b-button>
            <br>
            <label for="site_url">Site Url</label>
            <b-form-input type="url" @input="onIsValidUrl()" name="site_url" v-model="form_data.site_url"/>
            <span class="urlerror" v-if="errorUrl">La url no es valida</span>
            <br>
            <label for="logo_url">Logo url</label>
            <b-form-input  name="logo_url" v-model="form_data.logo_url"/>

            <label for="created_at">Created at</label>
            <b-form-input type="date" name="created_at" v-model="form_data.created_at"/>
            <br>
        </b-form>
        </b-container>
    
    </b-modal>
    </div>
</template>

<script>
import EventBus from '../bus.js'
import PasswordServices from '../Service/services'
export default {
    props:{
        data:Object
    },
    data() {
        return {
            id:this.$route.params.id,
            passworinfo:[],
            passwordservices:null,
             form_data:{
                account_name: '',
                username: '',
                password: '',
                site_url: '',
                logo_url: '',
                created_at: ''
            },
           typeinput:'password',
            iconpassword:'eye',
            errorUrl:false,
            errorform:false
        }
    },
     watch: {
    $route(to) {
    this.passwordservices.getPasswordById(to.params.id).then((response)=>{
            this.passworinfo=response.data
            
        }) 
    }
    },
    created() {
           
    this.passwordservices = new PasswordServices()
          
    },
    methods: {
        onCargarInfo(){
            this.form_data={
                account_name: this.passworinfo.account_name,
                username: this.passworinfo.username,
                password: this.passworinfo.password,
                site_url: this.passworinfo.site_url,
                logo_url: this.passworinfo.logo_url,
                created_at: this.passworinfo.created_at
            }
        },
        onActualizar(){
                if(this.passworinfo==null){
                   this.errorform=true 
                }else{
                    this.errorform=false
                }
                if(this.errorform==false){
                     this.passwordservices.update(this.passworinfo.id,this.form_data).then((response)=>{
                    EventBus.$emit('updated-item',response.data)
                    this.onResetFormulario()
                })
                } 
        },
         onEliminar(){
                this.passwordservices.delete(this.$route.params.id).then(()=>{
                    
                    
                    EventBus.$emit('deleted-item',this.passworinfo )
                     this.$router.replace({ path: `/formulario` })
                    
                })
        },
        onActualizarLogoUrl(){
            
            this.passworinfo.logo_url= this.form_data.logo_url

                this.passwordservices.update(this.passworinfo.id,this.passworinfo).then((response)=>{
                    EventBus.$emit('updated-item',response.data)
                      this.onResetFormulario()
                    
                })
            
        },
         onResetFormulario(){
            this.form_data={
                account_name: '',
                username: '',
                password: '',
                site_url: '',
                logo_url: '',
                created_at: ''
                }
        },
        onEditar(){
            this.$router.push({ path: `/formularioupdate/${this.passworinfo}` })
        },
        onGenerarClave(){
                this.form_data.password=Math.random().toString(36).slice(2)
            },
            onIsValidUrl(){
                try {
                    new URL(this.form_data.site_url)
                     this.errorUrl=false  
                } catch (error) {
                    this.errorUrl=true               
                 }
                             
            },
            onVer(){
                if(this.typeinput=='password'){
                    this.typeinput='text'
                    this.iconpassword='eye-slash'
                }else{
                    this.typeinput='password'
                    this.iconpassword='eye'
                }
                
                
        }
    },
    beforeMount() {
        
        this.passwordservices.getPasswordById(this.$route.params.id).then((response)=>{
            this.passworinfo=response.data
           
        }) 
    },
}
</script>

<style lang="less">
.item{
    text-align: center;
    vertical-align: middle;
    margin-top: 32px !important;
    margin-left: 19px;
}
</style>