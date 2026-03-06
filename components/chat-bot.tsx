"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send, X, Maximize2, Minimize2, User, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

type Message = { id: string; content: string; sender: "user" | "bot"; timestamp: Date }

const initialMessages: Message[] = [{
  id: "1",
  content: "👋 Hi! I'm the RevLens assistant. Ask me about our analytics platform, integrations, or how we can help your restaurant or food business.",
  sender: "bot",
  timestamp: new Date(),
}]

const botResponses: { [key: string]: string } = {
  hello: "👋 Hello! How can I help you with RevLens today?",
  hi: "👋 Hi there! Looking to grow your business with better data?",
  help: "I can answer questions about RevLens features, integrations, pricing, or how to get started. What would you like to know?",
  pricing: "Our pricing is designed for small to mid-scale businesses. Book a free demo at /contact and we'll walk you through a plan that fits.",
  services: "RevLens offers sales trend analysis, inventory optimization, demand forecasting, and labour scheduling insights. Which area matters most to you?",
  integrations: "RevLens connects to Square, Toast, Lightspeed, Clover, QuickBooks, Shopify, and more — no manual exports needed.",
  restaurant: "Restaurants are our primary focus. We help reduce food waste, optimize staff scheduling, and surface your best-selling items. Want to see a demo?",
  demo: "Head to /contact to book your free demo. We'll show you exactly what RevLens looks like for your type of business.",
  default: "Great question — our team can give you a full answer on a call. Book a free demo at /contact and we'll walk you through everything.",
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return
    const userMessage: Message = { id: Date.now().toString(), content: input, sender: "user", timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    const captured = input
    setInput("")
    setTimeout(() => {
      const lower = captured.toLowerCase()
      let response = botResponses.default
      Object.keys(botResponses).forEach((key) => { if (lower.includes(key)) response = botResponses[key] })
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), content: response, sender: "bot", timestamp: new Date() }])
    }, 900)
  }

  const msgBotBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(14,165,233,0.06)"
  const msgBotBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(14,165,233,0.15)"
  const msgBotColor = isDark ? "rgba(255,255,255,0.85)" : "#0F172A"
  const inputBg = isDark ? "rgba(255,255,255,0.05)" : "#ffffff"
  const inputColor = isDark ? "#ffffff" : "#0F172A"
  const inputBorder = isDark ? "rgba(14,165,233,0.2)" : "#CBD5E1"
  const inputPlaceholder = isDark ? "rgba(255,255,255,0.3)" : "#94A3B8"
  const footerBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(14,165,233,0.1)"

  return (
    <>
      <motion.button
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg z-50 ${isOpen ? "hidden" : "flex"} items-center justify-center`}
        style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)", color: "#ffffff", boxShadow: "0 0 24px rgba(14, 165, 233, 0.35)" }}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => { setIsOpen(true); setIsMinimized(false) }}>
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1, height: isMinimized ? "auto" : "500px" }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 w-full max-w-sm z-50">
            <Card className="overflow-hidden h-full" style={{
              background: isDark ? "hsl(222, 48%, 11%)" : "#ffffff",
              border: "1px solid rgba(14, 165, 233, 0.2)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 0 30px rgba(14, 165, 233, 0.06)",
            }}>
              <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0"
                style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)", borderBottom: "none" }}>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}>
                    <AvatarFallback style={{ color: "#ffffff" }}><Zap className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm font-semibold text-white">RevLens Assistant</CardTitle>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                      <span className="text-xs text-white/80">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10" onClick={() => setIsMinimized(!isMinimized)}>
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }}>
                    <CardContent className="p-0 h-[360px] overflow-y-auto">
                      <div className="space-y-4 p-4">
                        {messages.map((msg) => (
                          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div className="max-w-[82%] rounded-xl px-4 py-2.5"
                              style={msg.sender === "user"
                                ? { background: "linear-gradient(135deg, #0EA5E9, #0284C7)", color: "#ffffff" }
                                : { background: msgBotBg, border: `1px solid ${msgBotBorder}`, color: msgBotColor }}>
                              <div className="flex items-center gap-1.5 mb-1">
                                {msg.sender === "bot"
                                  ? <Zap className="h-3 w-3" style={{ color: "#0EA5E9" }} />
                                  : <User className="h-3 w-3" />}
                                <span className="text-xs opacity-60">{msg.sender === "user" ? "You" : "RevLens"}</span>
                              </div>
                              <p className="text-sm leading-relaxed">{msg.content}</p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </CardContent>
                    <CardFooter className="p-3" style={{ borderTop: `1px solid ${footerBorder}` }}>
                      <div className="flex w-full items-center gap-2">
                        <input
                          placeholder="Ask about RevLens..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          style={{
                            flex: 1,
                            background: inputBg,
                            color: inputColor,
                            border: `1px solid ${inputBorder}`,
                            borderRadius: "0.5rem",
                            padding: "0.5rem 0.75rem",
                            fontSize: "0.875rem",
                            outline: "none",
                            caretColor: "#0EA5E9",
                          }}
                        />
                        <Button size="icon" onClick={handleSendMessage} disabled={!input.trim()}
                          style={{
                            background: input.trim() ? "linear-gradient(135deg, #0EA5E9, #0284C7)" : (isDark ? "rgba(255,255,255,0.08)" : "rgba(14,165,233,0.1)"),
                            color: input.trim() ? "#ffffff" : (isDark ? "rgba(255,255,255,0.3)" : "rgba(14,165,233,0.4)"),
                          }}>
                          <Send className="h-4 w-4" />
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