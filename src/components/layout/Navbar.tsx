"use client";
import { Menu, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { SearchBox } from "../ui/searchbox";
import { useEffect, useState } from "react";

import { getSession } from "@/actions/user.action";
import { Medicine } from "@/types";
import MyCard from "../modules/homepage/MyCard";

// Extend Medicine type to include quantity for the cart logic
type CartItem = Medicine & { quantity: number };

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "https://i.ibb.co.com/nq2Pvqj9/meditore-logo.jpg",
    alt: "logo",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "All Medicine", url: "/all-medicine" },
    { title: "About Us", url: "/about" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  // --- CART STATES ---
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. Load cart and listen for updates
  const loadCart = () => {
    const saved = localStorage.getItem("pending_cart_items");
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadCart();
    // Listen for custom event from MedicineCard and storage changes
    window.addEventListener("cart-updated", loadCart);
    window.addEventListener("storage", loadCart);

    // Load Session
    const loadSession = async () => {
      try {
        const res = await getSession();
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadSession();

    return () => {
      window.removeEventListener("cart-updated", loadCart);
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  // 2. Persistent Cart Handlers
  const updateQuantity = (id: string, delta: number) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("pending_cart_items", JSON.stringify(updated));
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("pending_cart_items", JSON.stringify(updated));
  };

  return (
    <section
      className={cn(
        "py-4 sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-16 object-contain"
                alt={logo.alt}
              />
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div>
            <SearchBox />
          </div>

          <div className="flex gap-2">
            {/* Desktop Shopping Cart Icon */}
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsDrawerOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </div>

            <ModeToggle />
            <Button asChild variant="outline" size="sm">
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
            </a>

            <div className="flex items-center gap-2">
              {/* Mobile Shopping Cart Icon */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                      {cartItems.length}
                    </span>
                  )}
                </Button>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <a href={logo.url} className="flex items-center gap-2">
                        <img
                          src={logo.src}
                          className="max-h-8 dark:invert"
                          alt={logo.alt}
                        />
                      </a>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>
                    <div>
                      <SearchBox />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Button asChild variant="outline">
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button asChild>
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* RENDER THE PERSISTENT CART MODAL */}
      <MyCard
        open={isDrawerOpen}
        setOpen={setIsDrawerOpen}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <Link
      key={item.title}
      href={item.url}
      className="text-md font-semibold py-2 border-b"
    >
      {item.title}
    </Link>
  );
};

export { Navbar };
