<template>
    <div class="container">
        <h1 class="text-start">Listado Pedido
            <button @click="newPedido()"
                     class="btn btn-success mx-2">
                     <font-awesome-icon icon="plus"/>
            </button>
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">id_pedido</th>
                    <th scope="col">codigo reserva</th>
                    <th scope="col">id_menu</th>
                    <th scope="col">nombre menu</th>
                    <th scope="col">cantidad</th>
                    <th scope="col">precio_total</th>
                    <th scope="col">estado</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(pedido,index) in pedidos" :key="index">
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{ pedido.id_pedido }}</td>
                    <td>{{ pedido.id_reserva }}</td>
                    <td>{{ pedido.id_menu }}</td>
                    <td>{{ pedido.nombre_menu }}</td>
                    <td>{{ pedido.cantidad }}</td>
                    <td>{{ pedido.precio_total }}</td>
                    <td>{{ pedido.estado }}</td>
                    <td>
                        <button @click="deletePedido(pedido.id_pedido)"
                                class="btn btn-danger mx-2">
                                <font-awesome-icon icon="trash"/>
                        </button>
                        <button @click="editPedido(pedido.id_pedido)"
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

    name: 'Pedido',
    data(){
        return{
            pedidos:[]
        }
    },
    methods: {
        deletePedido(codigo){
            Swal.fire({
                title: `Do you want to delete the producto with id ${codigo}?`,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/pedidos/${codigo}`)
                    .then(response => {
                        if(response.data.success){
                            Swal.fire('Deleted!! ', '', 'success')
                            this.pedidos = response.data.pedidos
                        }
                    })
                }
              })
            },
            editPedido(id){
                this.$router.push({name: 'EditarPedido', params: { id: `${id}` }})
            },
            newPedido(){
                this.$router.push({name: 'NewPedido'});
            }
        },
    mounted() { 
        axios
          .get('http://127.0.0.1:8000/api/pedidos')
          .then(response => (this.pedidos = response.data.pedidos))
    },
}
</script>