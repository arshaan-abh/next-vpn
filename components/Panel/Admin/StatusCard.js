export default function StatusCard(
    {
        number = 0,
        text = "",
        iconClass = "",
        backColorClass = "bg-black-600"
    }) {
    return <>
        <div
            className={`relative overflow-hidden min-h-[128px] shadow-md rounded flex flex-row justify-between p-4 ` + backColorClass}
        >
            <div className="flex opacity-90 text-white text-base">
                {text}
            </div>
            <div className="flex justify-center items-center text-6xl text-white">
                {number}
            </div>
            <div className="absolute right-0 opacity-30 flex justify-center items-center text-9xl text-white">
            <i className={iconClass}/>
            </div>
        </div>
    </>;
}
