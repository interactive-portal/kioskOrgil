import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function AtomSpinV2({
  spinning = false,
  delay = 0,
  tip = "",
  indicator = "default",
  customClassName = "",
  customStyle = {},
  children,
}: {
  spinning?: boolean;
  delay?: number;
  tip?: string;
  indicator?: "default" | "modern";
  customClassName?: string;
  customStyle?: any;
  children: any;
}) {
  if (!spinning) return children;

  const LoadingAntIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#54ADAE" }} spin />
  );

  return (
    <Spin
      spinning={spinning}
      delay={delay}
      tip={tip}
      indicator={LoadingAntIcon}
      // wrapperClassName="w-fit" //Нэвтрэх дээр хумигдаад байсан тул авчихлаа. Cozy Нэвтрэх - Login дээр Нэвтрэх товч нь хумигдаад байгаа.
    >
      {children}
    </Spin>
  );
}
