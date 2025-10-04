import { SignInButton, SignedOut, SignedIn, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
import { PenBox } from "lucide-react"
import UserMenu from "./user-menu"
import { checkUser } from "@/lib/checkUser"
const Header = async () => {
  await checkUser();
  return (
    <header className="container ">

      <nav className="flex justify-between items-center">
        <Link href={'/'}>
          <Image src={"/logonew.png"} alt="Logo" width={200} height={56}
            className="h-32 w-auto object-contain">

            </Image>
        </Link>
        <div className="flex items-center gap-4">
          <Link href={'/project/create'}>
          <Button variant={'destructive'} className="flex items-center gap-2 ">
            <PenBox size={18}></PenBox>
            <span>Create Project</span>
          </Button>
          </Link>

      <SignedOut>
        <SignInButton forceRedirectUrl={"/onboarding"}>
        <Button variant={"outline"}>Login</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserMenu></UserMenu>
      </SignedIn>
        </div>
     
      </nav>

    </header>

  )
}

export default Header