/**
 * Created by pavlos on 23/4/2016.
 */
import {bootstrap}    from 'angular2/platform/browser';
import {provide} from "angular2/core";
import {AppComponent} from './components/app.component';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {LocationStrategy, HashLocationStrategy} from "angular2/router";

bootstrap(AppComponent, 
	[ROUTER_PROVIDERS,
	 provide(LocationStrategy, {useClass: HashLocationStrategy}),
     provide(APP_BASE_HREF, { useValue: '/' })
    ]);