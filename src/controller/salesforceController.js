const salesForceService = require("../service/salesForceService");
const sFService = require("../service/SFService");

const createSalesForce = async (req, res, next) => {
  const { userId, ...payload } = req.body;

  try {
    const hasUser = await sFService.getSFUserByUserId(userId);
    if (hasUser.length) {
      return res
        .status(409)
        .json({ message: "This user is already in SalesForce" });
    }
    const { accountId, contactId } = await salesForceService.createSalesForce(
      payload
    );
    const user = await sFService.createSFUser({ user: userId });
    res.status(201).json({
      message: "Salesforce Account and Contact created successfully!",
      accountId,
      contactId,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createSalesForce };
