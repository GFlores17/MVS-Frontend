function MainMenuCard({
    primaryColor,
    secondaryColor,
    title,
    description,
    onClick,
    backgroundPhoto,
  }) {
    return (
      <div
        onClick={onClick}
        className={`
              font-oxanium
              hover:scale-105
              hover:cursor-pointer
              hover:border-gray-600
              transition-500
              w-full
              h-full
              rounded-lg
              border-2 border-gray-200
              shadow-sm
              flex flex-col
              items-center
              p-3
              gap-2
              text-center
              hover:shadow-md
              transition
              ${secondaryColor}
          
  
          grid
          grid-rows-[10rem_3rem_1fr]
          min-h-[18rem]
  
          sm:grid-rows-[14rem_3.5rem_1fr]
          sm:min-h-[22rem]
  
          lg:grid-rows-[16rem_4rem_1fr]
          lg:min-h-[32rem]
        `}
      >
        {/* IMAGE */}
        <div className="w-full h-full overflow-hidden">
        <img
            src={backgroundPhoto}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
        />
        </div>

  
        {/* TITLE */}
        <div
          className={`
            
            flex items-center justify-center
            font-semibold
            text-base
            sm:text-md
            lg:text-xl
            
            px-2
            text-center
            h-full
            font-oxanium
            font-bold
            text-white
            ${primaryColor}
          `}
        >
          {title}
        </div>
  
        {/* DESCRIPTION */}
        <div
          className={`
            px-3 py-2
            sm:p-4
            font-medium
            lg:text-lg
            sm:text-sm
            leading-snug
            line-clamp-3
            sm:line-clamp-4

            font-jura
            ${secondaryColor}
          `}
        >
          {description}
        </div>
      </div>
    );
  }
  
  export default MainMenuCard;
  