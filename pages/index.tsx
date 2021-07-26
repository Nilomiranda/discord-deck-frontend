import { authGuard } from '../guards/auth'

export async function getServerSideProps({ req }) {
  return authGuard(req)
}

export default function Index() {
  return null
}
