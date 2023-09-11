export default function StatusCard(
    {
        number = 0,
        text = "",
        iconClass = "",
        backColorClass = "bg-black-600"
    }) {
    return <>
        <div className={`min-h-[128px] border shadow-md rounded flex flex-row justify-between p-4 ` + backColorClass}>
            <div className="flex justify-center items-center text-6xl text-white">
                {number}
            </div>
            <div className="flex items-center opacity-50 text-white">
                {text}
            </div>
            <div className="flex justify-center items-center text-6xl text-white">
                <i className={iconClass}/>
            </div>
        </div>
    </>;
}
