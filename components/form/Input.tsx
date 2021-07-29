import { Input as ChakraInput, FormControl,
  FormLabel,
  FormErrorMessage,
   } from '@chakra-ui/react'
import {ChangeEventHandler} from "react";

interface InputProps {
  id?: string
  label?: string
  type?: string
  error?: string
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: string
}

const Input = ({ id = '', type = 'text', label, error = '', placeholder = '', onChange, value }: InputProps) => {
  return (
    <FormControl id={id}>
      { label ? <FormLabel color={"white"} mb={"0.5rem"}>{label}</FormLabel> : null }
      <ChakraInput type={type} placeholder={placeholder} background={"transparent"} color={"white"} borderStyle={"solid"} borderColor={"gray.600"} onChange={onChange} value={value} />
      { error ? <FormErrorMessage>{error}</FormErrorMessage> : null }
    </FormControl>
  )
}

export default Input
