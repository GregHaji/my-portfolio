import Image from "next/image";

export default function Intro({ image }) {
  return (
    <div className="relative h-[55vh] w-full overflow-hidden">
      <Image
        src={image}
        alt="hi"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
