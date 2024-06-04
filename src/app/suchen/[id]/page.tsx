// src/app/suchen/[id]/page.tsx
'use client';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BuchDetail =  async () => {
    const [buch, setBuch] = useState<Buch>();
    const { id } = useParams();

    useEffect(() => {
        const buch = await fetch(`http://localhost:3000/rest/${id}`)
      }, [id]);

    return (
        <div>
        <p>{buch?.isbn}</p>
        </div>
    );
};

export default BuchDetail;
