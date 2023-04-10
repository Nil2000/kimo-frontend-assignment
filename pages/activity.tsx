import NavBar from "@/components/NavBar";
import { Activity } from "@/models/ActivityModel";
import Image from "next/image";
import React from "react";
import style from "@/styles/Activity.module.css";
import BottomContainer from "@/components/BottomContainer";
import Footer from "@/components/Footer";
import { MdLocationOn } from "react-icons/md";
import { HighLightItem } from "@/models/HighLightItem";
import { CategoryModel } from "@/models/CategoryModel";
import { GetStaticProps } from "next";
interface RequestProps {
    navbarItem: HighLightItem[];
    itemList: HighLightItem[];
    category: CategoryModel[];
}
export const checkEnvironment = () => {
    let base_url =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://example.com"; // https://v2ds.netlify.app

    return base_url;
};
export const getStaticProps: GetStaticProps<RequestProps> = async () => {
    const highlightsUrl = checkEnvironment().concat("/api/highlights");
    const categoriesUrl = checkEnvironment().concat("/api/categories");

    const [navbarItem, category] = await Promise.all([
        fetch(highlightsUrl).then((res) => res.json()),
        fetch(categoriesUrl).then((res) => res.json()),
    ]);
    const itemList = navbarItem;
    return {
        props: {
            navbarItem: navbarItem,
            itemList: itemList,
            category: category,
        },
    };
};

export default function activity({navbarItem,itemList,category}:RequestProps) {
    const activity: Activity = {
        name: "Surfing",
        description:
            "Hawaii is known for its world-famous surf spots and waves that attract surfers from all over the globe. Here are some of the best islands for surfing in Hawaii:",
        image: "https://storage.googleapis.com/topics-images/web-dev-images/surfing.jpg",
        activities: [
            {
                name: "North Shore, Oahu",
            },
            {
                name: "Waimea Bay, Oahu",
            },
            {
                name: "Sunset Beach, Oahu",
            },
            {
                name: "Pipeline, Oahu",
            },
            {
                name: "Maui",
            },
            {
                name: "Honolii Beach Park, Big Island",
            },
            {
                name: "Pe'ahi (Jaws), Big Island",
            },
            {
                name: "Hanalei Bay, Kauai",
            },
            {
                name: "Polihale State Park, Kauai",
            },
            {
                name: "Kaunakakai Town, Molokai",
            },
        ],
    };
    return (
        <main>
            <NavBar items={navbarItem}/>
            <div className="relative h-2/4">
                <Image
                    src={activity.image}
                    alt="My-image"
                    width={1600}
                    height={250}
                    className={`w-full h-auto ${style.image}`}
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <h1 className={`text-8xl font-bold ${style.titleText}`}>
                        {activity.name}
                    </h1>
                </div>
            </div>
            <div className={style.body}>
                <p>{activity.description}</p>
                <div className={style.listContainer}>
                    {activity.activities.map((item, key) => {
                        return (
                            <div key={key} className={style.listItem}>
                                <MdLocationOn className={style.icon} />
                                <h3>{item.name}</h3>
                            </div>
                        );
                    })}
                </div>
            </div>
            <BottomContainer categories={category}/>
            <Footer />
        </main>
    );
}
