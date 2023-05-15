<script lang="ts">

	import { themeMode, breakOne, breakZero, breakTwo } from '$lib/stores/globalstores'
	import BoxStandard from '$lib/deslib/BoxStandard.svelte'

</script>

<BoxStandard
>
	<div slot="mid"
		class:dark={$themeMode}
		class:light={!$themeMode}
		class:levelzero={$breakZero}
		class:levelone={$breakOne}
		class:leveltwo={$breakTwo}
		>
		<slot></slot>
	</div>
</BoxStandard>
