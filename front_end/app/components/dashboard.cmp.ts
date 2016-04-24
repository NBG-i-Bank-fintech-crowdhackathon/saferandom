/// <reference path="../shared/ts.definitions/jquery.d.ts"/>
import {Component, AfterViewInit, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {HeaderCmp} from './srheader.cmp';
import {Contest} from '../shared/models/Contest';
import {RequestsService} from '../shared/RequestsService';
import {Subject, BehaviorSubject, Observable} from "rxjs/Rx";

@Component({
  selector: 'sr-dashboard-cmp',
  template: `<div [ngSwitch]="mViewState">
               <template [ngSwitchWhen]="1">
                   <sr-header-cmp></sr-header-cmp>
                   <div class="view2" style="padding: 1em;">
                     <h2>Dashboard</h2>
                     <div class="line"></div>
                     <div class="outerwrapper">
                       <div class="wrapper">
                         <div class="searchbarwrapper">
                           <input id="contestsearchinput" type="text" placeholder="Search for a contest"/>
                         </div>
                         <div class="contestslist">
                           <div *ngIf="contestsArray.length>0">
                             <div class="contesttab" *ngFor="#contest of contestsArray">
                               <h2>#{{contest.id}} - {{contest.title}}</h2>
                               <h3>State: </h3>{{contest.getStateTitle()}}
                               <br/>
                               <h3>Method: </h3>{{contest.getMethodTitle()}}
                               <br/>
                               <h3>Contest date: </h3>{{contest.date}}
                             </div>
                            </div>
                            <div *ngIf="contestsArray.length==0">
                              <h2 class="nocontestsmsg">You don't have any contests yet</h2>
                            </div>
                         </div>
                       </div>
                       <div class="controls">
                         <div class="circlecontrol edit"></div>
                         <div class="circlecontrol">+</div>
                       </div>
                     </div>
                 </div>
               </template>
               <div class="footer" style="width:100%; position: absolute; bottom: 0;background-color:#cacaca; padding: 1.2em 0em; color: #949494;text-align:center;">Powered by BigDataNauts</div>
             </div>`,
  directives: [HeaderCmp],
  host: {
	   class: 'dashboard-cmp'
  }
})

export class DashboardCmp implements OnInit, AfterViewInit {
  private showRegisterPopup: boolean = true;
  private mViewState: number = 1;
  private selectedPlan: string;
  private selectedPrice: number;
  private contestsArray: Array<Contest> = new Array<Contest>();
  private inputObservable: BehaviorSubject<Contest>;

  constructor(private mRouter: Router,
              private mReqService: RequestsService) {

  }

  ngOnInit() {


    this.contestsArray = new Array<Contest>();
    this.contestsArray.push(new Contest("1", "Contest1", 0, 1, " 24/05/2016, 14:00:00"));

  }

  ngAfterViewInit() {
    let left: number = $(".outerwrapper .wrapper").offset().left;
    let bottom: number = $(".footer").outerHeight();

    $(".controls").css("left", `${left}px`).css("bottom", `${bottom + 10}px`);


    /*
    this.inputObservable = <BehaviorSubject<Contest>>Observable.fromEvent($("#contestsearchinput"), "keyup");

    this.inputObservable
    .map((element: any) => { return element.target.value }) //map the input value
    .filter((text: string) => { return text.length > 1 }) //search only for values more than 1 characters
    //.do( () => loadingCallback(true) )
    .switchMap((text: string) => this.searchContests(text)) //the actual search
    .subscribe(
      (response) => { this.showSearchResults(response) }, //success
      (error) => { console.log(error); });  //error
     // () => { completeCallback(false) }); //on complete

    this.inputObservable.debounceTime(250);
  */

    //now fetch the contests
    let contestsObs: Observable<any> = this.mReqService.getContests();
    
    contestsObs.subscribe( (contests: any)=>{
        console.log(contests);
    } );
  }


  private searchContests(title: string){

  } 

  private showSearchResults():void{

  }

  private showView(viewName: string, parameters?: Object) {
    this.mRouter.navigate([viewName, parameters]);
  }

  private showPaymentView(selectedPlan: string, selectedPrice: number): void {
    this.selectedPlan = selectedPlan;
    this.selectedPrice = selectedPrice;
    this.mViewState = 3;
  }

  private showFinalizeView() {
    this.mViewState = 4;
  }

  private showSignup(): void {
    this.mViewState = 2; //show the 1st step of the sign up
  }

  private createAContest(): void {

  }
}