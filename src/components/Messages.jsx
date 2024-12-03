import React from "react";
import { formatDate, formatTime } from "../helpers/helpers";

const Messages = ({ messages, currentUserId }) => {
  return (
    <ul className="w-full space-y-5">
      {/* messages list (date) */}
      {messages.map((msg) => {
        const isCurrentUser = currentUserId === msg.userId;

        return (
          <li
            key={msg.id}
            className="flex flex-col items-center gap-5 last:pb-5"
          >
            <div
              className={`${
                isCurrentUser ? "justify-end" : "justify-start"
              } flex w-full`}
            >
              {/* message */}
              <div
                className={`${
                  isCurrentUser
                    ? "bg-brand-dark-800/5 rounded-ee-none items-end"
                    : "bg-white/50 rounded-es-none"
                }  flex flex-col max-w-[90%] p-3 rounded-2xl xs:max-w-[80%] xs:p-3.5`}
              >
                {/* message body */}
                <h3 className="text-sm xs:text-base">{msg.text}</h3>

                {/* time */}
                <div className="flex gap-2">
                  <span className="text-sm">
                    {formatDate(msg.messagedDate)}
                  </span>
                  <span className="text-sm">-</span>
                  <span className="text-sm">
                    {formatTime(msg.messagedDate)}
                  </span>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Messages;
