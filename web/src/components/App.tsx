import React from 'react';

import { debugData } from "@/utils/debugData";
import { fetchNui } from "@/utils/fetchNui";
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { format } from 'date-fns'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CalendarIcon, PersonStanding } from 'lucide-react';

const formSchema = z.object({
  first_name: z.string().min(2, {}),
  last_name: z.string().min(2, {}),
  dob: z.string({}),
  sex: z.enum(["0", "1"], {}),
  height: z.string().min(3, {}),
})

debugData([
  {
    action: 'setVisible',
    data: true,
  }
])

const App: React.FC = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-card p-6 h-max w-[400px] space-y-4">
        <div className="uppercase text-center text-white text-2xl font-semibold">Identity</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} className="text-white" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} className="text-white" />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel className="text-white">Date of birth</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant={"outline"} className={cn("w-[240px] justify-start text-left font-normal text-white", !field.value && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="dark w-auto p-0">
                          <Calendar mode="single" captionLayout="dropdown-buttons" selected={field.value ? new Date(field.value) : undefined} onSelect={(date) => { if (date) { const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`; field.onChange(formattedDate); } }} fromYear={1960} toYear={2003} />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Height</FormLabel>
                  <FormControl>
                    <Input placeholder="Height" {...field} className="text-white" type="number" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Gender</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={(value) => { field.onChange(value); }} defaultValue={field.value} className="grid grid-cols-2">
                      <FormItem className="col-span-1">
                        <FormControl>
                          <RadioGroupItem value="0" className="peer sr-only" />
                        </FormControl>
                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover-bg-accent hover-text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary text-white">
                          <PersonStanding className="mb-3 h-6 w-6" />
                          Men
                        </FormLabel>
                      </FormItem>
                      <FormItem className="col-span-1">
                        <FormControl>
                          <RadioGroupItem value="1" className="peer sr-only" />
                        </FormControl>
                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover-bg-accent hover-text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary text-white">
                          <PersonStanding className="mb-3 h-6 w-6" />
                          Women
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="pt-2">
              <Button variant="default" type="submit" className="text-white">Create</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default App;
