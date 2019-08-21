const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // get from ENV

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type"
};

exports.handler = function(event, context, callback) {
  // some error checking:
  if (event.httpMethod !== "POST" || !event.body) {
    callback(null, {
      statusCode: 400,
      headers,
      body: JSON.stringify({ status: "bad-payload" })
    });
  }
  //-- Parse the body contents into an object.
  const data = JSON.parse(event.body);

  //-- Make sure we have all required data. Otherwise, escape.
  if (!data.amount) {
    console.error("Required information is missing.");

    callback(null, {
      statusCode: 400,
      headers,
      body: JSON.stringify({ status: "missing-information" })
    });

    return;
  }
  // actually create the session with Stripe
  // we need to provide a couple of redirect urls:
  stripe.checkout.sessions.create(
    {
      success_url: "https://donate-form-example.netlify.com/success",
      cancel_url: "https://donate-form-example.netlify.com/cancel",
      payment_method_types: ["card"],
      billing_address_collection: "required",
      payment_method_types: ["card"],
      submit_type: "donate",
      line_items: [
        {
          name: "Donation!",
          amount: data.amount,
          currency: "usd",
          quantity: 1
        }
      ]
    },
    function(err, session) {
      // asynchronously called
      if (err !== null) {
        console.log(err);
        callback(null, {
          statusCode: 200,
          headers,
          body: JSON.stringify({ status: "session-create-failed" })
        });
      }
      // woohoo! it worked, send the session id back to the browser:
      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: "session-created",
          sessionId: session.id
        })
      });
    }
  );
};
