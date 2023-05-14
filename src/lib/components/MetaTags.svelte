<script lang="ts">

  export let title = '';
  export let titleTemplate = '';
  let noindex = false;
  let nofollow = false;
  export let description:string = ''
  export let twitter:any = undefined

  $: updatedTitle = titleTemplate ? titleTemplate.replace(/%s/g, title) : title;

  let robotsParams = '';

</script>

<svelte:head>
  <title>{updatedTitle}</title>

  <meta name="robots" content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}${robotsParams}`} />
  <meta
    name="googlebot"
    content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}${robotsParams}`}
  />

  {#if description}
    <meta name="description" content={description} />
  {/if}

  {#if twitter}
    {#if twitter.cardType}
      <meta name="twitter:card" content={twitter.cardType} />
    {/if}
    {#if twitter.site}
      <meta name="twitter:site" content={twitter.site} />
    {/if}
    {#if twitter.handle}
      <meta name="twitter:creator" content={twitter.handle} />
    {/if}
    {#if twitter.title}
      <meta name="twitter:title" content={twitter.title} />
    {/if}
    {#if twitter.description}
      <meta name="twitter:description" content={twitter.description} />
    {/if}
    {#if twitter.image}
      <meta name="twitter:image" content={twitter.image} />
    {/if}
    {#if twitter.imageAlt}
      <meta name="twitter:image:alt" content={twitter.imageAlt} />
    {/if}
  {/if}

</svelte:head>