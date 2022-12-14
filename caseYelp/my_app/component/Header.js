import React, { useState } from 'react'
import {
    Grid,
    GridItem,
    Flex,
    Center,
    Box,
    IconButton,
    Heading,
    Spacer,
    ButtonGroup,
    Select,
    Icon,
    useColorModeValue,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useDisclosure,
    Input,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    AddIcon,
    Avatar,
    AvatarBadge,
    AvatarGroup,
    Tag,
    Badge,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
    AspectRatio,
    Image,
    NextLink,
    Link,
    Stack,
    Text,
    useCheckboxGroup
} from '@chakra-ui/react'
import { Search2Icon, HamburgerIcon, BellIcon, StarIcon, SmallAddIcon } from '@chakra-ui/icons'
import {
    FiTag,
} from 'react-icons/fi';
import { useRouter } from 'next/router'
import { getSession } from "next-auth/react";

const Header = ({tagContent, _userInf}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const router = useRouter()
    const [tags, setTags] = useState([])
    //const [alltags, setAlltags] = useState(_alltags)

    const {
        Email,
        Image, 
        Name,
        UserId
    } =  _userInf
    const handleOpen = async () => {
        setTags(tagContent)
        onOpen();
    }

    const submitTags = async () => {
        const response = await fetch('/api/tag', {
            method: 'POST',
            body: JSON.stringify(tags),
        })
        onClose();
        router.reload(router.pathname)
    }

    const changeSelectStatus = async (tagid) => {
        for (let i = 0; i < tags; i++) {
            if (tags[i].tagId == tagid) {
                tags[i].selected = !tags[i].selected
            }
        }
    }
    return (
        <>
            <Flex as='nav' align='center' justify='space-between' wrap='wrap' padding='1rem' bg='#0a304e' color='white' marginBotton='2rem' boxShadow='Base'>
                <Flex align='center' mr={10}>
                    <Heading as='h1' size='lg' letterSpacing={'-.1rem'}>
                        CaseReview
                    </Heading>
                </Flex>
                <ButtonGroup gap='1'>
                    <IconButton color='black' icon={<FiTag />} onClick={handleOpen}></IconButton>
                    <IconButton color='black' icon={<BellIcon />}></IconButton>
                    <Menu>
                        <MenuButton
                            color='black'
                            as={IconButton}
                            aria-label='Options'
                            variant='unstyled'
                        >
                            <Box>
                                <Avatar size='sm' name={Name} src={Image}></Avatar>
                            </Box>
                        </MenuButton>
                        <MenuList color='black'>
                            <MenuItem onClick={() => router.push('/profile')}>
                                My account
                            </MenuItem>
                            <MenuItem>
                                My tags
                            </MenuItem>
                        </MenuList>
                    </Menu>


                    <Drawer
                        isOpen={isOpen}
                        placement='right'
                        onClose={onClose}
                        finalFocusRef={btnRef}
                        onOpen={handleOpen}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>Tag</DrawerHeader>

                            <DrawerBody>

                                <Box>
                                    {tags.map((tag) => (tag.selected ?
                                        <Tag
                                            size='sm'
                                            key={tag.tagId}
                                            borderRadius='full'
                                            variant='solid'
                                            colorScheme='green'
                                            mr={1}
                                        >
                                            <TagLabel>{tag.tagName}</TagLabel>
                                            <TagCloseButton onClick={() => {
                                                setTags(
                                                    tags.map((item) =>
                                                        item.tagId === tag.tagId
                                                            ? { ...item, selected: false }
                                                            : { ...item }
                                                    )
                                                );
                                            }} />
                                        </Tag> :
                                        <Tag
                                            size='sm'
                                            key={tag.tagId}
                                            borderRadius='full'
                                            variant='solid'
                                            colorScheme='red'
                                            mr={1}
                                        >
                                            <TagLabel>{tag.tagName}</TagLabel>
                                            <IconButton color='black' icon={<SmallAddIcon />} size='24px' ml={2} onClick={() => {
                                                setTags(
                                                    tags.map((item) =>
                                                        item.tagId === tag.tagId
                                                            ? { ...item, selected: true }
                                                            : { ...item }
                                                    )
                                                );
                                            }} />
                                        </Tag>
                                    ))}
                                </Box>
                            </DrawerBody>

                            <DrawerFooter>
                                <Button variant='outline' mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='blue' onClick={submitTags} href={'/home'}>Save</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </ButtonGroup>
            </Flex>

        </>
    )
}

export default Header