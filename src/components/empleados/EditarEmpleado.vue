<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Empleado
            </div>
            <div class="card-body">
                <form @submit.prevent="updateEmpleado">
                    
                    <div class="row mb-3">
                    <label for="id_empleado" class="form-label">Codigo Empleado</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="id_empleado" placeholder="Codigo Empleado" disabled
                          v-model='empleado.id_empleado'>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="nombre_empleado" class="form-label">Nombre Empleado</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="nombre_empleado" placeholder="nombre empleado"
                          v-model='empleado.nombre_empleado'>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="apellido" class="form-label">apellido</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="apellido" placeholder="apellido"
                          v-model='empleado.apellido'>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="cargo_empleado" class="form-label">cargo empleado</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="cargo_empleado" placeholder="cargo empleado"
                          v-model='empleado.cargo_empleado'>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="salario" class="form-label">salario</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                        <input type="text" class="form-control" id="salario" placeholder="salario"
                          v-model='empleado.salario'>
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
    name: 'EditarEmpleado',
    data(){
        return{
            empleado:{
                id_empleado: 0,
                nombre_empleado: '',
                apellido: '',
                cargo_empleado: '',
                salario: 0
            },
        }
    },
    methods: {
        cancelar(){
            this.$router.push({name: 'Empleados'})
        },

        async updateEmpleado(){
            const res = await axios.put(`http://127.0.0.1:8000/api/empleados/${this.empleado.id_empleado}`, this.empleado)

            if(res.status == 200){
                this.$router.push({name: 'Empleados'})
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Empleados has been updated',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    },

    mounted(){
        this.empleado.id_empleado = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/api/empleados/${this.empleado.id_empleado}`)
          .then(response => {
            this.empleado = response.data.empleado
          })
        }
}
</script>