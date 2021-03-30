import { createReducer, on, Action, createSelector } from "@ngrx/store";
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import { BooksPageActions, BooksApiActions } from "src/app/books/actions";
import { act } from "@ngrx/effects";
import { stat } from "fs";


const createBook = (books: BookModel[], book: BookModel) => [...books, book];
const updateBook = (books: BookModel[], changes: BookModel) =>
  books.map(book => {
    return book.id === changes.id ? Object.assign({}, book, changes) : book;
  });
const deleteBook = (books: BookModel[], bookId: string) =>
  books.filter(book => bookId !== book.id);


export interface State {
    collection: BookModel[];
    activeBookId: string | null;
}

export const initialState: State = {
    collection: [],
    activeBookId: null
}

export const booksReducer = createReducer(
    initialState,
    on(BooksPageActions.enter, (state, action) => {
        return {
            ...state,
            activeBookId: null
        }
    }),
    on(BooksPageActions.clearSelectedBook, (state, action) => {
            return {
                ...state,
                activeBookId: null
            }
         
    }),
    on(BooksPageActions.selectBook,(state, action) => {
        return {
            ...state,
            activeBookId: action.bookId
        }
    }),
    on(BooksApiActions.booksLoaded, ( state, action) => {
        return {
            ...state,
            collection:  action.books

        }
    }),
    on(BooksApiActions.bookDeleted, (state, action) => {
        return {
            ...state,
            collection: deleteBook(state.collection, action.bookId)
        }
    }),
    on(BooksApiActions.bookCreated, (state, action) => {
        return {
            ...state,
            collection: createBook(state.collection, action.book)
        }
    }),
    on(BooksApiActions.bookUpdated, (state, action) => {
        return {
            ...state, 
            collection: updateBook(state.collection, action.book)
        }
    })
);

export function reducer( state: State| undefined, action: Action) {
    return booksReducer(state, action);
}

/**
 * 
 * Getter selectors
 */
export const selectAll = (state: State) => state.collection;
export const selectActiveBookId = (state: State) => state.activeBookId;

/***
 * Complex Selectors
 */

//  export const selectActiveBook = (state: State) => {
//      const books = selectAll(state);
//      const activeBookId = selectActiveBookId(state);
//      return books.find( book => book.id === activeBookId)
//  }

 export const selectActiveBook = createSelector(
    selectAll,
    selectActiveBookId,
    (books, activeBookId) => {
        return books.find(book => book.id === activeBookId);
    }
 );

 export const selectEarningsTotal_unoptimized = (state: State) => {
     const books = selectAll(state);
     return calculateBooksGrossEarnings(books)
 }

 export const selectEarningsTotal = createSelector (
   selectAll, 
   calculateBooksGrossEarnings);