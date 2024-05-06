/** @format */

import { Button } from "@/components/ui/button";
import { Avatar } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Badge } from "lucide-react";
import React, { useState } from "react";

interface Comment {
  text: string;
}
interface CommentFormProps {
  newComment: string;
  handleCommentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

interface CommentSectionProps {
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  const [newComment, setNewComment] = useState("");
  const [updatedComments, setUpdatedComments] = useState(comments);
  const [showAllComments, setShowAllComments] = useState(true);

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = () => {
    if (newComment.trim() === "") {
      return;
    }

    const updatedCommentsArr = [...updatedComments, { text: newComment }];
    setUpdatedComments(updatedCommentsArr);
    setNewComment("");
  };

  const handleShowAllComments = () => {
    setShowAllComments(true);
  };

  const handleShowCommentsOnly = () => {
    setShowAllComments(false);
  };

  const filteredComments = showAllComments ? updatedComments : [];

  return (
    <div className="comments-section rounded-xl bg-gray-50 h-[500px]">
      <h2>
        <Button
          onClick={handleShowAllComments}
          className={showAllComments ? "active  bg-gray-800 mt-4 pl-6" : "mr-2"}
        >
          ሁሉም
        </Button>
        <Button
          variant="default"
          onClick={handleShowCommentsOnly}
          className={
            !showAllComments ? "active mt-4 " : "ml-2 pl-6 bg-white text-black"
          }
        >
          አስተያየቶች ብቻ
        </Button>
      </h2>
      <p className="px-8 py-4 mt-6">
        <span className="font-bold">•</span> መሰረት አበራ ይህን ከ5 ቀናት በፊት ፈጥረዋል ይህን
        ከ5 ቀናት በፊት አዘጋጅተውታል።
      </p>
      <ul className="list-none p-0"></ul>
      <div className="comment-form mt-4">
        <div style={{ position: "relative" }}>
          <textarea
            className="ml-16 w-[900px] rounded-lg border-shadow bg-white h-[100px] mb-4 mt-2 border border-gray-300  p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={newComment}
          />

          <h3 style={{ position: "absolute", top: 24, left: 80 }}>
            <Avatar className="bg-gray-200 text-green-500 rounded-2xl px-3 py-1 mr-2 ">
              A
            </Avatar>
            ስራ አመራር ዋና ስራ አስፈፃሚ መልእክት.
          </h3>

          <div
            style={{
              position: "absolute",
              top: 18,
              right: 80,
              display: "flex",
              flexDirection: "row-reverse", // Align buttons to the right side
            }}
          >
            <div className="ml-52">
              <Button variant="ghost">ሰርዝ</Button>
              <Button variant="ghost">አርትዕ</Button>
            </div>
          </div>
        </div>
      </div>
      <p className="px-8 py-4">
        <span className="font-bold">•</span> መሰረት አበራ ይህን ከ5 ቀናት በፊት ፈጥረዋል ይህን
        ከ5 ቀናት በፊት አዘጋጅተውታል።
      </p>
      <p className="px-8 py-4">
        <span className="font-bold">•</span> መሰረት አበራ ይህን ከ5 ቀናት በፊት ፈጥረዋል ይህን
        ከ5 ቀናት በፊት አዘጋጅተውታል።
      </p>
      <button
        type="button"
        className="bg-gray-600 text-white px-4 py-2 mr-6 mt-10 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-700  disabled:opacity-50 cursor-pointer"
        disabled={!newComment.trim()}
      >
        አስተያየት ያስገቡ
      </button>
    </div>
  );
};

export default CommentSection;
