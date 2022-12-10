const ProgressBar = (props) => {
  const { completed } = props;

  const fillerStyles = {
    width: `${completed}%`,
    maxWidth: "100%",
    transition: "width 1s ease-in-out",
    backgroundColor: `${
      completed < 50
        ? "#EC5840"
        : completed < 75
        ? "#FFAE00"
        : completed > 75
        ? "#5FBD58"
        : "aqua"
    }`,
  };

  return (
    <div className="bar-container w-full bg-[#E6E6E6] rounded-sm h-5">
      <div
        className={`bar h-full rounded-sm text-right text-sm`}
        style={fillerStyles}
      >
        <span className="progress-bar px-1 font-semibold text-white">{`${completed}`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
