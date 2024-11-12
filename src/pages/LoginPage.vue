<template>
  <q-page class="bg-primary column justify-center items-center">
    <q-card class="bg-white q-mx-sm" style="width: 800px;">
      <q-card-section class="row">
        <q-card-section class="col-xs-12 col-sm-6 col-md-6 q-pa-md">
          <div class="fit">
            <q-img
              style="width: 100%; height: 100%"
              src="~assets/vida.jpg"
            />
          </div>
        </q-card-section>
        <q-card-section class="col-xs-12 col-sm-6 col-md-6 column  q-pa-md">
          <Login/>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import Login from '../components/Login'
export default {
   name: 'PageLogin',
   components: {
    Login
  },
}
</script>
