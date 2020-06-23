import { Component, OnInit } from '@angular/core';

import {PostService} from '../../posts/post.service';
import { PostI } from '../../../shared/models/post.interface';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  
  // public posts: {
  //   id: string;
  //   titlePost: string;
  //   contentPost: string;
  //   imagePost: string;
  // }[] = [
  //     {
  //       id: '1',
  //       titlePost: 'Post One',
  //       contentPost: `The Jordan Delta masters the art of accessibility with a design that's expressive and comfortable from the inside out. Made from a mix of high-tech and natural materials, this shoe has plush, lightweight foam underfoot. It's meticulously crafted for a look and feel only Jordan Brand can deliver.`,
  //       imagePost: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1mJa8gwkXul8MWTUm3wKCnDq29HJ6D9xzMwzp_o9Jo9KIUTL4&usqp=CAU'
  //     },

  //     {
  //       id: '2',
  //       titlePost: 'Post Two',
  //       contentPost: `The Jordan Delta masters the art of accessibility with a design that's expressive and comfortable from the inside out. Made from a mix of high-tech and natural materials, this shoe has plush, lightweight foam underfoot. It's meticulously crafted for a look and feel only Jordan Brand can deliver.`,
  //       imagePost: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1mJa8gwkXul8MWTUm3wKCnDq29HJ6D9xzMwzp_o9Jo9KIUTL4&usqp=CAU'
  //     },

  //     {
  //       id: '3',
  //       titlePost: 'Post Three',
  //       contentPost: `The Jordan Delta masters the art of accessibility with a design that's expressive and comfortable from the inside out. Made from a mix of high-tech and natural materials, this shoe has plush, lightweight foam underfoot. It's meticulously crafted for a look and feel only Jordan Brand can deliver.`,
  //       imagePost: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1mJa8gwkXul8MWTUm3wKCnDq29HJ6D9xzMwzp_o9Jo9KIUTL4&usqp=CAU'
  //     },

  //     {
  //       id: '4',
  //       titlePost: 'Post Four',
  //       contentPost: `The Jordan Delta masters the art of accessibility with a design that's expressive and comfortable from the inside out. Made from a mix of high-tech and natural materials, this shoe has plush, lightweight foam underfoot. It's meticulously crafted for a look and feel only Jordan Brand can deliver.`,
  //       imagePost: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1mJa8gwkXul8MWTUm3wKCnDq29HJ6D9xzMwzp_o9Jo9KIUTL4&usqp=CAU'
  //     }
  //   ];

  public posts$: Observable<PostI[]>;
  constructor(private postSvc: PostService) { }

  ngOnInit(): void {
    //this.postSvc.getAllPosts().subscribe((res: any) => console.log('POSTS',res));
    this.posts$ = this.postSvc.getAllPosts();
  }

  convertPrice(number: number){
    return number.toLocaleString('vi',{
      style: 'currency',
      currency: 'VND',
    })
  }

}

