import { firebase } from "@/config/firebase";
import {
  collection,
  onSnapshot,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useFetchData = <T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collectionName) return;
    const collectionRef = collection(firebase, collectionName);
    const q = query(collectionRef, ...constraints);
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const fetchData = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as T[];
        setData(fetchData);
        setLoading(false);
      },
      (error) => {
        console.log("Error fetching data: ", error);
        setError(error.message);
        setLoading(false);
      }
    );
    return () => unsub();
  }, [collectionName, constraints]);
  return { data, loading, error };
};
