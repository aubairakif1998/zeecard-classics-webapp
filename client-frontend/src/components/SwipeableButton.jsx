import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "../styles/SwipeableButton.css";

const SwipeableButton = ({ onSwipeLeft, onSwipeRight }) => {
  const [showActions, setShowActions] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setShowActions(true);
      onSwipeLeft && onSwipeLeft();
    },
    onSwipedRight: () => {
      setShowActions(false);
      onSwipeRight && onSwipeRight();
    },
  });

  const actionButtons = (
    <div className={`action-buttons ${showActions ? "visible" : ""}`}>
      <button>Edit</button>
      <button>Delete</button>
      <button>Forward</button>
    </div>
  );

  return (
    <div {...handlers} className={`swipeable-button`}>
      <div className="button-text">Swipe Me</div>
      {showActions && actionButtons}
    </div>
  );
};

export default SwipeableButton;
