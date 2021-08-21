import {
  Box,
  Button,
  HStack, List, ListItem, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter, ModalHeader,
  ModalOverlay,
  Switch,
  Text
} from "@chakra-ui/react";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import {useQuery} from "react-query";
import {GuildChannel} from "../../interfaces/guildChannel";
import {UserContext} from "../../contexts/CurrentUser";
import SearchInput from "../form/SearchInput";
import {useHiddenChannelsStore} from "../../stores/visibleChannelsStore";

const EditChannelsVisibility = () => {
  const hiddenChannels = useHiddenChannelsStore(state => state?.channels)
  const addChannelsToHiddenList = useHiddenChannelsStore(state => state?.addChannelsToHiddenList)
  const removeChannelsFromHiddenList = useHiddenChannelsStore(state => state?.removeChannelsFromHiddenList)
  const addChannelsFromLocalStorage = useHiddenChannelsStore(state => state?.addChannelsFromLocalStorage)
  const clearHiddenChannelsList = useHiddenChannelsStore(state => state?.clearHiddenChannelsList)

  const { user } = useContext(UserContext)
  const { data: channelsData } = useQuery<{ channels: GuildChannel[] }>(`discord/channels?guildId=${user?.guildID}`, { enabled: !!user?.guildID })

  const [modalOpen, setModalOpen] = useState(false)
  const [channelsOriginalList, setChannelsOriginalLit] = useState<GuildChannel[]>([])
  const [channels, setChannels] = useState<GuildChannel[]>([])
  const [hiddenChannelsIds, setHiddenChannelsIds] = useState<string[]>([])

  const handleChannelsSearch = (searchParams: string) => {
    setChannels(channelsOriginalList?.filter((channel) => channel.name?.includes(searchParams)))
  }

  const handleEditClick = () => {
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const handleChannelToggle = (event: ChangeEvent<HTMLInputElement>, channel: GuildChannel) => {
    const { target: { checked } } = event
    if (!checked) {
      addChannelsToHiddenList(channel)
    } else {
      removeChannelsFromHiddenList(channel?.id)
    }
  }

  const verifySavedPreviouslySavedChannels = (channels: GuildChannel[] = []) => {
    const previouslySelectedChannelsIds = JSON.parse(window?.localStorage?.getItem('SAVED_HIDDEN_CHANNELS') || '[]')

    if (previouslySelectedChannelsIds?.length) {
      const previouslySelectedChannels: GuildChannel[] = previouslySelectedChannelsIds?.map((channelId) => channels?.find((channel) => channel?.id === channelId))
      addChannelsFromLocalStorage(previouslySelectedChannels)
    }
  }

  useEffect(() => {
    setChannelsOriginalLit(channelsData?.channels?.length ? [...channelsData?.channels] : [])
    setChannels(channelsData?.channels?.length ? [...channelsData?.channels] : [])
  }, [channelsData])

  useEffect(() => {
    if (channelsData?.channels?.length) {
      verifySavedPreviouslySavedChannels(channelsData?.channels)
    }
  }, [channelsData])

  useEffect(() => {
    if (hiddenChannels) {
      setHiddenChannelsIds(hiddenChannels?.map(hiddenChannel => hiddenChannel?.id))
    }
  }, [hiddenChannels])

  return (
    <>
      <HStack justify={"end"}>
        <Button colorScheme={"pink"} size={"sm"} onClick={handleEditClick}>Edit</Button>
      </HStack>

      <Modal isCentered onClose={handleModalClose} isOpen={modalOpen} motionPreset="slideInBottom">
        <ModalOverlay/>
        <ModalContent background="gray.900">
          <ModalCloseButton color="gray.600" />
          <ModalHeader>
            <Text color={"white"}>Hide channels</Text>
          </ModalHeader>
          <ModalBody mt="0.5rem" overflowY={"hidden"}>
            <>
              <SearchInput onSearchChange={handleChannelsSearch} placeholder="Search channel" />
              <List spacing={3} height={"300px"} overflowY={"auto"} mt={"1.5rem"} pr={"1rem"}>
                {
                  channels?.filter((channel) => channel?.type === 0)?.map(channel => (
                  <ListItem key={channel?.id} color={"white"}>
                    <HStack justify={"space-between"} w={"100%"}>
                      <Text color={"white"}>{channel?.name}</Text>
                      <Switch size="sm" colorScheme={"pink"} onChange={(event) => handleChannelToggle(event, channel)} isChecked={!hiddenChannelsIds?.includes(channel?.id)} />
                    </HStack>
                  </ListItem>
                  ))
                }
              </List>
            </>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"pink"} variant={"link"} onClick={() => clearHiddenChannelsList()}>Reset</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditChannelsVisibility
