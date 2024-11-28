//Home.jsx
import React from "react";
import { Nav, Button } from "react-bootstrap";
import { FaSearch, FaHistory, FaUser } from "react-icons/fa"; // นำเข้าไอคอนที่ต้องการ
import { useLocation, useNavigate, Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { faBuildingCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

import logo from "/public/Metthier Master Logo.png"; //ใส่โลโก้ซ้อนลิ้ง
import promptpay from "/public/prompt-pay-logo.png"; //ใส่โลโก้ซ้อนลิ้ง
import true1 from "/public/true.png"; //ใส่โลโก้ซ้อนลิ้ง
import cash from "/public/Cash-PNG-Photo.png"; //ใส่โลโก้ซ้อนลิ้ง

import Undo from "/Undo.png";
import "./Payment.css";

function Payment({}) {
  const location = useLocation(); // ใช้ location เพื่อตรวจสอบเส้นทางปัจจุบัน
  const navigate = useNavigate(); // สร้าง navigate สำหรับเปลี่ยนหน้า

  // ฟังก์ชัน handleProfileClick เพื่อนำกลับไปหน้า Profile
  const handleProfileClick = () => {
    if (location.pathname === "/profile/payment") {
      navigate("/profile"); // ถ้าอยู่ที่ Payment จะพาไปหน้า Profile
    } else {
      navigate("/profile/payment"); // ถ้าไม่ได้อยู่ที่ Payment ให้ไปหน้า Payment
    }
  };

  return (
    <div style={{ minHeight: "100%" }}>
      <div>
        <div className="box3">
          <img src={logo} alt="My Logo1" className="Logo3-image" />
        </div>
      </div>

      <div className="main-content">
        {/*ใบเสร็จ */}
        <div className="receipt-container">
          <div className="receipt-header">
            <p>อาคารที่เข้าจอด : อาคาร A ชั้น 1 ลาน A3</p>
          </div>

          <div className="receipt-details">
            <p className="headpay">ใบเสร็จชำระเงิน</p>
            <p>
              ค่าบริการ : <span>40 บาท</span>
            </p>
            <p>
              ค่าปรับ : <span>0 บาท</span>
            </p>
            <p>
              ค่าส่วนลด : <span>0 บาท</span>
            </p>

            <div className="boxtotal">
              <p className="total">
                ยอดชำระทั้งหมด : <span>40 บาท</span>
              </p>
            </div>

            <p>
              สถานที่จอดรถ : <span>อาคาร A ชั้น 1 ลาน A3</span>
            </p>
            <p>
              เลขที่บัตร : <span>79456</span>
            </p>
            <p>
              วันที่/เวลาเข้า : <span>11/09/2024</span>
            </p>
            <p>
              วันที่/เวลาปัจจุบัน : <span>11/09/2024</span>
            </p>
            <p>
              จำนวนชั่วโมง : <span>ตลอดวัน</span>
            </p>
          </div>

          <div className="payment-methods">
            <h2>วิธีการชำระเงิน</h2>
            <Link to="/profile/payment/promptpay" className="link-no-underline">
              <button className="payment-btn promptpay">
                <img src={promptpay} alt="Logo1" className="btn-logo" />{" "}
                PromptPay
              </button>
            </Link>
            <Link to="/profile/payment/true" className="link-no-underline">
              <button className="payment-btn truemoney">
                <img src={true1} alt="Logo1" className="btn-logo" /> TrueMoney
              </button>
            </Link>
          </div>
        </div>

        <div className="form-buttonsP">
          <Button className="btn2" onClick={() => navigate(-1)}>
            <img src={Undo} alt="Back Icon" className="icon33" />
            ย้อนกลับ
          </Button>
        </div>

        <div className="boxnav1">
          <div className="boxnav">
            <div className="bottom-navbar">
              <Nav className="justify-content-around">
                <Nav.Item>
                  <Link
                    to="/home"
                    className={`nav-item home-link ${
                      location.pathname === "/home/ScanQRCode" ? "active" : ""
                    }`}
                  >
                    <IoHome className="icon" size={31} />
                    <span> หน้าแรก</span>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    to="/findparking"
                    className={`nav-item findparking-link ${
                      location.pathname === "/findparking" ? "active" : ""
                    }`}
                  >
                    <FaSearch className="icon" size={31} />
                    <span> ค้นหาลานจอด</span>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    to="/record"
                    className={`nav-item record-link ${
                      location.pathname === "/record" ? "active" : ""
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faBuildingCircleCheck}
                      className="icon"
                      style={{ fontSize: "31px" }}
                    />
                    <span> ประวัติการจอด</span>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    to="/profile"
                    className={`nav-item profile-link ${
                      location.pathname === "/profile/payment"
                        ? "active"
                        : ""
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faAddressCard}
                      className="icon"
                      style={{ fontSize: "31px" }}
                    />
                    <span> ข้อมูลส่วนตัว</span>
                  </Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
