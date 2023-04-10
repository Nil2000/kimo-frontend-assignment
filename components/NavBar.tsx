import Image from "next/image";
import React, { useState } from "react";
import styles from "@/styles/NavBar.module.css";
import { HighLightItem } from "@/models/HighLightItem";
import { GiCrossMark, GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import Link from "next/link";
type Props = {
    items: HighLightItem[];
};

export default function NavBar({ items }: Props) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <nav className={`${styles.navbar}`}>
            <div
                className={`bg-white ${styles.navbarContainer} w-4/5 justify-between`}
            >
                <div className="left-container flex">
                    <Image
                        src="/images/Aloha.svg"
                        alt="image"
                        width={90}
                        height={35}
                    />
                    <div className={`${styles.textContainer} flex ml-14`}>
                        <Link href="/">
                            <h3>Home</h3>
                        </Link>
                        {items.map((item, key) => {
                            return (
                                <Link
                                    href={`/activity/${item.title}`}
                                    key={key}
                                >
                                    <h3>{item.title}</h3>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className="right-container">
                    <button className={styles.btn}>Book a trip</button>
                </div>
            </div>
            <div className={styles.navContainerMobile}>
                <div className="left-container">
                    <Image
                        src="/images/Aloha.svg"
                        alt="image"
                        width={90}
                        height={35}
                    />
                </div>
                <div className="right-container">
                    <button onClick={toggleDrawer}>
                        <GiHamburgerMenu />
                    </button>
                </div>
            </div>
            {isDrawerOpen && (
                <div className={styles.drawer}>
                    <div className={`${styles.textContainer} flex flex-col`}>
                        <button
                            onClick={() => setIsDrawerOpen(false)}
                            className={styles.closeIcon}
                        >
                            <GrClose />
                        </button>
                        <Link href="/" onClick={() => setIsDrawerOpen(false)}>
                          <h3>Home</h3>
                        </Link>
                        {items.map((item, key) => {
                            return (
                                <Link
                                    href={`/activity/${item.title}`}
                                    key={key}
                                    onClick={() => setIsDrawerOpen(false)}>
                                    <h3>{item.title}</h3>
                                </Link>
                            );
                        })}
                        <button className={styles.btn}>Book a trip</button>
                    </div>
                </div>
            )}
        </nav>
    );
}
