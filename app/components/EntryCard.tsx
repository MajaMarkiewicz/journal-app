const EntryCard = ({ entry }) => {
    const date = new Date(entry.createdAt).toDateString() // @todo style - choose date format
    return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5">{date}</div>
        <div className="px-4 py-5">
            <div>Main category: {entry.category}</div>
            { entry.additionalCategory ? <span>{entry.additionalCategory}</span> : null }
        </div>
        <div className="px-4 py-5">{entry.title}</div>
        <div className="px-4 py-5">{entry.description}</div>
    </div>
    )
}

export default EntryCard