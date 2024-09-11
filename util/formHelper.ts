import _ from "lodash";

export function prepareDataSrcMetaverseReady(
  dataSrcMetaverse: any,
  configMetaverse: any,
  form: any
) {
  let defaultValueTemp = form?.defaultValue;

  const result = _.map(dataSrcMetaverse, (item) => {
    const mine = `${item?.[_.toLower(configMetaverse?.lookup?.valuefield)]}@@@${
      item?.[_.toLower(configMetaverse?.lookup?.displayfield)]
    }`;

    if (
      form?.defaultValue ==
      item?.[_.toLower(configMetaverse?.lookup?.valuefield)]
    )
      defaultValueTemp = mine;

    return {
      ...item,
      [_.toLower(configMetaverse?.lookup?.valuefield)]: mine,
    };
  });

  return [result, defaultValueTemp];
}
