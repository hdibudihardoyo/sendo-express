import { Button } from "@/components/ui/button";
import { Page } from "@/components/ui/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProfileSchema,
  updatePasswordSchema,
  type UpdateProfileFormData,
  type UpdatePasswordFormData,
} from "@/lib/validations/profile";
import toast, { Toaster } from "react-hot-toast";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import { useAuth } from "@/hooks/use-auth";
import {
  useUpdateProfile,
  useUpdatePassword,
  useUploadMedia,
} from "@/hooks/use-profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Index = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use custom meta hook instead of react-helmet
  useMeta(META_DATA.profile);

  // Get current user data
  const { user } = useAuth();

  // Mutations
  const updateProfileMutation = useUpdateProfile();
  const updatePasswordMutation = useUpdatePassword();
  const uploadMediaMutation = useUploadMedia();

  // Profile form setup
  const profileForm = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: "",
      avatar: "",
    },
  });

  // Password form setup
  const passwordForm = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // Set initial values when user data is available
  useEffect(() => {
    if (user) {
      profileForm.reset({
        fullName: user.fullName || "",
        avatar: user.avatar || "",
      });
      setAvatarPreview(user.avatar || "");
    }
  }, [user, profileForm]);

  // Handle avatar file selection
  const handleAvatarSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setSelectedAvatar(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file to server
    try {
      const uploadResult = await uploadMediaMutation.mutateAsync(file);
      profileForm.setValue("avatar", uploadResult.fileUrl);
    } catch {
      // Error already handled in the hook
      setSelectedAvatar(null);
      setAvatarPreview(user?.avatar || "");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Remove avatar
  const removeAvatar = () => {
    setSelectedAvatar(null);
    setAvatarPreview(user?.avatar || "");
    profileForm.setValue("avatar", user?.avatar || "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle profile update
  const onProfileSubmit = (data: UpdateProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  // Handle password update
  const onPasswordSubmit = (data: UpdatePasswordFormData) => {
    updatePasswordMutation.mutate({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
    passwordForm.reset();
  };

  return (
    <>
      <Page title="Profile">
        <div className="grid grid-cols-1 gap-6">
          {/* Profile Update Card */}
          <Card>
            <CardHeader>
              <CardTitle>Update Profile</CardTitle>
              <CardDescription>
                Update your personal information and profile picture.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                className="space-y-6"
              >
                {/* Avatar Section */}
                <div className="flex gap-4 items-center">
                  <div className="relative">
                    <img
                      src={avatarPreview || "/images/vespa-tiger.jpg"}
                      alt="Profile"
                      className="size-[100px] rounded-full object-cover border-4 border-white shadow-md"
                    />
                    {selectedAvatar && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                        onClick={removeAvatar}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      type="button"
                      variant="darkGreen"
                      className="px-6 py-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Ubah Foto
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleAvatarSelect}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Full Name Field */}
                <div>
                  <Label
                    htmlFor="fullName"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    Full Name
                  </Label>
                  <Input
                    {...profileForm.register("fullName")}
                    id="fullName"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                  {profileForm.formState.errors.fullName && (
                    <p className="text-sm text-red-600 mt-1">
                      {profileForm.formState.errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Action Button */}
                <Button
                  type="submit"
                  variant="darkGreen"
                  className="py-3"
                  disabled={updateProfileMutation.isPending}
                >
                  {updateProfileMutation.isPending
                    ? "Updating..."
                    : "Update Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Password Update Card */}
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="space-y-6"
              >
                {/* Current Password Field */}
                <div>
                  <Label
                    htmlFor="oldPassword"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    Current Password
                  </Label>
                  <Input
                    {...passwordForm.register("oldPassword")}
                    id="oldPassword"
                    type="password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your current password"
                  />
                  {passwordForm.formState.errors.oldPassword && (
                    <p className="text-sm text-red-600 mt-1">
                      {passwordForm.formState.errors.oldPassword.message}
                    </p>
                  )}
                </div>

                {/* New Password Field */}
                <div>
                  <Label
                    htmlFor="newPassword"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    New Password
                  </Label>
                  <Input
                    {...passwordForm.register("newPassword")}
                    id="newPassword"
                    type="password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your new password"
                  />
                  {passwordForm.formState.errors.newPassword && (
                    <p className="text-sm text-red-600 mt-1">
                      {passwordForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>

                {/* Confirm New Password Field */}
                <div>
                  <Label
                    htmlFor="confirmNewPassword"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    Confirm New Password
                  </Label>
                  <Input
                    {...passwordForm.register("confirmNewPassword")}
                    id="confirmNewPassword"
                    type="password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Confirm your new password"
                  />
                  {passwordForm.formState.errors.confirmNewPassword && (
                    <p className="text-sm text-red-600 mt-1">
                      {passwordForm.formState.errors.confirmNewPassword.message}
                    </p>
                  )}
                </div>

                {/* Action Button */}
                <Button
                  type="submit"
                  variant="darkGreen"
                  className="py-3"
                  disabled={updatePasswordMutation.isPending}
                >
                  {updatePasswordMutation.isPending
                    ? "Updating..."
                    : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <Toaster position="top-right" />
      </Page>
    </>
  );
};

export default Index;
