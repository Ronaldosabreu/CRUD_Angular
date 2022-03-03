import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
  }

  get title(): string{
    return this.headerService.getHeaderData.title;
  }
  get routeUrl(): string{
    return this.headerService.getHeaderData.routeUrl;
  }
  get icon(): string{
    return this.headerService.getHeaderData.icon;
  }
}