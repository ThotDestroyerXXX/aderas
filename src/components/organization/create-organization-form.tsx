"use client";
import { MouseEvent } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useFormHook } from "@/hooks/use-form";
import {
  CreateOrganizationSchema,
  createOrganizationSchema,
} from "@/lib/schema";
import { toast } from "sonner";

import {
  GeneralInfoContent,
  InviteMembersContent,
  stepFields,
} from "./create-organization-step-content";
import {
  getStepStatus,
  StepId,
  Stepper,
  StepperDescriptionWrapper,
  StepperSeparator,
  StepperTitleWrapper,
  StepperTriggerWrapper,
} from "./create-organization-stepper";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";

const ignorePromiseError = () => {
  return;
};

export const CreateOrganizationForm = () => {
  const utils = trpc.useUtils();
  const router = useRouter();
  const form = useFormHook<CreateOrganizationSchema>(createOrganizationSchema, {
    organizationName: "",
    organizationSlug: "",
    description: "",
    inviteEmails: [],
    inviteMessage: "",
  });

  const validateStep = (stepId: StepId) => {
    return form.trigger(stepFields[stepId], { shouldFocus: true });
  };

  const handleNextStep = async (stepId: StepId, goNext: () => void) => {
    const isStepValid = await validateStep(stepId);
    if (!isStepValid) return;
    goNext();
  };

  const { mutateAsync } = trpc.organization.createOrganization.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.invalidate();
      toast.success("Organization created successfully");
      router.push("/");
    },
    onError: (error) => {
      console.error("Failed to create organization:", error);
      toast.error("Failed to create organization: " + error.message);
    },
  });

  const onSubmit = async (data: CreateOrganizationSchema) => {
    const { error } = await authClient.organization.checkSlug({
      slug: data.organizationSlug, // required
    });
    if (error) {
      toast.error(error.message);
    } else {
      await mutateAsync(data);
    }
  };

  return (
    <div className='w-full max-w-3xl'>
      <form className='w-full' onSubmit={form.handleSubmit(onSubmit)}>
        <Stepper.Root className='w-full space-y-4' orientation='horizontal'>
          {({ stepper }) => {
            const handleNextClick = (event: MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();

              const currentStepId = stepper.state.current.data.id as StepId;
              handleNextStep(currentStepId, () =>
                stepper.navigation.next(),
              ).catch(ignorePromiseError);
            };

            return (
              <>
                <Stepper.List
                  className={cn(
                    "flex list-none gap-2",
                    "flex-row items-center justify-between",
                  )}
                >
                  {stepper.state.all.map((stepData, index) => {
                    const currentIndex = stepper.state.current.index;
                    const status = getStepStatus(index, currentIndex);
                    const isLast = index === stepper.state.all.length - 1;

                    return (
                      <Stepper.Item
                        key={stepData.id}
                        step={stepData.id}
                        className='group peer relative flex w-full flex-col items-center justify-center gap-2'
                      >
                        <StepperTriggerWrapper />
                        <StepperSeparator status={status} isLast={isLast} />
                        <div className='flex flex-col items-center gap-1 text-center'>
                          <StepperTitleWrapper title={stepData.title} />
                          <StepperDescriptionWrapper
                            description={stepData.description}
                          />
                        </div>
                      </Stepper.Item>
                    );
                  })}
                </Stepper.List>

                {stepper.state.current.data.id === "step-1" ? (
                  <GeneralInfoContent id='step-1' form={form} />
                ) : (
                  <InviteMembersContent id='step-2' form={form} />
                )}

                <Stepper.Actions className='flex justify-end gap-4'>
                  {!stepper.state.isFirst && (
                    <Stepper.Prev
                      render={(domProps) => (
                        <Button type='button' variant='secondary' {...domProps}>
                          Previous
                        </Button>
                      )}
                    />
                  )}
                  {stepper.state.isLast ? (
                    <Button type='submit'>Create Organization</Button>
                  ) : (
                    <Button type='button' onClick={handleNextClick}>
                      Next
                    </Button>
                  )}
                </Stepper.Actions>
              </>
            );
          }}
        </Stepper.Root>
      </form>
    </div>
  );
};
