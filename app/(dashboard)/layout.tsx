const DashboardLayout = ({ children }) => { // @todo add types
    return (
        <div>
            <aside className="absolute w-[200px] top-60px left-0 h-full border-r border-black/10">Choose notes category</aside>
            <div className="ml-[200px]">{children}</div>
        </div>
    )
}

export default DashboardLayout

// @todo make the layout responsive