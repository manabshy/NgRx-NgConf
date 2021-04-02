import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType, act } from "@ngrx/effects";
import { mergeMap, map, tap, exhaustMap, concatMap } from "rxjs/operators";
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
  // Books will start disappearing as and when the network request is satisfied
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
  // concatMap - Create - Preserve order and don't introduce any cancellation into the effect

  createBook$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(BooksPageActions.createBook),
          concatMap(action => {
              return this.booksService.create(action.book)
              .pipe(map((book) => BooksApiActions.bookCreated({book})))
          })
      );
  });
 // concat - Update: Preserve order and don't introduce any cancellation into the effect
  updateBook$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(BooksPageActions.updateBook),
        concatMap(action => {
            return this.booksService.update(action.bookId, action.changes)
            .pipe(
                map((book) => BooksApiActions.bookUpdated({book}))
            )
        })
    )
});
}