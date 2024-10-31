interface IDescriptionProps {
    title: string,
    description: any,
    onClick?: Function;
}

const Description: React.FC<IDescriptionProps> = ({ title, description, onClick }) => {
    return (
        <div>
            <span key={title} className={"text-gray-600"}>{title}</span>
            <span className="mb-4"
                onClick={() => { if (onClick ) { onClick(); } }}
            >
                {description ?? "--"}
            </span>
        </div>
    );
}

export default Description;