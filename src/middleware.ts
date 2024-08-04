import { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRE, FETCHING_TOKEN, toggleFetchingToken } from "./config";

export async function onRequest (context, next) {
   if ((ACCESS_TOKEN === '' || Date.now() > ACCESS_TOKEN_EXPIRE) && !FETCHING_TOKEN) {
      toggleFetchingToken();
      await fetch(`${context.url.origin}/api/token`).catch(error => error);
   }

   return next();
};