import React, { useState } from "react";
import style from "@/styles/BottomCard.module.css";
import Image from "next/image";
import { CategoryModel } from "@/models/CategoryModel";
type Props = {
    category: CategoryModel;
};

export default function BottomCard({ category }: Props) {
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className={style.bottomCard}>
            <div onClick={toggleMenu} className={style.bottomMain}>
                <h3>{category.name}</h3>
                <Image
                    src="/images/BottomCardBtn.svg"
                    alt=""
                    width={16}
                    height={16}
                    className={`${menuOpen ? style.dropDownIconRotated:style.dropDownIcon}`}
                />
            </div>
            {menuOpen && (
                <div className={style.dropDownContainer}>
                    {category.activities.map((item, key) => {
                        return <li key={key}>{item.title}</li>;
                    })}
                </div>
            )}
        </div>
    );
}
