/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { definedQuestions } from "@/data/preDefinedData";
import { removeSpacesAndSpecialCharsAndLowerCase } from "@/utiils/clientUtiils";
import ChatBot from "react-chatbotify";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function Home() {
  const chatEndPointCall = async (params: any) => {
    try {
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
                      showLineNumbers
                      PreTag="div"
                      className="codeStyle"
                      useInlineStyles={true}
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
      primaryColor: "#000",
      secondaryColor: "#000",
      showFooter: false,
    },
    header: {
      title: "Gemini Bot",
    },
    notification: {
      disabled: true,
    },
    chatHistory: {
      disabled: true,
    },
  };

  const flow: any = {
    start: {
      message: "Hi I'm your chatbot build by Rohan",
      options: [
        "Hello!",
        "What is your name?",
        "What time is it?",
        "Tell me a joke!",
        "What do you like to do?",
        "Tell me a fun fact.",
      ],
      path: "end",
    },
    end: {
      component: (params: any) => {
        const userInput: string = removeSpacesAndSpecialCharsAndLowerCase(params.userInput);
        const findComonQuestions :any = definedQuestions.find((item)=> removeSpacesAndSpecialCharsAndLowerCase(item.question) === userInput)
        if(findComonQuestions){
          return findComonQuestions.answer
        }
        return chatEndPointCall(params);
      },
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
