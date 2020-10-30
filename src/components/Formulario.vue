<template>
    <div class="formulario">
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
            <b-button variant="success" @click.prevent="onGuardar()"> Guardar </b-button>
        </b-form>
        </b-container>
        
    </div>
</template>

<script>
import PasswordServices from '../Service/services'
import EventBus from '../bus.js'
export default {
    data() {
        return {
            form_data:{
                account_name: '',
                username: '',
                password: '',
                site_url: '',
                logo_url: '',
                created_at: ''
            },
            passwordServices:null,
            passwordaccount:[],
            typeinput:'password',
            iconpassword:'eye',
            errorUrl:false


        }
        
    },
    created() {
        EventBus.$on('selected-item',(data)=>{
                this.form_data={
                account_name: data.account_name,
                username: data.username,
                password: data.password,
                site_url: data.site_url,
                logo_url: data.logo_url,
                created_at:data.created_at
                }
        })

        EventBus.$on('reset-form',(data)=>{
                if(data){
                   this.onResetFormulario()
                }
        })
       
        this.passwordServices = new PasswordServices()
    },
    methods: {
            onGuardar(){
                
                this.passwordServices.save(this.form_data).then((response)=>{
                    
                    EventBus.$emit('add-item',response.data)
                    this.onResetFormulario()
                })
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
            }
        }
}
</script>

<style lang="less">
.form input label{
    display:inline
}
.formulario{
    display: inline;
    float: left;
    width: 100%;
    margin-top: -64px;
}

.urlerror{
    color:red
}
</style>