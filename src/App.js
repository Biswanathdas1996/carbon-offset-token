import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import Routes from "./Routes";
import "fontsource-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { getIcon } from "./utils/currencyIcon";
import { currentNeteork } from "./utils/currentNeteork";
import { getcurrentNetworkId } from "./CONTRACT-ABI/connect";
import { useLocation } from "react-router-dom";
import { fetchConfigData, getConfigData } from "./getConfigaration";

const App = () => {
  const [icon, setIcon] = useState(null);
  const [symbol, setSymbol] = useState(null);
  const [accessable, setAccessable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeNetwork, setActiveNetwork] = useState(null);

  const location = useLocation();

  window?.ethereum?.on("chainChanged", async (chainId) => {
    const networkId = await getcurrentNetworkId();
    sessionStorage.setItem("currentyNetwork", networkId);
    getCurrencyInfo();
    window.location.reload(true);
  });

  window?.ethereum?.on("accountsChanged", (accounts) => {
    window.location.reload(true);
  });

  useEffect(() => {
    getCurrencyInfo();
  }, []);

  const getCurrencyInfo = async () => {
    setLoading(true);
    await fetchConfigData();
    const currentNetworkId = await getcurrentNetworkId();
    const configData = getConfigData();
    setActiveNetwork(configData?.network_name);
    if (currentNetworkId.toString() !== configData?.network_id.toString()) {
      setAccessable(false);
    } else {
      setAccessable(true);
    }
    setIcon(getIcon());
    setSymbol(currentNeteork());
    setLoading(false);
  };

  // -------------------------------------- Razorpay start

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });
  // -------------------------------------- Razorpay end

  const navBarLessRoutes = ["/", "/sample-1", "/sample-2", "/widget"];
  const footerLessRoutes = ["/widget"];
  return (
    <>
      <CssBaseline />
      {navBarLessRoutes.indexOf(location.pathname) === -1 && (
        <Header icon={icon} symbol={symbol} />
      )}
      {accessable ? (
        <Routes />
      ) : (
        <>
          {!loading ? (
            <h2 style={{ textAlign: "center", margin: "12.5rem" }}>
              Please change the blockchain network to{" "}
              <b>{activeNetwork?.toUpperCase()}</b>
            </h2>
          ) : (
            <div
              style={{ textAlign: "center", margin: "12.5rem" }}
              className="loader_background"
            >
              <h1 className="loader_ui">Loading configurations...</h1>
            </div>
          )}
        </>
      )}
      {footerLessRoutes.indexOf(location.pathname) === -1 && <Footer />}
    </>
  );
};

export default App;
