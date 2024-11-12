<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="send"
      @reset="onReset"
      class="q-gutter-md"
    >
     <div class="row text-h5 text-info text-weight-bolder">
        <div class="row">Welcome</div>
      </div>

      <q-input
        filled
        v-model="form.email"
        label="Correo electrónico*"
        hint=""
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor, entre un correo']"
      />

      <q-input
        filled
        type="password"
        v-model="form.password"
        label="Contraseña *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Por favor, entre una contraseña'
        ]"
      />
      
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import { api } from 'boot/axios.js'
export default {
  name: 'LoginForm',
  data () {
    return {
       form: {
         email: null,
         password: null
      }
    }
  },

  methods: {
    async send () {
      this.$q.loading.show()
    await api.post('/api/login', this.form)
    .then(response => {
          this.$q.loading.hide()
          this.$q.localStorage.set('user', {
            token: response.data.message
          })
          console.log('Login', response)
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
         // this.showNotif(this.$t('errors.failAuth'), 'email', 'negative')
          console.log(error.response)
        })
      this.$q.loading.hide()
    },
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
    
  }
}
</script>
