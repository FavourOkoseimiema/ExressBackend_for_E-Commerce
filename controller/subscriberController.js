import Subscriber from "../models/Subscriber.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }

    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({
        message: "Email already subscribed.",
      });
    }

    const subscriber = await Subscriber.create({
      email,
    });

    res.status(201).json({
      message: "Subscription successful.",
      subscriber,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};