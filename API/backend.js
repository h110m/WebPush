var crypto = require("crypto");
const webpush = require("web-push");
const subscriptions = {};
const vapidKeys = {
  privateKey: "bdSiNzUhUP6piAxLH-tW88zfBlWWveIx0dAsDO66aVU",
  publicKey:
    "BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8",
};

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

module.exports.module = (req, res, next) => {
  if (req.path === "/sub" && req.method === "POST") {
    const subscriptionRequest = req.body;
    const susbscriptionId = crypto
      .createHash("md5")
      .update(Buffer.from(JSON.stringify(subscriptionRequest)))
      .digest("hex");
    subscriptions[susbscriptionId] = subscriptionRequest;
    res.status(201).json({ id: susbscriptionId });
  } else if (
    req.path.startsWith("/sub/") &&
    req.method === "GET" &&
    req.path.split("/").length === 3
  ) {
    const subscriptionId = req.path.split("/")[2];
    const pushSubscription = subscriptions[subscriptionId];
    if (!pushSubscription) {
      res.status(500).send("ERROR 505: Not a valid sub id!").end();
      return;
    }
    webpush
      .sendNotification(
        pushSubscription,
        JSON.stringify({
          title: "New Product Available ",
          text: "HEY! Take a look at this brand new t-shirt!",
          tag: "new-product",
          url: "discord://",
        })
      )
      .catch((err) => {
        console.log(err);
      });
    res.status(202).json({});
  } else {
    next();
  }
};
