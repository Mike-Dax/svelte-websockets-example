<script>
  import { onMount } from "svelte";
  import store from "./store.js";
  import Message from "./message.svelte";
  let message;
  let messages = [];

  onMount(() => {
    store.subscribe((currentMessage) => {
      messages = [...messages, currentMessage];
    });
  });

  function onSendMessage() {
    if (message.length > 0) {
      store.storeMessage(message);
      store.sendMessage(message);
      message = "";
    }
  }
</script>

<h1>Echo test</h1>

<input type="text" bind:value={message} />
<button on:click={onSendMessage}> Send Message </button>
{#each messages as message, i}
  <Message {message} direction={i % 2 == 0 ? "right" : "left"} />
{/each}
