import { getUserProgress, getUserSubscription } from "@/lib/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Items } from "./items";

const ShopPage = async () => {
    const userProgressData = getUserProgress()
    const useSubcriptionData = getUserSubscription()
    const [userProgress, userSubcription] = await Promise.all([
        userProgressData, useSubcriptionData
    ])
    if (!userProgress || !userProgress.active_course_id) {
        redirect("/courses")
    }
    const isPro = !!userSubcription?.isActive
    return (<div className="container m-5 min-h-screen flex-col flex items-center">
            <Image
                src="/shop.svg"
                alt="Shop"
                height={90}
                width={90}
            /><div className="text-3xl font-bold p-5">
                Shop
            </div>
            <div>
            &quot;What may I get you?&quot;
            </div> 
            <img src="/girl.png" className="w-20 h-20" />

            <Items
                hearts={userProgress.hearts}
                points={userProgress.points}
                hasActiveSubscription={isPro}
            />
        </div>

    );
}

export default ShopPage;