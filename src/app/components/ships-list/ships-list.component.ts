import { Component, OnInit } from '@angular/core';
import { ShipsService } from 'src/app/services/ships.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-ships-list',
  templateUrl: './ships-list.component.html',
  styleUrls: ['./ships-list.component.scss']
})
export class ShipsListComponent extends BaseComponent<ShipsService> implements OnInit {
  count: number;

  constructor(protected service: ShipsService) {
    super(service);
  }

  ngOnInit(): void {
    this.count = 3;
    super.ngOnInit();
  }

  fetchNextPage(): void {
      this.count += 3;
  }

}
