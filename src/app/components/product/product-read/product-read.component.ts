import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DaialogComponent } from '../daialog/daialog.component';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.scss']
})
export class ProductReadComponent implements OnInit {

  constructor(private service: ProductService,
    private router: Router, public dialog: MatDialog) {
      this.service.read().subscribe(products=>
        {
          service.productData = this.products = products;
      });
    }

  @ViewChild(MatSort) sort!: MatSort;

    products!: Product[];

    displayedColumns = ['id', 'name', 'price', 'action'];

  ngOnInit(): void
  {
    this.service.read().subscribe(products=>
      {
        this.products = products;
        console.log(products)
    });
  }

  openDialog(product: Product): void {
    const dialogRef = this.dialog.open(DaialogComponent,
    {
      width: '600px',
      data: { name: product.name,
              id: product.id,
              price: product.price
            },
    });

    dialogRef.afterClosed().subscribe(result =>
    {

    });
  }

  get GetProduct(): Product[]{
    console.log("GetProduct " + this.service.productData)
    return this.service.productData;

  }



  sortData(sort: Sort) {
    const data = this.products.slice();
    if (!sort.active || sort.direction === '') {
      this.products = data;
      return;
    }

    this.products = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
