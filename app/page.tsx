"use client";
import ChatBot from "react-chatbotify";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function Home() {
  const chatEndPointCall = async (params) => {
    try {
      console.log();
      const data = {
        prompt: `${params.userInput}`,
      };
      const responseData = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (responseData.ok) {
        const { response } = await responseData.json();
        const { text } = response;

        return (
          <div className="chat-response">
            <Markdown
              components={{
                code(props) {
                  const { children, className, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      language={match[1]}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {text}
            </Markdown>
          </div>
        );
      } else {
        return "Api Limit crossed ! wait for 2 minutes .";
      }
    } catch (error) {
      console.log(error);
      return "Api Limit crossed ! wait for 2 minutes .";
    }
  };
  const settings = {
    general: {
      embedded: true,
    },
    chatHistory: {
      disabled: true,
    },
    userBubble: { dangerouslySetInnerHtml: true },
    botBubble: { dangerouslySetInnerHtml: true },
  };

  const flow = {
    start: {
      message: "Ask me anything !",
      path: "end",
    },
    end: {
      component: (params) => chatEndPointCall(params),
      path: "end",
    },
  };

  return (
    <div className="h-[100dvh] w-full flex items-center justify-center">
      <div>
        <ChatBot settings={settings} flow={flow} />
      </div>
    </div>
  );
}
