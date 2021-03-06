import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import { stat } from "fs";
import { from } from "rxjs";
import * as fromAuth from "./auth.reducer";
import * as fromBooks from "./books.reducer";
import { logoutMetareducer } from "./logout.metareducer";

export interface State {
  auth: fromAuth.State,
  books: fromBooks.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  books: fromBooks.reducer
};

export const metaReducers: MetaReducer<State>[] = [
  logoutMetareducer
];


/**
 * Auth selectors
 */
export const selectAuthState = (state: State) => state.auth;
export const selectGettingAuthStatus = createSelector(
  selectAuthState,
  fromAuth.selectGettingState
);
export const selectAuthUser = createSelector(
  selectAuthState,
  fromAuth.selectUser
);
export const selectAuthError = createSelector(
  selectAuthState,
  fromAuth.selectError
);
/**
 * Books Selectors
 */
export const selectBooksState = (state: State) => state.books;
export const selectAllBooks = createSelector(
  selectBooksState,
  fromBooks.selectAll
);
export const selectActiveBook = createSelector(
  selectBooksState,
  fromBooks.selectActiveBook
);
export const selectBooksEarningsTotals = createSelector(
  selectBooksState,
  fromBooks.selectEarningsTotals
);
