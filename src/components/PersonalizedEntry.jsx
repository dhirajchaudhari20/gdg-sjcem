import { useEffect, useState } from "react";

export default function PersonalizedEntry() {
  const [showPopup, setShowPopup] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const savedType = localStorage.getItem("gdgUserType");
    if (savedType) {
      setUserType(savedType);
      return;
    }

    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2500); // delay after page load

    return () => clearTimeout(timer);
  }, []);

  // If user already selected OR popup not triggered, render nothing
  if (!showPopup || userType) return null;

  const handleSelect = (type) => {
    localStorage.setItem("gdgUserType", type);
    setUserType(type);
    setShowPopup(false);
  };

  return (
    <div
      className="entry-overlay"
      onClick={() => setShowPopup(false)} // background click closes
    >
      <div
        className="entry-popup"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking popup
      >
        <button
          className="entry-close"
          onClick={() => setShowPopup(false)}
          aria-label="Close"
        >
          ×
        </button>

        <h2>Welcome to GDG 👋</h2>
        <p>Is this your first time here?</p>

        <div className="entry-buttons">
          <button onClick={() => handleSelect("new")}>
            I’m New Here
          </button>
          <button onClick={() => handleSelect("returning")}>
            I’ve Been Here Before
          </button>
        </div>
      </div>
    </div>
  );
}
