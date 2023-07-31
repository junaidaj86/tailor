import { redirect } from "next/navigation";

import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import prismadb from "@/lib/prismadb";

import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from "next-auth/next"

const Navbar = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/sign-in');
  }

 

  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
         
        </div>
      </div>
    </div>
  );
};
 
export default Navbar;