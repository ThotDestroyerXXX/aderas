"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, Resolver, useForm } from "react-hook-form";

export function useFormHook<TValues extends FieldValues>(
  formSchema: unknown,
  initialValues: TValues,
) {
  return useForm<TValues>({
    resolver: zodResolver(formSchema as never) as Resolver<TValues>,
    defaultValues: initialValues as DefaultValues<TValues>,
  });
}
