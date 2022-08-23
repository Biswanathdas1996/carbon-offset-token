import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import imgEquation from "../../assets/images/equation.gif";
import CardMedia from "@mui/material/CardMedia";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function formatCurrency(value) {
  return Number(value).toLocaleString("en-US", {
    style: "currency",
    currency: "INR",
  });
}

const VendorSchema = Yup.object().shape({
  sendTo: Yup.string().required("Send address is required"),
});

export default function BasicCard({ productQty, carbonOffSetAmountCallback }) {
  const totalAmount = formatCurrency(productQty * 10);
  const tokenQty = productQty;

  const onClickHandler = ({ sendTo }) =>
    carbonOffSetAmountCallback(Number(productQty * 10), sendTo);

  return (
    <Card variant="outlined" style={{ padding: 10 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Your carbon footprint will increase by <b>{tokenQty} metric ton </b>{" "}
          due to this journey
        </Typography>

        <CardMedia
          component="img"
          height="194"
          width="100"
          image={imgEquation}
          alt="Paella dish"
        />
        <Typography
          sx={{ fontSize: 20, marginTop: 2 }}
          color="text.secondary"
          gutterBottom
        >
          Qty:{" "}
          <span>
            {tokenQty} <small style={{ fontSize: 12 }}>(₹10 / token)</small>
          </span>
        </Typography>
        <Typography
          sx={{ fontSize: 20, fontWeight: "bold", marginTop: 1 }}
          color="text.secondary"
          gutterBottom
        >
          Total: <span>{totalAmount}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Formik
          initialValues={{
            sendTo: "",
          }}
          validationSchema={VendorSchema}
          onSubmit={(values, { setSubmitting }) => {
            onClickHandler(values);
            setSubmitting(false);
          }}
        >
          {({ touched, errors, isSubmitting, values }) => (
            <Form>
              <div className="form-group" style={{ float: "left" }}>
                <Field
                  type="text"
                  name="sendTo"
                  autoComplete="flase"
                  placeholder="Wallet address"
                  className={`form-control text-muted ${
                    touched?.sendTo && errors?.sendTo ? "is-invalid" : ""
                  }`}
                  style={{ padding: 10 }}
                />
              </div>

              <div
                className="form-group"
                style={{ float: "right", marginLeft: 10 }}
              >
                <span className="input-group-btn">
                  <input
                    className="btn btn-default btn-secondary"
                    type="submit"
                    value={"Add"}
                    style={{ padding: 10, width: 100 }}
                  />
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </CardActions>
    </Card>
  );
}
