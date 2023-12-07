import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrl: './moment-form.component.css'
})
export class MomentFormComponent implements OnInit {
  @Input() btnText!:string

  momentForm!: FormGroup;

  ngOnInit(): void {
      this.momentForm = new FormGroup({
        id: new FormControl(''),
        title: new FormControl('',[Validators.required]),
        description: new FormControl('',[Validators.required]),
        image: new FormControl(''),
        
      });
      
  }

  get title(){
    return this.momentForm.get('title')!; //a exclamação significa q eles vao existir pro angular relaxar
  }

  
  get description(){
    return this.momentForm.get('description')!;
  }

  submit(){
    if(this.momentForm.invalid){
      return;
    }
    console.log("ok")
  }
}
