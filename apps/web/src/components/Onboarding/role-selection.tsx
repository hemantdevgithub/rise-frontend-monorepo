"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import { UserRole } from "@/constants/roles";
import { logOut, selectUser } from "@/redux/features/auth/authSlice";
import { useUserOnboardingMutation } from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, Card } from "@repo/ui";
import { toast } from "sonner";

type Role = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

const roles: Role[] = [
  {
    id: UserRole.LEARNER,
    title: "Learner",
    description:
      "Access curated courses and learning paths designed to help you acquire new skills and knowledge at your own pace. Connect with instructors and fellow learners in a supportive community.",
    icon: "🎓",
  },
  {
    id: UserRole.RESEARCHER,
    title: "Researcher",
    description:
      "Share your expertise by creating and publishing courses. Engage with students, track their progress, and earn revenue while making a positive impact on their learning journey.",
    icon: "👨‍🏫",
  },
  {
    id: UserRole.IMPACT_INVESTOR,
    title: "Impact Investor",
    description:
      "Discover promising opportunities in the education technology sector. Access detailed analytics, growth metrics, and connect with innovative startups transforming the learning landscape.",
    icon: "💰",
  },
  {
    id: UserRole.IMPACT_ENTITY,
    title: "Impact Entity",
    description:
      "Curate and review educational content to ensure quality and accuracy. Collaborate with instructors to refine courses and maintain high standards across the platform.",
    icon: "✏️",
  },
];

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(roles[0].id);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [mutation, { isLoading }] = useUserOnboardingMutation();
  const handleSubmit = async () => {
    if (!user) {
      return;
    }
    try {
      const response = await mutation({ role: selectedRole }).unwrap();
      if (response.success) {
        toast.success(response.message + " Please re login now!");
        dispatch(logOut());
      }
    } catch (error) {
      toast.error("Failed to process your request!");
    }
  };

  const selectedRoleData = roles.find((role) => role.id === selectedRole);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          Welcome! Tell us about yourself
        </h1>
        <p className="text-muted-foreground">
          Select your primary role to personalize your experience
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        {roles.map((role) => (
          <motion.div
            key={role.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`flex h-full cursor-pointer flex-col items-center p-4 text-center transition-colors ${
                selectedRole === role.id
                  ? "border-primary bg-primary/10"
                  : "hover:bg-foreground/20"
              }`}
              onClick={() => setSelectedRole(role.id)}
            >
              <div className="mb-2 text-4xl">{role.icon}</div>
              <h3 className="mb-1 font-medium">{role.title}</h3>
              {selectedRole === role.id && (
                <CheckCircle2 className="mt-2 h-5 w-5 text-primary" />
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedRoleData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-primary/5 p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{selectedRoleData.icon}</div>
              <div>
                <h3 className="mb-2 text-xl font-medium">
                  {selectedRoleData.title}
                </h3>
                <p className="text-muted-foreground">
                  {selectedRoleData.description}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={!selectedRole || isLoading}
        >
          Continue as{" "}
          {selectedRole
            ? roles.find((r) => r.id === selectedRole)?.title
            : "..."}
        </Button>
      </div>
    </div>
  );
}
