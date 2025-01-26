export interface PromocioneModel {
    id?: number,
    nombre?: string,
    descripcion?: string
    id_categoria?: number
    categoria?: undefined
    descuentoPorcentaje?: number
    fechaFin?: Date
    isActive?: boolean
}