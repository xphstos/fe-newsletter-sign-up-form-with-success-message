<script>
  import {isSubmitted, email} from "../store/store.ts"

  const toggleIsSubmitted = () => isSubmitted.update(v => !v);
</script>

<article class="form">
  <img src="/icon-success.svg" alt="" role="presentation">
  <header>
    <h1>Thanks for subscribing!</h1>
    <p>A confirmation email has been sent to <strong>{$email}</strong>. 
      Please open it and click the button inside to confirm your subscription.</p>
    </header>
    <button on:click={toggleIsSubmitted}>
      Dismiss message
    </button>
</article>

  <style scoped>
    article {
      background: #fff;
      padding: fluid(1.5rem, 4rem);
      border-radius: switch(0rem, 2.25rem);
      margin-inline: auto;
      block-size: 100svh;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    
    @media (width > 880px) {
      article {
        inline-size: min(32rem, 100%);
        block-size: auto;
        align-items: space-between;
      }

      img {
        margin-block-start: unset;
      }

      header {
        flex: auto;
      }
    }

    img {
      margin-block-start:  auto;
    }

    header {
      flex: 1;
    }

    h1 {
      margin-inline: 0;
      margin-block: 2.5rem 1rem;
      line-height: 1;
      font-size: fluid(2.5rem, 3.5rem);
    }

    p {
      margin-block: 1.5rem;
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
       border-radius: .5rem;
       margin-block-start: 1.5rem;
       width: 100%;
       cursor: pointer;
       color: var(--white);
       position: relative;
       isolation: isolate;
       transition: all .15s ease-in;
      }

      button:focus,
    button:focus-visible {
      outline: transparent;
    }

      button::before,
      button::after {
         content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: var(--gradient);
        pointer-events: none;
        transition: transform .35s ease-in-out, opacity .35s ease-in-out;
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
        opacity: .4;
        transform: translateY(1rem)
      }
      
      button:disabled {
      color: var(--grey);
      background-color: hsl(0deg 0% 90%);
    }

    button:disabled::after,
    button:disabled::before {
      content: none;
    }
  </style>