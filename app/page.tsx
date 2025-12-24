"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUpRightFromSquare,
  faCheck,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import styles from "./Home.module.css";
import { LinkButton } from "./components/LinkButton";
import { motion } from "framer-motion";

type IconProps = {
  style?: React.CSSProperties;
};

const Icon = (props: IconProps) => (
  <img
    className="rounded-full shadow-lg"
    src="/clover.png"
    alt="Clover_Midori"
    width={200}
    height={200}
    {...props}
  />
);

const AnimatedIcon = animated(Icon);
const AnimatedH1 = animated.h1 as any;
const AnimatedP = animated.p as any;
const AnimatedSpan = animated.span as any;

export default function Home() {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard =
    (name: string): React.MouseEventHandler<SVGSVGElement> =>
    (event) => {
      navigator.clipboard.writeText(name);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    };

  const nameSprings = useSpring({
    config: {},
    from: { x: 20, opacity: 0 },
    to: { x: 0, opacity: 1 },
  });

  const bioSprings = useSpring({
    from: { x: 20, opacity: 0 },
    to: { x: 0, opacity: 1 },
    delay: 200,
  });

  const iconSprings = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
  });

  const iconDescSprings = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 200,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div
        className="flex h-screen justify-evenly w-full flex-col-reverse md:flex-row"
        id="about"
      >
        <div className="flex flex-col justify-center">
          <AnimatedH1
            className={
              "text-5xl lg:text-6xl font-bold mt-4 text-center md:text-left"
            }
            style={{
              ...nameSprings,
            }}
          >
            クローバーみどり
          </AnimatedH1>
          <AnimatedP
            className="text-xl mt-2 text-gray-400 text-center md:text-left"
            style={{
              ...bioSprings,
            }}
          >
            いろいろやってます
          </AnimatedP>
        </div>
        <div className="flex flex-col items-center justify-center">
          <AnimatedIcon
            style={{
              ...iconSprings,
            }}
          />
          <AnimatedSpan
            className="mt-6 text-gray-400"
            style={{
              ...iconDescSprings,
            }}
          >
            2023/3下旬頃にIllustratorで作ったアイコン
          </AnimatedSpan>
        </div>
      </div>
      <div className={styles.projects} id="projects">
        <motion.h2
          className="text-3xl font-bold p-4"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Projects
        </motion.h2>
        <div className={styles.cardContainer}>
          <motion.div
            className={"shadow-lg " + styles.card}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut" }}
            viewport={{ once: true, margin: "-200px" }}
          >
            <div className={styles.cardMedia}>
              <img
                src="/bot.png"
                alt="Clover_Midori"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardText}>
                <p className="text-2xl">Clover_Bot</p>
                <p className="text-sm text-gray-700">Discord Bot</p>
              </div>
              <div className={styles.cardActions}>
                <LinkButton
                  href="https://bot.clover-midori.net"
                  content="詳細"
                  disabled
                />
                <LinkButton
                  href="https://discord.com/api/oauth2/authorize?client_id=726804663059480653&permissions=1644971949559&scope=bot%20applications.commands"
                  content="導入"
                  thankYou
                />
              </div>
            </div>
          </motion.div>
          <motion.div
            className={"shadow-lg " + styles.card}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              ease: "easeOut",
            }}
            viewport={{ once: true, margin: "-200px" }}
          >
            <div
              className={styles.cardMedia}
              style={{
                backgroundColor: "#692f2f",
              }}
            >
              <img
                src="/11Tube_Music.png"
                alt="11Tube Music"
                style={{ objectFit: "contain", padding: "10%" }}
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardText}>
                <p className="text-2xl">11Tube Music</p>
                <p className="text-sm text-gray-700">
                  Youtube Music for Windows 11
                </p>
              </div>
              <div className={styles.cardActions}>
                <LinkButton
                  href="https://github.com/clover0916/11Tube-Music"
                  content="詳細"
                />
                <LinkButton
                  href="https://github.com/clover0916/11Tube-Music/releases"
                  content="ダウンロード"
                  thankYou
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-center h-80 my-8 w-full"
        id="contact"
      >
        <h2 className="text-3xl font-bold pb-8">Contact</h2>
        <div className={styles.contactsContainer}>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faDiscord} className="h-8 pr-4" />
            <span className="text-xl">clover_0916</span>
            {isCopied ? (
              <div className="relative flex items-center">
                <FontAwesomeIcon icon={faCheck} className="h-4 pl-2" />
                <span className="absolute text-sm flex justify-center ml-6">
                  Copied!
                </span>
              </div>
            ) : (
              <FontAwesomeIcon
                icon={faCopy}
                className="h-3 pl-2 cursor-pointer"
                onClick={copyToClipboard("clover_0916")}
              />
            )}
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => window.open("https://github.com/clover0916")}
          >
            <FontAwesomeIcon icon={faGithub} className="h-8 pr-4" />
            <span className="text-xl">clover0916</span>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="h-3 pl-2"
            />
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => window.open("https://twitter.com/@Clover_0916")}
          >
            <FontAwesomeIcon icon={faTwitter} className="h-8 pr-4" />
            <div className="text-xl">@Clover_0916</div>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="h-3 pl-2"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
