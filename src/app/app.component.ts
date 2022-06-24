import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from './model/category';
import { Joke } from './model/joke';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';

import { JokeService } from './service/service';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort
  title = 'jokes-api-ui';

  hasBeenChecked = false;
  jokes: Joke[] = []
  randomJoke!: Joke
  selectedCategory: any
  dataSource = new MatTableDataSource<Joke>()
  radioSelected: string | undefined
  public displayedColumns = ['icon_url', 'joke', 'date_updated'];
  categories: [] = [];
  sortArray!:Joke[]
  form!: FormGroup;
  http: any;
  imageToShow: any;
  constructor(private appService: JokeService, private formBuilder: FormBuilder) {
  
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.matSort;
  }
  ngOnInit() {
    this.getAllCategories()
    this.getFirstRandomJoke()
  }
  getAllCategories() {
    this.appService
      .getAllCategories()
      .pipe()
      .subscribe((response: any) => {
        this.categories = response;
        console.log(this.categories)
      });
  }

  getByCategory(data: any) {
    this.appService
      .getByCategory(data)
      .pipe()
      .subscribe((response: any) => {
        this.jokes = response;
        let sortedJokes=this.jokes.sort((first,next)=>(first.value<next.value)?-1:1)
        this.dataSource.data = sortedJokes;
        this.hasBeenChecked = true;
      });
  }

  getFirstRandomJoke() {
    this.appService
      .getFirstRandomJoke()
      .pipe()
      .subscribe((response: Joke) => {
        this.randomJoke = response;
      });
  }

}
