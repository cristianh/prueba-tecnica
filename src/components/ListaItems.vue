<template>
    <div>
      
<div v-if="items.length>=1">
<b-card :bg-variant="activo==info.id?'info':''" v-for="(info,index,key) in items" :key="key" @click="onCargarFormulario(info)"  no-body class="overflow-hidden" style="max-width: 540px;">
    <b-row no-gutters>
      <b-col md="6">
        
        <b-avatar  class="avatar-item" size="72px" :text="info.logo_url!=''?info.account_name.substring(0,1).toUpperCase():''" rounded="sm" :src="info.logo_url!=''?info.logo_url:''"></b-avatar>
      </b-col>
      <b-col md="6">
        <b-card-body :title="info.account_name">
          <b-card-text>
            <h6>{{info.username}}</h6>
            <p>{{info.created_at}}</p>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
  </div>
  <div v-else>
<b-card  no-body class="overflow-hidden" style="max-width: 540px;">
    <b-row no-gutters>
      <b-col md="6">
        
        <b-avatar class="" size="72px"  rounded="sm" ></b-avatar>
      </b-col>
      <b-col md="6">
        <b-card-body >
          <b-card-text>
              Sin resultados
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</div>
 

    </div>
</template>

<script>

export default {
    props: {
    items: Array
    },
    data() {
        return {
           activo:0
        }
    },
    created() {
        
    },
    methods: {
    onCargarFormulario(info){
        this.activo=info.id
        this.$router.push({ path: `/item-view/${info.id}` })
        
    }
    },
   
}
</script>



<style lang="less">
.avatar-item{
    margin-top:13px
}
.activo{
    background-color:silver
}
.normal{
    background-color:white
}
</style>

