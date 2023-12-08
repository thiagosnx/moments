import { Component } from '@angular/core';

import { MomentService } from '../../../services/moment.service';
import { Moment } from '../../../Moments';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../enviroments/enviroment';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})
export class MomentComponent {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  //icons
  faTimes = faTimes;
  faEdit = faEdit;

  constructor(private momentService: MomentService,
     private route: ActivatedRoute, 
     private messagesService: MessagesService,
     private router: Router){  }

  ngOnInit():void{
    const id = Number(this.route.snapshot.paramMap.get('id')); //recuperando o id da url

    this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data));
  }

  async removeHandler(id:number){
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add("Deleted!");

    this.router.navigate(['/']);
  }

}
