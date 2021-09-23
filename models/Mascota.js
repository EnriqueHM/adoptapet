/*
class Mascota{
    constructor(id, nombre, categoria, foto, descripcion, anunciante, ubicacion){
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.foto = foto;
        this.descripcion = descripcion;
        this.anunciante = anunciante;
        this.ubicacion = ubicacion;
    }
}

module.exports = Mascota;
*/

const mongoose = require('mongoose');
const MascotaSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    categoria: {type:String, enum: ['Perro', 'Gato', 'Otro']},
    fotos: String,
    descripcion: {type: String, required: true},
    anunciante: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    ubicacion: String
}, {timestamps:true, collation:'mascotas'})

MascotaSchema.methods.publicData = () => {
    return {
    id: this.id,
    nombre: this.nombre,
    categoria: this.categoria,
    fotos: this.fotos,
    descripcion : this.descripcion,
    anunciante: this.anunciante,
    ubicacion:this.ubicacion
    }
}

mongoose.model("Mascota", MascotaSchema);

