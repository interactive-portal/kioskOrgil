// import React from "react";
// import { AppData } from "./types";
// import PriceLayout from "./priceLayout";
// import { title } from "process";

// const data: AppData = {
//   header: {
//     logoSrc: "/path/to/logo.png",
//     title: "БАССЕЙН",
//   },
//   membershipPlans: [
//     {
//       title: "ГИШҮҮНЧЛЭЛИЙН ТАРИФ",
//       ageGroup: "12 НАСНААС ДЭЭШ",
//       pricingTiers: [
//         { duration: "3 САР", price: "980,000₮", multiple: "3x326,667" },
//         { duration: "6 САР", price: "1,450,000₮", multiple: "3x326,667" },
//         { duration: "12 САР", price: "2,090,000₮", multiple: "3x326,667" },
//       ],
//     },
//     {
//       title: "ГИШҮҮНЧЛЭЛИЙН ТАРИФ",
//       ageGroup: "12 НАСНААС ДОШ",
//       pricingTiers: [
//         { duration: "3 САР", price: "760,000₮", multiple: "3x326,667" },
//         { duration: "6 САР", price: "1,600,000₮", multiple: "3x326,667" },
//         { duration: "12 САР", price: "2,450,000₮", multiple: "3x326,667" },
//       ],
//     },
//     {
//       title: "ГИШҮҮНЧЛЭЛИЙН ТАРИФ",
//       ageGroup: "ГЭР БҮЛ 3 ГИШҮҮН",
//       pricingTiers: [
//         { duration: "3 САР", price: "1,900,000₮", multiple: "3x326,667" },
//         { duration: "6 САР", price: "2,800,000₮", multiple: "3x326,667" },
//         { duration: "12 САР", price: "4,200,000₮", multiple: "3x326,667" },
//       ],
//     },
//     {
//       title: "ГИШҮҮНЧЛЭЛИЙН ТАРИФ",
//       ageGroup: "ГЭР БҮЛ 4 ГИШҮҮН",
//       pricingTiers: [
//         { duration: "3 САР", price: "2,450,000₮", multiple: "3x326,667" },
//         { duration: "6 САР", price: "3,600,000₮", multiple: "3x326,667" },
//         { duration: "12 САР", price: "5,300,000₮", multiple: "3x326,667" },
//       ],
//     },
//     {
//       title: "ГИШҮҮНЧЛЭЛИЙН ТАРИФ",
//       ageGroup: "ГЭР БҮЛ 5 ГИШҮҮН",
//       pricingTiers: [
//         { duration: "3 САР", price: "2,950,000₮", multiple: "3x326,667" },
//         { duration: "6 САР", price: "4,200,000₮", multiple: "3x326,667" },
//         { duration: "12 САР", price: "6,400,000₮", multiple: "3x326,667" },
//       ],
//     },
//   ],
//   footerNotes: [
//     {
//       title: "САНАМЖ:",
//       details: [
//         "ШИНЖИЛГЭЭ: ИНТЕРМЕД, ГРАНДМЕД, ЭКСПРЭСС ЛАБ ИЛҮҮ ЦАГ: 30 МИНУТ ТУТАМД ТОМ ХҮН: 8000₮ ХҮҮХЭД 4000₮ ОРОЛТ: 2 ЦАГ 4 УДАА /7 ХОНОГ 1 УДАА/ 1 ӨДӨР СУРГАЛТЫН ЦАГ: ӨДӨР БҮР 12:00-15:00 ЦАГЫН ХООРОНД",
//       ],
//     },
//   ],
// };

// const FitnessPrice: React.FC = () => {
//   return (
//     <PriceLayout>
//       <main>
//         <div className="uppercase text-[90px] text-[#A68B5C] text-center mt-10">
//           {data.header.title}
//         </div>
//         <div className="grid grid-cols-2  gap-4 mt-8 ">
//           {data.membershipPlans.map((plan, index) => (
//             <div
//               key={index}
//               className="bg-[#959090] px-4 text-center text-white w-[496px] h-[300px]  "
//             >
//               <div className=" flex gap-10 justify-center ">
//                 {/* <div className="border border-whote w-full self-start"></div> */}
//                 <h1 className="text-[20px] font-bold ">{plan.title}</h1>
//                 {/* <div className="border border-whote w-full self-start"></div> */}
//               </div>
//               <div className="grid grid-cols-2 items-center ">
//                 <p className="text-[28px] font-bold ">{plan.ageGroup}</p>
//                 {plan.pricingTiers.map((tier, tierIndex) => (
//                   <div key={tierIndex}>
//                     <h3 className="text-[28px] font-bold ">{tier.duration}</h3>
//                     <p className="text-end">{tier.multiple}</p>
//                     <p className="text-[28px] font-bold">{tier.price}</p>
//                     <div className="border border-white mt-2"></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//         <footer className="text-white mt-8 grid grid-cols-2 gap-8 ">
//           {data.footerNotes.map((note, index) => (
//             <div
//               key={index}
//               className="bg-[#959090] p-4  text-center  w-[506px]"
//             >
//               <p className="text-[16px] font-bold mb-2">{note.title}</p>
//               {note.details.map((detail, detailIndex) => (
//                 <p key={detailIndex} className="text-[13px] ">
//                   {detail}
//                 </p>
//               ))}
//               <div className="flex justify-between gap-10 mt-4">
//                 <p>ЦАГИЙН ХУВААРЬ ДАВАА-НЯМ: 07AM-10PM</p>
//                 <p>TIME TABLE MON-SUN: 07AM-10PM</p>
//               </div>
//             </div>
//           ))}
//           <div className="bg-[#959090] p-4 text-center h-[168px]">
//             <table className="w-full  text-white">
//               <thead>
//                 <tr>
//                   <th className="text-center" colSpan={4}>
//                     ҮНЭНЧ ГИШҮҮНИЙ ХӨНГӨЛӨЛТ
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="text-center">ТӨРӨЛ</td>
//                   <td className="text-center">3 CAP</td>
//                   <td className="text-center">6 CAP</td>
//                   <td className="text-center">1 ЖИЛ</td>
//                 </tr>
//                 <tr>
//                   <td>MEMBERSHIP</td>
//                   <td>5% OFF</td>
//                   <td>10% OFF</td>
//                   <td>15% OFF</td>
//                 </tr>
//                 <tr>
//                   <td>CLASSIC CARD</td>
//                   <td className="text-center">..................</td>
//                   <td>10% OFF</td>
//                   <td>15% OFF</td>
//                 </tr>
//                 <tr>
//                   <td>GOLD CARD</td>
//                   <td className="text-center">..................</td>
//                   <td>10% OFF</td>
//                   <td>15% OFF</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </footer>
//       </main>
//     </PriceLayout>
//   );
// };

// export default FitnessPrice;

import React from "react";
import PriceLayout from "./priceLayout";
import Layout from "../kioskLayout";

const SquashPrice = () => {
  return (
    <Layout>
      <div>
        <div className="mt-[100px]">
          <p className="flex justify-center text-[#A68B5C] text-[64px]">
            СКОВШ
          </p>
        </div>
        <div className="mt-[70px] ">
          <div className="flex justify-center p-2 h-[300px]">
            <img
              src="/images/squashPrice.png"
              alt="Fitness Price"
              className=" hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
          <div className="flex justify-center h-[300px] p-2 ">
            <img
              src="/images/squashPrice1.png"
              alt="Fitness Hunglult"
              className=" hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
          <div className="flex justify-center h-[300px] p-2  ">
            <img
              src="/images/5peoplePrice.png"
              alt="Fitness Hunglult"
              className=" hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SquashPrice;
