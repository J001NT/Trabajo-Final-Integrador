import { Component, Input } from '@angular/core';
import { IProducto } from '../../producto.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarritoService } from '../../../carrito/carrito.service';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-grilla-item[producto]',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FontAwesomeModule],
  templateUrl: './producto-grilla-item.component.html',
  styleUrl: './producto-grilla-item.component.css',
})
export class ProductoGrillaItemComponent {
  @Input() producto!: IProducto;

  faCartShopping = faCartShopping;

  constructor(
    private carritoService: CarritoService,
    private authServise: AuthService,
    private router: Router
  ) {}
  
  mostrarDetalles(productoId: number) {
    this.router.navigate(['/productos', productoId, 'detail']);
  }

  agregarAlCarrito(producto: IProducto): void {
    if (this.authServise.isLoggedIn()) {

      const cantidad = prompt("¿Cuantos productos deseas agregar al carrito?", "1");

      if (cantidad && !isNaN(Number(cantidad)) && Number(cantidad) > 0 ) {
        this.carritoService.agregarProducto(producto, Number(cantidad));
        this.router.navigate(['carrito'])
      } else {
        alert("Por favor, ingresa una cantidad valida.")
      }
    } else {
      this.router.navigate(['login']);
    }
  }
}
