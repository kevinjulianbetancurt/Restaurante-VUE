<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Pedidos
            </div>
            <div class="card-body">
                <form @submit.prevent="updatePedido">
                    
                    <div class="row mb-3">
                    <label for="id_pedido" class="form-label">Codigo Pedido</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="id_pedido" placeholder="Codigo Pedido" disabled
                          v-model='pedido.id_pedido'>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="id_reserva" class="form-label">Codigo reserva</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <select class="form-select" v-model="pedido.id_reserva">
                          <option selected value="0">Seleccione reserva</option>
                          <option v-for="reserva in reservas" v-bind:value="reserva.id_reserva">{{ reserva.id_reserva }}</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="id_menu" class="form-label">nombre menu</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <select class="form-select" v-model="pedido.id_menu">
                          <option selected value="0">Seleccione menu</option>
                          <option v-for="menu in menus" v-bind:value="menu.id_menu">{{ menu.nombre_menu }}</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="cantidad" class="form-label">cantidad</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="cantidad" placeholder="cantidad"
                          v-model='pedido.cantidad'>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="precio_total" class="form-label">precio total</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="precio_total" placeholder="precio total"
                          v-model='pedido.precio_total'>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="estado" class="form-label">Estado</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <select class="form-select" v-model="pedido.estado">
                        <option selected value="0">Seleccione cliente</option>
                        <option value="pendiente">pendiente</option>
                        <option value="servido">servido</option>
                        <option value="pagado">pagado</option>   
                        </select>
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
    name: 'EditarPedido',
    data(){
        return{
            pedido:{
                id_pedido: 0,
                id_reserva: 0,
                id_menu: 0,
                cantidad: 0,
                precio_total: 0,
                estado: ''
            },
            reservas: [],
            id_reserva: "0",
            menus: [],
            id_menu: "0"
        }
    },
    methods: {
        cancelar(){
            this.$router.push({name: 'Pedidos'})
        },

        async updatePedido(){
            const res = await axios.put(`http://127.0.0.1:8000/api/pedidos/${this.pedido.id_pedido}`, this.pedido)

            if(res.status == 200){
                this.$router.push({name: 'Pedidos'})
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Pedidos has been updated',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    },

    mounted(){
        this.pedido.id_pedido = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/api/pedidos/${this.pedido.id_pedido}`)
          .then(response => {
            this.pedido = response.data.pedido
            this.menus = response.data.menus
            this.reservas = response.data.reservas
          })
        }
}
</script>