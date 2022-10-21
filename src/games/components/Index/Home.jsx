import { ArrayImages, getClassNamePosition } from "../../../helpers/exports";
import { useAutoSlide } from "../../../hooks/exports";
import { HomeCard } from "./exports";
import "./Home.css";

export const Home = () => {
  const arrayImages = ArrayImages();

  const { index } = useAutoSlide(arrayImages);

  return (
    <section className="home_container">
      {arrayImages.map((img, oneIndex) => {
        const { position } = getClassNamePosition(
          "home_container_background",
          index,
          oneIndex,
          arrayImages
        );

        return (
          <div
            key={img}
            className={position}
            style={{
              background: `linear-gradient(to bottom, rgba(4,9,38,0) 19%, rgba(6,14,58,0) 25%, rgba(8,18,74,0.07) 30%, rgba(8,18,74,0.35) 50%, rgba(8,18,74,0.36) 51%, rgba(8,18,74,0.64) 71%, rgba(8,18,74,1) 97%, rgba(8,18,74,1) 100%), url(${img})`,
              filter:
                "progid:DXImageTransform.Microsoft.gradient( startColorstr='#050b2e', endColorstr='#050b2e', GradientType=0 )",
            }}
          ></div>
        );
      })}

      <HomeCard></HomeCard>
    </section>
  );
};
