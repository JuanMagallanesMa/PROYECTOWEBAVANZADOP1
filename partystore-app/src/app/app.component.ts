import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CrudCategoriaComponent  } from "./components//crud-categoria/crud-categoria.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'partystore-app';
}
