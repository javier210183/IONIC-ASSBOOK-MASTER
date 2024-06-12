import { HttpInterceptorFn } from "@angular/common/http";
import { Preferences } from "@capacitor/preferences";
import { from, switchMap } from "rxjs";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  return from(Preferences.get({ key: 'fs-token' })).pipe(
    switchMap((token) => {
      console.log("Token obtenido del storage:", token.value); // ver el token
      if (token.value) {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token.value),
        });
        return next(authReq);
      } else {
        return next(req);
      }
    })
  );
};
