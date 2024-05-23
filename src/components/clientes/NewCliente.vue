<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">New</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Cliente
            </div>
            <div class="card-body">
                <form @submit.prevent="saveCliente">
                    
                <div class="row mb-3">
                    <label for="id_cliente" class="form-label">Codigo</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="id_cliente" placeholder="Codigo Producto" disabled
                          v-model='cliente.id_cliente'>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="nombre_cliente" class="form-label">nombre_cliente</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="nombre_cliente" placeholder="Nombre Producto"
                          v-model='cliente.nombre_cliente'>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="apellido" class="form-label">apellido</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="apellido" placeholder="Producto descripción"
                          v-model='cliente.apellido'>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="telefono" class="form-label">telefono</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="telefono" placeholder="Precio Producto"
                          v-model='cliente.telefono'>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="email" class="form-label">email</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="email" class="form-control" id="email" placeholder="Stock Producto"
                          v-model='cliente.email'>
                    </div>
                </div>

                <button class="btn btn-primary" type="submit">Save</button>
                <button class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'EditarCliente',
    data(){
        return{
            cliente:{
                id_cliente: 0,
                nombre_cliente: '',
                apellido: '',
                telefono: 0,
                email: ""
            },
        }
    },
    methods: {
        cancelar(){
            this.$router.push({name: 'Clientes'})
        },

    async saveCliente(){
        this.cliente.id_cliente = this.id_cliente
        const res = await axios.post(`http://127.0.0.1:8000/api/clientes/`, this.cliente)
        console.log(res);
        if(res.status == 200){
            this.$router.push({name: 'Clientes'})
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cliente has been saved',
                showConfirmButton: false,
                timer: 2000
            })
          }
      }
   },

   mounted(){
    axios.get(`http://127.0.0.1:8000/api/clientes/`)
         .then(response => {
            this.clientes = response.data.clientes
         })
   },
}
</script>