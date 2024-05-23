<template>
    <div class="container">
        <h1 class="text-start">Listado Menus
            <button @click="newMenu()"
                     class="btn btn-success mx-2">
                     <font-awesome-icon icon="plus"/>
            </button>
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">id_menu</th>
                    <th scope="col">nombre_menu</th>
                    <th scope="col">descripcion</th>
                    <th scope="col">precio</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(menu,index) in menus" :key="index">
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{ menu.id_menu }}</td>
                    <td>{{ menu.nombre_menu }}</td>
                    <td>{{ menu.descripcion }}</td>
                    <td>{{ menu.precio }}</td>
                    <td>
                        <button @click="deleteMenu(menu.id_menu)"
                                class="btn btn-danger mx-2">
                                <font-awesome-icon icon="trash"/>
                        </button>
                        <button @click="editMenu(menu.id_menu)"
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

    name: 'Menu',
    data(){
        return{
            menus:[]
        }
    },
    methods: {
        deleteMenu(codigo){
            Swal.fire({
                title: `Do you want to delete the producto with id ${codigo}?`,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/menus/${codigo}`)
                    .then(response => {
                        if(response.data.success){
                            Swal.fire('Deleted!! ', '', 'success')
                            this.menus = response.data.menus
                        }
                    })
                }
              })
            },
            editMenu(id){
                this.$router.push({name: 'EditarMenu', params: { id: `${id}` }})
            },
            newMenu(){
                this.$router.push({name: 'NewMenu'});
            }
        },
    mounted() { 
        axios
          .get('http://127.0.0.1:8000/api/menus')
          .then(response => (this.menus = response.data.menus))
    },
}
</script>