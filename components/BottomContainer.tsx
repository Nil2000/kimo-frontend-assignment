import React from "react";
import style from "@/styles/BottomContainer.module.css";
import BottomCard from "./BottomCard";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { CategoryModel } from "@/models/CategoryModel";
type Props = {
  categories:CategoryModel[]
};

export default function BottomContainer({categories}: Props) {
    return (
        <div className={style.bottomContainer}>
            <div className={style.container}>
                <div className={style.categoryContainer}>
                    <h1>Categories</h1>
                    {categories.map((category, key) => {
                        return <BottomCard key={key} category={category}/>;
                    })}
                </div>
                <div className={style.travelGuideContainer}>
                    <h1>Travel Guide</h1>
                    <div className={style.travelGuideCard}>
                        <div className={style.leftPart}>
                          <div>
                            <h3>Hardwin Malone</h3>
                            <p>Guide since 2012</p>
                          </div>
                            <button>Contact</button>
                        </div>
                        <div className={style.rightPart}>
                          <Image src="/images/Ellipse10.jpg" alt="" width={128} height={128}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
