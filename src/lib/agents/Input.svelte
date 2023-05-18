<script lang="ts">

	import Send from '$lib/icons/Send.svelte'
  export let value: any;
  export let placeholder = '';
  export let name = '';
  export let type = 'text';
  export let label = '';
  let classes = '';
  export { classes as class };

  const typeAction = (node: HTMLInputElement) => {
    node.type = type;
  };
</script>

<div class="fullW rta-row {classes}">
  <label class="text-xs" for={name}>{label}</label>
  <input
    {name}
    {placeholder}
    use:typeAction
    bind:value
    class="fullW"
    {...$$restProps}
  />
  <button
    type="submit"
    class="blank-button"
  >
		<Send/>
  </button>
</div>

<style lang="sass">

.rta-row
	border: 1px solid var(--texttwo)
	box-shadow: 4px 7px 9px var(--borderline)
	border-radius: 6px
	padding: 8px 16px
	margin-top: 32px

input
	border: none
	outline: none


</style>
