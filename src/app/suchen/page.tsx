'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { SimpleGrid } from "@chakra-ui/react";
import AdvancedSearch from "../components/AdvancedSearch";
import getBuecher from "../lib/getBuecher";

export default function Suchen({
  searchParams
}: {
  searchParams: {
    titel: string;
  }
}) {
  const [buecher, setBuecher] = useState<Buch[]>([]);

  useEffect(() => {
    const fetchBuecher = async () => {
      const buecherData: Promise<Buch[]> = getBuecher(`titel=${searchParams.titel}`);
      setBuecher(await buecherData);
    }
    fetchBuecher();
  }, [searchParams])

  return (
    <SimpleGrid>
      <AdvancedSearch />
      <section>
        {buecher.map(buch => (
          <p key={buch.isbn}>
            {buch.isbn}
          </p>
        ))}
      </section>
    </SimpleGrid>
  );
}
