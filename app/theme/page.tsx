import { Input } from "./gg"; 
import { getUserProgress } from "@/db/queries";
const ChatPage = async() => {
    const stream = await getUserProgress()

    return (
            <div className="card-body">
                <h1 className="card-title">
                    Theme Settings
                </h1>
                {stream?.userId === null || stream?.userId === undefined ? (
                    <div className="justify-center">Theme not found</div>
                ) : (
                <div className="form-control">
                <Input
                string={stream.theme}
                />

                </div>)}
            </div>
    );
}

export default ChatPage;