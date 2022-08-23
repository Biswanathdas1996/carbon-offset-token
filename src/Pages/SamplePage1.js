import React from "react";
import "../styles/Checkout.css";
import ImgGif from "../assets/images/indigo.png";
import FlightIcon from "@mui/icons-material/Flight";
import Wiget from "../components/wiget/index";
import {
  buyNftFromWight,
  displayRazorpayForWiget,
} from "../functions/buyNftFromWiget";
import { _fetch } from "../CONTRACT-ABI/connect";
import CircularProgress from "@material-ui/core/CircularProgress";
import TransctionModal from "../components/shared/TransctionModal";

function Header({ itemCount }) {
  return (
    <header className="container" style={{ marginTop: 30 }}>
      <h1>Airline 1</h1>

      <span className="count">{itemCount} tickets selected</span>
    </header>
  );
}

function ProductList({ products, onChangeProductQuantity, onRemoveProduct }) {
  return (
    <section className="container">
      <ul className="products">
        {products.map((product, index) => {
          return (
            <li className="row" key={index}>
              <div className="col left">
                <div className="thumbnail">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="detail">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className="name" style={{ marginRight: 20 }}>
                      {product.from}
                    </div>
                    <FlightIcon style={{ marginRight: 20 }} />
                    <div className="name">{product.to}</div>
                  </div>

                  <div className="description">{product.description}</div>
                  <div className="price">{formatCurrency(product.price)}</div>
                </div>
              </div>

              <div className="col right">
                <div className="quantity">
                  <input
                    type="text"
                    className="quantity"
                    step="1"
                    value={product.quantity}
                    onChange={(event) => onChangeProductQuantity(index, event)}
                  />
                </div>

                <div className="remove">
                  <svg
                    onClick={() => onRemoveProduct(index)}
                    version="1.1"
                    className="close"
                    x="0px"
                    y="0px"
                    viewBox="0 0 60 60"
                    enableBackground="new 0 0 60 60"
                  >
                    <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
                  </svg>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Summary({
  subTotal,
  discount,
  tax,
  onEnterPromoCode,
  checkPromoCode,
  products,
  onScuccess,
}) {
  const [carbonOffsetAmount, setCarbonOffsetAmount] = React.useState(0);
  const [isDoingPayment, setIsDoingPayment] = React.useState(false);
  const [start, setStart] = React.useState(false);
  const [tokens, setToken] = React.useState([]);
  const [walletAddress, setWalletAddress] = React.useState(null);

  React.useEffect(() => {
    fetchAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAllPosts() {
    setToken([]);
    const getAllToken = await _fetch("getCollection");
    const mappedTokenData = [];
    await getAllToken.map(async (val) => {
      const getTokenListingState = await _fetch(
        "getTokenListingState",
        val?.token
      );
      const mappedData = { ...val, ...getTokenListingState };
      if (mappedData?.tokenState === "1") {
        mappedTokenData.push(mappedData);
        setToken(mappedTokenData);
      }
    });
  }

  const carbonOffSetAmountCallback = (amount, sendTo) => {
    setCarbonOffsetAmount(amount);
    setWalletAddress(sendTo);
  };

  const total = subTotal - discount + tax + carbonOffsetAmount;
  const productQty = products[0]?.quantity;

  const buynow = async (title) => {
    setIsDoingPayment(true);
    var pickedToken = tokens.slice(0, productQty);
    await displayRazorpayForWiget(
      total,
      async function (response) {
        setStart(true);
        let responseData;
        for (let i = 0; i < productQty; i++) {
          responseData = await buyNftFromWight(
            Number(pickedToken[i]?.token),
            walletAddress
          );

          console.log("Called instance:", responseData);
        }
        onScuccess();
        setStart(false);
      },
      title
    );
    setIsDoingPayment(false);
  };

  React.useEffect(() => {
    setCarbonOffsetAmount(0);
  }, [productQty]);

  const modalClose = () => {
    setStart(false);
  };
  return (
    <section className="container">
      {start && <TransctionModal response={null} modalClose={modalClose} />}
      <div className="promotion" style={{ marginBottom: 30 }}>
        {carbonOffsetAmount === 0 && (
          <Wiget
            productQty={productQty}
            carbonOffSetAmountCallback={carbonOffSetAmountCallback}
          />
        )}

        <br />
        {/* <label htmlFor="promo-code">Have A Promo Code?</label>
        <input type="text" onChange={onEnterPromoCode} placeholder="SUMMER" />
        <button
          type="button"
          onClick={checkPromoCode}
          style={{ borderRadius: 0 }}
        /> */}
      </div>

      <div className="summary">
        <ul>
          <li>
            Subtotal <span>{formatCurrency(subTotal)}</span>
          </li>

          {discount > 0 && (
            <li>
              Discount <span>{formatCurrency(discount)}</span>
            </li>
          )}
          <li>
            Tax <span>{formatCurrency(tax)}</span>
          </li>
          {carbonOffsetAmount > 0 && (
            <li style={{ color: "green" }}>
              Carbon offset cost
              <span>{formatCurrency(carbonOffsetAmount)}</span>
            </li>
          )}
          <li className="total">
            Total <span>{formatCurrency(total)}</span>
          </li>
        </ul>

        <div className="checkout" style={{ marginBottom: 30 }}>
          <button type="button" onClick={() => buynow("Carbon token")}>
            {isDoingPayment ? (
              <>
                <CircularProgress
                  size={20}
                  style={{ marginRight: 10 }}
                  color="white"
                />{" "}
                Please wait...
              </>
            ) : (
              <>Pay Now</>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

const PRODUCTS = [
  {
    image: ImgGif,
    name: "PRODUCT ITEM NUMBER 2",
    from: "Bangalore",
    to: "Kolkata",
    description: "Description for product item number 1",
    price: 100,
    quantity: 1,
  },
];
const PROMOTIONS = [
  {
    code: "SUMMER",
    discount: "50%",
  },
  {
    code: "AUTUMN",
    discount: "40%",
  },
  {
    code: "WINTER",
    discount: "30%",
  },
];
const TAX = 5;

export default function Page() {
  //   const CLONE_PRODUCTS = JSON.parse(JSON.stringify(PRODUCTS));
  const [products, setProducts] = React.useState([]);
  const [promoCode, setPromoCode] = React.useState("");
  const [discountPercent, setDiscountPercent] = React.useState(0);

  const itemCount = products.reduce((quantity, product) => {
    return quantity + +product.quantity;
  }, 0);
  const subTotal = products.reduce((total, product) => {
    return total + product.price * +product.quantity;
  }, 0);
  const discount = (subTotal * discountPercent) / 100;

  const onChangeProductQuantity = (index, event) => {
    const value = event.target.value;
    const valueInt = parseInt(value);
    const cloneProducts = [...products];

    // Minimum quantity is 1, maximum quantity is 100, can left blank to input easily
    if (value === "") {
      cloneProducts[index].quantity = value;
    } else if (valueInt > 0 && valueInt < 100) {
      cloneProducts[index].quantity = valueInt;
    }

    setProducts(cloneProducts);
  };

  const onRemoveProduct = (i) => {
    const filteredProduct = products.filter((product, index) => {
      return index != i;
    });

    setProducts(filteredProduct);
  };

  const onEnterPromoCode = (event) => {
    setPromoCode(event.target.value);
  };

  const checkPromoCode = () => {
    for (var i = 0; i < PROMOTIONS.length; i++) {
      if (promoCode === PROMOTIONS[i].code) {
        setDiscountPercent(parseFloat(PROMOTIONS[i].discount.replace("%", "")));

        return;
      }
    }

    alert("Sorry, the Promotional code you entered is not valid!");
  };

  const onScuccess = () => {
    setProducts([]);
    alert("Ticked confirmed successfully");
  };

  return (
    <div>
      <Header itemCount={itemCount} />

      {products.length > 0 ? (
        <div>
          <ProductList
            products={products}
            onChangeProductQuantity={onChangeProductQuantity}
            onRemoveProduct={onRemoveProduct}
          />

          <Summary
            products={products}
            subTotal={subTotal}
            discount={discount}
            tax={TAX}
            onEnterPromoCode={onEnterPromoCode}
            checkPromoCode={checkPromoCode}
            onScuccess={onScuccess}
          />
        </div>
      ) : (
        <div className="empty-product">
          <h3>There are no Ticket in your cart.</h3>
          <button
            onClick={() => setProducts(PRODUCTS)}
            style={{ marginBottom: 30 }}
          >
            Add Ticket
          </button>
        </div>
      )}
    </div>
  );
}

function formatCurrency(value) {
  return Number(value).toLocaleString("en-US", {
    style: "currency",
    currency: "INR",
  });
}
