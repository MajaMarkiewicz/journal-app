'use client'

import { updateJournalEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from "react-autosave"

const TextEditor = ({ entry }) => {
    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false)

    useAutosave({
        data: value,
        onSave: async (newValue) => {
            setIsLoading(true)
            // await updateJournalEntry(entry.id, newValue) // @todo db  - uncomment when patch works correctly
            setIsLoading(false)
        },
    })

    return (
        <div className="w-full h-full">
            {isLoading && (<div>...loading</div>)}
            <textarea
                className="w-full h-full p-8 text-xl outline-none"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}

export default TextEditor