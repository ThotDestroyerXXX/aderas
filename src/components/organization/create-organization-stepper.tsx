"use client";

import { defineStepper } from "@stepperize/react";
import { StepStatus, useStepItemContext } from "@stepperize/react/primitives";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const { Stepper } = defineStepper(
  {
    id: "step-1",
    title: "Step 1",
    description: "General Organization Information",
  },
  {
    id: "step-2",
    title: "Step 2",
    description: "Invite Members",
  },
);

export type StepId = "step-1" | "step-2";

export const getStepStatus = (
  index: number,
  currentIndex: number,
): StepStatus => {
  if (index < currentIndex) return "success";
  if (index === currentIndex) return "active";
  return "inactive";
};

export const StepperTriggerWrapper = () => {
  const item = useStepItemContext();
  const isInactive = item.status === "inactive";

  return (
    <Stepper.Trigger
      render={(domProps) => (
        <Button
          className='rounded-full'
          variant={isInactive ? "secondary" : "default"}
          size='icon'
          {...domProps}
          type='button'
        >
          <Stepper.Indicator>{item.index + 1}</Stepper.Indicator>
        </Button>
      )}
    />
  );
};

export const StepperTitleWrapper = ({ title }: { title: string }) => {
  return (
    <Stepper.Title
      render={(domProps) => (
        <h4 className='text-sm font-medium' {...domProps}>
          {title}
        </h4>
      )}
    />
  );
};

export const StepperDescriptionWrapper = ({
  description,
}: {
  description?: string;
}) => {
  if (!description) return null;

  return (
    <Stepper.Description
      render={(domProps) => (
        <p className='text-xs text-muted-foreground' {...domProps}>
          {description}
        </p>
      )}
    />
  );
};

export const StepperSeparator = ({
  status,
  isLast,
}: {
  status: StepStatus;
  isLast: boolean;
}) => {
  if (isLast) return null;

  return (
    <Stepper.Separator
      data-status={status}
      className={cn(
        "bg-muted data-[status=success]:bg-primary",
        "data-disabled:opacity-50 transition-all duration-300 ease-in-out",
        "self-center h-0.5 min-w-4 flex-1",
        "absolute left-[calc(50%+30px)] right-[calc(-50%+20px)]",
        "top-5 block shrink-0",
      )}
    />
  );
};
