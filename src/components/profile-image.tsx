import { getRandomImage } from "../lib/utils"

type Props = {
  width?: number
}

const ProfileImage = ({ width = 25 }: Props) => {
  return <img src={getRandomImage()} alt="user" width={width} />
}

export default ProfileImage
