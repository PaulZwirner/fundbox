"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";

import SectionWrapper from "@/components/SectionWrapper";
import GlassSurface from "@/components/GlassSurface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Please tell us who we will be speaking with."),
  company: z.string().min(2, "Company or institution name is required."),
  email: z.string().email("Please provide a valid email address."),
  message: z.string().max(600).optional(),
});

type DemoFormValues = z.infer<typeof formSchema>;

const DemoPage = () => {
  const form = useForm<DemoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      message: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: DemoFormValues) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      toast.success("Thanks! Our team will reach out within one business day.", {
        description: `${values.name}, we just sent a confirmation to ${values.email}.`,
      });
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-24">
      <SectionWrapper className="pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.35em] text-primary/80">Schedule a walkthrough</span>
            <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">Get your Fundbox demo now!</h1>
            <p className="text-base text-foreground/70">
              Tell us about your operation, and we&apos;ll tailor a live session that mirrors your workflows. Expect a reply in less than a day.
            </p>
            <ul className="space-y-3 text-sm text-foreground/65">
              <li>• Understand how AI matching fits your current process.</li>
              <li>• Discover onboarding timelines, integrations, and pricing.</li>
              <li>• Get rollout playbooks from venues just like yours.</li>
            </ul>
          </div>
          <GlassSurface variant="card" className="p-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="Avery Marsh" {...field} className="h-12 rounded-full bg-white/70 px-5 text-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company / Institution</FormLabel>
                      <FormControl>
                        <Input placeholder="Aurora Stadium" {...field} className="h-12 rounded-full bg-white/70 px-5 text-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@organization.com"
                          type="email"
                          {...field}
                          className="h-12 rounded-full bg-white/70 px-5 text-sm"
                        />
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
                      <FormLabel>Message (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share priorities, current tools, or unique workflows."
                          {...field}
                          className="min-h-[140px] rounded-3xl bg-white/70 px-5 py-4 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-primary py-6 text-xs uppercase tracking-[0.3em] hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending
                      </span>
                    ) : (
                      "Request demo"
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </GlassSurface>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default DemoPage;
