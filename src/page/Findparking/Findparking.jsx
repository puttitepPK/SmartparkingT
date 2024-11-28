import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FaSearch, FaHistory, FaUser, FaParking } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import parkingData from "../../data/parkingData";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./Findparking.css";

function Findparking({}) {
  const location = useLocation();
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // วันที่ที่เลือก
  // const [filteredParking, setFilteredParking] = useState(parkingData);
  const [filteredParking, setFilteredParking] = useState([]);
  const [calculatedStatus, setCalculatedStatus] = useState({}); // เก็บสถานะปุ่มแต่ละอัน

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7); // วันที่อนุญาตให้เลือกได้ 7 วันล่วงหน้า

  const formatDate = (date) => date.toISOString().split("T")[0];

  // กรองข้อมูลเมื่อเลือกตัวเลือก
  useEffect(() => {
    const filtered = parkingData.filter(
      (item) =>
        (!selectedBuilding || item.building === selectedBuilding) &&
        (!selectedFloor || item.floor === selectedFloor) &&
        (!startTime || item.time === `${startTime}-${endTime}`)
    );
    setFilteredParking(filtered);
  }, [selectedBuilding, selectedFloor, startTime, endTime]);
  

  //ของเก่าอาจจะจำเป็นตอนรีเซ็ทค่า

  // ฟังก์ชันอัปเดตจำนวนช่องจอดรถ
  // const updateParkingStatus = (id) => {
  //   const updatedParking = filteredParking.map((item) => {
  //     if (item.id === id) {
  //       const [current, total] = item.slots.split("/").map(Number); // แยกจำนวนช่องจอดและช่องจอดรวม
  //       if (current < total) {
  //         // ถ้ายังจอดไม่เต็ม
  //         return {
  //           ...item,
  //           slots: `${current + 1}/${total}`,
  //           status: current + 1 === total ? "ไม่ว่าง" : "ว่าง", // เปลี่ยนสถานะถ้าจอดเต็ม
  //         };
  //       }
  //     }
  //     return item;
  //   });
  //   setFilteredParking(updatedParking);
  // };

  // // ฟังก์ชันลดจำนวนช่องจอด
  // const decrementSlots = (id) => {
  //   const updatedParking = filteredParking.map((item) => {
  //     if (item.id === id) {
  //       const [current, total] = item.slots.split("/").map(Number);
  //       if (current > 0) {
  //         return {
  //           ...item,
  //           slots: `${current - 1}/${total}`,
  //           status: "ว่าง", // เปลี่ยนสถานะกลับเป็นว่าง
  //         };
  //       }
  //     }
  //     return item;
  //   });
  //   setFilteredParking(updatedParking);
  // };

  // //ฟังก์ชันอัปเดตสถานะกดแล้วเต็มที่จอด
  // const updateParkingStatus = (id) => {
  //   const updatedParking = filteredParking.map((item) => {
  //     if (item.id === id) {
  //       const [current, total] = item.slots.split("/").map(Number);
  //       if (current < total) {
  //         return {
  //           ...item,
  //           slots: `${current + 1}/${total}`,
  //           status: current + 1 === total ? "ไม่ว่าง" : "ว่าง",
  //         };
  //       }
  //     }
  //     return item;
  //   });
  //   setFilteredParking(updatedParking);
  // };

  // //ลดจำนวนช่องว่างที่จอดรถ
  // const decrementSlots = (id) => {
  //   const updatedParking = filteredParking.map((item) => {
  //     if (item.id === id) {
  //       const [current, total] = item.slots.split("/").map(Number);
  //       if (current > 0) {
  //         return {
  //           ...item,
  //           slots: `${current - 1}/${total}`,
  //           status: "ว่าง",
  //         };
  //       }
  //     }
  //     return item;
  //   });
  //   setFilteredParking(updatedParking);
  // };

  // ฟังก์ชันสุ่มโอกาสว่างเป็น %
  const calculateAvailability = (id) => {
    const randomPercent = Math.floor(Math.random() * 100) + 1; // สุ่มเปอร์เซ็นต์ 1-100
    const dateKey = selectedDate; // วันที่ถูกล็อกหรือเลือกไว้แล้ว

    setCalculatedStatus((prevStatus) => ({
      ...prevStatus,
      [dateKey]: {
        ...prevStatus[dateKey],
        [id]: randomPercent, // บันทึกเปอร์เซ็นต์สำหรับ id และวันที่
      },
    }));
  };

  // ฟังก์ชันรีเซ็ตค่า
  const resetFilters = () => {
    setSelectedBuilding(null);
    setSelectedFloor(null);
  };

  return (
    <div style={{ minHeight: "100%" }}>
      <div className="box2">
        <img
          src="./Metthier Master Logo.png"
          alt="My Logo"
          className="Logo2-image"
        />
      </div>

      <div className="main-content3">
        <h2 className="text-center">
          ค้นหาลานจอดรถ <FaSearch className="iconPark" size={31} />
        </h2>
        <div className="boxback">
          <div className="photoparking">
            <img src="parking.png" alt="" className="parking" />
          </div>
          <div className="dropdown">
            {/* Dropdown วันที่ */}
            <div className="search-section">
              <input
                type="date"
                className="form-control custom-date-picker"
                placeholder="วันที่"
                min={formatDate(today)}
                max={formatDate(maxDate)}
                value={selectedDate || ""}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            {/* Dropdown เวลา */}
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownTime"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ width: "135px", marginRight: "4px" }}
            >
              {/* แสดงไอคอนนาฬิกาก่อนเลือกเวลา */}
              {!startTime && !endTime && (
                <i
                  className="bi bi-clock"
                  style={{ marginRight: "10px", color: "#2e2e2e" }}
                ></i>
              )}
              {/* แสดงช่วงเวลาหลังเลือก */}
              {startTime && endTime ? `${startTime} - ${endTime}` : "เวลา"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownTime">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setStartTime(null);
                    setEndTime(null);
                  }}
                >
                  เวลา
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setStartTime("09:00");
                    setEndTime("12:00 น.");
                  }}
                >
                  09:00 - 12:00 น.
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setStartTime("12:01");
                    setEndTime("15:00 น.");
                  }}
                >
                  12:01 - 15:00 น.
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setStartTime("15:01");
                    setEndTime("18:00 น.");
                  }}
                >
                  15:01 - 18:00 น.
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setStartTime("18:01");
                    setEndTime("00:00 น.");
                  }}
                >
                  18:01 - 00:00 น.
                </button>
              </li>
            </ul>
          </div>

          {/*กล่องล่าง */}
          <div className="dropdown2">
            <button
              className="btn btn-light dropdown-toggle "
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ marginRight: "20px", marginLeft: "4px", width: "150px" }}
            >
              <i
                className="bi bi-building"
                style={{ marginRight: "10px", color: "#2e2e2e" }}
              ></i>{" "}
              {/* ไอคอน */}
              {selectedBuilding || "อาคาร"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedBuilding(null)}
                >
                  อาคาร
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedBuilding("อาคาร A")}
                >
                  อาคาร A
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedBuilding("อาคาร B")}
                >
                  อาคาร B
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedBuilding("อาคาร C")}
                >
                  อาคาร C
                </button>
              </li>
            </ul>

            {/* Dropdown ชั้น */}
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownFloor"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ marginRight: "4px", width: "150px" }}
            >
              <i
                className="bi bi-p-square"
                style={{ marginRight: "8px", color: "#2e2e2e", marginTop:"2px" }}
              ></i>
              {selectedFloor || "เลือกลาน"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownFloor">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedFloor(null)}
                >
                  เลือกลาน
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedFloor("ลาน 1")}
                >
                  ลาน 1
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedFloor("ลาน 2")}
                >
                  ลาน 2
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedFloor("ลาน 3")}
                >
                  ลาน 3
                </button>
              </li>
            </ul>
          </div>

          {/* แสดงรายการลานจอดรถ */}
          <div className="parking-list">
            {filteredParking.map((item) => (
              <div key={item.id} className="parking-item">
                <img
                  src={item.image}
                  alt={item.building}
                  className="parking-image"
                />
                <div className="parking-info">
                  <h5>{item.building}</h5>
                  <p>{item.floor}</p>
                  <p>
                    โอกาสที่จะว่าง :{" "}
                    {calculatedStatus[selectedDate] &&
                    calculatedStatus[selectedDate][item.id] !== undefined
                      ? `${calculatedStatus[selectedDate][item.id]}%`
                      : "--%"}
                  </p>
                  <p>เวลา : {item.time}</p>
                </div>
                <div className="boxstatus2">
                  <button
                    className="boxstatus"
                    onClick={() => calculateAvailability(item.id)} // เรียกฟังก์ชันคำนวณ
                    disabled={
                      calculatedStatus[selectedDate] && calculatedStatus[selectedDate][item.id] !== undefined
                    }
                  >
                    {calculatedStatus[selectedDate] && calculatedStatus[selectedDate][item.id] !== undefined
                      ? "คำนวณแล้ว"
                      : "คำนวณที่ว่าง"}
                  </button>
                  {/* <button
                    className="btn-decrement"
                    onClick={() => decrementSlots(item.id)} // กดเพื่อลดจำนวน
                    disabled={item.slots.split("/")[0] === "0"} // ปิดการลดถ้าจอด 0
                  ></button>
                  <button
                    className={`boxstatus ${
                      item.status === "ว่าง"
                        ? "status-available"
                        : "status-occupied"
                    }`}
                    onClick={() => updateParkingStatus(item.id)} // อัปเดตจำนวนช่องจอด
                    disabled={item.status === "ไม่ว่าง"} // ปิดปุ่มถ้าจอดเต็ม
                  >
                    {item.status}
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navber */}
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
                    location.pathname === "/profile" ? "active" : ""
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
  );
}

export default Findparking;
