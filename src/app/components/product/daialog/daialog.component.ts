import { Component, EventEmitter, HostListener, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-daialog',
  templateUrl: './daialog.component.html',
  styleUrls: ['./daialog.component.scss']
})



export class DaialogComponent implements OnInit {

    product!: Product[];

    constructor(private service: ProductService, private router: Router,
      public dialogRef: MatDialogRef<DaialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Product)
      {

      }

  ngOnInit(): void
  {
  }

  cancel() {
    this.close(false);
  }

  close(value: any) {
    this.dialogRef.close(value);
  }

  confirm() {
    this.close(true);
  }
  delete(id: any):void
  {
    this.service.delete(id).subscribe(()=>
    {
      this.service.showMessage('Produto Exluido');
      this.close(false);

      this.service.read().subscribe(products=>
        {
          this.service.productData = products;
      });

    })
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }

}
