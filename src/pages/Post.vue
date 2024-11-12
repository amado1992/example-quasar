<template>
  <q-page padding>
    <!-- content -->
     <PostForm v-if="showForm" :itemSelected="postSelected"/>
  <q-card class="q-pa-md">
    <q-table
      title="Posts"
      :data="posts"
      :columns="columns"
      row-key="id"
      selection="single"
      :selected.sync="selected"
      style="heigth: 200px"
    >
  
    <template v-slot:top-right>
          <div class="row q-ma-md">
            <q-btn
              dense
              class="q-px-md col"
              size="md"
              color="info"
              label="Agregar"
              @click="addPost()"
            />
            <q-btn
             v-if="selected.length > 0"
              dense
              class="q-px-md col"
              size="md"
              icon="more_vert"
              color="info"
              flat
            >
              <q-menu
                auto-close
                transition-show="jump-down"
                transition-hide="jump-up"
              >
                <q-list style="min-width: 100px">
                  <q-item clickable v-ripple @click="editPost(selected[0])">
                    <q-item-section avatar>
                      <q-icon color="info" name="create" />
                    </q-item-section>
                    <q-item-section class="text-info">Editar</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-ripple
                    @click="deletePost(selected[0])"
                  >
                    <q-item-section avatar>
                      <q-icon color="info" name="delete" />
                    </q-item-section>
                    <q-item-section class="text-info">Eliminar</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>

          <q-space />
        </template>

    <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
    </div>
    </q-table>
    </q-card>
  </q-page>
</template>

<script>
import { api } from 'boot/axios.js'
import PostForm from '../components/PostForm'
export default {
   name: 'PagePost',
   components:{
      PostForm
   },
   data () {
    return {
      columns: [
        {
          name: 'title',
          required: true,
          label: 'Title',
          align: 'left',
          field: row => row.title,
          format: val => `${val}`,
          sortable: true
        },
       // { name: 'body', align: 'center', label: 'Body', field: 'body', sortable: true }
         {
          name: 'acciones',
          align: 'center',
          label: 'Acciones'
        }
      ],
      posts: [],
       postSelected: {
        id: null,
        title: null,
        body: null
      },
      selected: [],
      showForm: false,
      isConfirm: false
    }
  },
   created() {
     this.loadData();
   },
   methods: {
  async loadData () {
  
  this.$q.loading.show()
   await api.get('/api/posts/')
   .then((response) => {
        this.$q.loading.hide()
        this.posts = response.data.data
      })
      .catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
      })
  },
   editPost(item) {
      this.postSelected = item
      this.showForm = true
    },
    addPost() {
      this.showForm = true
    },
    async deletePost(item) {
      this.confirm(item)
    },
     async deletePostTwo(item) {
      this.$q.loading.show()
      await api.delete('/api/posts/' + item.id)
        .then(response => {
          this.$q.loading.hide()
          this.loadData()
          this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Producto elimidado satisfactoriamente'
        })
        })
        .catch(error => {
          console.log(error.response)
        })
    },
     confirm(item) {
      this.$q.dialog({
        title: 'Confirme',
        message: 'Está seguro de eliminar el post ' + item.title + ' ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
      this.deletePostTwo(item)

      }).onOk(() => {
        // console.log('>>>> second OK catcher')
        
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  },
  mounted(){
    this.$root.$on('addProduct', data => {
      this.posts.push(data);
    });

     this.$root.$on('updateProduct', data => {
      const resultado = this.posts.findIndex(
        product => product.id === data.id
      )
      this.posts.splice(resultado, 1, data)
      this.showForm = false
    })

    this.$root.$on('closeProductForm', data => {
      this.showForm = false
      this.postSelected = {
        id: null,
        title: null,
        body: null
      }
    })

  }
  
}
</script>
