/** @format */

"use client";
import { MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";

type Comment = {
  id: string;
  text: string;
  timestamp: string;
  author: string;
};

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [selectedTab, setSelectedTab] = useState<"all" | "comments" | "add">(
    "all"
  );

  const handleCommentAdd = () => {
    if (newComment.trim() === "") {
      return;
    }

    const newCommentItem: Comment = {
      id: crypto.randomUUID(),
      text: newComment,
      timestamp: new Date().toLocaleString(),
      author: "Biruk markos",
    };

    setComments([...comments, newCommentItem]);
    setNewComment("");
  };

  return (
    <div className='px-4 py-2 mt-0 justify-center items-center bg-slate-100'>
      <div className='comment-section-header flex justify-start space-x-4 mb-2 ml-3'>
        <Button
          className={`px-4 py-1 bg-gray-600 w-[32] h-[16]  ${
            selectedTab === "all"
              ? "bg-gray-600 text-white"
              : "bg-white text-gray-800 hover:bg-gray-200"
          } rounded-md`}
          onClick={() => setSelectedTab("all")}
          type='button'
          variant='third'
        >
          ሁሉም
        </Button>
        <Button
          className={`px-4 py-1 bg-gray-500 w-[99] h-[30] ${
            selectedTab === "comments"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800 hover:bg-gray-200"
          } rounded-md`}
          onClick={() => setSelectedTab("comments")}
          type='button'
          variant='outline'
        >
          አስተያየቶች ብቻ
        </Button>
      </div>

      <div className='comment-input mt-2 flex items-center'>
        <div className='bg-white rounded-full w-[40px] h-[35px] px-2 py-4 flex items-center justify-center'>
          <MessageSquare size={40} strokeWidth={2} />{" "}
        </div>
        <div className='relative w-full'>
          {/* <Avatar className='absolute top-2 left-2' >
            A
          </Avatar> */}
          <textarea
            className='border p-2 resize-y border-gray-400 shadow-lg ml-3 h-[100px] w-[700px] rounded-lg focus:outline-gray-300 pl-10'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
