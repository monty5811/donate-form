# donate-form

<img src="/flowchart.png?raw=true" alt="flow chart">

This repo is an example of how to build a donation form with Stripe & Netlify.

* [DEMO](https://donate-form-example.netlify.com/)
* More info [here]()

There are two main components:

1. A super simple
   [form](https://github.com/monty5811/donate-form/blob/master/index.html) with
some JS to handle the redirect flow
2. A [netlify
   function](https://github.com/monty5811/donate-form/blob/master/netlify_functions/get_checkout_session.js) to talk to the Stripe API
