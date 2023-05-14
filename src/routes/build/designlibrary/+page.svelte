<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'
	import ButtonBasic from '$lib/deslib/ButtonBasic.svelte'
	import InputText from '$lib/deslib/InputText.svelte'

</script>

<div class="rta-column stickyboy" class:dark={$themeMode} class:light={!$themeMode}>
	<h3 class="bord-bot p-bot-16">
		Design and Components Library
	</h3>
</div>
<div class="rta-column snipstyle p-bot-64" class:dark={$themeMode} class:light={!$themeMode}>
		<div class="outerunit m-bot-16">
			<div class="innerunit">
				<ButtonBasic>Button</ButtonBasic>
			</div>
			<cite>Button Basic Variant with props to use inside parent</cite>
		</div>
		<div class="outerunit">
			<div class="innerunit">
				<InputText/>
			</div>
			<cite>Simple input, clears text and removes focus on outside click</cite>
		</div>
</div>

