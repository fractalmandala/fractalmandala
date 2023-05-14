<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'
	import ButtonBasic from '$lib/deslib/ButtonBasic.svelte'
	import InputText from '$lib/deslib/InputText.svelte'
	import BreadCrumb from '$lib/deslib/BreadCrumb.svelte'

</script>

<div class="rta-column stickyboy" class:dark={$themeMode} class:light={!$themeMode}>
	<h3 class="bord-bot p-bot-16">
		Design and Components Library
	</h3>
</div>
<div class="rta-column snipstyle p-bot-64" class:dark={$themeMode} class:light={!$themeMode}>
		<div class="outerunit m-bot-32">
			<div class="innerunit">
				<ButtonBasic>Button</ButtonBasic>
			</div>
			<cite>Button Basic Variant with props to use inside parent</cite>
		</div>
		<div class="outerunit m-bot-32">
			<div class="innerunit">
				<InputText/>
			</div>
			<cite>Simple input, clears text and removes focus on outside click</cite>
		</div>
		<div class="outerunit m-bot-32">
			<div class="innerunit">
				<BreadCrumb/>
			</div>
			<cite>Routing breadcrumb up to 4 levels</cite>
		</div>
</div>

