import {InputGroup, InputLeftElement} from "@chakra-ui/react";
import { IoSearchOutline } from 'react-icons/io5'
import Input from "./Input";

interface SearchInputProps {
  placeholder?: string;
  // eslint-disable-next-line no-unused-vars
  onSearchChange: (text: string) => void
}

const SearchInput = ({ placeholder, onSearchChange }: SearchInputProps) => {
  return (
    // <InputGroup>
    //   <InputLeftElement pointerEvents="none" mr={"1rem"}>
    //     <IoSearchOutline color="white" />
    //   </InputLeftElement>
    //   <Input placeholder={placeholder} onChange={({ target: { value } }) => onSearchChange(value)} />
    // </InputGroup>
    <Input placeholder={placeholder} onChange={({ target: { value } }) => onSearchChange(value)} />
  )
}

export default SearchInput
