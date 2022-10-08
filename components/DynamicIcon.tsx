import { FC } from "react";
import * as RIcons from "react-icons";

const DynamicIcon: FC<{ icon: string; onClick: () => void }> = (props) => {
  const { ...icons } = RIcons;
  // @ts-ignore
  const TheIcon: JSX.Element = icons[props.icon];

  return (
    <>
      {/* @ts-ignore */}
      <TheIcon
        className="h-6 w-6 cursor-pointer text-white"
        aria-hidden="true"
      />
    </>
  );
};

export default DynamicIcon;
