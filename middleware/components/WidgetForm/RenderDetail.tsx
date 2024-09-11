import { FC } from "react";
import Rows from "./Detail/Rows";
import Row from "./Detail/Row";

type PropsType = {
	pathConfig: any;
	config: any;
	attr: any;
	inputclassName?: any;
};

const RenderDetail: FC<PropsType> = ({
	pathConfig,
	config,
	attr,
	inputclassName,
}) => {
	if (config.recordtype === "row") {
		return (
			<Row
				pathConfig={pathConfig}
				inputclassName={inputclassName}
				config={config}
				key={config?.id}
			/>
		);
	} else {
		return <Rows pathConfig={pathConfig} config={config} key={config?.id} />;
	}
};

export default RenderDetail;
