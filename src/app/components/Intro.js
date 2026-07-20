import Image from "next/image";
import LandingImage from "../assets/Landing.png";

export default function Intro() {
  return (
    <div className="relative h-screen w-auto overflow-hidden">
      <Image src={LandingImage} alt="" fill priority className="object-cover" />
    </div>
  );
}
