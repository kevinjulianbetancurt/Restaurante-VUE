<template>
    <div class="container">
        <h1 class="text-start">Listado Pedido
            <button @click="newEmpleado()"
                     class="btn btn-success mx-2">
                     <font-awesome-icon icon="plus"/>
            </button>
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">id_empleado</th>
                    <th scope="col">nombre empleado</th>
                    <th scope="col">apellido</th>
                    <th scope="col">cargo empleado</th>
                    <th scope="col">salario</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(empleado,index) in empleados" :key="index">
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{ empleado.id_empleado }}</td>
                    <td>{{ empleado.nombre_empleado }}</td>
                    <td>{{ empleado.apellido }}</td>
                    <td>{{ empleado.cargo_empleado }}</td>
                    <td>{{ empleado.salario }}</td>
                    <td>
                        <button @click="deleteEmpleado(empleado.id_empleado)"
                                class="btn btn-danger mx-2">
                                <font-awesome-icon icon="trash"/>
                        </button>
                        <button @click="editEmpleado(empleado.id_empleado)"
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

    name: 'Empleado',
    data(){
        return{
            empleados:[]
        }
    },
    methods: {
        deleteEmpleado(codigo){
            Swal.fire({
                title: `Do you want to delete the producto with id ${codigo}?`,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/empleados/${codigo}`)
                    .then(response => {
                        if(response.data.success){
                            Swal.fire('Deleted!! ', '', 'success')
                            this.empleados = response.data.empleados
                        }
                    })
                }
              })
            },
            editEmpleado(id){
                this.$router.push({name: 'EditarEmpleado', params: { id: `${id}` }})
            },
            newEmpleado(){
                this.$router.push({name: 'NewEmpleado'});
            }
        },
    mounted() { 
        axios
          .get('http://127.0.0.1:8000/api/empleados')
          .then(response => (this.empleados = response.data.empleados))
    },
}
</script>