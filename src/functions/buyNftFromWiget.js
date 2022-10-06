import { _fetch, _transction_signed } from "../CONTRACT-ABI/connect";
import { PaymentURI } from "../config";
import PwcLogo from "../assets/images/nft.png";

export const displayRazorpayForWiget = async (
  price,
  purchasetransction,
  title
) => {
  const itemCost = price;
  const payableAmount = price;
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

export const buyNftFromWight = async (tokenId, walletAddress) => {
  try {
    const owner = await _fetch("ownerOf", tokenId);
    const account = walletAddress;

    await _transction_signed("doTransfer", owner, account, Number(tokenId));
    const responseData2 = await _transction_signed(
      "setTokenListingState",
      Number(tokenId),
      "2"
    );

    return responseData2;
  } catch (error) {
    console.log("Error", error);
    return error;
  }
};
