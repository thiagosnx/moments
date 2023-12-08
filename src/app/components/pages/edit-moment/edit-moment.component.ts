import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Moment } from '../../../Moments';
import { MomentService } from '../../../services/moment.service';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css'
})
export class EditMomentComponent {
  moment!: Moment;
  btnText:string = 'Edit';

  constructor(private momentService:MomentService, private route:ActivatedRoute, 
    private messagesService:MessagesService,
    private router: Router){}

  ngOnInit():void{
    const id = Number(this.route.snapshot.paramMap.get("id"))

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    })
  }

  async editHandler(momentData:Moment){
    const id = this.moment.id;
    const formData = new FormData();
    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if(momentData.image){
      formData.append('image', momentData.image);
    }

    await this.momentService.updateMoment(id!, formData).subscribe();

    this.messagesService.add(`${this.moment.title} atualizado!`)

    this.router.navigate(['/']);

  }

}
