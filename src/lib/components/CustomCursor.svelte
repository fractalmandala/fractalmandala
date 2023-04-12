<script>
	import { spring } from 'svelte/motion';

	let coords1 = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.05,
			damping: 0.25
		}
	);

	let coords2 = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.1,
			damping: 0.35
		}
	);

	let size = spring(10);

</script>

<svg
	on:mousemove={(e) => {
		coords1.set({ x: e.clientX, y: e.clientY })
		coords2.set({ x: e.clientX, y: e.clientY })
		e.stopPropagation();
		e.cancelBubble = true;
		}}
	on:mousedown={(e) => {
		size.set(30);
		e.stopPropagation();
		e.cancelBubble = true;
	}}
	on:mouseup={(e) => {
		size.set(10);
		e.stopPropagation();
		e.cancelBubble = true;
		}}
	class ="cursor"
>
	<circle cx={$coords1.x} cy={$coords1.y} r={$size} stroke="#10C56D" stroke-width="1" fill-opacity="0"/>
	<circle cx={$coords2.x} cy={$coords2.y} r={$size/4} fill="#10D56C"/>
</svg>

<style lang="sass">

.cursor
	width: 100vw
	height: 100vh
	position: fixed
	top: 0
	left: 0


</style>