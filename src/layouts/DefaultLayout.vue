<template>
 <q-layout>
    <q-page-container >
      <LoginPage />
    </q-page-container>
  </q-layout>
</template>

<script>
import LoginPage from '../pages/LoginPage'
export default {
 name: 'LayoutLogin',
components:{
  LoginPage
}
}
</script>
