// Utility to get initials from a name
const getInitials = (name: string) => {
    const nameArray = name.split(" ");
    return nameArray.map((n) => n[0]).join("").toUpperCase();
};

interface IUsersAvatarProps {
    users: {
        id: string,
        name: string,
        color: string
    }[]
}

const UsersAvatar: React.FC<IUsersAvatarProps> = ({ users }) => {
    return (
        <div className="flex space-x-4">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="flex items-center justify-center w-12 h-12 rounded-full text-white font-bold"
                    style={{ backgroundColor: user.color }}
                // title={user.name} // This displays the tooltip on hover
                >
                    {getInitials(user.name)}
                    {/* Tooltip */}
                    <span className="absolute bottom-0 transform translate-y-full left-1/2 -translate-x-1/2 mt-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {user.name}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default UsersAvatar;