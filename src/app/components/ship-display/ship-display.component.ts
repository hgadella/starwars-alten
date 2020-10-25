import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ship-display',
  templateUrl: './ship-display.component.html',
  styleUrls: ['./ship-display.component.scss']
})
export class ShipDisplayComponent implements OnInit {
  @Input() starship;
  constructor() { }

  ngOnInit(): void {
  }

}
