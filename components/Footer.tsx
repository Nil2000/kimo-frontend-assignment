import React from 'react'
import style from "@/styles/Footer.module.css"
import Image from 'next/image'
export default function Footer() {
  return (
    <div className={style.footer}>
      <div>
      <Image src="/images/Aloha2.svg" alt='' width={45} height={35} className={style.image}/>
      </div>
    </div>
  )
}