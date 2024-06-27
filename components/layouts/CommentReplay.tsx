import { MessageSquareReply } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Comment = {
  name: string;
  content: string;
  date: string;
};

type Props = {
  comment: Comment;
};

const CommentReplay = ({ comment }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="flex flex-col ml-8 mt-2">
      <ol className="relative text-gray-500 border-s border-black dark:border-gray-700 dark:text-gray-400">
        <li className={"mb-8 ms-6 group p-4 rounded-md"}>
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-gray-50 group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-black ">
            <MessageSquareReply className="group-hover:text-blue-600" />
          </span>
          <span className="flex gap-3 items-center pb-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h3 className="font-medium leading-tight group-hover:text-blue-500 group-hover:font-bold">
              {comment.name}. መልእክት
            </h3>
          </span>
          {expanded ? (
            <p className="text-sm">{comment.content}</p>
          ) : (
            <p
              className="text-sm line-clamp-1 cursor-pointer text-blue-500"
              onClick={toggleExpanded}
            >
              {comment.content}
            </p>
          )}
        </li>
      </ol>
    </div>
  );
};

export default CommentReplay;
