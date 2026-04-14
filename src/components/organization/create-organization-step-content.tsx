"use client";

import { ChangeEvent, ClipboardEvent, KeyboardEvent, useState } from "react";

import { X } from "lucide-react";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  UseFormReturn,
} from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CreateOrganizationSchema,
  OrganizationRole,
  organizationRoleSchema,
} from "@/lib/schema";

import { StepId, Stepper } from "./create-organization-stepper";

type StepField = keyof CreateOrganizationSchema;

export const stepFields: Record<StepId, StepField[]> = {
  "step-1": ["organizationName", "organizationSlug", "description"],
  "step-2": ["inviteEmails", "inviteMessage"],
};

type StepContentProps = {
  id: StepId;
  form: UseFormReturn<CreateOrganizationSchema>;
};

const splitInviteEmails = (value: string) => {
  return value
    .split(/[\n,;]+/)
    .map((email) => email.trim())
    .filter(Boolean);
};

const isInviteEmailValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

type InviteMemberInput = CreateOrganizationSchema["inviteEmails"][number];

const organizationRoleOptions: OrganizationRole[] =
  organizationRoleSchema.options;

const hasInviteMemberEmail = (
  invites: InviteMemberInput[],
  candidate: string,
) => {
  const normalizedCandidate = candidate.toLowerCase();

  return invites.some(
    (invite) => invite.email.toLowerCase() === normalizedCandidate,
  );
};

const normalizeInviteEmails = (
  value: CreateOrganizationSchema["inviteEmails"] | undefined,
) => {
  return (value ?? []).filter(
    (invite): invite is InviteMemberInput =>
      Boolean(invite?.email) && Boolean(invite?.role),
  );
};

type InviteEmailsFieldProps = {
  field: ControllerRenderProps<CreateOrganizationSchema, "inviteEmails">;
  fieldState: ControllerFieldState;
  form: UseFormReturn<CreateOrganizationSchema>;
};

