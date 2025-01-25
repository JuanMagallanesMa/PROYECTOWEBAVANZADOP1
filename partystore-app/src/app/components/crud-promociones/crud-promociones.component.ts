import { Component } from '@angular/core';
import { PromocionesService } from '../../services/promociones.service';
import { Promociones } from '../../models/Promociones';


@Component({
  selector: 'app-crud-promociones',
  standalone: true,
  imports: [],
  templateUrl: './crud-promociones.component.html',
  styleUrls: ['./crud-promociones.component.css']
})
export class CrudPromocionesComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  promociones: Promociones[] = [
    ];
}


