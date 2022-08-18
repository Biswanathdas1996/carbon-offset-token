import { _fetch, _account, _transction_signed } from "../CONTRACT-ABI/connect";
import { convertWeiToToken } from "../utils/convertPrice";
import { PaymentURI } from "../config";
import PwcLogo from "../assets/images/nft.png";

export const displayRazorpay = async (price, purchasetransction, title) => {
  const itemCost = convertWeiToToken(price);
  const payableAmount = itemCost;
  const data = await fetch(`${PaymentURI}?price=${payableAmount}`, {
    method: "POST",
  })
    .then((t) => t.json())
    .catch((err) => console.error(err));
  const options = {
    currency: data.currency,
    amount: data.amount,
    name: `Buy ${title}`,
    description: `${itemCost} INR`,
    image: PwcLogo,
    order_id: data.id,
    handler: purchasetransction,
    prefill: {
      name: "Biswanath Das",
      email: "Biswanath@gmail.com",
      contact: "9999999999",
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

export const buyNft = async (tokenId) => {
  try {
    const owner = await _fetch("ownerOf", tokenId);
    const account = await _account();

    const responseData = await _transction_signed(
      "doTransfer",
      owner,
      account,
      Number(tokenId)
    );
    await _transction_signed("setTokenListingState", Number(tokenId), "2");

    return responseData;
  } catch (error) {
    console.log("Error", error);
    return error;
  }
};
