"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { EmptyLinkField, KeyTextField } from "@prismicio/client";
import {
  NavigationMenuSliceDefaultItem,
  Simplify,
} from "../../prismicio-types";

interface MenuItemsArray {
  parenttext: KeyTextField;
  parentlink: EmptyLinkField<"Any"> | undefined;
  items: Simplify<NavigationMenuSliceDefaultItem>[];
}

// Use the interface in the ClientSidedNavigation component
interface ClientSidedNavigationProps {
  menuItemsArrays: MenuItemsArray[];
}

export function ClientSidedNavigation({
  menuItemsArrays,
}: ClientSidedNavigationProps) {
  return (
    <NavigationMenu className="z-40">
      <NavigationMenuList>
        {menuItemsArrays.map((menuGroup, index) =>
          menuGroup.items.length > 0 ? (
            // Render NavigationMenuItem with trigger and content if items are present
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger>
                {menuGroup.parenttext}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {menuGroup.items.map((item, itemIndex) => (
                    <ListItem
                      key={itemIndex}
                      title={item.childtext ?? "Default Title"}
                      href={"url" in item.childlink ? item.childlink.url : "#"}
                    >
                      {/* If you have descriptions or other content, render it here */}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            // Render default NavigationMenuItem without trigger if no items are present
            <NavigationMenuItem key={index}>
              <Link
                href={
                  menuGroup.parentlink &&
                  "url" in menuGroup.parentlink &&
                  typeof menuGroup.parentlink?.url === "string"
                    ? menuGroup.parentlink.url
                    : "#"
                }
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {menuGroup.parenttext}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className,
          )}
          {...props}
        >
          <div className="font-heading text-sm font-medium leading-none hover:text-sfplus-light-blue focus:text-sfplus-light-blue">
            {title}
          </div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
