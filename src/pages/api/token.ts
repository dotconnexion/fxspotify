import { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRE, ACCESS_TOKEN_NOW, setAccessToken, toggleFetchingToken } from "../../config";

export async function GET({ params, redirect }) {
   var details: any = {
      'grant_type': 'client_credentials',
      'client_id': import.meta.env.VITE_CLIENT_ID,
      'client_secret': import.meta.env.VITE_CLIENT_SECRET
   };

   const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
   const data = await fetch('https://accounts.spotify.com/api/token',
      {
         method: 'POST',
         body: formBody,
         headers: {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
         },
      }
   );
   const response = await data.json();

   setAccessToken({
      value: response.access_token,
      expires_in: response.expires_in
   });

   toggleFetchingToken();

   return new Response(JSON.stringify({
      status: 200,
      code: 'CODE_UPDATED'
   }));
 }