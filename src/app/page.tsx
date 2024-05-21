import Image from "next/image";
import styles from "./page.module.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <ChakraProvider>
      <Navbar />
    </ChakraProvider>
  );
}
