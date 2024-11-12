<template>
   <transition-group appear enter="animated fadeIn" leave="animated fadeOut">
    <q-form key="form" @submit="send">
      <q-card class="q-ma-md ">
        <q-card-section>
          <div class="text-h5 text-info">
            {{
              itemSelected.id != null ? 'Modificar post' : 'Agregar post'
            }}
          </div>
        </q-card-section>
        <q-card-section class="row">
          <div class="col-xs-12 col-sm-4 col-md-3 q-mx-sm">
            <q-input
              filled
              dense
              label-color="info"
              label="Title *"
              v-model="itemSelected.title"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"
            />
          </div>

          <div class="col-xs-12 col-sm-4 col-md-3 q-mx-sm">
            <q-input
              filled
              dense
              v-model="itemSelected.body"
              label-color="info"
              label="Body *"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"
            />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="SAVE" type="submit" color="primary"/>
          <div class="q-ma-md">
            <q-btn
              label="Cancelar"
              dense
              color="red"
              @click="$root.$emit('closeProductForm')"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-form>
  </transition-group>
</template>

<script>
import { api } from 'boot/axios.js'
export default {
   name: 'PostForm',
    props: {
    itemSelected: Object
  },
  data () {
    return {}
  },
  mounted(){
  },
   methods: {
    async send () {
      this.$q.loading.show()
      if (this.itemSelected.id != null) {
        await api.put('/api/posts/' + this.itemSelected.id, this.itemSelected)
          .then(response => {
            this.$q.loading.hide()
            this.$root.$emit('updateProduct', response.data)
            this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Producto actualizado satisfactoriamente'
        })
          })
          .catch(error => {
           
            console.log(error.response)
          })
        this.$q.loading.hide()
      } else {
        await api.post('/api/post/', this.itemSelected)
          .then(response => {
            this.$q.loading.hide()
            this.$root.$emit('addProduct', response.data.data)
           this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Producto creado satisfactoriamente'
        })
          })
          .catch(error => {
            console.log(error)
          })
        this.$q.loading.hide()
      }
    }
    }
}
</script>
