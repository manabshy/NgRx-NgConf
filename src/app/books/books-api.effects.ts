import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType, act } from "@ngrx/effects";
import { mergeMap, map, tap, exhaustMap } from "rxjs/operators";
import { BooksService } from "../shared/services";
import { BooksPageActions, BooksApiActions } from "./actions";

@Injectable()
export class BooksApiEffects {
  constructor(private booksService: BooksService, private actions$: Actions) {}
   //exhaustMap - NoN-Parameterized queries : Discard all other requests until the last one finishes
  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.enter),
      tap( action => {
        console.log('action:',action)
      }),
      exhaustMap(() =>
        this.booksService
          .all()
          .pipe(map((books) => BooksApiActions.booksLoaded({ books })))
      )
    );
  });

  // mergeMap - Right operator to be used here - as it subscribes immediately, never cancel or discard
  deleteBook$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(BooksPageActions.deleteBook),
          mergeMap(action => {
              return this.booksService.delete(action.bookId)
              .pipe(
                  map(() => BooksApiActions.bookDeleted({bookId: action.bookId}))
              )
          })
      )
  });

}