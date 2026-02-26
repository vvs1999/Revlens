"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, X, Maximize2, Minimize2, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "👋 Hi there! I'm DataBot, your AI assistant. How can I help you with data analytics today?",
    sender: "bot",
    timestamp: new Date(),
  },
]

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses: { [key: string]: string } = {
        hello: "👋 Hello! How can I help you with data analytics today?",
        hi: "👋 Hi there! What data challenges are you facing?",
        help: "I can help with questions about our services, pricing, or data analytics in general. What would you like to know?",
        pricing:
          "Our pricing starts at $499/month for small businesses. Would you like to schedule a call to discuss a custom plan?",
        services:
          "We offer sales analysis, inventory optimization, customer insights, and predictive analytics. Which area are you interested in?",
        default:
          "Thanks for your message! Our team will get back to you soon. In the meantime, would you like to learn more about our services?",
      }

      const lowercaseInput = input.toLowerCase()
      let responseContent = botResponses.default

      // Check for keywords in the input
      Object.keys(botResponses).forEach((key) => {
        if (lowercaseInput.includes(key)) {
          responseContent = botResponses[key]
        }
      })

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Chat button */}
      <motion.button
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-primary text-white shadow-lg z-50 ${
          isOpen ? "hidden" : "flex"
        } items-center justify-center`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
      >
        <Bot className="h-6 w-6" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "500px",
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 w-full max-w-sm z-50"
          >
            <Card className="border-2 border-primary/20 shadow-xl overflow-hidden h-full">
              <CardHeader className="bg-primary text-primary-foreground py-3 px-4 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-primary-foreground">
                    <AvatarFallback>DB</AvatarFallback>
                    <AvatarImage src="/bot-avatar.png" alt="DataBot" />
                  </Avatar>
                  <CardTitle className="text-base font-medium">DataBot Assistant</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
                    onClick={toggleMinimize}
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
                    onClick={toggleChat}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardContent className="p-0 h-[360px] overflow-y-auto">
                      <div className="space-y-4 p-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted border border-border"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                {message.sender === "bot" ? (
                                  <Bot className="h-3 w-3 text-primary" />
                                ) : (
                                  <User className="h-3 w-3" />
                                )}
                                <span className="text-xs opacity-70">
                                  {message.sender === "user" ? "You" : "DataBot"}
                                </span>
                              </div>
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </CardContent>

                    <CardFooter className="p-3 border-t bg-card">
                      <div className="flex w-full items-center space-x-2">
                        <Input
                          placeholder="Type your message..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="flex-1"
                        />
                        <Button type="submit" size="icon" onClick={handleSendMessage} disabled={!input.trim()}>
                          <Send className="h-4 w-4" />
                          <span className="sr-only">Send</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
