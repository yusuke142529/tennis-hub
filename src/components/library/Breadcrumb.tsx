"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"

type Crumb = {
    href: string
    label: string
}

type BreadcrumbProps = {
    crumbs: Crumb[]
}

export default function CustomBreadcrumb({ crumbs }: BreadcrumbProps) {
    const separatorColor = useColorModeValue("gray.500", "gray.300")

    return (
        <Breadcrumb 
          spacing="8px" 
          separator=">" 
          aria-label="パンくずリスト" 
          role="navigation" 
          aria-live="polite"
        >
            {crumbs.map((crumb, index) => {
                const isCurrentPage = index === crumbs.length - 1
                return (
                    <BreadcrumbItem key={crumb.href} isCurrentPage={isCurrentPage}>
                        <BreadcrumbLink 
                          as={NextLink} 
                          href={crumb.href} 
                          aria-label={crumb.label}
                          {...(isCurrentPage ? { 'aria-current': 'page' } : {})}
                        >
                            {crumb.label}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )
            })}
        </Breadcrumb>
    )
}