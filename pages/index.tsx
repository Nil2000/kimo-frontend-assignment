import Image from "next/image";
import styles from "@/styles/HomePage.module.css";
import NavBar from "@/components/NavBar";
import { HighLightItem } from "@/models/HighLightItem";
import Card from "@/components/Card";
import BottomContainer from "@/components/BottomContainer";
import Footer from "@/components/Footer";
import { GetStaticProps } from "next";
import { CategoryModel } from "@/models/CategoryModel";
import Link from "next/link";

interface RequestProps {
    navbarItem: HighLightItem[],
    itemList: HighLightItem[],
    category: CategoryModel[],
}
export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://example.com"; // https://v2ds.netlify.app

  return base_url;
};
export const getStaticProps: GetStaticProps<RequestProps> = async () => {
  const highlightsUrl=checkEnvironment().concat("/api/highlights");
  const categoriesUrl=checkEnvironment().concat("/api/categories");

    const [navbarItem, category] = await Promise.all([
        fetch(highlightsUrl).then((res) => res.json()),
        fetch(categoriesUrl).then((res) => res.json()),
    ]);
    const itemList = navbarItem;
    return {
        props: { navbarItem:navbarItem, itemList:itemList, category:category },
    };
};

export default function HomePage({navbarItem,itemList,category}:RequestProps) {
    return (
        <div>
            <NavBar items={navbarItem}/>
            <div className={`relative h-2/4 ${styles.container}`}>
                <Image
                    src="/images/Image2.jpg"
                    alt="My-image"
                    width={1600}
                    height={500}
                    className={`w-full h-auto ${styles.image}`}
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <h1 className={`text-8xl font-bold ${styles.HawaiiText}`}>
                        Welcome to Hawaii
                    </h1>
                </div>
            </div>
            <div className={styles.highlightsContainer}>
                <h3 className={`font-bold ${styles.highLightsText}`}>
                    Highlights
                </h3>
                <div className={styles.highlightItemsContainer}>
                    {itemList.map((item, key) => {
                        return <Link href={`/activity/${item.title}`} key={key}>
                        <Card  item={item} />;
                        </Link>
                    })}
                </div>
            </div>
            <BottomContainer categories={category}/>
            <Footer />
        </div>
    );
}
