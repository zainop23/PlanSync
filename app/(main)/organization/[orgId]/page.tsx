import { getOrganization } from '@/actions/organization';
import OrgSwitcher from '@/components/org-switcher';
import React from 'react'
import ProjectList from './_components/project-list';
import UserIssues from './_components/user-issues';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

type OrganizationPageProps = {
  params: {
    orgId: string;
  };
};

const Organization = async ({ params }: OrganizationPageProps) => {
  const { orgId } = params;
  const {userId} =  await auth();
  if(!userId) redirect('/sign-in')
  const organization = await getOrganization(orgId);
  if (!organization)
  return (
    <div
      className="flex flex-col items-center justify-center h-96 text-gray-200 text-xl font-semibold rounded-lg shadow"
    >
      Organization Not Found!
    </div>
  );
  return (
     <div className="container mx-auto px-4">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start">
        <h1 className="text-5xl font-bold gradient-title pb-2">
          {organization.name}&rsquo;s Projects
        </h1>

        <OrgSwitcher />
      </div>
       <div className="mb-4">
        <ProjectList orgId={organization.id} />
      </div>
      {userId && (
        <div className="mt-8">
          <UserIssues userId={userId} />
        </div>
      )}
    </div>
  );
};

export default Organization;