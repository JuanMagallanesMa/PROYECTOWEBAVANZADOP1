import { Component, OnInit } from '@angular/core';
import { PromocionesService } from '../../services/promociones.service';
import { Promociones } from '../../models/Promociones';


@Component({
  selector: 'app-crud-promociones',
  standalone: true,
  imports: [],
  templateUrl: './crud-promociones.component.html',
  styleUrls: ['./crud-promociones.component.css']
})
export class CrudPromocionesComponent {
  promociones: Promociones[] = [
    CrudPromocionesComponent.constructor(PromocionesService , PromocionesService)
    
    ,
    {
      id: 1,
      nombre: 'Descuento 20% en toda la tienda',
      descripcion: 'Disfruta de un 20% de descuento en todos tus productos favoritos.',
      descuentoPorcentaje: 20,
      fechaFin: new Date('2025-01-25'),
      isActive: true,
    }
    ,
    {
      id: 2,
      nombre: 'Compra 2, Paga 1',
      descripcion: 'Llévate el segundo producto igual al primero completamente gratis.',
      fechaFin: new Date('2025-02-06'),
      isActive: true,
      descuentoPorcentaje: 50
    }
    ,
    {
      id: 3,
      nombre: 'Envío gratis en compras superiores a $30',
      descripcion: 'Disfruta de envío gratis en todas tus compras superiores a $30.',
      fechaFin: new Date('2025-01-30'),
      isActive: true,
      descuentoPorcentaje: 20
    }
  ];
}

function ngOnInit(): Promociones {
  throw new Error('Function not implemented.');
}
