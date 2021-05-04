import { useSelector } from "react-redux";

const Messages = () => {
    const messages = useSelector(state => state.messages);

    return (
        <table className="table table-striped table-bordered my-4 messages">
            <tbody>
                {
                    messages.map((message,  index) =>
                        <tr key={`msg-${index}`}>
                            <td>{message}</td>
                        </tr>)
                }
            </tbody>
        </table>
    )
}

export default Messages;