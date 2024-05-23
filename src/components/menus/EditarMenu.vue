<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Menus
            </div>
            <div class="card-body">
                <form @submit.prevent="updateMenu">
                    
                <div class="row mb-3">
                    <label for="id_menu" class="form-label">Codigo Menu</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="id_menu" placeholder="Codigo Menu" disabled
                          v-model='menu.id_menu'>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="nombre_menu" class="form-label">nombre del menu</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="nombre_menu" placeholder="nombre del menu"
                          v-model='menu.nombre_menu'>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="descripcion" class="form-label">Descripción</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="descripcion" placeholder="descripcion"
                          v-model='menu.descripcion'>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="precio" class="form-label">Precio</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="precio" placeholder="precio"
                          v-model='menu.precio'>
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
    name: 'EditarMenu',
    data(){
        return{
            menu:{
                id_menu: 0,
                nombre_menu: '',
                descripcion: '',
                precio: 0
            },
        }
    },
    methods: {
        cancelar(){
            this.$router.push({name: 'Menus'})
        },

        async updateMenu(){
            const res = await axios.put(`http://127.0.0.1:8000/api/menus/${this.menu.id_menu}`, this.menu)

            if(res.status == 200){
                this.$router.push({name: 'Menus'})
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Menus has been updated',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    },

    mounted(){
        this.menu.id_menu = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/api/menus/${this.menu.id_menu}`)
          .then(response => {
            this.menu = response.data.menu
          })
        }
}
</script>