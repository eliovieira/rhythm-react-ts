import React from "react";
import styles from "./Footer.module.css";

type Props = {};

const Footer = (props: Props) => {
  const year = new Date().getFullYear();
  return <div className={styles.footer}>Made by Élio Vieira</div>;
};

export default Footer;
