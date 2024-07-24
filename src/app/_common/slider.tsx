import { Carousel } from "antd";
import Image from "next/image";

export default function Slider() {
  const listImage = [
    "https://images.unsplash.com/photo-1697807650304-907257330a3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1697462248369-254119899872?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1696860740777-94a408eeed46?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1492889971304-ac16ab4a4a5a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  const contentStyle: React.CSSProperties = {
    margin: 0,
    width: "100%",
    objectFit: "cover",
    height: "500px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <div className="my-5">
      <Carousel autoplay>
        {listImage.map((item, index) => (
          <div key={index}>
            <Image
              style={contentStyle}
              width={2070}
              height={500}
              alt="slider"
              src={item}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
