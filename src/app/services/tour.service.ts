import { Injectable, Inject, Optional } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Tour } from '../models/tour';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TourService {

  // private API_URL = 'http://localhost:3000/api/travel/page';  // URL to web api
  private API_URL = 'http://5c355b05ae60ba0014da42be.mockapi.io/api/tours';  // URL to web api
  // private API_URL = 'http://localhost:4000/api/tours';  // URL to web api

  constructor(
    private http: HttpClient,
    @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.API_URL = `${this.API_URL}`;
  }

  /** GET tours from the server */
  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.API_URL)
      .pipe(
        tap(tours => this.log('fetched tours')),
        catchError(this.handleError('getTours', []))
      );
  }

  /** GET tour by id. Return `undefined` when id not found */
  getTourNo404<Data>(id: number): Observable<Tour> {
    const url = `${this.API_URL}/?id=${id}`;
    return this.http.get<Tour[]>(url)
      .pipe(
        map(tours => tours[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} tour id=${id}`);
        }),
        catchError(this.handleError<Tour>(`getTour id=${id}`))
      );
  }

  /** GET tour by id. Will 404 if id not found */
  getTour(id: number): Observable<Tour> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<Tour>(url).pipe(
      tap(_ => this.log(`fetched tour id=${id}`)),
      catchError(this.handleError<Tour>(`getTour id=${id}`))
    );
  }

  /* GET tours whose name contains search term */
  searchTours(term: string): Observable<Tour[]> {
    if (!term.trim()) {
      // if not search term, return empty tour array.
      return of([]);
    }
    return this.http.get<Tour[]>(`${this.API_URL}/?name=${term}`).pipe(
      tap(_ => this.log(`found tours matching "${term}"`)),
      catchError(this.handleError<Tour[]>('searchTours', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new tour to the server */
  addTour(name: string): Observable<Tour> {
    const tour = { name };

    return this.http.post<Tour>(this.API_URL, tour, httpOptions).pipe(
      tap((tour: Tour) => this.log(`added tour w/ id=${tour.id}`)),
      catchError(this.handleError<Tour>('addTour'))
    );
  }

  addTour2(name: string, description: string, content: string, created_date: Date,
    category: string, city: string, address: string, images: string): Observable<Tour> {
    const tour = { name, description, content, created_date, category, city, address, images };

    return this.http.post<Tour>(this.API_URL, tour, httpOptions).pipe(
      tap((tour: Tour) => this.log(`added tour w/ id=${tour.id}`)),
      catchError(this.handleError<Tour>('addTour'))
    );
  }

  /** DELETE: delete the tour from the server */
  deleteTour(tour: Tour | number): Observable<Tour> {
    const id = typeof tour === 'number' ? tour : tour.id;
    const url = `${this.API_URL}/${id}`;

    return this.http.delete<Tour>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted tour id=${id}`)),
      catchError(this.handleError<Tour>('deleteTour'))
    );
  }

  /** PUT: update the tour on the server */
  updateTour(tour: Tour): Observable<any> {
    return this.http.put(this.API_URL, tour, httpOptions).pipe(
      tap(_ => this.log(`updated tour id=${tour.id}`)),
      catchError(this.handleError<any>('updateTour'))
    );
  }
  updateTour2(id: number, name: string, description: string, content: string, created_date: Date,
    category: string, city: string, address: string, images: string): Observable<any> {
    const tour = {id, name, description, content, created_date, category, city, address, images };

    const url = `${this.API_URL}/${id}`;
    return this.http.put(url, tour, httpOptions).pipe(
      tap(_ => this.log(`updated tour id=${id}`)),
      catchError(this.handleError<any>('updateTour'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a TourService message with the MessageService */
  private log(message: string) {
  }
}
