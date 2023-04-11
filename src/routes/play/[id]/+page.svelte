<script lang="ts">



	export let data


</script>




{@html data.prompt}
<pre>
<code class="language-html">
{@html data.response}
</code>
</pre>

<style lang="sass">

pre
	overflow-x: auto
	box-sizing: border-box
	white-space: pre-line
	word-wrap: break-word
	word-break: break-word

</style>