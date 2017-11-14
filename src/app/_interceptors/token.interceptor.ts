import {Injectable, Injector} from '@angular/core';
import {Http, Response, XHRBackend, RequestOptions, Headers, RequestOptionsArgs} from '@angular/http';
import {AuthService} from '../_service/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable()
export class TokenInterceptor extends Http {

  constructor(backend: XHRBackend, defaultOptions: RequestOptions, private auth: AuthService) {
    super(backend, defaultOptions);
  }

  request(url: string, options?: RequestOptionsArgs): Observable<Response> {
    console.log('in interceptor request');
    const headers = new Headers();
    if (options === null) {
      console.log('in interceptor options:' + options);
      options = {headers: this.getHeaders(headers)};
    } else {
      options.headers = this.getHeaders( options.headers);
    }
    return this.intercept(super.request(url, options));
  }

  post(url: string, urlSearchParams: URLSearchParams, options?: RequestOptionsArgs) {
    console.log('in interceptor post');
    const headers = new Headers();
    if (options === null) {
      console.log('in interceptor options:' + options);
      options = {headers: this.getHeaders(headers)};
    } else {
      options.headers = this.getHeaders( options.headers);
    }
    return this.intercept(super.post(url, urlSearchParams, options));
  }
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    console.log('in interceptor get');
    const headers = new Headers();
    if (options === null) {
      console.log('in interceptor options:' + options);
      options = {headers: this.getHeaders(headers)};
    } else {
      options.headers = this.getHeaders( options.headers);
    }
    return this.intercept(super.get(url, options));
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    return observable.catch((err, source) => {
      if (err.status === 401) {
        /*this.auth.getTokenFromWso2()
          .subscribe(r => {
            console.log('setting token from token interceptor:' + r);
            this.auth.setToken(r);
          });*/
        console.log('need to set the token setting token from token interceptor:');
        return observable;
      } else {
        return Observable.throw(err);
      }
    });
  }
  private getHeaders(headers): Headers {
    headers = headers !== null ? headers : new Headers();
    const token = this.auth.getToken();
    console.log('toke in 10: ' + token);
    if (token === null) {
      console.log('toke is null in here 11');
    }
    headers.append('Authorization', `Bearer ${token}`);
    return headers;
  }
  /*constructor(private auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.auth.getToken();
    console.log('toke in 10: ' + token);
    if (token === null) {
      console.log('toke is null in here 11');
      this.auth.getTokenFromWso2().subscribe( r => {
        console.log('token from wso2: ' + r);
        token = r;
        this.auth.setToken(token);
      });
    }
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // return next.handle(request);
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        console.log('httpReponse is good');
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.log('unauthorized response');
          this.auth.getTokenFromWso2()
            .subscribe(r => {
              console.log('setting token from token interceptor:' + r);
              this.auth.setToken(r);
            });
          return event;
        }
      }
    });
  }*/

}
