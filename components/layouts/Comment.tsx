/** @format */

"use client";
import { ListTree, MessageSquare, PencilLine } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import CommentStepper from "./CommentStepper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { IComment, ICommentCreate } from "../../typing/interface/IComment";
import { createComment } from "@/lib/features/letter/workflow/workflowSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectMe } from "@/lib/features/authentication/authSlice";
import { useParams } from "next/navigation";

type CommentSectionProps = {
  comments: IComment[];
};

const CommentSection: React.FC<CommentSectionProps> = ({
  comments: initialComments,
}) => {
  const [comments, setComments] = useState<IComment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const dispatch = useAppDispatch();
  const me = useAppSelector(selectMe);
  const params = useParams();

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") {
      return;
    }

    const newCommentItem: ICommentCreate = {
      content: newComment,
    };

    try {
      const response = await dispatch(
        createComment({
          reference_number: params.referenceNumber as string,
          comment: newCommentItem,
        })
      ).unwrap();

      const completeComment: IComment = {
        id: response.id,
        content: newComment,
        created_at: new Date().toISOString(),
        author: me,
      };

      setComments([...comments, completeComment]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  return (
    <div className="px-4 py-2 mt-0 justify-center items-center bg-slate-100">
      <div className="comment-section-header flex justify-start space-x-4 mb-2 ml-3">
        <Tabs defaultValue="AllComment" className="w-full">
          <TabsList className="w-[50%]">
            <TabsTrigger
              value="AllComment"
              className="w-[50%] hover:bg-white data-[state=active]:bg-gray-700 data-[state=active]:text-white hover:text-black flex gap-6"
            >
              <ListTree />
              ሁሉም አስተያየቶች
            </TabsTrigger>
            <TabsTrigger
              value="comment"
              className="w-[50%] hover:bg-white data-[state=active]:bg-gray-700 data-[state=active]:text-white hover:text-black flex gap-6"
            >
              <PencilLine />
              አስተያየት አስቅምጥ
            </TabsTrigger>
          </TabsList>
          <TabsContent value="AllComment" className="w-full">
            <CommentStepper comments={comments} />
          </TabsContent>
          <TabsContent value="comment">
            <div className="comment-input mt-2 flex items-center">
              <div className="bg-white rounded-full w-[40px] h-[35px] px-2 py-4 flex items-center justify-center">
                <MessageSquare size={40} strokeWidth={2} />{" "}
              </div>
              <div className="relative w-full">
                <form
                  action=""
                  onSubmit={handleSubmitComment}
                  className="flex items-center gap-4"
                >
                  <textarea
                    className="border p-2 resize-y border-gray-400 shadow-lg ml-3 h-[200px] w-[700px] rounded-lg focus:outline-gray-300 pl-10"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                  <Button type="submit">መልእክት አስቅምጥ</Button>
                </form>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommentSection;
