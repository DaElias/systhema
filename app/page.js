import ListCustomers from "@/components/ListCustomers/ListCustomers"
import { attachConsole } from "tauri-plugin-log-api";
attachConsole()


export default function Home() {
  return (
    <ListCustomers />
  )
}
