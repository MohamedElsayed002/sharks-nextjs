import { UseFormReturn } from "react-hook-form"
import { FormSchema } from "./index"
import { Form, FormControl, FormLabel, FormField, FormMessage, FormItem, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Languages } from "lucide-react"

interface Step1Props {
  form: UseFormReturn<FormSchema>
}

export const BasicInfo = ({ form }: Step1Props) => {
  return (
    <Form {...form}>
      <div className="space-y-6 text-black">
        {/* Category Field */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">Service Category</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="e.g., SaaS, E-commerce, Consulting"
                  className="text-slate-500  placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20"
                />
              </FormControl>
              <FormDescription className="text-slate-400 text-sm">
                What category best describes your service?
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        {/* Divider */}
        <div className="flex items-center gap-3 my-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
          <div className="flex items-center gap-2 text-slate-400">
            <Languages className="w-5 h-5" />
            <span className="text-xl font-medium text-black">Bilingual Details</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        </div>

        <p className="text-slate-400 text-sm text-center -mt-4 mb-6">
          Please provide information in both English and Arabic
        </p>

        {/* English Details */}
        <div className="border bg-gray-100/80 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400 font-bold text-sm">EN</span>
            </div>
            <h3 className="text-xl font-semibold text-black">English Details</h3>
          </div>

          <FormField
            control={form.control}
            name="details.0.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Title (English)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter service title in English"
                    className="border border-gray-200 placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details.0.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Description (English)</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder="Describe your service in English..."
                    className=" placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>

        {/* Arabic Details */}
        <div className="bg-gray-100/80 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <span className="text-emerald-400 font-bold text-sm">AR</span>
            </div>
            <h3 className="text-xl font-semibold">Arabic Details</h3>
          </div>

          <FormField
            control={form.control}
            name="details.1.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Title (Arabic)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="أدخل عنوان الخدمة بالعربية"
                    dir="rtl"
                    className=" placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details.1.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Description (Arabic)</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder="اكتب وصف الخدمة بالعربية..."
                    dir="rtl"
                    className="border placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20 resize-none"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Form>
  )
}

