import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@repo/ui";
import React, { useCallback } from "react";
import { HiMiniHome } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router";

const useCustomNavigate = () => {
  const navigate = useNavigate();
  return useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );
};

const AppBreadcrumbs = () => {
  const { pathname } = useLocation();
  const paths = pathname.split("/")?.filter((x) => x);
  const customNavigate = useCustomNavigate();
  const formattedPaths = [
    ...paths.map((name, index) => {
      const path = `/${paths.slice(0, index + 1).join("/")}`;
      return {
        label: name.replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2"),
        path,
      };
    }),
  ];
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xs sm:gap-1">
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => customNavigate("/")}
            className="flex items-center gap-1"
          >
            <HiMiniHome className="mb-[0.7px]" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {formattedPaths.length > 0 && <BreadcrumbSeparator />}
        {formattedPaths.length > 0 &&
          formattedPaths.map(({ label, path }, i) => (
            <React.Fragment key={i}>
              <BreadcrumbItem
                className={`${i + 1 === formattedPaths.length ? "font-medium" : "font-normal"}`}
              >
                <BreadcrumbLink
                  onClick={() => customNavigate(path)}
                  className="capitalize"
                >
                  {label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {i + 1 < formattedPaths.length && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadcrumbs;
