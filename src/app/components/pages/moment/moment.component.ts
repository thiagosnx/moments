import { Component } from '@angular/core';

import { MomentService } from '../../../services/moment.service';
import { Moment } from '../../../Moments';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})
export class MomentComponent {
  moment?: Moment;

  constructor(private momentService: MomentService, private route: ActivatedRoute){  }

  ngOnInit():void{
    const id = Number(this.route.snapshot.paramMap.get('id')); //recuperando o id da url

    this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data));
  }

}
