import {useRouter} from "next/router";
import {useEffect} from "react";

const OauthPage = () => {
  const router = useRouter()

  useEffect(() => {

  }, [router?.query?.])

  return null
}

export default OauthPage
