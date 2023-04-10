import { HighLightItem } from "@/models/HighLightItem";
import Image from "next/image";
import React from "react";
import style from "@/styles/Card.module.css"
type Props = {
    item: HighLightItem;
};

export default function Card({
    item: { image, title, description },
}: Props) {
    return (
        <div className={`bg-white shadow-md ${style.card}`}>
            <Image
                src={image}
                alt="image"
                width={1500}
                height={1000}
                className={`w-full h-64 object-cover object-center ${style.cardImage}`}
            />
            <h2 className={`text-lg font-bold text-gray-900 mb-2 ${style.cardTitleText}`}>{title}</h2>
            <p className={`text-gray-700 mb-4 ${style.cardDescription}`}>{description}</p>
            <div className={style.cardButton}>
              <Image src="/images/CardButton.svg" alt="image" width={40} height={40} className="items-center"/>
            </div>
        </div>
    );
}
