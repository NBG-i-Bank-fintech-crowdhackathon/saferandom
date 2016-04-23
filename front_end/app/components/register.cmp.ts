/// <reference path="../shared/ts.definitions/jquery.d.ts"/>
import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {HeaderCmp} from './srheader.cmp';

@Component({
  selector: 'sr-register-cmp',
  template: `<div [ngSwitch]="mViewState">
               <template [ngSwitchWhen]="1">
                 <div class="wrapper">
                   <h2>Registration</h2>
                   <form>
                     <input type="text" name="username" placeholder="Enter your username"/><br/>
                     <input type="text" name="email" placeholder="Enter your email"/><br/>
                     <input type="text" name="password" placeholder="Enter a password"/><br/>
                     <div class="clickbutton green" (click)="showSignup($event)">Register</div>
                   </form>
                 </div>
               </template>
               <template [ngSwitchWhen]="2">
                 <sr-header-cmp></sr-header-cmp>
                 <div class="view2" style="padding: 1em;">
                   <h2>Create your account</h2>
                   <div class="state"></div>
                   <div class="line"></div>
                 </div>
               </template>
             </div>`,
  directives: [HeaderCmp],
  host: {
	   class: 'register-cmp'
  }
})

export class RegisterCmp implements OnInit {
  private showRegisterPopup: boolean = true;
  private mViewState: number = 1;

  constructor(private mRouter: Router) {

  }

  ngOnInit() {
    let windowHeight = $(window).outerHeight();
    let logoHeight = $(".wrapper .top").outerHeight();

    $(window).scroll(function(event) {
      let scrollpos = $(this).scrollTop();

      //console.log(`${scrollpos + logoHeight/2}`);

      if (scrollpos + logoHeight / 2 > windowHeight) {
        $(".wrapper .top").addClass("back");
      } else {
        $(".wrapper .top").removeClass("back");
      }
      //console.log(`${scrollpos}`);
    });

  }

  private showView(viewName: string, parameters?: Object) {
    this.mRouter.navigate([viewName, parameters]);
  }

  private showSignup(): void {
    this.mViewState = 2; //show the 1st step of the sign up
  }
}