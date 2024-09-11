import { FC, useContext } from "react";


import _ from "lodash";
import RowItem from "./RowItem";
import FormMetaContext from "context/Meta/FormMetaContext";

type PropsType = {
	pathConfig: any;
	config: any;
	inputclassName?: any;
};

const Row: FC<PropsType> = ({ pathConfig, config, inputclassName }) => {
	const {
		processExpression,
		formDataInitData,
		setFormDataData,
		processConfig,
	} = useContext(FormMetaContext);

	let readyColumn = _.orderBy(
		_.filter(pathConfig, (item) => {
			return item.paramrealpath.split(".").length === 2;
		}) || [],
		["ordernumber"],
	);

	// useEffect(() => {
	//   let __dataElement = pathConfig.reduce(function (map: any, item: any) {
	//     map[item.paramname] = item.defaultvalue;
	//     return map;
	//   }, {});
	//   formDataInitData[config["paramrealpath"]] = __dataElement;
	//   setFormDataData(formDataInitData);
	// }, []);

	return (
		<div>
			<div
				className={`xl:w-full border-b border-gray-300 dark:border-gray-700 mb-5 ${
					config.tabname ? "hidden" : ""
				} ${config?._sectionClassName}`}
			>
				<div className="">
					<p className="text-lg text-gray-800 dark:text-gray-100">
						{config.labelname}
					</p>
				</div>
			</div>
			<div className="p-6 grid gap-4">
				<RowItem
					column={readyColumn}
					rowIndex={``}
					inputclassName={inputclassName}
				/>
			</div>
		</div>
	);
};

export default Row;
