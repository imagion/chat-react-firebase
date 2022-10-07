import { useEffect, useRef, useState } from 'react'

// firebase imports
import { db } from '../firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

export const useCollection = (collectionRef, _q) => {
  const [documents, setDocuments] = useState(null)

  // set up querry
  const q = useRef(_q).current

  useEffect(() => {
    let ref = collection(db, collectionRef)

    if (q) {
      ref = query(ref, where(...q))
    }

    const unsub = onSnapshot(ref, snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() })
      })
      setDocuments(results)
    })

    return () => unsub()
  }, [collectionRef])

  return { documents }
}
