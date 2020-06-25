import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { PostService } from '../../../components/posts/post.service';
import { PostI } from 'src/app/shared/models/post.interface';

import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { element } from 'protractor';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

 


  displayedColumns: string[] = ['imagePost','titlePost', 'contentPost',
   'size', 'quantity', 'price', 'status', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  
  
  constructor(private postSvc: PostService, public dialog: MatDialog){}


  public posts: Observable<PostI[]>;
  

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.postSvc
    .getAllPosts()
    .subscribe(posts => (this.dataSource.data = posts));
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;  
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEditPost(post: PostI){
    console.log('Edit post',post);
    this.openDialog(post);
  }

  onDeletePost(post: PostI){
    
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if(result.value){
        this.postSvc.deletePostById(post).then(()=>{
          Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
        }).catch((error)=>{
          Swal.fire('Error!', 'There was an error deleting this post.', 'error');
        })
        ;
      }
    })
  }
  onNewPost(){
    this.openDialog();
  }

  openDialog(post?: PostI){
    const config = {
      data: {
        message: post ? 'Edit Post' : 'New Post',
        content: post
      },
    };
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    })
  }

  
  convertPrice(number: number){
    return number.toLocaleString('vi',{
      style: 'currency',
      currency: 'VND',
    })
  }

  
  // firstname='string';
  // Search(){
  //   if(this.firstname !=""){
  //     this.list = this.list.filter(res=>{
  //       return res.Name.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase());
  //   });
  //   }
  //   else if (this.firstname =="")
  //   {
  //     this.ngOnInit();
  //   }
  // }

}
