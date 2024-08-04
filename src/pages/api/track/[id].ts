import {ACCESS_TOKEN} from "../../../config";

export async function GET({params}) {
  const id = params.id;
  const song: any = await fetch(`https://api.spotify.com/v1/tracks/${params.id}`,
    {
       headers: {
          'Accept': '*/*',
          'Authorization': `Bearer  ${ACCESS_TOKEN}`
       },
    }
  );

  const data = await song.json();

  return new Response(
    JSON.stringify(data)
  );
}