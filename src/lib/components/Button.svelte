<script>
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  /** @type {{children?: import('svelte').Snippet}} */
  let { children } = $props();
</script>

<button
  class="bg-orange-500 text-white rounded-full border-2 drop-shadow-md
    active:drop-shadow-none duration-100
    hover:bg-orange-400"
  onclick={bubble('click')}
>
  {@render children?.()}
</button>
