import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { timer } from "rxjs";
import { mergeMap } from "rxjs/operators";
import * as uuid from "uuid/v4";
import { BookModel, BookRequiredProps } from "../models";

const BASE_URL = "http://localhost:3000/books";
const HEADER = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class BooksService {
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<BookModel[]>(BASE_URL);
  }

  load(id: string) {
    return this.http.get<BookModel>(`${BASE_URL}/${id}`);
  }

  create(bookProps: BookRequiredProps) {
    const Book: BookModel = {
      id: uuid(),
      ...bookProps
    };

    return this.http.post<BookModel>(
      `${BASE_URL}`,
      JSON.stringify(Book),
      HEADER
    );
  }

  update(id: string, updates: BookRequiredProps) {
    return this.http.patch<BookModel>(
      `${BASE_URL}/${id}`,
      JSON.stringify(updates),
      HEADER
    );
  }
  

  // Setting a timer to understand mergeMao
  delete(id: string) {
    return  timer(3000).pipe(
      mergeMap(() => this.http.delete(`${BASE_URL}/${id}`))
    );
  }
}
