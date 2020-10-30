import { Box, chakra, Stack, useColorModeValue } from "@chakra-ui/core"
import { useLocation } from "@reach/router"
import * as React from "react"
import SidebarCategory from "./sidebar-category"
import SidebarLink from "./sidebar-link"

const Sidebar = ({ routes }) => {
    const { pathname } = useLocation()
    const ref = React.useRef(null)
    const headingColor = useColorModeValue("gray.700", "inherit");
    return (
        <Box
            ref={ref}
            as="aside"
            pos="sticky"
            top="6.5rem"
            w="280px"
            pr="8"
            pb="8"
            pl="3"
            overflowY="auto"
            className="sidebar-content"
            flexShrink={0}
            h="calc(((100vh - 1.5rem) - 64px) - 42px);"
            display={{ base: "none", md: "block" }}
        >
            {/* <Search /> */}
            {routes.map((c1, idx) => {
                return (
                    <React.Fragment key={idx}>
                        {c1.heading && (
                            <chakra.h4
                                fontSize="sm"
                                fontWeight="bold"
                                my="1.25rem"
                                textTransform="uppercase"
                                letterSpacing="wider"
                                color={headingColor}
                            >
                                {c1.title}
                            </chakra.h4>
                        )}

                        {c1.routes.map((c2) => {
                            if (!c2.routes) {
                                return (
                                    <SidebarLink ml="-3" mt="2" key={c2.path} href={c2.path}>
                                        {c2.title}
                                    </SidebarLink>
                                )
                            }

                            const selected = pathname.startsWith(c2.path)
                            const opened = selected || true

                            return (
                                <SidebarCategory
                                    contentRef={ref}
                                    key={c2.path}
                                    {...c2}
                                    selected={selected}
                                    opened={opened}
                                >
                                    <Stack>
                                        {c2.routes.map((c3) => (
                                            <SidebarLink key={c3.path} href={c3.path}>
                                                {c3.title}
                                            </SidebarLink>
                                        ))}
                                    </Stack>
                                </SidebarCategory>
                            )
                        })}
                    </React.Fragment>
                )
            })}
        </Box>
    )
}

export default Sidebar
