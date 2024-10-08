import "./LandingPage.css";
import people from "./image/people.jpg";
import timemanage from "./image/timemanage.jpg";
import team1 from "./image/team1.jpg";
import dash from "./image/dash.jpg";
import team2 from "./image/team2.png";
import teamimage from "./image/teamimage.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { useState } from "react";
import { Button, Modal } from "antd";
import collaborative3 from "./image/collaborative3.png";
import background from "./image/background.jpg";
import partners from "./image/partners.png";
import { Link } from "react-router-dom";
import SwiperCore, { Navigation, Pagination } from "swiper";

// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const slider = [
  {
    description:
      ' "SCHEDULING" involves planning and allocating time for specific activities, ensuring a balanced and organized approach to daily responsibilities.',
    image: team1,
    backgroundColor: "#F5EBE1",
    color: "orange",
  },
  {
    description:
      'Effective "COMMUNICATION" enhances coordination, fosters collaboration, and ensures everyone is aligned towards project goals.',
    image: team2,
    backgroundColor: "#8a63a6",
    color: "#ffffff",
  },
  {
    description:
      'A "PROJECT MANAGEMENT DASHBOARD" provides real-time insights and key metrics for streamlined decision-making in project success.',
    image: dash,
    backgroundColor: "#D4E7EE",
    color: "blue",
  },

  {
    description:
      '"TIME MANAGEMENT" is the art of prioritizing tasks efficiently, making the most of each moment. ',
    image: timemanage,
    backgroundColor: "#68A0B1",
    color: "green",
  },
  {
    description:
      'In a "COLLABORATIVE" environment, individuals contribute their skills and insights, fostering innovation, efficiency, and a sense of collective achievement.',
    image: people,
    backgroundColor: "#FAFAFA",
    color: "lightblue",
  },
  {
    description:
      ' "TEAMWORK" is the collaborative effort of individuals pooling their skills and resources to achieve common goals.',
    image: teamimage,
    backgroundColor: "#f08080",
    color: "red",
  },
];

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="carousel">
      <div>
        <div className="carousel-content">
          <h1>Revolutionize Your Medication Experience</h1>
          <hr />
          <p>
            The Pharmacy Finder System simplifies medication accessibility,
            connecting patients with nearby pharmacies and empowering healthcare
            professionals. Effortlessly locate pharmacies, view available
            medications, and streamline prescriptions with QR code technology.
            Enhance your health journey today!
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link to="/auth" className="slider-btn">
              Get Started
            </Link>

            <Button
              className="more"
              onClick={showModal}
              style={{
                display: "display-flex",
                alignItems: "center",
                color: "#8d4bff",
                border: "2px solid #8d4bff",
                borderRadius: "3.125rem",
                padding: "1.325rem 1.875rem",

                textTransform: "uppercase",
                transition: "0.3s ease-in-out",
                fontSize: "clamp(0.8rem, 3vw, 1rem)",
                marginLeft: "20px",
              }}
            >
              <h3 style={{ marginTop: "-12px" }}>Learn More</h3>
            </Button>
            <Modal
              title={
                <div
                  style={{
                    display: "flex",
                    fontSize: "80px",
                    color: "#8d4bff",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={collaborative3}
                    alt="Icon"
                    style={{ marginRight: "8px" }}
                  />
                  PFS
                </div>
              }
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={1000}
              style={{
                top: 20,
              }}
            >
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url(${background})`,
                  backgroundSize: "cover",
                }}
                className="paragraph"
              >
                <p style={{ margin: "30px" }}>
                  Welcome to the Pharmacy Finder System! Our platform is
                  designed to enhance medication accessibility through seamless
                  collaboration among healthcare professionals, pharmacy
                  managers, pharmacists, and patients. The Pharmacy Finder
                  System integrates four key roles:
                </p>
                <p style={{ margin: "15px" }}>
                  <h1 style={{ fontSize: "medium", fontWeight: "bold" }}>
                    1. Doctor:
                  </h1>{" "}
                  The Doctor plays a vital role in patient care by prescribing
                  medications directly within the system. They can efficiently
                  generate QR codes for prescriptions, making it easier for
                  pharmacists to retrieve necessary medication details, reducing
                  errors and enhancing patient safety.
                </p>
                <p style={{ margin: "15px" }}>
                  <h1 style={{ fontSize: "medium", fontWeight: "bold" }}>
                    2. Pharmacy Manager:
                  </h1>{" "}
                  The Pharmacy Manager oversees the registration of pharmacies
                  and manages available medications. They ensure that inventory
                  is accurately displayed, empowering patients to find the
                  medications they need quickly. Their role is crucial in
                  facilitating smooth operations and effective communication
                  between pharmacists and healthcare providers.
                </p>
                <p style={{ margin: "15px" }}>
                  <h1 style={{ fontSize: "medium", fontWeight: "bold" }}>
                    3. Pharmacist:
                  </h1>{" "}
                  Pharmacists are the backbone of the system, responsible for
                  executing sales based on prescriptions. With the ability to
                  scan QR codes and access medication information swiftly, they
                  can provide prompt and accurate service to patients, enhancing
                  the overall healthcare experience.
                </p>
                <p style={{ margin: "15px" }}>
                  <h1 style={{ fontSize: "medium", fontWeight: "bold" }}>
                    4. Patient:
                  </h1>{" "}
                  Patients are empowered through our mobile application to
                  search for nearby pharmacies and medications prescribed by
                  their doctors. They can easily access information about
                  available medications, allowing them to make informed
                  decisions about their healthcare and choose the most
                  convenient pharmacy.
                </p>

                <p style={{ margin: "30px" }}>
                  Our platform fosters a collaborative environment where
                  doctors, pharmacy managers, pharmacists, and patients work
                  together to improve medication accessibility. From
                  prescription creation to medication retrieval, our streamlined
                  process ensures effective communication, seamless
                  coordination, and ultimately, better health outcomes for
                  patients. Experience the future of healthcare with the
                  Pharmacy Finder System—your comprehensive solution for
                  efficient medication management and accessibility.
                </p>
              </div>
            </Modal>
          </div>
        </div>
      </div>

      <Swiper
        className="myswiper"
        modules={[Pagination, EffectCoverflow, Autoplay]}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 3,
          slideShadows: true,
        }}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
          },
          1560: {
            slidesPerView: 3,
          },
        }}
      >
        {slider.map((data, index) => (
          <SwiperSlide
            key={index}
            style={{
              backgroundImage: `url(${data.image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "400px",
              backgroundColor: data.backgroundColor || "#f0f0f0",
            }}
            className="myswiper-slider"
          >
            <div>
              <p style={{ color: data.color || "black" }}>{data.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <img src={partners} alt="hey" className="people" />
      {/*<img src={hand} alt="hey" className="timemanage" />*/}
    </div>
  );
};

export default LandingPage;
