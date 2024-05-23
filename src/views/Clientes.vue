<template>
    <div class="container">
        <h1 class="text-start">Listado clientes
            <button @click="newCliente()"
                     class="btn btn-success mx-2">
                     <font-awesome-icon icon="plus"/>
            </button>
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">id_cliente</th>
                    <th scope="col">nombre_cliente</th>
                    <th scope="col">apellido</th>
                    <th scope="col">telefono</th>
                    <th scope="col">email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(cliente,index) in clientes" :key="index">
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{ cliente.id_cliente }}</td>
                    <td>{{ cliente.nombre_cliente }}</td>
                    <td>{{ cliente.apellido }}</td>
                    <td>{{ cliente.telefono }}</td>
                    <td>{{ cliente.email }}</td>
                    <td>
                        <button @click="deleteCliente(cliente.id_cliente)"
                                class="btn btn-danger mx-2">
                                <font-awesome-icon icon="trash"/>
                        </button>
                        <button @click="editCliente(cliente.id_cliente)"
                                class="btn btn-warning mx-2">
                                <font-awesome-icon icon="pencil"/>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {

    name: 'Cliente',
    data(){
        return{
            clientes:[]
        }
    },
    methods: {
        deleteCliente(codigo){
            Swal.fire({
                title: `Do you want to delete the producto with id ${codigo}?`,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/clientes/${codigo}`)
                    .then(response => {
                        if(response.data.success){
                            Swal.fire('Deleted!! ', '', 'success')
                            this.clientes = response.data.clientes
                        }
                    })
                }
              })
            },
            editCliente(id){
                this.$router.push({name: 'EditarCliente', params: { id: `${id}` }})
            },
            newCliente(){
                this.$router.push({name: 'NewCliente'});
            }
        },
    mounted() { 
        axios
          .get('http://127.0.0.1:8000/api/clientes')
          .then(response => (this.clientes = response.data.clientes))
    },
}
</script>