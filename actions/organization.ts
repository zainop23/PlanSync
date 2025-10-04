"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
 

export async function getOrganization(slug: string) {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    });
    if (!user) throw new Error("User not found");

    let organization;
    try {
        organization = await (await clerkClient()).organizations.getOrganization({ slug });
    } catch (err) {
        // Organization not found or error occurred
        return null;
    }

    if (!organization) return null;

    const { data: membership } = await (await clerkClient()).organizations.getOrganizationMembershipList({
        organizationId: organization.id
    });

    const userMembership = membership.find(
        (member) => member.publicUserData?.userId === userId
    );

    if (!userMembership) return null;

    return organization;
}

export async function getProjects(orgId:any) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const projects = await db.project.findMany({
    where: { organizationId: orgId },
    orderBy: { createdAt: "desc" },
  });

  return projects;
}

export async function getUserIssues(userId: string) {
  const { orgId } = await auth();

  if (!userId || !orgId) {
    throw new Error("No user id or organization id found");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const issues = await db.issue.findMany({
    where: {
      OR: [{ assigneeId: user.id }, { reporterId: user.id }],
      project: {
        organizationId: orgId,
      },
    },
    include: {
      project: true,
      assignee: true,
      reporter: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  return issues;
}

export async function getOrganizationUsers(orgId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const organizationMemberships =
    await (await clerkClient()).organizations.getOrganizationMembershipList({
      organizationId: orgId,
    });

  const userIds = organizationMemberships.data.map(
    (membership: any) => membership.publicUserData.userId
  );

  const users = await db.user.findMany({
    where: {
      clerkUserId: {
        in: userIds,
      },
    },
  });

  return users;
}