const InviteEmailsField = ({
  field,
  fieldState,
  form,
}: InviteEmailsFieldProps) => {
  const [inviteEmailInput, setInviteEmailInput] = useState("");
  const [selectedRole, setSelectedRole] = useState<OrganizationRole>("member");
  const inviteEmails = normalizeInviteEmails(field.value);
  const inviteEmailCandidate = inviteEmailInput.trim();
  const canAddInviteEmail =
    inviteEmailCandidate.length > 0 &&
    isInviteEmailValid(inviteEmailCandidate) &&
    !hasInviteMemberEmail(inviteEmails, inviteEmailCandidate);

  const addInviteEmails = (rawValue: string) => {
    const parsedEmails = splitInviteEmails(rawValue);
    if (!parsedEmails.length) return;

    const nextEmails = [...inviteEmails];
    let hasInvalidEmail = false;

    for (const email of parsedEmails) {
      if (!isInviteEmailValid(email)) {
        hasInvalidEmail = true;
        continue;
      }

      if (hasInviteMemberEmail(nextEmails, email)) continue;
      nextEmails.push({
        email,
        role: selectedRole,
      });
    }

    field.onChange(nextEmails);
    setInviteEmailInput("");

    if (hasInvalidEmail) {
      form.setError("inviteEmails", {
        type: "validate",
        message: "One or more emails are invalid.",
      });
    } else {
      form.clearErrors("inviteEmails");
    }

    void form.trigger("inviteEmails");
  };

  const removeInviteEmail = (emailToRemove: string) => {
    const nextEmails = inviteEmails.filter(
      (invite) => invite.email !== emailToRemove,
    );

    field.onChange(nextEmails);
    void form.trigger("inviteEmails");
  };

  const handleInviteInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInviteEmailInput(event.target.value);
  };

  const handleInviteInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter" && event.key !== ",") return;
    event.preventDefault();

    addInviteEmails(inviteEmailInput);
  };

  const handleInviteInputPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData("text");

    if (!/[\n,;]/.test(pastedText)) return;

    event.preventDefault();
    addInviteEmails(pastedText);
  };

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor='inviteEmails'>Invite Team Members</FieldLabel>
      <div className='flex flex-col gap-2 sm:flex-row'>
        <Input
          id='inviteEmails'
          value={inviteEmailInput}
          aria-invalid={fieldState.invalid}
          placeholder='alex@example.com'
          autoComplete='off'
          className='sm:flex-1'
          onChange={handleInviteInputChange}
          onKeyDown={handleInviteInputKeyDown}
          onPaste={handleInviteInputPaste}
        />
        <Select
          value={selectedRole}
          onValueChange={(value) => setSelectedRole(value as OrganizationRole)}
        >
          <SelectTrigger className='w-full sm:w-40'>
            <SelectValue placeholder='Select role' />
          </SelectTrigger>
          <SelectContent>
            {organizationRoleOptions.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {canAddInviteEmail && (
        <Button
          type='button'
          variant='outline'
          size='sm'
          className='w-fit'
          onClick={() => addInviteEmails(inviteEmailCandidate)}
        >
          Add {inviteEmailCandidate}
        </Button>
      )}

      {inviteEmails.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {inviteEmails.map((invite) => (
            <Badge
              key={invite.email}
              variant='secondary'
              className='h-auto gap-1 py-1'
            >
              <span>
                {invite.email}
                <span className='text-muted-foreground'> ({invite.role})</span>
              </span>
              <button
                type='button'
                className='rounded-full p-0.5 transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                aria-label={`Remove ${invite.email}`}
                onClick={() => removeInviteEmail(invite.email)}
              >
                <X className='size-3' />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <FieldDescription>
        Type an email, choose a role, then click Add. You can also press Enter
        or paste multiple emails separated by commas or new lines.
      </FieldDescription>
      <FieldError errors={[fieldState.error]} />
    </Field>
  );
};

export const GeneralInfoContent = ({ id, form }: StepContentProps) => {
  return (
    <Stepper.Content
      step={id}
      render={(props) => (
        <div {...props} className='rounded-lg border bg-card p-6'>
          <FieldGroup>
            <div className='grid gap-4 sm:grid-cols-2'>
              <Controller
                name='organizationName'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='organizationName'>
                      Organization Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id='organizationName'
                      aria-invalid={fieldState.invalid}
                      placeholder='Acme Inc.'
                      autoComplete='off'
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name='organizationSlug'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='organizationSlug'>
                      Organization Slug
                    </FieldLabel>
                    <Input
                      {...field}
                      id='organizationSlug'
                      aria-invalid={fieldState.invalid}
                      placeholder='acme-inc'
                      autoComplete='off'
                    />
                    <FieldDescription>
                      This can be used for your organization URL.
                    </FieldDescription>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>

            <Controller
              name='description'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='description'>Description</FieldLabel>
                  <Textarea
                    {...field}
                    id='description'
                    aria-invalid={fieldState.invalid}
                    placeholder='Tell your team what this organization is for.'
                    rows={4}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>
        </div>
      )}
    />
  );
};

export const InviteMembersContent = ({ id, form }: StepContentProps) => {
  return (
    <Stepper.Content
      step={id}
      render={(props) => (
        <div {...props} className='rounded-lg border bg-card p-6'>
          <FieldGroup>
            <Controller
              name='inviteEmails'
              control={form.control}
              render={({ field, fieldState }) => (
                <InviteEmailsField
                  field={field}
                  fieldState={fieldState}
                  form={form}
                />
              )}
            />

            <Controller
              name='inviteMessage'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='inviteMessage'>
                    Invite Message
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id='inviteMessage'
                    aria-invalid={fieldState.invalid}
                    placeholder='Hey team, join our workspace to collaborate!'
                    rows={4}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>
        </div>
      )}
    />
  );
};
