import React from "react";
import { Badge } from "@/components/ui/badge";
import MessageBox from "./messageBox";

import { useChat } from "@ai-sdk/react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { CornerDownLeft, Loader2 } from "lucide-react";

type Props = {
  reportData: string;
};

const ChatComponent = ({ reportData }: Props) => {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: "api/geminimedicalchat",
  });

  return (
    <div className="h-full bg-muted/50 relative flex flex-col min-h-[50vh] rounded-xl p-4 gapa-4">
      <Badge
        className={`absolute right-3 top-1.5 ${
          reportData ? "bg-[#00B612]" : ""
        }`}
        variant="outline"
      >
        {reportData ? "Report added" : "No report added"}
      </Badge>
      <div className="flex-1"></div>
      <div className="flex flex-col gap-4 mb-4">
        {messages.map((m, idx) => {
          return <MessageBox key={idx} role={m.role} content={m.content} />;
        })}
      </div>
      <form
        className="relative overflow-hidden rounded-lg border bg-background"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, {
            data: {
              reportData: reportData,
            },
          });
        }}
      >
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type your query here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <Button
            disabled={status === "submitted"}
            className="ml-auto"
            type="submit"
            size={"sm"}
          >
            {status === "submitted" ? "Analyzing..." : "3. Ask"}
            {status === "submitted" ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <CornerDownLeft className="size-3.5" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;

