import GradientIcons from "../../UploadProduct/GradientIcons";

const ActionTab = ({ data, selected, onClick }) => {
  const { label, selectedIcon, icon } = data;

  return (
    <div className="item w-[120px] h-[90px] relative mb-0" onClick={onClick}>
      <div
        className={`w-full h-full bg-white dark:bg-dark-white rounded-md z-20 relative flex justify-center items-center cursor-pointer hover:opacity-80 ${
          selected ? "" : "border border-light-purple dark:border-[#5356fb29] "
        }`}
      >
        <div className="flex flex-col justify-center items-center">
          <div
            className={`w-12 h-12 rounded-full flex justify-center items-center ${
              selected ? "primary-gradient" : "bg-[#F2E8FA]"
            }`}
          >
            <GradientIcons name={`${selected ? selectedIcon : icon}`} />
          </div>
          <p className="text-center text-sm sm:text-base tracking-wide mt-1   text-dark-gray dark:text-white">
            {label}
          </p>
        </div>
      </div>
      {selected && (
        <div
          className="w-[122px] h-[92px] primary-gradient rounded-md absolute z-10"
          style={{ top: "-1px", left: "-1px" }}
        />
      )}
    </div>
  );
};

export default ActionTab;
