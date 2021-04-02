import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  BookModel,
  calculateBooksGrossEarnings,
  BookRequiredProps
} from "src/app/shared/models";
import { BooksService } from "src/app/shared/services";
import { State, selectBooksEarningsTotal, selectAllBooks, selectActiveBook } from "src/app/shared/state";
import { BooksPageActions, BooksApiActions} from "../../actions";
@Component({
  selector: "app-books",
  templateUrl: "./books-page.component.html",
  styleUrls: ["./books-page.component.css"]
})
export class BooksPageComponent implements OnInit {
  books$:Observable<BookModel[]>;
  currentBook$: Observable<BookModel|undefined>;
  total: number = 0;
  total$: Observable<number>;

  constructor(private store: Store<State>) {

    this.total$ = store.select(selectBooksEarningsTotal);
    this.books$ = store.select(selectAllBooks);
    this.currentBook$ = store.select(selectActiveBook);
  }

  ngOnInit() {

    this.store.dispatch(BooksPageActions.enter());
    this.removeSelectedBook();
  }


  updateTotals(books: BookModel[]) {
    this.total = calculateBooksGrossEarnings(books);
  }

  onSelect(book: BookModel) {
    this.store.dispatch(BooksPageActions.selectBook({bookId: book.id}));
  }

  onCancel() {
    this.removeSelectedBook();
  }

  removeSelectedBook() {
    this.store.dispatch(BooksPageActions.clearSelectedBook());
  }

  onSave(book: BookRequiredProps | BookModel) {
    if ("id" in book) {
      this.updateBook(book);
    } else {
      this.saveBook(book);
    }
  }

  saveBook(bookProps: BookRequiredProps) {
    this.store.dispatch(BooksPageActions.createBook({book: bookProps}));
    
  }

  updateBook(book: BookModel) {
    this.store.dispatch(BooksPageActions.updateBook({bookId: book.id, changes: book}));
  }

  onDelete(book: BookModel) {
    this.store.dispatch(BooksPageActions.deleteBook({bookId: book.id}));
  }
}
