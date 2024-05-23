<template>
    <div class="container">
        <h1 class="text-start">Listado Reserva
            <button @click="newReserva()"
                     class="btn btn-success mx-2">
                     <font-awesome-icon icon="plus"/>
            </button>
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">id_reserva</th>
                    <th scope="col">id_cliente</th>
                    <th scope="col">nombre_cliente</th>
                    <th scope="col">fecha_hora</th>
                    <th scope="col">cantidad_personas</th>
                    <th scope="col">estado</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(reserva,index) in reservas" :key="index">
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{ reserva.id_reserva }}</td>
                    <td>{{ reserva.id_cliente }}</td>
                    <td>{{ reserva.nombre_cliente }}</td>
                    <td>{{ reserva.fecha_hora }}</td>
                    <td>{{ reserva.cantidad_personas }}</td>
                    <td>{{ reserva.estado }}</td>
                    <td>
                        <button @click="deleteReserva(reserva.id_reserva)"
                                class="btn btn-danger mx-2">
                                <font-awesome-icon icon="trash"/>
                        </button>
                        <button @click="editReserva(reserva.id_reserva)"
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

    name: 'Reserva',
    data(){
        return{
            reservas:[]
        }
    },
    methods: {
        deleteReserva(codigo){
            Swal.fire({
                title: `Do you want to delete the producto with id ${codigo}?`,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/reservas/${codigo}`)
                    .then(response => {
                        if(response.data.success){
                            Swal.fire('Deleted!! ', '', 'success')
                            this.reservas = response.data.reservas
                        }
                    })
                }
              })
            },
            editReserva(id){
                this.$router.push({name: 'EditarReserva', params: { id: `${id}` }})
            },
            newReserva(){
                this.$router.push({name: 'NewReserva'});
            }
        },
    mounted() { 
        axios
          .get('http://127.0.0.1:8000/api/reservas')
          .then(response => (this.reservas = response.data.reservas))
    },
}
</script>