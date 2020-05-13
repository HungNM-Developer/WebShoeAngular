import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {PostService} from '../post.service';
import { Observable } from 'rxjs';
import { PostI } from 'src/app/shared/models/post.interface';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  // public post:{
  //   id: string;
  //   titlePost: string;
  //   contentPost: string;
  //   imagePost: string;
  // }={
  //   id:'1',
  //   titlePost:'Post One',
  //   contentPost:'Hola mundo',
  //   imagePost:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1mJa8gwkXul8MWTUm3wKCnDq29HJ6D9xzMwzp_o9Jo9KIUTL4&usqp=CAU'
  // };
  public post$: Observable<PostI>;
  constructor(private route: ActivatedRoute, private postSvc:PostService) { }

  ngOnInit(): void {
    const idPost = this.route.snapshot.params.id;
    this.post$ = this.postSvc.getOnePost(idPost);
    
  }

}
