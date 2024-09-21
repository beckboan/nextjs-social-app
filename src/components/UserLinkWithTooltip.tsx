"use client";

import kyInstance from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "ky";
import Link from "next/link";
import React from "react";
import UserTooltip from "./UserTooltip";
import { UserData } from "@/lib/types";

interface UserLinkWithTooltipProps {
  children: React.ReactNode;
  username: string;
}

const UserLinkWithTooltip: React.FC<UserLinkWithTooltipProps> = ({
  children,
  username,
}) => {
  const { data } = useQuery({
    queryKey: ["user-data", username],
    queryFn: () => kyInstance.get(`/api/users/username/${username}`).json(),
    retry(failureCount, error) {
      if (error instanceof HTTPError && error.response.status === 404)
        return false;
      return failureCount < 3;
    },
    staleTime: Infinity,
  });

  if (!data) {
    return (
      <Link
        href={`/users/${username}`}
        className="text-primary hover:underline"
      >
        {children}
      </Link>
    );
  }

  return (
    <UserTooltip user={data as UserData}>
      <Link
        href={`/users/${username}`}
        className="text-primary hover:underline"
      >
        {children}
      </Link>
    </UserTooltip>
  );
};

export default UserLinkWithTooltip;
