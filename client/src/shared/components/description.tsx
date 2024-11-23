interface IDescriptionProps {
    title: string,
    description: any,
    onClick?: Function
}

const Description: React.FC<IDescriptionProps> = ({ title, description, onClick }) => {
    return (
        <div className="flex flex-col">
            <span key={title} className={"text-gray-600"}>{title}</span>
            <span className="mb-4"
                onClick={() => { if (onClick ) { onClick(); } }}
            >
                <span dangerouslySetInnerHTML={{__html: description ?? "--"}}></span>
            </span>
        </div>
    );
}

export default Description;