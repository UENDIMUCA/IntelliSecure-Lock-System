import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {Link, useLocation} from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.tsx";
import LogoutButton from "@/components/LogoutButton.tsx";
import {isAdmin, isLogged} from "@/lib/utils.ts";
import {useEffect, useState} from "react";

const AllNavLinks = [
  { id: 1, name: 'Home', path: '/' },
  { id: 2, name: 'Dashboard', path: '/dashboard' },
  { id: 3, name: 'Profile', path: '/profile' },
];

export default function NavBar() {
  const [NavLinks, setNavLinks] = useState(AllNavLinks);

  const pathname = useLocation();
  const isActive = (path: string) => path === pathname.pathname;

  useEffect(() => {
    let tmpLinks = AllNavLinks;
    if (isLogged()) {
      if (!isAdmin()){
        tmpLinks = tmpLinks.filter(item => item.id !== 2);
      }
      tmpLinks = tmpLinks.filter(item => item.id !== 1);
    } else {
      tmpLinks = tmpLinks.filter(item => item.id == 1);
    }
    setNavLinks(tmpLinks);
  }, [pathname]);

  return (
    <header className="z-50 sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Toaster/>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">

        <Link
          to={"/"}
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <img src={"/vite.svg"} alt={"logo"}/>
        </Link>

        {NavLinks.map((link) => (

          <Link
            key={link.id}
            to={link.path}
            className={isActive(link.path) ? 'text-foreground transition-colors' : 'text-muted-foreground hover:text-primary transition-colors'}
          >
            {link.name}
          </Link>

        ))}
        {isLogged() ? <LogoutButton/> : null}

      </nav>
      <div className="ml-auto flex items-center justify-around">
        <Sheet >
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5"/>
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to={"/"}
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <img src="/vite.svg" alt={"logo"} width={64} height={64}/>
              </Link>

              {NavLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  className={isActive(link.path) ? 'text-foreground transition-colors' : 'text-muted-foreground hover:text-primary transition-colors'}
                >
                  {link.name}
                </Link>
              ))}
              {isLogged() ? <LogoutButton/> : null}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
