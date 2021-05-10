import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LoginEvent, LoginFormComponentModule } from "../login-form";
import { LoginPageComponent } from "./login-page.component";
import { Store } from "@ngrx/store";
import { State } from "src/app/shared/state";
import { AuthUserActions } from "../../actions";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    LoginFormComponentModule
  ],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent]
})
export class LoginPageComponentModule {
  constructor(private store: Store<State>){}
  onLogin($event: LoginEvent) {
    this.store.dispatch(
      AuthUserActions.login($event.username, $event.password)
    )
  }
}
