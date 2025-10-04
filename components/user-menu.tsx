'use client'

import { useRouter } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { ChartNoAxesGantt } from 'lucide-react';

export default function Home() {
    const router = useRouter()

    return (

        <UserButton>
            <UserButton.MenuItems>
                <UserButton.Action
                    label="My Organizations"
                    labelIcon={<ChartNoAxesGantt />}
                    onClick={() => router.push('/onboarding')}
                />
                <UserButton.Action label='manageAccount' />
            </UserButton.MenuItems>
        </UserButton>

    )
}
