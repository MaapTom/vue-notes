<script>
  import NoNotes from '../components/icons/NoNotes.vue';
  import LeftArrow from '../components/icons/LeftArrow.vue';

  export default {
    data() {
      return {}
    },
    components: {
      NoNotes,
      LeftArrow
    }
  }
</script>

<template>
  <div class="message">
    <NoNotes/>
    <h3>Opss.. Essa anotação não existe</h3>
    <a
      class="button-return"
      href="/"
    >
      <span>
        <LeftArrow/>
      </span>
        Voltar ao início
    </a>
  </div>
</template>

<style scoped>
  @import '..//assets/base.css';

  .message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 120px;

    animation: fade .2s forwards;
  }

  h3 {
    max-width: 160px;
    margin-top: 10px;

    text-align: center;
    font-size: 1.4rem;
    font-weight: normal;
    color: var(--color-text);
  }

  .button-return {
    display: flex;
    align-items: center;
    margin-top: 36px;

    padding: 8px 16px;
    border-radius: 20px;
    font-size: 1.5rem;
    font-weight: medium;
    color: var(--color-heading);
    background-color: var(--color-background-light);
    cursor: pointer;
    transition: all .3s;
  }

  .button-return span {
    display: flex;
    align-items: center;
    margin-right: 6px;

    transition: all .3s;
  }

  .button-return:hover span {
    margin-right: 10px;
  }
</style>