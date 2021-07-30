import {
  Button, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import ChannelMessage from "./ChannelMessage";
import {ChannelMessage as ChannelMessageType} from "../interfaces/channelMessage";


interface SendMessageModalProps {
  isOpen: boolean
  onClose: () => void
  selectedMessage: ChannelMessageType
}

const SendMessageModal = ({ isOpen, onClose, selectedMessage }: SendMessageModalProps) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent background={"gray.900"}>
        <ModalHeader color={"white"}>Modal Title</ModalHeader>
        <ModalCloseButton color={"gray.600"} />
        <ModalBody>
          <ChannelMessage message={selectedMessage} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="pink" variant={"outline"} mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme={"pink"}>Send message</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SendMessageModal
