<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Reservas
            </div>
            <div class="card-body">
                <form @submit.prevent="updateReserva">
                    
                <div class="row mb-3">
                    <label for="id_reserva" class="form-label">Codigo Reserva</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="id_reserva" placeholder="Codigo Reserva" disabled
                          v-model='reserva.id_reserva'>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="id_cliente" class="form-label">Codigo cliente</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <select class="form-select" v-model="reserva.id_cliente">
                          <option selected value="0">Seleccione cliente</option>
                          <option v-for="cliente in clientes" v-bind:value="cliente.id_cliente">{{ cliente.nombre_cliente }}</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="fecha_hora" class="form-label">fecha y hora</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="date" class="form-control" id="fecha_hora" placeholder="fecha y hora"
                          v-model='reserva.fecha_hora'>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="cantidad_personas" class="form-label">cantidad de personas</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="cantidad_personas" placeholder="cantidad de personas"
                          v-model='reserva.cantidad_personas'>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="estado" class="form-label">Estado</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <select class="form-select" v-model="reserva.estado">
                        <option selected value="0">Seleccione cliente</option>
                        <option value="confirmada">confirmada</option>
                        <option value="cancelada">cancelada</option>
                        <option value="completada">completada</option>                        </select>
                    </div>
                </div>
                
                <button class="btn btn-primary" type="submit">Actualizar</button>
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
    name: 'EditarReserva',
    data(){
        return{
            reserva:{
                id_reserva: 0,
                id_cliente: 0,
                fecha_hora: "0000-00-00",
                cantidad_personas: 0,
                estado: ''
            },
            clientes: [],
            id_cliente: "0"
        }
    },
    methods: {
        cancelar(){
            this.$router.push({name: 'Reservas'})
        },

        async updateReserva(){
            const res = await axios.put(`http://127.0.0.1:8000/api/reservas/${this.reserva.id_reserva}`, this.reserva)

            if(res.status == 200){
                this.$router.push({name: 'Reservas'})
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Reservas has been updated',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    },

    mounted(){
        this.reserva.id_reserva = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/api/reservas/${this.reserva.id_reserva}`)
          .then(response => {
            this.reserva = response.data.reserva
            this.clientes = response.data.clientes
          })
        }
}
</script>