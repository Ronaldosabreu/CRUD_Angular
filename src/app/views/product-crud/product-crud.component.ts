import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from 'src/app/components/product/product.model';
import { HeaderService } from '../../components/template/header/header.service';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.scss']
})
export class ProductCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.setHeaderData = {
      title:'cadastro de produtos',
      icon:'storefront',
      routeUrl:'/products'
    }
  }

  ngOnInit(): void {}

  navigateToProductCreate():void
  {
    this.router.navigate(['/products/create']);
  }

}
