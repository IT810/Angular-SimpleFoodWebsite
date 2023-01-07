import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { param } from 'cypress/types/jquery';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];

  constructor(private _foodService: FoodService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['searchTerm']) {
        this.foods = this._foodService.getAllFoodsBySearchTerm(params['searchTerm']);
      }
      else if (params['tag']) {
        this.foods = this._foodService.getAllFoodsByTag(params['tag']);
      }
      else {
        this.foods = this._foodService.getAll();
      }
    });
  }

}
