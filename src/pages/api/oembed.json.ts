import type { APIContext } from 'astro';

export async function GET(Astro: APIContext) {
  // Access query parameters (if any) from the Astro object
  const { searchParams } = Astro.url;

  const response = await fetch(Astro.url.origin + `/api/track/${searchParams.get('id')}`);
  const song = await response.json();

  console.log(song);

   let artists = [];
   for (var i = 0; i < song.artists.length; i++) {
      artists.push(`${i === 0 ? '' : i+1 === song.artists.length ? ' and ' : ', '}${song.artists[i].name}`);
   }

   const data = {
      type: 'link',
      version: '1.0',
      title: song.name,
      provider_name: "FxSpotify",
      provider_url: "https://fxspotify.com/",
      author_name: artists.join(''),
      author_url: song.artists[0].external_urls.spotify,
      width: song.album.images[0].width,
      height: song.album.images[0].height,
      thumbnail_width: song.album.images[0].width,
      thumbnail_height: song.album.images[0].height,
      thumbnail_url: song.album.images[0].url,
      html: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${searchParams.get('id')}?utm_source=fxspotify" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
   }

   return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
         'Content-Type': 'application/json',
         'charset': 'utf-8'
      }
   });
}