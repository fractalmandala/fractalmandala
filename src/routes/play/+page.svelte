<script lang="ts">

  import { onMount, onDestroy } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
  import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'
	import Document from '@tiptap/extension-document'
	import Paragraph from '@tiptap/extension-paragraph'
	import Text from '@tiptap/extension-text'
	import Strike from '@tiptap/extension-strike'
	import Blockquote from '@tiptap/extension-blockquote'

  let element:any
  let editor:any

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
				Strike,
    		Document,
    		Paragraph,
    		Text,
				Blockquote
      ],
      content: '<p>Hello World! 🌍️ </p>',
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor
      },
    })
  })

  onDestroy(() => {
    if (editor) {
      editor.destroy()
    }
  })
</script>

<div class="rta-column rowgap200 minH zepad all single mob"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:dark={$themeMode}
	class:light={!$themeMode}
	>

{#if editor}
	<div class="rta-row colgap200">
  	<button
    	on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
    	class:active={editor.isActive('heading', { level: 1 })}
			class="secondbutton"
  		>
   		H1
  	</button>
  <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    class:active={editor.isActive('heading', { level: 2 })}
		class="secondbutton"
  	>
    H2
  </button>
  <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
    class:active={editor.isActive('heading', { level: 3 })}
		class="secondbutton"
  	>
    H3
  </button>
  <button on:click={() => editor.chain().focus().setParagraph().run()} 
		class:active={editor.isActive('paragraph')}
		class="secondbutton"
		>
    P
  </button>
	<button on:click={() => editor.chain().focus().toggleBold().run()} class="secondbutton">
	  <b>B</b>
	</button>
	</div>
{/if}

<div class="rta-column holding">
	<div bind:this={element} />
</div>

</div>

<style lang="sass">

.holding
	border: var(--bord)
	padding: 16px
	background: var(--contraster)
	border-radius: 6px

</style>