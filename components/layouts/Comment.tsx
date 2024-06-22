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

  const handleCommentDelete = (commentId: string) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const filteredComments =
    selectedTab === "comments"
      ? comments
      : selectedTab === "add"
      ? []
      : comments;

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
      <div className='comment-list max-h-72 overflow-y-auto'>
        {filteredComments.map((comment) => (
          <div
            key={comment.id}
            className='comment-item border-b border-gray-300 py-2 flex justify-between items-center'
          >
            <div className='flex items-center'>
              <Avatar className='bg-white text-green-500 mr-2 text-2xl flex items-center justify-center'>
                {comment.author.charAt(0)}
              </Avatar>
              <div>
                <p className='text-black'>{comment.text}</p>
                <p
                  className={`comment-timestamp text-gray-600 text-sm ${
                    selectedTab === "comments" ? "hidden" : ""
                  }`}
                >
                  {comment.timestamp}
                </p>
              </div>
            </div>
            <Button
              className='bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer'
              onClick={() => handleCommentDelete(comment.id)}
              type='button'
            >
              ሰርዝ
            </Button>
          </div>
        ))}
      </div>

      <div className='comment-input mt-2 flex items-center'>
        <div className='bg-white rounded-full w-[40px] h-[35px] px-2 py-4 flex items-center justify-center'>
          <MessageSquare size={40} strokeWidth={2} />{" "}
        </div>
        <textarea
          className='border p-2 resize-y border-gray-400 shadow-lg ml-3 h-[100px] w-[700px] rounded-lg focus:outline-gray-300'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder='አስተያየት ጨምር...'
        ></textarea>
      </div>
      <Button
        className='bg-gray-600 text-white mt-4 px-2 py-2 ml-2 border cursor-pointer text-sm w-[99] h-[30]'
        onClick={handleCommentAdd}
        type='button'
        variant='third'
      >
        አስተያየት ጨምር{" "}
      </Button>
    </div>
  );
};

export default CommentSection;
