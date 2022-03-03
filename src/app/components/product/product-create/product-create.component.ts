import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { HeaderService } from '../../template/header/header.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null!,
    id: null!
  }

  constructor(private productService: ProductService,
    private router: Router, private route: ActivatedRoute,
    private headerService: HeaderService) {
      headerService.setHeaderData = {
        title:'Produtos',
        icon:'storefront',
        routeUrl:'/products/create'
    }
  }

  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('id');
    if(id!=null){
    this.productService.readById(id).subscribe(product => {
      this.product = product
    });
  }
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Criado com sucesso!');
      this.router.navigate(['/products'])
    });
  }

  cancel(): void {
    this.productService.showMessage('Cancelado');
    this.router.navigate(['/products'])
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto Editado');
      this.router.navigate(['/products']);
    });
  };



}
