"use client";

import React, { useState } from "react";
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
import { useSpring, animated } from "@react-spring/web";
import { LinkButton } from "./LinkButton";
import { motion } from "motion/react";
import type { GetImageResult } from "astro";

type IconProps = {
  style?: React.CSSProperties;
  image?: GetImageResult;
};

const Icon = ({ image, ...props }: IconProps) => (
  <img
    className="rounded-full shadow-lg"
    src={image?.src}
    {...image?.attributes}
    width={200}
    height={200}
    {...props}
    alt="Clover_Midori"
  />
);

const AnimatedIcon = animated(Icon);
const AnimatedH1 = animated.h1 as any;
const AnimatedP = animated.p as any;
const AnimatedSpan = animated.span as any;

interface HomeContentProps {
  images: {
    clover: GetImageResult;
    bot: GetImageResult;
    tubeMusic: GetImageResult;
  };
}

export default function HomeContent({ images }: HomeContentProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (name: string) => () => {
    navigator.clipboard.writeText(name);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const nameSprings = useSpring({
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
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <div
        className="flex h-screen justify-evenly w-full flex-col-reverse md:flex-row px-4"
        id="about"
      >
        <div className="flex flex-col justify-center">
          <AnimatedH1
            className="text-5xl lg:text-6xl font-bold mt-4 text-center md:text-left"
            style={nameSprings}
          >
            クローバーみどり
          </AnimatedH1>
          <AnimatedP
            className="text-xl mt-2 text-gray-400 text-center md:text-left"
            style={bioSprings}
          >
            いろいろやってます
          </AnimatedP>
        </div>
        <div className="flex flex-col items-center justify-center">
          <AnimatedIcon style={iconSprings} image={images.clover} />
          <AnimatedSpan
            className="mt-6 text-gray-400 text-center"
            style={iconDescSprings}
          >
            2023/3下旬頃にIllustratorで作ったアイコン
          </AnimatedSpan>
        </div>
      </div>

      <div className="flex flex-col justify-items-center text-center min-h-screen w-full pt-20" id="projects">
        <motion.h2
          className="text-3xl font-bold p-4"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Projects
        </motion.h2>
        <div className="mt-2 flex gap-8 flex-1 justify-center items-center flex-col lg:flex-row px-4 pb-20">
          {/* Clover_Bot Card */}
          <motion.div
            className="shadow-lg flex flex-col w-full max-w-[22rem] h-[28rem] bg-white rounded-[10px] overflow-hidden"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut" }}
            viewport={{ once: true, margin: "-200px" }}
          >
            <div className="w-full h-2/3">
              <img
                src={images.bot.src}
                {...images.bot.attributes}
                alt="Clover_Bot"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-1/3 flex flex-col justify-between text-black">
              <div className="text-left py-4 px-6">
                <p className="text-2xl">Clover_Bot</p>
                <p className="text-sm text-gray-700">Discord Bot</p>
              </div>
              <div className="flex pb-4 px-4 justify-end gap-2">
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

          {/* 11Tube Music Card */}
          <motion.div
            className="shadow-lg flex flex-col w-full max-w-[22rem] h-[28rem] bg-white rounded-[10px] overflow-hidden"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut" }}
            viewport={{ once: true, margin: "-200px" }}
          >
            <div className="w-full h-2/3 bg-[#692f2f] flex items-center justify-center p-[10%]">
              <img
                src={images.tubeMusic.src}
                {...images.tubeMusic.attributes}
                alt="11Tube Music"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="h-1/3 flex flex-col justify-between text-black">
              <div className="text-left py-4 px-6">
                <p className="text-2xl">11Tube Music</p>
                <p className="text-sm text-gray-700">Youtube Music for Windows 11</p>
              </div>
              <div className="flex pb-4 px-4 justify-end gap-2">
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
        className="flex flex-col items-center justify-center h-80 my-8 w-full px-4"
        id="contact"
      >
        <h2 className="text-3xl font-bold pb-8">Contact</h2>
        <div className="w-full flex flex-col md:flex-row gap-8 md:gap-32 items-center justify-center">
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
