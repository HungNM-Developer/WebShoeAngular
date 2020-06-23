import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PostI } from '../../../shared/models/post.interface';
import { PostService } from '../../posts/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  //options: FormGroup;
  private image:any;
  constructor(private postSvc: PostService,) {}

  public newPostForm = new FormGroup({
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.min(0)),
    size: new FormControl('', Validators.required),
    price: new FormControl('', Validators.min(0)),
    status: new FormControl('', Validators.required),
  })

  // getFontSize() {
  //   return Math.max(10, this.newPostForm.value);
  // }
  ngOnInit(): void {
  }

  addNewPost(data: PostI){
    console.log('New post', data);
    this.postSvc.preAddAndUpdatePost(data,this.image);
  }

  handleImage(event:any): void{
    this.image = event.target.files[0]
  }

}
