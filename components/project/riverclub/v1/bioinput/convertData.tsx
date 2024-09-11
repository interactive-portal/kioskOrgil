const convertDate = (value: any) => {
  var x = 0;
  var y = 0;
  var z = 0;
  var today = new Date();
  var yy = today.getFullYear();
  var ages = 0;
  var odd = 0;
  var gender = "";
  if (value?.length === 10) {
    x = value.substring(2, 4);
    y = value.substring(4, 6);
    z = value.substring(6, 8);

    if (y > 12) {
      x = 2000 + Number(x);
      y = y - 20;
    } else {
      x = 1900 + Number(x);
      ages = Number(yy) - Number(x);
    }
    var gender1 = Number(value.substring(8, 1)) % 2;

    if (!gender1) gender = "2";
    else gender = "1";

    const date = x + "-" + y + "-" + z;
    return { date, gender };
  }
};

export default convertDate;
