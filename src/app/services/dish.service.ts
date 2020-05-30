import { Injectable } from "@angular/core";
import { Dish } from "../shared/dish";
import { DISHES } from "../shared/dishes";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";

@Injectable({
  providedIn: "root",
})
export class DishService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  getDishes(): Observable<Dish[]> {
    return this.http
      .get<Dish[]>(baseURL + "dishes")
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: string): Observable<Dish> {
    return this.http
      .get<Dish>(baseURL + "dishes/" + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http
      .get<Dish[]>(baseURL + "dishes?featured=true")
      .pipe(map((dishes) => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes()
      .pipe(map((dishes) => dishes.map((dish) => dish.id)))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  promiseDishes(): Promise<Dish[]> {
    return new Promise((resolve) => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES), 2000);
    });
  }

  promiseDish(id: string): Promise<Dish> {
    return new Promise((resolve) => {
      // Simulate server latency with 2 second delay
      setTimeout(
        () => resolve(DISHES.filter((dish) => dish.id === id)[0]),
        2000
      );
    });
  }

  promiseFeaturedDish(): Promise<Dish> {
    return new Promise((resolve) => {
      // Simulate server latency with 2 second delay
      setTimeout(
        () => resolve(DISHES.filter((dish) => dish.featured)[0]),
        2000
      );
    });
  }
}
