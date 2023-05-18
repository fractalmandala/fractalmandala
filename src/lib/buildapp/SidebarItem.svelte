<script lang="ts">
  import { getContext } from 'svelte';
  import { page as page$ } from '$app/stores';
  import { goto } from '$app/navigation';

  import { truncateString } from '$lib/buildapp/sharedutils';
  import { banners$, chatList$, chats$ } from '$lib/buildapp/stores';
  import { BANNER_TYPE, ERROR, LOCAL_STORAGE_KEY } from '$lib/buildapp/types';

  let { handleCloseMobileSidebar } = getContext('sidebar') as any;

  export let chatId:any;
  export let title:any;

  let isEditing = false;
  let isHovering = false;
  let titleInput = title;

  /**
   * Hover
   */
  const handleMouseEnter = () => {
    isHovering = true;
  };

  const handleMouseLeave = () => {
    isHovering = false;
  };

  /**
   * Title edits
   */
  const handleTitleEditClick = () => {
    isEditing = true;
  };

  const handleCancelTitleEditClick = () => {
    isEditing = false;
  };
  const handleSaveTitleEditClick = () => {
    chatList$.update((chatList) => {
      chatList = chatList.map((chat) => {
        if (chat.chatId === chatId) {
          chat.title = titleInput;
        }
        return chat;
      });
      return chatList;
    });
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY.CHAT_LIST, JSON.stringify($chatList$));
    } catch (e: any) {
      banners$.update((banners) => {
        banners.push({
          id: ERROR.LOCAL_STORAGE_SET_ITEM,
          bannerType: BANNER_TYPE.ERROR,
          title: 'Access to browser storage failed',
          description: e?.message || e?.name || ''
        });
        return banners;
      });
    }
    isEditing = false;
  };

  /**
   * Delete chat
   */
  const handleDeleteChat = (chatId: string) => {
    chatList$.update((chatList) => {
      chatList = chatList.filter((chat) => chat.chatId !== chatId);
      return chatList;
    });
    chats$.update((chats) => {
      delete chats[chatId];
      return chats;
    });

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY.CHAT_LIST, JSON.stringify($chatList$));
      localStorage.removeItem(chatId);
    } catch (e: any) {
      banners$.update((banners) => {
        banners.push({
          id: ERROR.LOCAL_STORAGE_SET_ITEM,
          bannerType: BANNER_TYPE.ERROR,
          title: 'Access to browser storage failed',
          description: e?.message || e?.name || ''
        });
        return banners;
      });
    }

    if ($page$.params?.chatId === chatId) {
      goto('/');
    }
  };
</script>

<button
  on:click={(e) => {
    if (isEditing) {
      return;
    }

    goto(`/chat/${chatId}`);
    handleCloseMobileSidebar();
  }}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  type="button"
  class={`relative w-full text-gray-300 hover:bg-gray-700 group flex items-center px-2 py-3 text-sm font-medium rounded-md ${
    chatId === $page$?.params?.chatId ? ` bg-gray-600` : ''
  }`}
>
  <!-- Title  -->
  <div class="flex flex-1 justify-start items-center flex-nowrap">
   
    {#if isEditing}
      <input
        bind:value={titleInput}
        on:click={(e) => e.stopPropagation()}
        type="text"
        name="title"
        class="block w-full mr-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    {:else}
      <span
        class="text-left overflow-hidden whitespace-nowrap"
        {title}
      >
        {truncateString(title)}
      </span>
    {/if}
  </div>

  <!-- Actions -->
  {#if isEditing}
    <div class="flex gap-2">
      <button on:click={() => handleSaveTitleEditClick()}>
        
      </button>
      <button on:click={() => handleCancelTitleEditClick()}>
        
      </button>
    </div>
  {:else if isHovering}
    <div class="flex gap-2">
      <button on:click={() => handleTitleEditClick()}>
     
      </button>
      <button on:click={() => handleDeleteChat(chatId)}>
        
      </button>
    </div>
  {/if}
</button>
