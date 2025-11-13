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
import { useLanguage } from "@/contexts/LanguageContext";

type DemoFormValues = {
  name: string;
  company: string;
  email: string;
  message?: string;
};

const DemoPage = () => {
  const { t } = useLanguage();

  const formSchema = z.object({
    name: z.string().min(2, t("demo.nameError")),
    company: z.string().min(2, t("demo.companyError")),
    email: z.string().email(t("demo.emailError")),
    message: z.string().max(600).optional(),
  });
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
      toast.success(t("demo.success"), {
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
            <span className="text-xs uppercase tracking-[0.35em] text-primary/80">{t("demo.scheduleWalkthrough")}</span>
            <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">{t("demo.title")}</h1>
            <p className="text-base text-foreground/70">
              {t("demo.desc")}
            </p>
            <ul className="space-y-3 text-sm text-foreground/65">
              <li>{t("demo.bullet1")}</li>
              <li>{t("demo.bullet2")}</li>
              <li>{t("demo.bullet3")}</li>
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
                      <FormLabel>{t("demo.fullName")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("demo.namePlaceholder")} {...field} className="h-12 rounded-full bg-white/70 px-5 text-sm" />
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
                      <FormLabel>{t("demo.company")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("demo.companyPlaceholder")} {...field} className="h-12 rounded-full bg-white/70 px-5 text-sm" />
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
                      <FormLabel>{t("demo.email")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("demo.emailPlaceholder")}
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
                      <FormLabel>{t("demo.message")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t("demo.messagePlaceholder")}
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
                        <Loader2 className="h-4 w-4 animate-spin" /> {t("demo.sending")}
                      </span>
                    ) : (
                      t("demo.requestDemo")
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
