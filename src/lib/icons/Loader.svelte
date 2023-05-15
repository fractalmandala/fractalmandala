<div class="rta-icon">
<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="aa" fill-rule="evenodd" clip-rule="evenodd" d="M4.50833 4.50833C6.98378 2.03291 10.4063 0.500122 14.185 0.500122C17.9637 0.500122 21.3863 2.03291 23.8617 4.50833C26.3371 6.98377 27.8699 10.4063 27.8699 14.185C27.8699 17.9638 26.3371 21.3863 23.8617 23.8617C21.3863 26.3371 17.9638 27.8699 14.185 27.8699C10.4063 27.8699 6.98378 26.3371 4.50834 23.8617C2.03292 21.3863 0.500107 17.9637 0.500107 14.185C0.500107 10.4063 2.0329 6.98378 4.50833 4.50833Z" fill="#0BC160"/>
<path id="bb" fill-rule="evenodd" clip-rule="evenodd" d="M7.20946 7.20879C8.99378 5.42447 11.4616 4.31915 14.1856 4.31915C16.9098 4.31915 19.3776 5.42447 21.162 7.20878C21.5349 7.58163 21.5349 8.18615 21.162 8.55901C20.7891 8.93188 20.1846 8.93189 19.8117 8.55904C18.3708 7.11816 16.383 6.22867 14.1856 6.22867C11.9883 6.22867 10.0006 7.11816 8.5597 8.55902C8.18685 8.93188 7.58232 8.93188 7.20946 8.55902C6.83661 8.18617 6.83661 7.58164 7.20946 7.20879Z" fill="#FFFBFF"/>
</svg>

</div>

<style lang="sass">

.rta-icon
	svg
		transform-origin: center center
	#aa, #bb
		transform-origin: center center	
	
#aa
	animation: clocker 2s ease infinite alternate-reverse

#bb
	animation: anticlocker 2.5s ease infinite alternate-reverse

@keyframes clocker
	0%
		transform: rotate(0deg)
	50%
		transform: rotate(360deg)
	100%
		transform: rotate(0deg)

@keyframes anticlocker
	0%
		transform: rotate(0deg)
	50%
		transform: rotate(-360deg)
	100%
		transform: rotate(0deg)

</style>