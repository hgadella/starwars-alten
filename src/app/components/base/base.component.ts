import { OnInit } from '@angular/core';
import { BaseSettings } from 'src/app/config/app.settings';
import { IBaseService } from 'src/app/services/base/base.service';

export abstract class BaseComponent<T extends IBaseService> implements OnInit {

  public items: any[];
  public model;
  public error: any;
  public message: any;

  constructor(protected service: T, protected config?: BaseSettings) {
    this.service = service;
    this.config = config;
  }

  ngOnInit(): void {
    if (!this.items || this.items.length === 0)
    {
      this.service.get().subscribe(
        result => {
            if (!this.items) { this.items = []; }
            result.results.forEach(item => {
              this.items.push(this.service.populateModel(item)) ;
            });
        },
        error => {
          this.error = error;
        }
      );
    }
  }

}
