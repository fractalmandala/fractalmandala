---
title: code of current home page 13 apr
tags: temp
type: code
---

```html
<div class="pagecontainer">
	{#if area[1]}
		{#if notes && notes.length > 0}
		<div class="gridof6">
			{#each notes as item, i}
				<TinyCard i={i}>
					<small class="tinycardcat" slot="category">{item.type}</small>
					<p slot="title">
						<a href="/notes/{item.counting}" target="_self">
							{item.title}
						</a>
					</p>
						<small style="font-size: 10px; color: #676767; text-transform: uppercase" slot="lang">
							{#if item.lang && item.lang.length > 0}
								{item.lang}
							{/if}
						</small>	
					<small style="font-size: 10px; color: #676767;" slot="tags">{item.tags}</small>
				</TinyCard>
			{/each}
		</div>
		{/if}
	{/if}
	{#if area[2]}
		{#if codes && codes.length > 0}
			<div class="gridof6">
			{#each codes as item, i}
				<TinyCard2 i={i}>
					<small class="tinycardcat" slot="category">{item.type}</small>
					<p slot="title">
						<a href="/notes/{item.counting}" target="_self">
							{item.title}
						</a>
					</p>
						<small style="font-size: 10px; color: #676767; text-transform: uppercase" slot="lang">
							{#if item.lang && item.lang.length > 0}
								{item.lang}
							{/if}
						</small>	
					<small style="font-size: 10px; color: #676767;" slot="tags">{item.tags}</small>
				</TinyCard2>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[3]}
		{#if gens && gens.length > 0}
			<div class="gridof6">
			{#each gens as item, i}
				<TinyCard3 i={i}>
					<small class="tinycardcat" slot="category">{item.type}</small>
					<p slot="title">
						<a href="/notes/{item.counting}" target="_self">
							{item.title}
						</a>
					</p>
						<small style="font-size: 10px; color: #676767; text-transform: uppercase" slot="lang">
							{#if item.lang && item.lang.length > 0}
								{item.lang}
							{/if}
						</small>	
					<small style="font-size: 10px; color: #676767;" slot="tags">{item.tags}</small>
				</TinyCard3>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[4]}
		{#if chtml && chtml.length > 0}
			<div class="gridof6">
			{#each chtml as item, i}
				<TinyCard4 i={i}>
					<small class="tinycardcat" slot="category">{item.type}</small>
					<p slot="title">
						<a href="/notes/{item.counting}" target="_self">
							{item.title}
						</a>
					</p>
						<small style="font-size: 10px; color: #676767; text-transform: uppercase" slot="lang">
							{#if item.lang && item.lang.length > 0}
								{item.lang}
							{/if}
						</small>	
					<small style="font-size: 10px; color: #676767;" slot="tags">{item.tags}</small>
				</TinyCard4>			
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[5]}
		{#if cjs && cjs.length > 0}
			<div class="gridof6">
			{#each cjs as item, i}
				<TinyCard5 i={i}>
					<small class="tinycardcat" slot="category">{item.type}</small>
					<p slot="title">
						<a href="/notes/{item.counting}" target="_self">
							{item.title}
						</a>
					</p>
						<small style="font-size: 10px; color: #676767; text-transform: uppercase" slot="lang">
							{#if item.lang && item.lang.length > 0}
								{item.lang}
							{/if}
						</small>	
					<small style="font-size: 10px; color: #676767;" slot="tags">{item.tags}</small>
				</TinyCard5>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[6]}
		{#if ccss && ccss.length > 0}
			<div class="gridof6">
			{#each ccss as item, i}
				<TinyCard6 i={i}>
					<small class="tinycardcat" slot="category">{item.type}</small>
					<p slot="title">
						<a href="/notes/{item.counting}" target="_self">
							{item.title}
						</a>
					</p>
						<small style="font-size: 10px; color: #676767; text-transform: uppercase" slot="lang">
							{#if item.lang && item.lang.length > 0}
								{item.lang}
							{/if}
						</small>	
					<small style="font-size: 10px; color: #676767;" slot="tags">{item.tags}</small>
				</TinyCard6>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[7]}
		{#if docs && docs.length > 0}
			<div class="gridof6">
			{#each docs as item, i}
				<TinyCard7 i={i} delID=1>
					<small class="tinycardcat" slot="category">{item.meta.type}</small>
					<p slot="title">
						<a href="{item.path}" target="_self">
							{item.meta.title}
						</a>
					</p>
					<small style="font-size: 10px; color: #676767;" slot="tags">{item.meta.tags}</small>
				</TinyCard7>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[8]}
		{#if quills && quills.length > 0}
			<div class="gridof6">
			{#each quills as item, i}
				<div class="boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<p>
					<a href="/blog/{item.id}">
						{item.title}
					</a>
				</p>
				<small>{item.tags}</small>
				</div>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[9]}
		<div class="imagefilters">
		</div>
		{#if allimagesbool}
		{#if images && images.length > 0}
			<div class="gridof8">
			{#each images as item, i}
				<div id="imagebox" class="boxc" in:fly={{ duration: 100, delay: i * 10, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
					<img src="{item.link}" alt={item.id} on:click={() => toggleLightbox(i)} on:keydown={toggleFaux}/>
					{#if lightbox[i]}
						<div class="modallightbox" in:scale={{ delay: 50}} out:scale={{ duration: 50, delay: 0}} on:click={() => toggleLightbox(i)} on:keydown={toggleFaux}>
							<img src="{item.link}" alt={item.id}/>
						</div>
					{/if}
				</div>
			{/each}
			</div>
		{/if}		
		{:else}
		{#if taggedimages && taggedimages.length > 0}
			<div class="gridof8">
			{#each taggedimages as item, i}
				<div id="imagebox" class="boxc" in:fly={{ duration: 100, delay: i * 10, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
					<img src="{item.link}" alt={item.id} on:click={() => toggleLightbox(i)} on:keydown={toggleFaux}/>
					{#if lightbox[i]}
						<div class="modallightbox" in:scale={{ delay: 50}} out:scale={{ duration: 50, delay: 0}} on:click={() => toggleLightbox(i)} on:keydown={toggleFaux}>
							<img src="{item.link}" alt={item.id}/>
						</div>
					{/if}
				</div>
			{/each}
			</div>
		{/if}
		{/if}
	{/if}
</div>

<style lang="sass">

.dropdownitem
	text-align: center
	background: #171717
	width: 100%
	align-items: center
	justify-content: center
	border-bottom: 1px solid #272727
	text-transform: capitalize
	&:hover
		background: #10D56C

.pgcnt
	position: relative

.holder
	position: absolute
	width: auto
	display: flex
	flex-direction: column
	align-items: center
	top: 0px
	padding-top: 40px
	left: 0


.holder3
	position: absolute
	width: max-content
	display: flex
	flex-direction: column
	align-items: center
	top: 0
	padding-top: 40px
	right: 0


#imagebox
	position: relative

p
	margin: 4px 0
	text-transform: capitalize
	color: white
	font-weight: 400

.pagecontainer
	min-width: 100vw

.gridof6
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . . ."
		gap: 24px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr
		grid-template-areas: "."
		gap: 16px


.gridof8
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . . . . . ."
		gap: 16px 16px
		.boxc
			padding: 0
			transition: 0.35s ease
			&:hover
				padding: 0
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . ."
		gap: 8px 8px
		.boxc
			border: 1px solid #272727
			padding: 0px
			transition: 0.35s ease
			&:hover
				padding: 0

.boxc
	img
		object-fit: cover
		height: 100%
		width: 100%

#imagebox
	height: 144px
	@media screen and (max-width: 1023px)
		height: 88px

.modallightbox
	display: flex
	flex-direction: row
	justify-content: center
	align-items: center
	position: fixed
	backdrop-filter: blur(40px)
	top: 0
	padding-top: 128px
	padding-bottom: 128px
	left: 0
	z-index: 1000
	img
		object-fit: cover
		width: 70%
		height: 50%

</style>
```