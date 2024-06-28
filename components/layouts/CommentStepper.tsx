import { CircleDot, Pencil, Reply, Trash2, Undo2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IComment } from "../../typing/interface/IComment";
import {
  deleteComment,
  updateComment,
} from "@/lib/features/letter/workflow/workflowSlice";
import { useAppDispatch } from "@/lib/hooks";

export const FormatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  return `${hours}:${minutes}:${seconds} ሰአት በቀን ${day}/ ${month}/ ${year}`;
};

type CommentSectionProps = {
  comments: IComment[];
};

const CommentStepper: React.FC<CommentSectionProps> = ({
  comments: initialComments,
}) => {
  const [comments, setComments] = useState<IComment[]>(initialComments);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [newContent, setNewContent] = useState<string>("");
  const [editClicked, setEditClicked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !event
          .composedPath()
          .some((el) =>
            (el as Element).classList?.contains("comment-stepper-container")
          )
      ) {
        setClickedIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setClickedIndex(index);
    if (!editClicked) {
      setNewContent(comments[index].content);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (clickedIndex === null) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (clickedIndex === null) {
      setHoveredIndex(null);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = (commentId: string) => {
    dispatch(deleteComment({ comment_id: commentId }))
      .then((response) => {
        if (response.type === deleteComment.fulfilled.toString()) {
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId)
          );
          setIsOpen(false);
        }
      })
      .catch((error) => {
        console.error("Failed to delete comment:", error);
      });
  };

  const handleSubmitEdit = (index: number) => {
    const editedComment: IComment = {
      ...comments[index],
      content: newContent,
    };

    dispatch(updateComment({ comment: editedComment }))
      .then((response) => {
        if (response.type === updateComment.fulfilled.toString()) {
          const updatedComments = [...comments];
          updatedComments[index] = editedComment;
          setComments(updatedComments);
          setEditClicked(false);
          setClickedIndex(null);
        }
      })
      .catch((error) => {
        console.error("Failed to update comment:", error);
      });
  };

  return (
    <div
      className="m-4 pt-3 w-[50%] comment-stepper-container"
      onClick={(e) => e.stopPropagation()}
    >
      <ol className="relative text-gray-500 border-s border-black dark:border-gray-700 dark:text-gray-400">
        {comments?.map((comment, index) => (
          <li
            key={comment.id}
            className={`mb-8 ms-6 group p-4 rounded-md ${
              hoveredIndex === index || clickedIndex === index
                ? "bg-white text-black cursor-pointer"
                : ""
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => handleClick(index, e)}
          >
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-gray-50 group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-black ">
              <CircleDot className="group-hover:text-blue-600" />
            </span>
            <span className="flex justify-between">
              <span className="flex gap-3 items-center pb-2">
                <Avatar>
                  <AvatarFallback className="bg-gray-300">
                    {comment.author?.full_name
                      ? comment.author.full_name.substring(0, 2)
                      : "NA"}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-medium leading-tight group-hover:text-blue-500 group-hover:font-bold">
                  {comment.author.full_name}. መልእክት
                </h3>
              </span>
              {clickedIndex === index && (
                <span>
                  <Button
                    variant="ghost"
                    onClick={() => setEditClicked(!editClicked)}
                  >
                    {editClicked ? (
                      <>
                        <Undo2 className="mr-2 h-4 w-4" />
                        መልስ
                      </>
                    ) : (
                      <>
                        <Pencil className="mr-2 h-4 w-4" /> አርም
                      </>
                    )}
                  </Button>

                  <Dialog
                    open={isOpen}
                    onOpenChange={(open) => setIsOpen(open)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-red-500"
                        onClick={() => setIsOpen(true)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        ሰርዝ
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>ያረጋግጡ</DialogTitle>
                        <DialogDescription>
                          እርግጠኛ ነዎት ይህንን አስተያየት ማጥፋት ይፈልጋሉ?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          type="submit"
                          onClick={() => handleDelete(comment.id)}
                          className="px-10"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          አዎ
                        </Button>
                        <Button
                          className="px-10"
                          variant="third"
                          onClick={handleClose}
                        >
                          አይ
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </span>
              )}
            </span>
            {hoveredIndex === index || clickedIndex === index ? (
              <>
                {editClicked ? (
                  <textarea
                    className="border mt-4 resize-y w-full p-3 border-gray-400 shadow-lg h-[150px] rounded-lg focus:outline-gray-300"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                  />
                ) : (
                  <p className="text-sm">{comment.content}</p>
                )}
                <div className="flex w-full justify-end">
                  {!editClicked ? (
                    // Uncomment the below code for using a comment reply
                    // <Button
                    //   variant="ghost"
                    //   onClick={() => setReplayClicked(!replayClicked)}
                    // >
                    //   <Reply className="mr-2 h-4 w-4" /> መልስ ስጥ
                    // </Button>
                    <></>
                  ) : (
                    <Button
                      variant="third"
                      type="submit"
                      className="px-10"
                      onClick={() => handleSubmitEdit(index)}
                    >
                      <Pencil className="mr-2 h-4 w-4" /> አስተካክል
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <h3 className="font-medium leading-tight group-hover:text-blue-500 group-hover:font-bold">
                ይህንን በ {FormatDate(comment.created_at)} ፈጥረዋል.
              </h3>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CommentStepper;
