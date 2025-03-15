"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Send, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "../../../hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  to: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(1, {
    message: "Subject is required.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function EmailInterface() {
  const [isSending, setIsSending] = useState(false);
  const [sentEmails, setSentEmails] = useState([
    {
      id: "1",
      to: "john.doe@example.com",
      subject: "Meeting Schedule",
      message: "Hi John, just confirming our meeting for tomorrow at 2pm.",
      timestamp: new Date(2025, 2, 10, 14, 30).toISOString(),
      status: "delivered"
    },
    {
      id: "2",
      to: "sarah.smith@example.com",
      subject: "Project Update",
      message: "Sarah, please find attached the latest project update and timeline.",
      timestamp: new Date(2025, 2, 9, 10, 15).toISOString(),
      status: "delivered"
    },
    {
      id: "3",
      to: "team@example.com",
      subject: "Weekly Updates",
      message: "Hello team, here are the weekly updates and action items for our project.",
      timestamp: new Date(2025, 2, 8, 9, 0).toISOString(),
      status: "delivered"
    }
  ]);

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: "",
      subject: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSending(true);
    
    try {
      const response = await fetch("/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to send email");
      }
      
      // Add to sent emails
      const newEmail = {
        id: Date.now().toString(),
        ...values,
        timestamp: new Date().toISOString(),
        status: "delivered"
      };
      
      setSentEmails(prev => [newEmail, ...prev]);
      
      // Show success message
      toast({
        title: "Email sent successfully",
        description: "Your email has been delivered.",
      });
      
      
      form.reset();
    } catch (error) {

      toast({
        variant: "destructive",
        title: "Failed to send email",
        description: String(error),
      });
    } finally {
      setIsSending(false);
    }
  };

  // Format date for display
  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="w-full min-h-full">
      <CardHeader>
        <CardTitle>Email Manager</CardTitle>
        <CardDescription>
          Compose and manage your emails in one place
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="compose" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="compose">
              <Send className="h-4 w-4 mr-2" />
              Compose
            </TabsTrigger>
            <TabsTrigger value="sent">
              <Mail className="h-4 w-4 mr-2" />
              Sent Emails
              <Badge variant="secondary" className="ml-2">{sentEmails.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="compose" className="pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl>
                        <Input placeholder="recipient@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Email subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your message here..."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Your message should be at least 10 characters long.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSending}
                >
                  {isSending ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send Email
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="sent" className="pt-4">
            <ScrollArea className="h-96">
              {sentEmails.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                  <Mail className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium">No emails sent yet</p>
                  <p className="text-gray-500 mt-1">Compose your first email from the Compose tab</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sentEmails.map((email) => (
                    <Card key={email.id} className="shadow-sm">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{email.subject}</CardTitle>
                            <CardDescription>To: {email.to}</CardDescription>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 opacity-70" />
                            <span className="text-xs text-gray-500">
                              {formatDate(email.timestamp)}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <p className="text-sm line-clamp-3">{email.message}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <Badge variant="outline" className="text-xs">
                          {email.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}