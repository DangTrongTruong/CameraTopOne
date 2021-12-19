import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import { Country } from "country-state-city";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../slice/cartSlice";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state:any) => state.cartStore);
  const [address, setAddress] = useState(shippingInfo.address||"");
  const [email,setEmail] = useState(shippingInfo.email||"");
  const [city, setCity] = useState(shippingInfo.city||"");
  const [country, setCountry] = useState(shippingInfo.country||"");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo||"");

  const shippingSubmit = (e:React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (phoneNo.length <= 9 || phoneNo.length >= 12) {
      toast("Số điện thoại không nhỏ hơn 10 hoặc không lớn hơn 11 ký tự");
      return;
    }
    dispatch(saveShippingInfo({ address, city, country, phoneNo ,email}));
    navigate("/order/confirm");
  };
  return (
    <Fragment>
      <MetaData title="Shipping Details" />

      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Địa chỉ"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="Thành phố"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <MailOutlineIcon/>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Số điện thoại"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Quốc gia</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <input type="submit" value="Continue" className="shippingBtn" />
          </form>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Shipping;
