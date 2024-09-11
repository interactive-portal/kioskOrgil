import React, { FC } from "react";
import {
  Atom_string,
  Atom_number,
  Atom_long,
  Atom_date,
  Atom_combo,
  Atom_radio,
  Atom_range_slider,
  Atom_file_attach,
  Atom_button,
  Atom_boolean,
  Atom_datetime,
  Atom_textarea,
  Atom_text_editor,
  Atom_combo_multi,
  Atom_integer,
  Atom_password,
  Atom_labelstring,
  Atom_range_slider_maxmin,
} from "@/components/common/Atom/Form";
import { getRowItems, dtlToSectionDtl, isEmpty } from "@/util/helper";
import RenderDetail from "@/middleware/components/WidgetForm/RenderDetail";
import RenderWidgetUniversal from "@/middleware/components/WidgetStandart/RenderWidgetUniversal";

type PropsType = {
  field: any;
  className?: string;
  style?: any;
  rowIndex?: any;
  labelClassName?: string;
  attr?: any;
  sectionConfig?: any;
};

const RenderField: FC<PropsType> = ({
  field,
  attr,
  className,
  style,
  labelClassName,
  rowIndex,
  sectionConfig,
}) => {
  if (isEmpty(field)) return null;

  if (field["isshow"] === "0") {
    return (
      <Atom_string
        config={field}
        className={className}
        rowIndex={rowIndex}
        labelClassName={labelClassName}
      />
    );
  }

  switch (true) {
    case field["choosetype"] == "multicomma":
      return (
        <Atom_combo_multi
          className={className}
          style={style}
          labelClassName={labelClassName}
          config={field}
          sectionConfig={sectionConfig}
          rowIndex={rowIndex}
        />
      );
      break;
    case field["lookuptype"] === "combo":
      return (
        <Atom_combo
          className={className}
          style={style}
          labelClassName={labelClassName}
          config={field}
          sectionConfig={sectionConfig}
          rowIndex={rowIndex}
        />
      );
    case field["lookuptype"] === "radio":
      return (
        <Atom_radio
          className={className}
          style={style}
          rowIndex={rowIndex}
          labelClassName={labelClassName}
          config={field}
          sectionConfig={sectionConfig}
        />
      );
    case field["lookuptype"] === "range_slider" &&
      field["lookupmetadataid"] === "":
      return (
        <Atom_range_slider_maxmin
          config={field}
          className={className}
          sectionConfig={sectionConfig}
          labelClassName={labelClassName}
        />
      );
    case field["lookuptype"] === "range_slider":
      return <Atom_range_slider config={field} />;
    case field["datatype"] == "string":
      return (
        <Atom_string
          config={field}
          className={className}
          rowIndex={rowIndex}
          sectionConfig={sectionConfig}
          labelClassName={labelClassName}
        />
      );
    case field["datatype"] == "date":
      return (
        <Atom_date
          className={className}
          style={style}
          rowIndex={rowIndex}
          labelClassName={labelClassName}
          config={field}
          sectionConfig={sectionConfig}
        />
      );
    case field["datatype"] == "datetime":
      return (
        <Atom_datetime
          className={className}
          style={style}
          rowIndex={rowIndex}
          labelClassName={labelClassName}
          sectionConfig={sectionConfig}
          config={field}
        />
      );
    case field["datatype"] == "file":
      return (
        <Atom_file_attach
          config={field}
          rowIndex={rowIndex}
          style={style}
          className={className}
          labelClassName={labelClassName}
        />
      );
    case field["datatype"] == "multi_file":
      return (
        <Atom_file_attach
          config={field}
          rowIndex={rowIndex}
          style={style}
          className={className}
          labelClassName={labelClassName}
        />
      );
    case field["datatype"] == "number" || field["datatype"] == "bigdecimal":
      return (
        <Atom_number
          config={field}
          rowIndex={rowIndex}
          style={{ ...style }}
          className={className}
          sectionConfig={sectionConfig}
          labelClassName={labelClassName}
        />
      );
    case field["datatype"] == "long":
      return (
        <Atom_long
          config={field}
          rowIndex={rowIndex}
          style={{ ...style }}
          className={className}
          sectionConfig={sectionConfig}
          labelClassName={labelClassName}
        />
      );
      break;
    case field["datatype"] == "text_editor":
      return (
        <Atom_text_editor
          config={field}
          rowIndex={rowIndex}
          style={style}
          sectionConfig={sectionConfig}
          className={className}
          labelClassName={labelClassName}
        />
      );
    case field["datatype"] == "button":
      return (
        <Atom_button
          config={field}
          rowIndex={rowIndex}
          style={style}
          sectionConfig={sectionConfig}
          className={className}
          labelClassName={labelClassName}
        />
      );
    case field["datatype"] == "password":
      return (
        <Atom_password
          config={field}
          className={className}
          style={{ ...style }}
          rowIndex={rowIndex}
          sectionConfig={sectionConfig}
          labelClassName={labelClassName}
        />
      );
    case field["datatype"] == "integer" || field["datatype"] == "number":
      return (
        <Atom_integer
          config={field}
          className={className}
          style={style}
          rowIndex={rowIndex}
          sectionConfig={sectionConfig}
          labelClassName={labelClassName}
        />
      );
    case field["datatype"] == "description" ||
      field["datatype"] == "description_auto" ||
      field["datatype"] == "clob":
      return (
        <Atom_textarea
          config={field}
          className={className}
          style={style}
          rowIndex={rowIndex}
          sectionConfig={sectionConfig}
          labelClassName={labelClassName}
        />
      );
    case field["datatype"] == "boolean":
      return (
        <Atom_boolean
          config={field}
          className={className}
          style={style}
          rowIndex={rowIndex}
          sectionConfig={sectionConfig}
          labelClassName={labelClassName}
        />
      );
    case field["datatype"] == "label":
      return (
        <Atom_labelstring
          config={field}
          className={className}
          style={style}
          rowIndex={rowIndex}
          sectionConfig={sectionConfig}
          labelClassName={labelClassName}
        />
      );
    case field["datatype"] == "group" && !field["paramrealpath"].includes("."):
      if (field["dtltheme"] && field["dtltheme"] != 0) {
        const widgetObj = {
          ...sectionConfig,
          componentpath: field?.dtlthemecomponentpath,
          widgetcode: field.dtlthemecode,
          otherattr: [],
          bpsectiondtl: dtlToSectionDtl(field, attr),
        };
        return <RenderWidgetUniversal listConfig={widgetObj} />;
      } else {
        const listConfig = getRowItems(field, attr);
        return (
          <>
            <RenderDetail config={field} pathConfig={listConfig} attr={attr} />
            {/* <>data Render Kpi</> */}
          </>
        );
      }
    case field["datatype"] == "group" && field["paramrealpath"].includes("."):
      return <>row render</>;

    default:
      return (
        <div>
          Not found <strong>{field["datatype"]}</strong> field!
        </div>
      );
  }
};
export default RenderField;
