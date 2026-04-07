"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChurchIcon, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar variant="floating">
      {/* Sidebar Header */}
      {/* <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Select defaultValue="ipa">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a igreja" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Matriz</SelectLabel>
                  <SelectItem value="ipa" defaultChecked>
                    Igreja Presbiteriana Anápolis
                  </SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Congregação</SelectLabel>
                  <SelectItem value="grapes">
                    Igreja Presbiteriana Boas Novas
                  </SelectItem>
                  <SelectItem value="pineapple">
                    Igreja Presbiteriana Boas Novas
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader> */}

      {/* Sidebar Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Membros</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/rol"}>
                  <Link href="/rol" onClick={() => setOpenMobile(false)}>
                    Rol de membros
                  </Link>
                </SidebarMenuButton>
                {/* <SidebarMenuBadge>2146</SidebarMenuBadge> */}
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/novos-membros"}
                >
                  <Link
                    href="/novos-membros"
                    onClick={() => setOpenMobile(false)}
                  >
                    Novos membros
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/igreja/stats"}
                >
                  <Link
                    href="/igreja/stats"
                    onClick={() => setOpenMobile(false)}
                  >
                    Estatísticas
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/igreja/novos-membros"}
                >
                  <Link
                    href="/igreja/novos-membros"
                    onClick={() => setOpenMobile(false)}
                  >
                    Novos membros
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge>24</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/igreja/batismos"}
                >
                  <Link
                    href="/igreja/batismos"
                    onClick={() => setOpenMobile(false)}
                  >
                    Batismos
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <ChurchIcon />{" "}
              <span className="text-sm tracking-tight">
                Igreja Presbiteriana de Anápolis
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
