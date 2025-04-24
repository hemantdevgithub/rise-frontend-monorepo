"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUploadResearchTopicMutation } from "@/redux/features/researchTopic/researchTopicApi";
import {
  Button, Calendar, Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle, Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, Input, Popover,
  PopoverContent,
  PopoverTrigger, Textarea
} from "@repo/ui";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const researchTopicValidationSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a valid positive number",
  }),
  duration: z.date({
    required_error: "Please select a completion date and time",
  }),
});

type TFormType = z.infer<typeof researchTopicValidationSchema>;

export default function CreateResearchTopicPage() {
  const form = useForm<TFormType>({
    resolver: zodResolver(researchTopicValidationSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
    },
  });
  const navigate = useNavigate();
  const [mutation, { isLoading }] = useUploadResearchTopicMutation();
  async function onSubmit(data: TFormType) {
    try {
      const response = await mutation(data).unwrap();
      if (response.success) {
        toast.success(response.message);
        navigate("/portfolio/research-topics");
        form.reset();
      }
    } catch (error) {
      toast.error("Failed to upload research topic");
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Create Research Topic</CardTitle>
          <CardDescription>
            Fill in the details to create a new research topic.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter research topic name"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The name of your research topic.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the research topic in detail"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of the research topic.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter price" {...field} />
                    </FormControl>
                    <FormDescription>
                      The price for this research topic.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Completion Date & Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal ${
                              !field.value && "text-muted-foreground"
                            }`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP 'at' h:mm a")
                            ) : (
                              <span>Select completion date and time</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            // Preserve the time when changing the date
                            if (date && field.value) {
                              const newDate = new Date(date);
                              newDate.setHours(field.value.getHours());
                              newDate.setMinutes(field.value.getMinutes());
                              field.onChange(newDate);
                            } else {
                              field.onChange(date);
                            }
                          }}
                          initialFocus
                        />
                        <div className="border-t p-3">
                          <div className="flex items-center space-x-2">
                            <div className="grid gap-1">
                              <FormLabel className="text-xs">Hour</FormLabel>
                              <select
                                className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                                value={
                                  field.value ? field.value.getHours() : "12"
                                }
                                onChange={(e) => {
                                  if (field.value) {
                                    const newDate = new Date(field.value);
                                    newDate.setHours(
                                      Number.parseInt(e.target.value, 10)
                                    );
                                    field.onChange(newDate);
                                  } else {
                                    const newDate = new Date();
                                    newDate.setHours(
                                      Number.parseInt(e.target.value, 10)
                                    );
                                    field.onChange(newDate);
                                  }
                                }}
                              >
                                {Array.from({ length: 24 }, (_, i) => (
                                  <option key={i} value={i}>
                                    {i.toString().padStart(2, "0")}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="grid gap-1">
                              <FormLabel className="text-xs">Minute</FormLabel>
                              <select
                                className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                                value={
                                  field.value ? field.value.getMinutes() : "0"
                                }
                                onChange={(e) => {
                                  if (field.value) {
                                    const newDate = new Date(field.value);
                                    newDate.setMinutes(
                                      Number.parseInt(e.target.value, 10)
                                    );
                                    field.onChange(newDate);
                                  } else {
                                    const newDate = new Date();
                                    newDate.setMinutes(
                                      Number.parseInt(e.target.value, 10)
                                    );
                                    field.onChange(newDate);
                                  }
                                }}
                              >
                                {Array.from(
                                  { length: 12 },
                                  (_, i) => i * 5
                                ).map((minute) => (
                                  <option key={minute} value={minute}>
                                    {minute.toString().padStart(2, "0")}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Select when this research should be completed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Research Topic"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
