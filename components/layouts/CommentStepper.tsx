import { CircleDot, Pencil, Reply, Trash2, Undo2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
import CommentReplay from "./CommentReplay";
import { IComment } from "../../typing/interface/IComment";

// type Comment = {
//   id: number;
//   name: string;
//   date: string;
//   content: string;
//   replay?: {
//     name: string;
//     content: string;
//     date: string;
//   }[];
// };

export const FormatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}, ${month}, ${day}`;
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
  const [editClicked, setEditClicked] = useState<boolean>(false);
  const [replayClicked, setReplayClicked] = useState<boolean>(false);
  const [replaySubmitClicked, setReplaySubmitClicked] =
    useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  //   const [comments, setComments] = useState<Comment[]>([
  //     {
  //       id: 1,
  //       name: "Abebe Alemu",
  //       date: "Jun 21, 2024",
  //       content:
  //         "Step details here Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident praesentium deserunt enim natus ut aliquid dolore cumque blanditiis ducimus eum repellendus ea rem accusantium excepturi tempore! Saepe sapiente voluptatum odio.",
  //       replay: [
  //         {
  //           name: "kalab",
  //           content:
  //             "replayed by me que blanditiis ducimus eum repellendus ea rem accusantium excepturi tempore! Saepe sapiente voluptatum odi",
  //           date: "Jun 23, 2024",
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       name: "Abebe Alemu",
  //       date: "May 22, 2024",
  //       content:
  //         "Step details here Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident praesentium deserunt enim natus ut aliquid dolore cumque blanditiis ducimus eum repellendus ea rem accusantium excepturi tempore! Saepe sapiente voluptatum odio.",
  //       replay: [
  //         {
  //           name: "kalab",
  //           content: "replayed by me lodhhdhjhdj",
  //           date: "Jun 23, 2024",
  //         },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       name: "Abebe Alemu",
  //       date: "Jun 22, 2024",
  //       content:
  //         "Step details here Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident praesentium deserunt enim natus ut aliquid dolore cumque blanditiis ducimus eum repellendus ea rem accusantium excepturi tempore! Saepe sapiente voluptatum odio.",
  //       replay: [
  //         {
  //           name: "kalab",
  //           content: "replayed by me hdfdjskfd",
  //           date: "Jun 23, 2024",
  //         },
  //         {
  //           name: "kalab",
  //           content: "replayed by me hdfdjskfd",
  //           date: "Jun 23, 2024",
  //         },
  //       ],
  //     },
  //   ]);

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

  const handleDelete = () => {
    // Perform deletion logic here
    setIsOpen(false);
  };

  const handleSubmitReplay = (index: number, content: string) => {
    // Assuming you have a way to gather the replay content, here we just simulate adding a new replay
    const newComments = [...comments];
    //   const newReplay = {
    //     name: "user Name",
    //     content,
    //     date: new Date().toLocaleDateString(),
    //   };
    //   newComments[index].replay = [...newComments[index].replay, newReplay];
    setComments(newComments);
    setReplayClicked(false);
    setReplaySubmitClicked(true);
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
            onMouseLeave={() => handleMouseLeave()}
            onClick={(e) => handleClick(index, e)}
          >
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-gray-50 group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-black ">
              <CircleDot className="group-hover:text-blue-600" />
            </span>
            <span className="flex justify-between">
              <span className="flex gap-3 items-center pb-2">
                <Avatar>
                  {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
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
                        {" "}
                        <Pencil className="mr-2 h-4 w-4" /> አርም
                      </>
                    )}
                  </Button>

                  <Dialog
                    open={isOpen}
                    onOpenChange={(open) => setIsOpen(open)}
                  >
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="text-red-500">
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
                          onClick={handleDelete}
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
                  <textarea className="border mt-4 resize-y w-full p-3 border-gray-400 shadow-lg h-[150px] rounded-lg focus:outline-gray-300">
                    {comment.content}
                  </textarea>
                ) : (
                  <p className="text-sm">{comment.content}</p>
                )}
                <div className="flex w-full justify-end">
                  {!editClicked ? (
                    <Button
                      variant="ghost"
                      onClick={() => setReplayClicked(!replayClicked)}
                    >
                      <Reply className="mr-2 h-4 w-4" /> መልስ ስጥ
                    </Button>
                  ) : (
                    <Button
                      variant="third"
                      type="submit"
                      className="px-10"
                      onClick={() =>
                        handleSubmitReplay(index, "Replay content")
                      }
                    >
                      <Pencil className="mr-2 h-4 w-4" /> አስተካክል
                    </Button>
                  )}
                </div>
                {/* replay */}

                {/* {clickedIndex === index &&
                  comment.replay &&
                  comment.replay.map((reply, replyIndex) => (
                    <CommentReplay key={replyIndex} comment={reply} />
                  ))} */}
              </>
            ) : (
              <h3 className="font-medium leading-tight group-hover:text-blue-500 group-hover:font-bold">
                ይህንን በ {FormatDate(comment.created_at)} ፈጥረዋል.
              </h3>
            )}
            {clickedIndex === index && replayClicked ? (
              <>
                <textarea className="border mt-4 resize-y w-full p-3 border-gray-400 shadow-lg h-[100px] rounded-lg focus:outline-gray-300"></textarea>
                <Button
                  className="w-full"
                  onClick={() => handleSubmitReplay(index, "Replay content")}
                >
                  {" "}
                  ላክ{" "}
                </Button>
              </>
            ) : (
              <></>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CommentStepper;
