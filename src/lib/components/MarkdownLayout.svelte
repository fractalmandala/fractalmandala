<script lang="ts">

  import '$lib/styles/layout.css';

</script>


<div class="container">
  <slot />
</div>

<style>
  .container {
    background-color: var(--colour-brand);
    color: var(--colour-light);
    width: min(100% - var(--spacing-12), var(--max-width-wrapper));
    margin: var(--spacing-0) auto;
    padding: var(--spacing-12) var(--spacing-0);
    font-size: var(--font-size-1);
    line-height: var(--line-height-normal);
  }
  .heading {
    text-align: center;
  }
</style>