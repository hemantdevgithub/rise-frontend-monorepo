import { cn } from "@/lib/utils";
import {
  selectResearchAndDevelopmentState,
  setIsResearchAndDevelopmentSidebarOpen,
} from "@/redux/features/researchAndDevelopment/researchAndDevelopmentSlice";
import { useAppSelector } from "@/redux/hooks";
import { researchAndValidationFiltersSchema } from "@/schemas/researchAndDevelopmentValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button, Checkbox, Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@repo/ui";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

const items = [
  { id: "1", label: "Health Sciences " },
  { id: "2", label: "Social Mission " },
  { id: "3", label: "Moral Sciences " },
  { id: "4", label: "Life & Bio-Sciences" },
] as const;

const ResearchAndDevelopmentSidebar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useAppSelector(selectResearchAndDevelopmentState);
  const form = useForm<z.infer<typeof researchAndValidationFiltersSchema>>({
    resolver: zodResolver(researchAndValidationFiltersSchema),
    defaultValues: {
      items: [],
    },
  });

  function onSubmit(data: z.infer<typeof researchAndValidationFiltersSchema>) {
    console.log(data);
  }
  return (
    <aside
      className={cn(
        // " right-0 top-0 z-30 h-screen w-80 border-l bg-background ",
        "sticky top-0 h-fit overflow-hidden rounded-xl border bg-background transition-all duration-300 ease-in-out dark:bg-secondary",
        isSidebarOpen ? "w-full" : "w-0 border-none"
      )}
    >
      <div className="flex flex-col divide-y *:px-4 *:py-2">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              dispatch(setIsResearchAndDevelopmentSidebarOpen(!isSidebarOpen))
            }
            aria-label="Close sidebar"
            className="p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        {/* <Separator className="mb-6" /> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem className="space-y-3 pb-2">
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </aside>
  );
};

export default ResearchAndDevelopmentSidebar;
