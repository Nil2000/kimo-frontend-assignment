import BottomContainer from "@/components/BottomContainer";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Activity } from "@/models/ActivityModel";
import React from "react";
import { MdLocationOn } from "react-icons/md";
import style from "@/styles/Activity.module.css";
import Image from "next/image";
import { HighLightItem } from "@/models/HighLightItem";
import { CategoryModel } from "@/models/CategoryModel";
import { GetStaticPaths, GetStaticProps } from "next";
interface StaticProps {
    navbarItem: HighLightItem[];
    category: CategoryModel[];
    activity: Activity;
}
export const checkEnvironment = () => {
    let base_url =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://v2ds.netlify.app"; // https://v2ds.netlify.app

    return base_url;
};
export const getStaticProps: GetStaticProps<StaticProps> = async ({
    params,
}) => {
    const highlightsUrl = checkEnvironment().concat("/api/highlights");
    const categoriesUrl = checkEnvironment().concat("/api/categories");
    const activity = params?.activity?.toString();
    const activityUrl = checkEnvironment().concat(
        `/api/activity-details?q=${activity}`
    );

    const [navbarItem, category, activityRes] = await Promise.all([
        fetch(highlightsUrl).then((res) => res.json()),
        fetch(categoriesUrl).then((res) => res.json()),
        fetch(activityUrl).then((res) => res.json()),
    ]);
    return {
        props: {
            navbarItem: navbarItem,
            category: category,
            activity: activityRes,
        },
    };
};
export const getStaticPaths: GetStaticPaths = async () => {
    const highlightsUrl = checkEnvironment().concat("/api/highlights");
    const categoryRes = await fetch(highlightsUrl)
        .then((res) => res.json());
  const categorySlugs:string[]=await categoryRes.map((item:HighLightItem)=>item.title.toString());
    const paths = categorySlugs.map(slug=> ({ params: { activity: slug } }));

    return {
        paths,
        fallback: false,
    };
};

export default function HighLightDetailsPage({
    navbarItem,
    category,
    activity,
}: StaticProps) {
    return (
        <>
            <main>
                <NavBar items={navbarItem} />
                <div className={`relative h-2/4 ${style.container}`}>
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
                <BottomContainer categories={category} />
                <Footer />
            </main>
        </>
    );
}
