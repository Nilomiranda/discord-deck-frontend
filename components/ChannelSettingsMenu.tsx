import { IoSettings } from 'react-icons/io5'
import { IconButton, Menu, MenuButton, MenuList, MenuItem, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Text, ModalFooter, Button, Modal, useToast } from '@chakra-ui/react'
import Select from 'react-select'
import { useQuery } from 'react-query'
import { useContext, useEffect, useState } from 'react'
import { GuildRole } from '../interfaces/guildRole'
import { GuildChannel } from '../interfaces/guildChannel'
import { UserContext } from '../contexts/CurrentUser'
import { TOAST_DEFAULT_DURATION } from '../config/constants'
import { saveChannelPresetRoles } from '../services/channels'

interface ChannelSettingsMenuProps {
  channel: GuildChannel
}

const ChannelSettingsMenu = ({ channel }: ChannelSettingsMenuProps) => {
  const toast = useToast()
  const { user } = useContext(UserContext)
  const { data: rolesData } = useQuery<{ roles: GuildRole[] }>(`discord/guilds/roles?guildId=${user?.guildID}`, { enabled: !!user?.guildID })
  const { data: rolesPresetData } = useQuery<{ rolesIds: string[] }>(`/users/channels/${channel?.id}/presets`, { enabled: !!channel?.id && !!rolesData?.roles?.length })

  const [selectedRoles, setSelectedRoles] = useState<{ label: string; value: string }[]>([])
  const [saving, setSaving] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleMentionListChanged = (values: { label: string; value: string }[]) => {
    setSelectedRoles([...values])
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const handleOpenPresetRolesSettingsModal = (event) => {
    event?.stopPropagation()
    setIsOpen(true)
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      await saveChannelPresetRoles(
        channel?.id,
        selectedRoles?.map((selectedRole) => selectedRole?.value)
      )
      toast({
        status: 'success',
        description: 'Selected roles saved',
        duration: TOAST_DEFAULT_DURATION,
        isClosable: true,
      })
    } catch (err) {
      toast({
        status: 'error',
        description: 'Could not save selected roles. Please try again later',
        duration: TOAST_DEFAULT_DURATION,
        isClosable: true,
      })
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    if (rolesPresetData?.rolesIds?.length) {
      setSelectedRoles(
        rolesPresetData?.rolesIds
          ?.map((roleId) => {
            const role = rolesData?.roles?.find((roleData) => roleData?.id === roleId)

            if (role) {
              return { label: role?.name, value: role?.id }
            }

            return null
          })
          .filter((role) => !!role?.value)
      )
    }
  }, [rolesPresetData])

  return (
    <>
      <Menu>
        <MenuButton as={IconButton} icon={<IoSettings />} variant="link" aria-label="Channel settings" borderColor="gray.700" onClick={(event) => event?.stopPropagation()} />
        <MenuList background="gray.800">
          <MenuItem background="gray.800" _focus={{ background: 'gray.700' }} _hover={{ background: 'gray.700' }} onClick={handleOpenPresetRolesSettingsModal}>
            Preset roles
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent background="gray.900">
          <ModalCloseButton color="gray.600" />
          <ModalBody mt="3rem">
            <Text color="white" fontSize="sm" mb="0.75rem">
              Roles
            </Text>
            <Select
              value={selectedRoles}
              isMulti
              options={rolesData?.roles?.length ? rolesData?.roles?.map((role) => ({ label: role?.name, value: role?.id })) : []}
              className="basic-multi-select"
              classNamePrefix="friday-deck-select"
              onChange={handleMentionListChanged}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="pink" variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="pink" onClick={handleSave} isLoading={saving}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ChannelSettingsMenu
