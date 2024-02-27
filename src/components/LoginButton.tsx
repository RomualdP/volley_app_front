import { EnterIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export default function LoginButton() {
  return (
    <Link href={'/login'}>
      <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        <EnterIcon width={24} height={24}/>
      </button>
    </Link>
  )
}
