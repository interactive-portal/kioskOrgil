import _ from "lodash";

export const processCloudinaryImage = (imageUrl, cloudinaryParam) => {
  if (!_.includes(imageUrl, "cloudinary")) return imageUrl;
  if (_.isEmpty(cloudinaryParam)) return imageUrl;

  // cloudinaryParam - w_200,h_150,c_scale гэх мэтээр өгч болно.
  const cloudinaryUrlRegex = /^https?:\/\/res\.cloudinary\.com\//;

  if (cloudinaryUrlRegex.test(imageUrl)) {
    return imageUrl.replace("/upload/", `/upload/${cloudinaryParam}/`);
  }

  return imageUrl;
};
