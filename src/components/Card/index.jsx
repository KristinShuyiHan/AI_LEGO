// Card.jsx
import React, { useRef, useState } from "react";
import { ItemTypes } from "../Constants";
import Draggable from "react-draggable";
import Xarrow from "react-xarrows";
import useMyStore from "../../contexts/context";
import { shallow } from "zustand/shallow";
import Popup from "reactjs-popup";
import { v4 as uuidv4 } from "uuid";

const ConnectPointsWrapper = ({ boxId, handler, dragRef, boxRef }) => {
  const ref1 = useRef();

  const [position, setPosition] = useState({});
  const [beingDragged, setBeingDragged] = useState(false);

  return (
    <React.Fragment>
      <div
        className="connectPoint top-[calc(50%-7.5px)] right-0 absolute w-4 h-4 rounded-full bg-black"
        style={{
          ...position,
        }}
        draggable
        onMouseDown={(e) => e.stopPropagation()}
        onDragStart={(e) => {
          setBeingDragged(true);
          e.dataTransfer.setData("arrow", boxId);
        }}
        onDrag={(e) => {
          const { offsetTop, offsetLeft } = boxRef.current;
          const { x, y } = dragRef.current.state;
          setPosition({
            position: "fixed",
            left: e.clientX - x - offsetLeft,
            top: e.clientY - y - offsetTop,
            transform: "none",
            opacity: 0,
          });
        }}
        ref={ref1}
        onDragEnd={(e) => {
          setPosition({});
          setBeingDragged(false);
        }}
      />
      {beingDragged ? (
        <Xarrow
          path="straight"
          start={boxId}
          startAnchor={"right"}
          end={ref1}
        />
      ) : null}
    </React.Fragment>
  );
};
const getBorderColorClassFromId = (id) => {
  const stageName = id.split("-")[0];
  switch (stageName) {
    case "problem":
      return "border-problem";
    case "task":
      return "border-task";
    case "data":
      return "border-data";
    case "model":
      return "border-model";
    case "train":
      return "border-train";
    case "test":
      return "border-test";
    case "deploy":
      return "border-deploy";
    case "feedback":
      return "border-feedback";
    // Add other cases as needed
    default:
      return "border-dark-gray"; // default border color
  }
};
const getBgColorClassFromId = (id) => {
  const stageName = id.split("-")[0];
  switch (stageName) {
    case "problem":
      return "bg-problem";
    case "task":
      return "bg-task";
    case "data":
      return "bg-data";
    case "model":
      return "bg-model";
    case "train":
      return "bg-train";
    case "test":
      return "bg-test";
    case "deploy":
      return "bg-deploy";
    case "feedback":
      return "bg-feedback";
    // Add other cases as needed
    default:
      return "border-dark-gray"; // default border color
  }
};
export default function Card({ id, handleDelete, text, handler, boxId }) {
  const cardData = useMyStore(
    (store) => store.cardsData.filter((cardData) => cardData.id === id)[0],
    shallow
  );

  const setCardPosition = useMyStore((store) => store.setCardPosition);
  const dragRef = useRef();
  const boxRef = useRef();

  // Function to render the trigger for the hover box
  const renderStageNameTrigger = () => (
    <div className="stage-name-trigger" style={{ display: "inline-block" }}>
      {stageName}
    </div>
  );

  const handleStop = (event, dragElement) => {
    setCardPosition(dragElement.node.id, {
      x: dragElement.x,
      y: dragElement.y,
    });
  };

  const addArrow = useMyStore((store) => store.addArrow);
  const stageName =
    id.split("-")[0].charAt(0).toUpperCase() + id.split("-")[0].slice(1);

  const refreshArrows = useMyStore((store) => store.refreshArrows); // Add this function inside the Card component before the return statement

  const handleTextChange = (newText, cardId) => {
    // Call a store action to update the text for this specific card
    useMyStore.getState().updateCardText(cardId, newText);
  };

  // Add state to control the visibility of the popup
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const handleSaveComment = (text, parentId = null) => {
    if (!text) return; // Don't save empty comments
    const newComment = {
      id: uuidv4(),
      text: text, // Use the text passed as an argument
      parentId: parentId,
      childComments: [],
    };
    setComments((currentComments) => [newComment, ...currentComments]);
  };

  const handleReplyToComment = (parentId, replyText) => {
    if (!replyText) return; // Don't add empty replies

    const newReply = {
      id: uuidv4(),
      text: replyText,
      parentId,
      childComments: [],
    };

    // Add newReply to comments state
    setComments((currentComments) => {
      const newComments = [...currentComments];

      const parentIndex = newComments.findIndex(
        (comment) => comment.id === parentId
      );
      if (parentIndex > -1) {
        // Add newReply as a child comment of the parent comment
        newComments[parentIndex].childComments.push(newReply.id);
      }

      return [newReply, ...newComments];
    });
  };

  const CommentComponent = ({
    comment,
    level = 0,
    handleReplyToComment,
    setShowReplyBox,
    showReplyBox,
    replyText,
    setReplyText,
    getBorderColorClassFromId,
  }) => {
    const indentClass = `ml-${level * 4}`; // Adjust indentation based on the comment level

    return (
      <div
        className={`comment border-2 p-2 mb-2 ${indentClass} ${getBorderColorClassFromId(
          comment.id
        )}`}
      >
        <p>{comment.text}</p>
        <button
          className="text-white font-bold py-1 px-2 rounded text-sm"
          style={{ backgroundColor: "cornflowerblue" }}
          onClick={() =>
            setShowReplyBox(showReplyBox === comment.id ? null : comment.id)
          }
        >
          Reply
        </button>
        {showReplyBox === comment.id && (
          <div className="reply-box">
            <textarea
              className="w-full p-2"
              placeholder="Type your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            ></textarea>
            <button
              onClick={() => {
                handleReplyToComment(comment.id, replyText);
                setReplyText("");
                setShowReplyBox(null);
              }}
            >
              Post Reply
            </button>
          </div>
        )}
        {comment.childComments.map((childId) => {
          const childComment = comments.find((c) => c.id === childId);
          return (
            <CommentComponent
              key={childId}
              comment={childComment}
              level={level + 1}
              handleReplyToComment={handleReplyToComment}
              setShowReplyBox={setShowReplyBox}
              showReplyBox={showReplyBox}
              replyText={replyText}
              setReplyText={setReplyText}
              getBorderColorClassFromId={getBorderColorClassFromId}
            />
          );
        })}
      </div>
    );
  };
  const [showReplyBox, setShowReplyBox] = useState(null); // State to control which comment shows the reply box
  const [replyText, setReplyText] = useState(""); // State for the reply text

  const borderColorClass = getBorderColorClassFromId(id);
  const bgColorClass = getBgColorClassFromId(id);

  return (
    <Draggable
      ref={dragRef}
      onStop={handleStop}
      position={cardData.position}
      onDrag={(e) => {
        refreshArrows();
      }}
    >
      <div
        className="rounded-lg flex flex-col bg-gray-100 w-40 h-28 shadow-md overflow-hidden"
        id={boxId}
        ref={boxRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          console.log(e.dataTransfer.getData("arrow"));
          if (e.dataTransfer.getData("arrow") != boxId) {
            const refs = { start: e.dataTransfer.getData("arrow"), end: boxId };
            addArrow(refs);
          }
        }}
      >
        <div
          className={`text-lg flex flex-row font-bold bg-${
            id.split("-")[0]
          } p-2 rounded-t-lg`}
        >
          <Popup
            trigger={renderStageNameTrigger} // Set the trigger to the function that renders the stage name
            on="hover" // Set the Popup to trigger on hover
            position="top center" // Adjust the position as needed
            closeOnDocumentClick
            mouseLeaveDelay={300} // Delay in milliseconds before the Popup closes after mouse leaves
            mouseEnterDelay={0} // Delay in milliseconds before the Popup opens on mouse enter
            contentStyle={{
              padding: "10px",
              border: "none",
              maxWidth: "400px", // Set a maximum width for the popup content
              wordWrap: "break-word", // Ensures that text breaks to prevent overflow
              whiteSpace: "normal", // Allows text to wrap normally
              maxHeight: "150px", // Optional: Set a maximum height
              overflow: "auto", // Optional: Provide a scrollbar for overflow content
            }}
            arrow={false}
          >
            <div
              className="hover-box"
              style={{
                border: "1px solid #e2e8f0",
                padding: "10px",
                width: "auto",
                borderRadius: "5px",
                backgroundColor: "white",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
              }}
            >
              {/* Content of your hover box */}
              <span>
                Details about the Details about theDetails about the Details
                about the Details about the Details about the Details about the
                Details about the Details about the Details about the{stageName}
              </span>
            </div>
          </Popup>
          <button
            onClick={() => handleDelete(id, boxId)}
            className="ml-auto text-lg"
          >
            ❌
          </button>

          <ConnectPointsWrapper {...{ boxId, handler, dragRef, boxRef }} />
        </div>
        {/* <p className="p-2">{text}</p> */}
        <textarea
          className="p-2"
          value={text}
          onChange={(e) => handleTextChange(e.target.value, id)}
          placeholder="Enter text here..."
        />
        {/* Amplify button */}
        <button
          className="absolute bottom-2 right-2 text-lg"
          onClick={() => setOpen((o) => !o)}
        >
          🔍
        </button>
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          {/* Popup content here, you can use the same structure as the given Popup code */}
          {(close) => (
            // <div className="modal w-96 p-5 bg-white rounded shadow-lg text-gray-700 whitespace-normal">
            // <div className="p-5 bg-white rounded shadow-lg text-gray-700 w-96 min-h-[150px]">
            <div className="modal w-[600px] p-5 bg-white rounded shadow-lg text-gray-700 ">
              <button
                className="text-black absolute top-0 right-0 mt-4 mr-4"
                onClick={close}
              >
                &times;
              </button>
              <div
                className={`text-lg font-bold border-b  pb-2 mb-2  ${bgColorClass} rounded-lg`}
              >
                {stageName}
              </div>
              {/* <div className="mb-4">{text}</div> */}
              <div className="mb-4 text-sm overflow-auto">{text}</div>
              {/* Comment section */}
              <div className={`comments-section ${borderColorClass}`}>
                {[...comments].reverse().map((comment) => (
                  <CommentComponent
                    key={comment.id}
                    comment={comment}
                    handleReplyToComment={handleReplyToComment}
                    setShowReplyBox={setShowReplyBox}
                    showReplyBox={showReplyBox}
                    replyText={replyText}
                    setReplyText={setReplyText}
                    getBorderColorClassFromId={getBorderColorClassFromId}
                  />
                ))}
              </div>
              {showCommentBox && (
                <div
                  className={`comment-box-wrapper border-2 ${borderColorClass}`}
                >
                  <textarea
                    className="comment-box w-full p-2 mb-2" // Set the width to full
                    placeholder="Type your comment here..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>
                  <button
                    className="text-white font-bold py-1 px-2 rounded text-sm"
                    style={{ backgroundColor: "cornflowerblue" }} // Inline style to set the button color
                    onClick={() => {
                      handleSaveComment(commentText);
                      setCommentText(""); // Clear the input after saving the comment
                    }}
                  >
                    Save
                  </button>
                </div>
              )}

              <div className="flex justify-center space-x-2 mt-2">
                <button
                  className="bg-red-500 text-white font-bold py-2 px-2 rounded"
                  onClick={() => setShowCommentBox(!showCommentBox)}
                >
                  Comment
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </Draggable>
  );
}
