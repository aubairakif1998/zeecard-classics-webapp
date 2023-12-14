import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // If you're using react-router
import { useParams } from "react-router-dom";
// Assuming you have SVG files as React components, you can import them like this:
// import AddressSvg from './path-to-address-svg';
// ...

// You may need to define your gradients and styles separately in CSS.

const AddLinkScreenView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [linkData] = useState({
    address: "LinkType.address",
    call: "LinkType.call",
    // ... (similarly for other link types)
  });

  const contactsLinks = [
    "contactCard",
    "call",
    "sms",
    "faceTime",
    "address",
    "email",
    "whatsapp",
  ];

  // Similar arrays for other link types

  const mainHeadingText = (text) => <h2>{text}</h2>;

  const DataGridView = ({ imagesPaths }) => (
    <div>
      {imagesPaths.map((imagePath, index) => (
        <Link
          key={index}
          to={`./:${linkData[imagePath]}`} // Assuming you have some routing
        >
          <div className="grid-item">
            {/* Use inline styles or add a CSS class for the gradient */}
            <div className="gradient-container">
              {/* Use your SVG components here */}
              {/* <AddressSvg color="white" height="20" /> */}
              <img src={imagePath} alt={`link-${index}`} />
              <span>{linkData[imagePath]}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div>
      <header>
        <h1>Add Links to your Profile</h1>
        <Link to="/">
          <span onClick={() => navigate(-1)}>&lt; Back</span>
        </Link>
      </header>
      <div className="main-container">
        {mainHeadingText("Contacts")}
        <DataGridView imagesPaths={contactsLinks} />
        {/* Repeat for other link types */}
      </div>
    </div>
  );
};

export default AddLinkScreenView;
