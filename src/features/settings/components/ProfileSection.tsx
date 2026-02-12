"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Shield, User } from "lucide-react";
import type {
  ChangePasswordInput,
  UpdateProfileInput,
} from "@/utils/schema/settingsSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useFeedbackToast } from "@/hooks/use-feedback-toast";
import { changePassword, updateProfile } from "@/utils/settings.functions";
import {
  changePasswordSchema,
  updateProfileSchema,
} from "@/utils/schema/settingsSchema";

export const ProfileSection = () => {
  const { user } = useAuth();
  const { showToast } = useFeedbackToast();
  const queryClient = useQueryClient();

  const profileForm = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  const passwordForm = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    profileForm.reset({
      name: user?.name ?? "",
      email: user?.email ?? "",
    });
  }, [profileForm, user?.email, user?.name]);

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateProfileInput) => updateProfile({ data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
      showToast("success", "Profile updated successfully");
    },
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update profile. Please try again.";
      showToast("error", message);
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: ChangePasswordInput) => changePassword({ data }),
    onSuccess: () => {
      passwordForm.reset();
      showToast("success", "Password changed successfully");
    },
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to change password. Please try again.";
      showToast("error", message);
    },
  });

  const handleProfileSubmit = (data: UpdateProfileInput) => {
    updateProfileMutation.mutate(data);
  };

  const handlePasswordSubmit = (data: ChangePasswordInput) => {
    changePasswordMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Profile Information
          </CardTitle>
          <CardDescription>Manage your name and email address</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                className="trade-input"
                placeholder="Your name"
                {...profileForm.register("name")}
                aria-invalid={!!profileForm.formState.errors.name}
              />
              {profileForm.formState.errors.name ? (
                <p className="text-sm font-medium text-destructive">
                  {profileForm.formState.errors.name.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="trade-input"
                placeholder="email@example.com"
                {...profileForm.register("email")}
                aria-invalid={!!profileForm.formState.errors.email}
              />
              {profileForm.formState.errors.email ? (
                <p className="text-sm font-medium text-destructive">
                  {profileForm.formState.errors.email.message}
                </p>
              ) : null}
            </div>

            <Button
              type="submit"
              disabled={updateProfileMutation.isPending}
              className="w-full sm:w-auto"
            >
              {updateProfileMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Security
          </CardTitle>
          <CardDescription>Change your password</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="current-pw">Current Password</Label>
              <Input
                id="current-pw"
                type="password"
                className="trade-input"
                placeholder="••••••••"
                {...passwordForm.register("currentPassword")}
                aria-invalid={!!passwordForm.formState.errors.currentPassword}
              />
              {passwordForm.formState.errors.currentPassword ? (
                <p className="text-sm font-medium text-destructive">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-pw">New Password</Label>
              <Input
                id="new-pw"
                type="password"
                className="trade-input"
                placeholder="••••••••"
                {...passwordForm.register("newPassword")}
                aria-invalid={!!passwordForm.formState.errors.newPassword}
              />
              {passwordForm.formState.errors.newPassword ? (
                <p className="text-sm font-medium text-destructive">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-pw">Confirm Password</Label>
              <Input
                id="confirm-pw"
                type="password"
                className="trade-input"
                placeholder="••••••••"
                {...passwordForm.register("confirmPassword")}
                aria-invalid={!!passwordForm.formState.errors.confirmPassword}
              />
              {passwordForm.formState.errors.confirmPassword ? (
                <p className="text-sm font-medium text-destructive">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              ) : null}
            </div>

            <Button
              type="submit"
              disabled={changePasswordMutation.isPending}
              className="w-full sm:w-auto"
            >
              {changePasswordMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Changing...
                </>
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
