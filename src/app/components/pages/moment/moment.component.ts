import { Component } from '@angular/core';

import { MomentService } from '../../../services/moment.service';
import { Moment } from '../../../Moments';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../enviroments/enviroment';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from '../../../services/messages.service';
import { Comment } from '../../../Comment';
import { CommentService } from '../../../services/comment.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

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

  commentForm!:FormGroup;


  constructor(private momentService: MomentService,
     private route: ActivatedRoute, 
     private messagesService: MessagesService,
     private router: Router,
     private commentService: CommentService){  }

  ngOnInit():void{
    const id = Number(this.route.snapshot.paramMap.get('id')); //recuperando o id da url

    this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text(){
    return this.commentForm.get('text')!;
  }

  get username(){
    return this.commentForm.get('username')!;
  }

  async removeHandler(id:number){
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add("Deleted!");

    this.router.navigate(['/']);
  }

  async onSubmtit(formDirective: FormGroupDirective){ 
    if(this.commentForm.invalid){
      return
    }

    const data: Comment = this.commentForm.value

    data.momentId = Number(this.moment!.id)

    await this.commentService.createComment(data).subscribe((comment) =>
      this.moment!.comments!.push(comment.data));

    this.messagesService.add('Successfully!')

    this.commentForm.reset(); //limpa o formulario no front
    formDirective.resetForm(); //limpa o formulario pro back


   }

}
