/*
|----------------------------------------------------------------------------------
| ProfileImage Component
|----------------------------------------------------------------------------------
| Renders a user profile image using a randomly selected image source.
| Optionally accepts a width and a number to seed the random image generation.
|
| Props:
| - width (number): Width of the image in pixels. Defaults to 25.
| - number (number): Optional seed or identifier to fetch a specific/random image.
|
| Note:
| - The image source is determined by the `getRandomImage` utility function.
*/

import { getRandomImage } from "../lib/utils"

type Props = {
  width?: number
  number?: number
}

const ProfileImage = ({ width = 25, number }: Props) => {
  return <img src={getRandomImage(number)} alt="user" width={width} />
}

export default ProfileImage
