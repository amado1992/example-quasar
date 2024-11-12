<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column" style="max-width: 300px">

    <q-input v-model="nuevaFruta" label="Label" @keyup.enter="add()"/>
    <button v-on:click="add()">Agregar</button>

    {{nuevaFruta}}
    <ul>
      <li v-for="fruta of frutas">

        <input type="number" v-model.number="fruta.cantidad" />
         {{fruta.nombre}}-{{fruta.cantidad}}

         <!--Dos opciones que hacen lo mismo
         <button @click="fruta.cantidad++">+</button>-->
         <button @click="fruta.cantidad = fruta.cantidad + 1">+</button>

        <span v-if="fruta.cantidad == 0">
          No hay fruta
        </span>

      </li>
    </ul>
    <h4>TOTAL: {{sumarFrutas}}</h4>
  </div>
  </div>
   
</template>

<script>
export default {
   name: 'LearningForm',
  data () {
    return {
      total: 0,
      frutas: [
        {nombre : 'Mamey', cantidad : 0},
        {nombre : 'Pera', cantidad : 10},
        {nombre : 'Mango', cantidad : 20}],
        nuevaFruta: ''
    }
  }, methods: {
    add(){
      this.frutas.push({nombre: this.nuevaFruta, cantidad: 60});
      this.nuevaFruta = ''
    }
  },computed:{
    sumarFrutas(){
      this.total = 0
      for (let fruta of this.frutas ){
        this.total = this.total + fruta.cantidad
      }
      console.log("TOTAL: ", this.total)
      return this.total
    }
  }
}
</script>
