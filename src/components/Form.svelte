<script>
  import { isSubmitted, email, formErrors } from "../store/store.ts";
  import { emailSchema } from "../schemas/emailScema.ts";
  import Success from "./Success.svelte";

  const validateForm = (isSubmit = true) => {
    const result = emailSchema.safeParse({ email: $email });

    if (result.success) {
      if (isSubmit) {
        isSubmitted.update((v) => !v);
      }
      formErrors.set({});
    } else {
      let errors = {};
      result.error.errors.forEach((error) => {
        errors[error.path[0]] = error.message;
      });
      formErrors.set(errors);
    }
  };
</script>

{#if $isSubmitted}
  <Success />
{:else}
  <article>
    <figure>
      <picture aria-hidden="true">
        <source
          srcset="/illustration-sign-up-mobile.svg"
          width="375"
          height="284"
          media="(max-width: 880px)"
        />
        <img
          src="/illustration-sign-up-desktop.svg"
          width="400"
          height="593"
          alt=""
        />
      </picture>
    </figure>
    <header>
      <h1>Stay updated!</h1>
      <p>Join 60,000+ product managers receiving monthly updates on:</p>
      <ul role="list">
        <li>
          <img
            src="/icon-list.svg"
            width="20"
            height="20"
            alt=""
            role="presentation"
          /> Product discovery and building what matters
        </li>
        <li>
          <img
            src="/icon-list.svg"
            width="20"
            height="20"
            alt=""
            role="presentation"
          /> Measuring to ensure updates are a success
        </li>
        <li>
          <img
            src="/icon-list.svg"
            width="20"
            height="20"
            alt=""
            role="presentation"
          /> And much more!
        </li>
      </ul>
      <form on:submit|preventDefault={validateForm}>
        <label for="email">
          <span>Email address</span>
          {#if $formErrors.email}<em>{$formErrors.email}</em>{/if}
        </label>
        <input
          on:input={() => validateForm(false)}
          type="text"
          id="email"
          name="email"
          autocomplete="email"
          placeholder="email@company.com"
          bind:value={$email}
          aria-invalid={!!$formErrors.email}
        />
        <button type="submit" disabled={!$email || !!$formErrors.email}>
          Subscribe to monthly newsletter
        </button>
      </form>
    </header>
  </article>
{/if}

<style scoped>
  article {
    background: #fff;
    inline-size: min(58rem, 100%);
    padding: switch(0rem, 1.5rem);
    border-radius: switch(0rem, 2.25rem);
    block-size: 100svh;
  }

  h1 {
    margin: 0;
    line-height: 1;
    font-size: fluid(2.5rem, 3.5rem);
  }
  p {
    margin-block: 1.5rem;
  }

  ul {
    margin-block: 1.5rem;
    margin-inline: 0;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  li + li {
    margin-block-start: 0.5rem;
  }

  li img {
    width: 1.25rem;
    height: 1.25rem;
  }

  header {
    padding: 2rem 1.5rem;
  }

  figure img {
    width: 100%;
  }

  form {
    margin-block-start: 2.5rem;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1em;
    font-size: 0.75rem;
    font-weight: bold;
    margin-block-end: 0.5rem;
  }

  label em {
    font-style: normal;
    color: var(--tomato);
  }

  input {
    min-block-size: 3.5rem;
    background-color: var(--white);
    padding: 1rem 1.5rem;
    border: 1px solid var(--grey);
    border-radius: 0.5rem;
    font-size: inherit;
    min-inline-size: 0;
    inline-size: 100%;
    transition: border-color 0.15s ease-in;
  }

  input[aria-invalid="true"] {
    border-color: var(--tomato);
    background-color: hsl(4deg 100% 67% / 0.2);
    color: var(--tomato);
  }

  input:focus-visible {
    outline: transparent;
  }

  input:not([aria-invalid="true"]):focus-visible,
  input:not([aria-invalid="true"]):hover {
    border-color: currentColor;
  }

  input::placeholder {
    color: var(--grey);
  }

  button {
    min-block-size: 3.5rem;
    font-size: inherit;
    font-family: inherit;
    font-weight: bold;
    background-color: var(--dark-slate-grey);
    padding: 1rem 1.5rem;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    margin-block-start: 1.5rem;
    width: 100%;
    cursor: pointer;
    color: var(--white);
    position: relative;
    isolation: isolate;
    transition: all 0.15s ease-in;
  }

  button:focus,
  button:focus-visible {
    outline: transparent;
  }

  button::before,
  button::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--gradient);
    pointer-events: none;
    transition:
      transform 0.35s ease-in-out,
      opacity 0.35s ease-in-out;
    opacity: 0;
  }

  button::before {
    z-index: -1;
  }

  button::after {
    z-index: -2;
    filter: blur(1rem);
    transform: translateY(0rem);
  }

  button:focus-visible::before,
  button:hover::before {
    opacity: 1;
  }
  button:focus-visible::after,
  button:hover::after {
    opacity: 0.4;
    transform: translateY(1rem);
  }

  button:disabled {
    color: var(--grey);
    background-color: hsl(0deg 0% 90%);
  }

  button:disabled::after,
  button:disabled::before {
    content: none;
  }

  @media (width > 880px) {
    figure {
      order: 1;
    }

    article {
      block-size: auto;
      display: grid;
      place-items: center;
      gap: 2.5rem;
      grid-template-columns: 26.5rem auto;
    }
  }
</style>
