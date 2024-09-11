import { notification } from "antd";
import { decode } from "html-entities";
import parseHtml from "html-react-parser";
import { SmileOutlined } from '@ant-design/icons';

export default function useShowInfo({
  type = "success",
  title = "",
  description = "",
  resultConfig = { notification: {} },
}) {
  if (typeof window === "undefined") return null; //server талд байвал энийг ажиллуулах хэрэггүй.

  const defaultProps = {
    closeIcon: <i className="fal fa-times text-2xl"></i>,
    style: {
      width: 315,
      padding: "10px",
      background: "#f1f5f9",
    }
  }

  switch (type) {
    case "success":
      return notification.success({
        message: title,
        description: parseHtml(decode(description)),
        ...defaultProps,
        ...resultConfig?.notification,
      });
    case "warning":
      return notification.warning({
        message: title,
        description: parseHtml(decode(description)),
        ...defaultProps,
        ...resultConfig?.notification,
        // duration: 0,
        icon: <i className="fas fa-exclamation-circle text-2xl pt-3 text-yellow-400"></i>,
      });
    case "info":
      return notification.info({
        message: title,
        description: parseHtml(decode(description)),
        ...defaultProps,
        ...resultConfig?.notification,
      });
    case "error":
      notification.error({
        message: title,
        description: parseHtml(decode(description)),
        ...defaultProps,
        ...resultConfig?.notification,
      });

      return <div className="w-96 h-96 bg-red-700">Error</div>;
    case "urgent":
      return <></>;
    case "required":
      return <></>;
    default:
      return <>default</>;
  }
}
