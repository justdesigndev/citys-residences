"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { Control, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { countryPhoneCodes } from "@/lib/constants"

// interface FormContactProps {
//   translations: FormTranslations
// }

const getFormSchema = () =>
  // translations: FormTranslations
  z.object({
    name: z.string().min(1, { message: "Name is required" }),
    surname: z.string().min(1, { message: "Surname is required" }),
    countryCode: z.string().min(1, { message: "Country code is required" }),
    phone: z
      .string()
      .min(1, { message: "Phone is required" })
      .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" })
      .refine((val) => /^\+?[0-9]+$/.test(val), { message: "Phone number must contain only numbers" }),
    email: z.string().email({ message: "Email is required" }),
    residenceType: z
      .enum(["x", "y", "z"], {
        required_error: "Residence type is required",
      })
      .nullable(),
    howDidYouHearAboutUs: z
      .enum(["x", "y", "z"], {
        required_error: "How did you hear about us is required",
      })
      .nullable(),
    message: z.string().min(1, { message: "Message is required" }),
    consent: z.boolean().refine((data) => data === true, { message: "Consent is required" }),
  })

type FormValues = z.infer<ReturnType<typeof getFormSchema>>

const commonInputStyles =
  "bg-transparent border-b border-bricky-brick rounded-none px-0 transition-colors duration-300 ease-in-out"

interface FormInputProps {
  name: keyof FormValues
  control: Control<FormValues>
  placeholder: string
  type?: string
  className?: string
}

const FormInput = ({ name, control, placeholder, type = "text", className }: FormInputProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Input
            placeholder={placeholder}
            type={type}
            {...field}
            value={field.value?.toString() ?? ""}
            className={`${commonInputStyles} py-4 px-2 border-bricky-brick-light ${className}`}
            inputMode={name === "phone" ? "tel" : undefined}
            pattern={name === "phone" ? "\\+?[0-9]*" : undefined}
            onChange={(e) => {
              const value = e.target.value
              if (name === "phone") {
                // Allow only numbers and '+' sign
                const formattedValue = value.replace(/[^\d+]/g, "")
                field.onChange(formattedValue)
              } else {
                field.onChange(value)
              }
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export function ContactForm() {
  // { translations }: FormContactProps
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(getFormSchema()),
    defaultValues: {
      name: "",
      surname: "",
      countryCode: "+90",
      phone: "",
      email: "",
      residenceType: null,
      howDidYouHearAboutUs: null,
      message: "",
      consent: false,
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        const result = await response.json()

        if (!response.ok) {
          setMessage({ type: "error", text: result.message || "Failed to submit form" })
          throw new Error(result.message || "Failed to submit form")
        }

        setMessage({ type: "success", text: result.message })
        return result
      } catch (error) {
        console.error("Form submission error:", error)
        throw error
      }
    },
    onSuccess: () => {
      form.reset()

      form.clearErrors()

      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    },
    onError: () => {
      // Clear error message after 5 seconds
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    },
  })

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="font-halenoir space-y-8">
        <div className="grid grid-flow-col gap-4">
          <FormInput control={form.control} name="name" placeholder={"ADINIZ*"} />
          <FormInput control={form.control} name="surname" placeholder={"SOYADINIZ*"} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-12 gap-2 items-end col-span-1">
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value} defaultValue={"+90"}>
                        <SelectTrigger className="h-9 border-b border-bricky-brick-light rounded-none text-bricky-brick cursor-pointer">
                          <SelectValue placeholder={field.value || "ÜLKE KODU"}>{field.value}</SelectValue>
                        </SelectTrigger>
                        <SelectContent className="text-bricky-brick">
                          <SelectGroup>
                            {countryPhoneCodes["tr"].map((country, index) => (
                              <SelectItem
                                key={index}
                                className="focus:bg-bricky-brick-light focus:text-bricky-brick cursor-pointer"
                                value={country.code}
                              >
                                ({country.code}) {country.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-9">
              <FormInput control={form.control} name="phone" type="tel" placeholder={"TELEFON NUMARANIZ*"} />
            </div>
          </div>
          <FormInput
            control={form.control}
            name="email"
            type="email"
            placeholder={"EMAIL ADRESİNİZ*"}
            className="col-span-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="residenceType"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <SelectTrigger className="h-11 border border-bricky-brick-light rounded-md text-bricky-brick cursor-pointer">
                      <SelectValue placeholder="TERCİH EDİLEN KONUT TÜRÜ" />
                    </SelectTrigger>
                    <SelectContent className="text-bricky-brick">
                      <SelectGroup>
                        <SelectItem
                          className="focus:bg-bricky-brick-light focus:text-bricky-brick cursor-pointer"
                          value="apple"
                        >
                          X
                        </SelectItem>
                        <SelectItem
                          className="focus:bg-bricky-brick-light focus:text-bricky-brick cursor-pointer"
                          value="banana"
                        >
                          Y
                        </SelectItem>
                        <SelectItem
                          className="focus:bg-bricky-brick-light focus:text-bricky-brick cursor-pointer"
                          value="blueberry"
                        >
                          Z
                        </SelectItem>
                        <SelectItem
                          className="focus:bg-bricky-brick-light focus:text-bricky-brick cursor-pointer"
                          value="grapes"
                        >
                          W
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="howDidYouHearAboutUs"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <SelectTrigger className="h-11 border border-bricky-brick-light rounded-md text-bricky-brick cursor-pointer">
                      <SelectValue placeholder="BİZİ NEREDEN DUYDUNUZ?" />
                    </SelectTrigger>
                    <SelectContent className="text-bricky-brick">
                      <SelectGroup>
                        <SelectItem
                          className="focus:bg-bricky-brick-light focus:text-bricky-brick cursor-pointer"
                          value="apple"
                        >
                          X
                        </SelectItem>
                        <SelectItem
                          className="focus:bg-bricky-brick-light focus:text-bricky-brick cursor-pointer"
                          value="banana"
                        >
                          Y
                        </SelectItem>
                        <SelectItem
                          className="focus:bg-bricky-brick-light focus:text-bricky-brick cursor-pointer"
                          value="blueberry"
                        >
                          Z
                        </SelectItem>
                        <SelectItem
                          className="focus:bg-bricky-brick-light focus:text-bricky-brick cursor-pointer"
                          value="grapes"
                        >
                          W
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-flow-col">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-bricky-brick font-light pl-2">MESAJINIZ</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className={`${commonInputStyles} p-4 min-h-[140px] rounded-md border-bricky-brick-light`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row gap-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      className="border-bricky-brick data-[state=checked]:bg-bricky-brick"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-bricky-brick font-light leading-snug cursor-pointer">
                    Kişisel verilerimin City’s Residences İstanbul tarafından, 6698 sayılı Kişisel Verilerin Korunması
                    Kanunu’na uygun olarak işlenmesini, saklanmasını ve paylaşılmasını kabul ediyorum.
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-white text-black hover:bg-gray-200 rounded-md py-4 md:py-10 text-base border border-bricky-brick"
        >
          {mutation.isPending ? "Sending" : "Submit"}
        </Button>
      </form>
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-center py-6 my-4 ${
              message.type === "success" ? "text-green-400" : "text-red"
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>
    </Form>
  )
}
