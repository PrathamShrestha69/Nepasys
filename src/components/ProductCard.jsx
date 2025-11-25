import React from "react";

const ProductCard = ({
  id,
  title,
  price,
  category,
  thumbnail,
  images = [],
}) => {
  const imgSrc =(images.length ? images[0]  || thumbnail : undefined);

  return (
    <div className="border border-r-2 border-b-2 rounded-2xl m-3 lg:m-5 p-3 max-w-sm shadow-lg shadow-gray-400 lg:w-62">
      <div className="p-1 lg:p-3 flex items-center justify-center overflow-hidden">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={title}
            className="border border-r-2 border-b-2 rounded-2xl h-20 w-28  lg:h-56 lg:w-56"
          />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>
      <div className="flex flex-col mt-3 lg:gap-2">
        <div className="flex lg:flex-row flex-col lg:justify-between">
          <h1 className="text-sm font-bold lg:text-lg lg:font-bold">{title}</h1>
          <p className="text-sm bg-accent p-1.5 lg:p-2 rounded-xl w-auto max-w-max lg:h-fit">
            C{category}
          </p>
        </div>
        <p className="text-sm lg:text-md font-semibold">Price:${price}</p>
      </div>
      <div className="flex flex-row mt-3 justify-center lg:justify-start">
        <button className="btn btn-primary border border-r-2 border-b-2 rounded-2xl">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
